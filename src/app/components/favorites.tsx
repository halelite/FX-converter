import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  formatRate,
  getLatestFavoriteRates,
  getPairsChanges,
} from "@/lib/helpers";
import { useEffect, useState } from "react";
import { PairChangeData } from "../(root)/types";
import ListSkeleton from "./listSkeleton";
import { Toggle } from "@/components/ui/toggle";
import { StarFilled } from "@/assets/icons/star-filled";
import { useFavorites } from "../context/favoritesContext";
import { cn } from "@/lib/utils";
import { ArrowRightOutlined } from "@/assets/icons/arrow-right-outlined";

type FavoritesProps = {
  favoritePairs: string[];
};

const Favorites = ({ favoritePairs }: FavoritesProps) => {
  const [favorites, setFavorites] = useState<PairChangeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toggleFavorite } = useFavorites();

  useEffect(() => {
    let cancelled = false;

    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getLatestFavoriteRates(favoritePairs);
        const favoritesListData = getPairsChanges(data);

        if (!cancelled) {
          setFavorites(favoritesListData);
        }
      } catch {
        if (!cancelled) {
          setError("Failed to load exchange rates.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();

    return () => {
      cancelled = true;
    };
  }, [favoritePairs]);

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400 text-center"
      >
        {error}
      </div>
    );
  }

  return favoritePairs?.length > 0 ? (
    <Card className="sm:py-5!">
      <CardHeader className="flex items-center justify-between gap-3 px-5!">
        <span className="text-bodyMd">PINNED PAIRS</span>
        <span className="uppercase text-captionMd opacity-70">
          {favorites.length.toLocaleString()}{" "}
          {favorites.length === 1 ? "favorite" : "favorites"}
        </span>
      </CardHeader>
      <CardContent className="space-y-3 sm:px-5!">
        {loading ? (
          <ListSkeleton />
        ) : (
          favorites.map((item) => {
            const [base, to] = item.pair.split("/");
            const isFavorite = favoritePairs.includes(item.pair);

            return (
              <div
                key={item.pair}
                className="flex items-center justify-between gap-5 border border-neutral-500 bg-neutral-600 rounded-10 py-3 px-3 sm:px-4"
              >
                <div className="flex items-center gap-2 text-bodySm">
                  <span>{base}</span>
                  <ArrowRightOutlined className="text-neutral-200" />
                  <span>{to}</span>
                </div>

                <div className="flex items-center gap-5">
                  <div className="flex flex-col items-end gap-1.5">
                    <div className="text-bodyMd">
                      {formatRate(item.rate, 4)}
                    </div>

                    <div
                      className={cn(
                        "text-captionSm",
                        { "text-red-500!": item.direction === -1 },
                        { "text-green-500!": item.direction === 1 },
                      )}
                    >
                      {item?.direction === 1
                        ? "▲ "
                        : item?.direction === -1
                          ? "▼ "
                          : "- "}
                      {formatRate(item.percentChange, 2)}%
                    </div>
                  </div>

                  <Toggle
                    variant="outline"
                    className={cn(
                      "px-2! border-neutral-500! hover:border-neutral-400! hover:bg-neutral-500!",
                      { "border-lime-500!": isFavorite },
                    )}
                    pressed={isFavorite}
                    onPressedChange={() => toggleFavorite(item.pair)}
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
          })
        )}
      </CardContent>
    </Card>
  ) : (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <div className="text-h3 text-neutral-700 dark:text-neutral-100">
        No pinned pairs yet
      </div>
      <div className="w-5/6 text-neutral-500 dark:text-neutral-200 text-bodySm text-center lg:w-2/4">
        Pin a pair to track its rate here. Tap the star icon on any conversion
        or comparison row.
      </div>
    </div>
  );
};

export default Favorites;
