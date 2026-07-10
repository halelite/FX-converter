"use client";

import { Button } from "@/components/ui/button";
import { StarFilled } from "@/assets/icons/star-filled";
import { NumberInput } from "@/components/ui/customNumberInput";
import { useEffect, useRef, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { GroupedCurrency } from "../(root)/types";
import { convert } from "@/lib/helpers";
import { LoaderCircle } from "lucide-react";
import { CurrencyPicker } from "./currencyPicker";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Decimal from "decimal.js";
import { ExchangeOutlined } from "@/assets/icons/exchange-outlined";
import { useFavorites } from "../context/favoritesContext";

type CurrencyProps = {
  initialAmount: number;
  initialFrom: string;
  initialTo: string;
  currencies: GroupedCurrency;
};

const CurrencyConverter = ({
  currencies,
  initialAmount,
  initialFrom,
  initialTo,
}: CurrencyProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pair = searchParams.get("pair");
  const amount = searchParams.get("amount");
  const [sendCurrency, setSendCurrency] = useState(initialFrom);
  const [receiveCurrency, setReceiveCurrency] = useState(initialTo);
  const sendRef = useRef<HTMLDivElement>(null);
  const receiveRef = useRef<HTMLDivElement>(null);
  const [sendValue, setSendValue] = useState(initialAmount.toString());
  const [receiveValue, setReceiveValue] = useState("0");
  const [activePairExchange, setActivePairExchange] = useState<string | null>(
    null,
  );
  const [direction, setDirection] = useState<"send" | "receive">("send");
  const [loading, setLoading] = useState(false);
  const [activePairRateLoading, setActivePairRateLoading] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorited = favorites?.includes(`${sendCurrency}/${receiveCurrency}`);

  const handleSwapCurrencies = () => {
    const receiveTemp = sendCurrency;
    setSendCurrency(receiveCurrency);
    setReceiveCurrency(receiveTemp);
  };

  // convert currencies on currency change
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const activeValue = direction === "send" ? sendValue : receiveValue;

    // Don't call convert() with nothing to convert — just zero out the other side.
    if (!activeValue || new Decimal(activeValue).isZero()) {
      if (direction === "send") setReceiveValue("0");
      else setSendValue("0");
      setLoading(false);
      return;
    }

    setLoading(true);
    if (direction === "send") {
      timeout = setTimeout(() => {
        convert(sendCurrency, receiveCurrency, sendValue)
          .then((r) => setReceiveValue(r))
          .finally(() => setLoading(false));
      }, 200);
    } else {
      timeout = setTimeout(() => {
        convert(receiveCurrency, sendCurrency, receiveValue)
          .then((r) => setSendValue(r))
          .finally(() => setLoading(false));
      }, 200);
    }

    return () => clearTimeout(timeout);
  }, [sendCurrency, receiveCurrency, sendValue, receiveValue, direction]);

  // calculate active pair exchange rate
  useEffect(() => {
    setActivePairRateLoading(true);
    convert(sendCurrency, receiveCurrency, "1")
      .then((r) => setActivePairExchange(r))
      .finally(() => setActivePairRateLoading(false));
  }, [sendCurrency, receiveCurrency]);

  // update url searchparam when convert values change
  useEffect(() => {
    const validPair = `${sendCurrency}/${receiveCurrency}`;
    const params = new URLSearchParams(searchParams.toString());

    if (pair !== validPair) {
      params.set("pair", validPair);
      router.replace(`${pathname}?${params.toString()}`);
    }

    if (amount !== sendValue) {
      params.set("amount", sendValue);
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [
    pair,
    sendCurrency,
    receiveCurrency,
    pathname,
    router,
    searchParams,
    sendValue,
  ]);

  return (
    <div>
      <div className="text-h3 mb-4">CHECK THE RATE</div>
      <div className="bg-neutral-700 rounded-lg">
        <div className="flex flex-col items-stretch sm:flex-row sm:items-center gap-6 p-4 overflow-x-hidden">
          <div
            className="flex-1 min-w-0 bg-neutral-600 border border-neutral-500 p-4 rounded-lg"
            ref={sendRef}
          >
            <div className="text-bodySm mb-5">SEND</div>

            <div className="flex items-center justify-between gap-2 min-w-0">
              <NumberInput
                value={sendValue}
                onValueChange={(val) => {
                  setDirection("send");
                  setSendValue(val === "" ? "0" : (val ?? "0"));
                }}
                className="text-h2! lg:text-h1!"
              />

              <CurrencyPicker
                currencies={currencies}
                value={sendCurrency}
                onValueChange={(v) => {
                  setDirection("send");
                  setSendCurrency(v!);
                }}
                containerRef={sendRef}
              />
            </div>
          </div>

          <div
            className="self-center size-12 flex items-center justify-center bg-neutral-600 border border-neutral-500 rounded-lg shrink-0 cursor-pointer"
            onClick={loading ? () => {} : handleSwapCurrencies}
          >
            {loading ? (
              <LoaderCircle size={17} className="animate-spin" />
            ) : (
              <ExchangeOutlined className="rotate-90 sm:rotate-0 -w-4! -h-4.5!" />
            )}
          </div>

          <div
            className="flex-1 min-w-0 bg-neutral-600 border border-neutral-500 p-4 rounded-lg"
            ref={receiveRef}
          >
            <div className="text-bodySm mb-5">RECEIVE</div>

            <div className="flex items-center justify-between gap-2">
              <NumberInput
                value={receiveValue}
                onValueChange={(val) => {
                  setDirection("receive");
                  setReceiveValue(val === "" ? "0" : (val ?? "0"));
                }}
                className="text-h2! lg:text-h1! text-lime-500"
              />

              <CurrencyPicker
                currencies={currencies}
                value={receiveCurrency}
                onValueChange={(v) => {
                  setDirection("send");
                  setReceiveCurrency(v!);
                }}
                containerRef={receiveRef}
              />

              {/* <ComboboxWithGroupsAndSeparator /> */}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 border-t border-t-neutral-500 border-dashed">
          {activePairRateLoading ? (
            <div className="flex gap-1 text-captionMd">
              1 <Skeleton className="h-3.75 w-12.5 rounded-full" />
              =
              <Skeleton className="h-3.75 w-22.5 rounded-full" />
            </div>
          ) : (
            <div className="text-captionMd flex gap-1">
              1 {sendCurrency} ={" "}
              {activePairExchange &&
                Number(activePairExchange).toLocaleString()}{" "}
              {receiveCurrency}
            </div>
          )}

          <div className="flex items-center gap-3">
            <Toggle
              aria-label="Toggle favorite"
              variant="outline"
              pressed={isFavorited}
              onPressedChange={() =>
                toggleFavorite(`${sendCurrency}/${receiveCurrency}`)
              }
              className="uppercase data-[state=on]:bg-lime-500! data-[state=on]:text-neutral-900!"
            >
              <StarFilled
                pressed={isFavorited}
                className={cn(
                  "text-neutral-200 group-hover/toggle:text-white",
                  {
                    "text-neutral-900": isFavorited,
                  },
                )}
              />
              {isFavorited ? "Favorited" : "Favorite"}
            </Toggle>

            <Button variant="outline" className="uppercase bg-transparent!">
              Log conversion
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
