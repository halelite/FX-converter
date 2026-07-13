import {
  getCurrencies,
  getMultiCurrency,
  parseAmount,
  parsePair,
} from "@/lib/helpers";
import CurrencyConverter from "../components/converter";
import DetailsContainer from "../components/detailsContainer";
import { GroupedCurrency } from "./types";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    pair?: string;
    amount?: string;
  }>;
}) {
  const pair = (await searchParams).pair ?? null;
  const rawAmount = (await searchParams).amount;
  const amount = parseAmount(rawAmount);

  const currencies = await getCurrencies();

  const supportedCurrencies = new Set(currencies.map((c) => c.iso_code));
  const [fromCurrency, toCurrency] = parsePair(supportedCurrencies, pair);

  const groupedCurrencies: GroupedCurrency = {
    popular: currencies.filter(
      (currency) =>
        currency.iso_code.toLowerCase() === "usd" ||
        currency.iso_code.toLowerCase() === "eur" ||
        currency.iso_code.toLowerCase() === "gbp",
    ),
    "other currencies": currencies.filter(
      (currency) =>
        currency.iso_code.toLowerCase() !== "usd" &&
        currency.iso_code.toLowerCase() !== "eur" &&
        currency.iso_code.toLowerCase() !== "gbp",
    ),
  };

  const multiCurrencyList = await getMultiCurrency({
    amount: amount.toString(),
    base: fromCurrency,
    to: toCurrency,
  });

  return (
    <div className="h-full flex flex-col gap-8 py-8 px-4 md:py-12 md:px-6 lg:px-8 -bg-zinc-50 -dark:bg-black">
      <CurrencyConverter
        currencies={groupedCurrencies}
        initialAmount={amount}
        initialFrom={fromCurrency}
        initialTo={toCurrency}
      />

      <DetailsContainer
        baseCurrency={fromCurrency}
        toCurrency={toCurrency}
        amount={amount}
        compareList={multiCurrencyList}
      />
    </div>
  );
}
