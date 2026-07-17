"use client";

import { cn } from "@/lib/utils";
import { Rate } from "../(root)/types";
import { formatRate, getOpenLastData } from "@/lib/helpers";
import { Skeleton } from "@/components/ui/skeleton";

type ConversionStatsProps = {
  rates: Rate[];
  loading: boolean;
};

const ConversionStats = ({ rates, loading }: ConversionStatsProps) => {
  const historyData = loading
    ? { open: 0, last: 0, change: 0, percentChange: 0, direction: 0 }
    : getOpenLastData(rates);

  const statsItems = [
    {
      title: "Open",
      value: formatRate(historyData.open, 4),
    },
    {
      title: "Last",
      value: formatRate(historyData.last, 4),
    },
    {
      title: "CHANGE",
      value: (
        <span
          className={cn(
            "flex items-center gap-2",
            { "text-green-500": historyData.direction === 1 },
            { "text-red-500": historyData.direction === -1 },
          )}
        >
          {historyData.direction === 1 && "+"}
          {formatRate(historyData.change, 4)}
        </span>
      ),
    },
    {
      title: "% CHANGE",
      value: (
        <span
          className={cn(
            "flex items-center gap-2",
            { "text-green-500": historyData.direction === 1 },
            { "text-red-500": historyData.direction === -1 },
          )}
        >
          <span>
            {historyData.direction === 1
              ? "▲"
              : historyData.direction === -1
                ? "▼"
                : "-"}
          </span>
          <span>
            {historyData?.direction === 1 && "+"}
            {formatRate(historyData.percentChange, 2)}%
          </span>
        </span>
      ),
    },
  ];

  return (
    <div className="w-full grid grid-cols-2 flex-wrap sm:w-auto sm:grid-cols-4 gap-4 -shrink-0">
      {statsItems.map((item) => (
        <div
          key={`${item.title}`}
          className="bg-card border border-neutral-200 dark:border-neutral-600 px-5 py-3 rounded-2xl"
        >
          <div className="text-bodySm opacity-70 mb-4">{item.title}</div>
          {loading ? (
            <Skeleton className="h-6 w-24 rounded-sm" />
          ) : (
            <div className="text-h3!">{item.value}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ConversionStats;
