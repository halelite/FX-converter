import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CompareRate } from "../(root)/types";
import { CircleFlag } from "react-circle-flags";
import { useFavorites } from "../context/favoritesContext";
import { formatRate } from "@/lib/helpers";
import { Toggle } from "@/components/ui/toggle";
import { StarFilled } from "@/assets/icons/star-filled";
import { cn } from "@/lib/utils";

type CompareProps = {
  baseCurrency: string;
  amount: number;
  compareList: CompareRate[];
};

const Compare = ({ baseCurrency, amount, compareList }: CompareProps) => {
  const { favorites, toggleFavorite } = useFavorites();

  if (compareList?.length === 0) {
    return (
      <div
        role="alert"
        className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400 text-center"
      >
        Failed to load exchange rates.
      </div>
    );
  }

  return amount === 0 ? (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <div className="text-h3 text-neutral-100">No comparison available</div>
      <div className="w-3/4 text-neutral-200 text-bodySm text-center lg:w-2/4">
        Enter an amount in SEND above to see what your money is worth in other
        currencies.
      </div>
    </div>
  ) : (
    <Card className="sm:py-5!">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:px-5!">
        <div className="flex items-center gap-3">
          <span className="text-neutral-200 text-bodySm">MULTI-CURRENCY</span>
          <span className="uppercase text-bodyMd">
            {amount.toLocaleString()} from {baseCurrency}
          </span>
        </div>

        <div className="text-captionMd opacity-70">
          {compareList?.length ? compareList.length : 0}{" "}
          {compareList?.length === 1 ? "PAIR" : "PAIRS"}
        </div>
      </CardHeader>
      <CardContent className="space-y-3 sm:px-5!">
        {compareList.map((item) => {
          const isFavorite = favorites.includes(
            `${baseCurrency}/${item.quote}`,
          );
          return (
            <div
              key={item.quote}
              className="flex items-center justify-between gap-2.5 sm:gap-5 border border-neutral-500 bg-neutral-600 rounded-10 py-3 px-3 sm:px-4"
            >
              <div className="flex items-center gap-2.5 sm:gap-5">
                <CircleFlag
                  countryCode={item?.to_country_code}
                  height={24}
                  className="size-6 shring-0"
                />

                <div>
                  <div className="text-bodySm mb-1.5">{item.quote}</div>
                  <div className="text-captionMd text-neutral-200">
                    {item.to_name}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-5">
                <div className="flex flex-col items-end gap-1.5">
                  <div className="text-bodyMd">{item.converted_amount}</div>

                  <div className="text-captionSm text-neutral-200 text-nowrap">
                    @ 0.7366
                  </div>
                </div>

                <Toggle
                  variant="outline"
                  className={cn(
                    "px-2! border-neutral-500! hover:border-neutral-400! hover:bg-neutral-500!",
                    { "border-lime-500!": isFavorite },
                  )}
                  pressed={isFavorite}
                  onPressedChange={() =>
                    toggleFavorite(`${baseCurrency}/${item.quote}`)
                  }
                >
                  <StarFilled
                    pressed={isFavorite}
                    className={cn("text-foreground", {
                      "text-lime-500": isFavorite,
                    })}
                  />
                </Toggle>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default Compare;
