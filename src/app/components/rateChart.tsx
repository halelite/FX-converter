"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Rate } from "../(root)/types";
import { format } from "date-fns";
import {
  formatChartDate,
  formatRate,
  getEvenlySpacedTicks,
  getOpenLastData,
  getPaddedDomain,
  RangeKey,
} from "@/lib/helpers";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  rate: {
    label: "Rate",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const tickCount = {
  "1D": 3,
  "1W": 8,
  "1M": 5,
  "3M": 10,
  "1Y": 12,
  "5Y": 5,
};

type ChartProps = {
  rates: Rate[];
  timeRange: RangeKey;
  baseCurrency: string;
  toCurrency: string;
  loading: boolean;
};

const RateAreaChart = ({
  rates,
  timeRange,
  baseCurrency,
  toCurrency,
  loading,
}: ChartProps) => {
  const last = loading ? 0 : getOpenLastData(rates)?.last;
  const latestRate = rates.at(-1);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="text-body">{`${baseCurrency}/${toCurrency}`}</div>
          <div className="text-captionMd text-forground opacity-70 flex gap-2">
            {/* {last ? last : 0} · MAY 14 16:00 CET */}
            {last ? (
              formatRate(last)
            ) : (
              <Skeleton className="h-3.75 w-12.5 rounded-full inline-block" />
            )}{" "}
            ·{" "}
            {latestRate ? (
              `${format(new Date(latestRate.date), "MMM d")} 16:00 CET`
            ) : (
              <Skeleton className="h-3.75 w-22.5 rounded-full inline-block" />
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="max-h-72 w-full h-72 rounded-md" />
        ) : (
          <ChartContainer config={chartConfig} className="max-h-72 w-full">
            <AreaChart
              accessibilityLayer
              data={rates}
              margin={{
                left: -14,
              }}
            >
              <defs>
                <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#cef739" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#171719" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#2e2e2e"
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                ticks={getEvenlySpacedTicks(rates, tickCount[timeRange])}
                tickFormatter={(value) => formatChartDate(timeRange, value)}
                stroke="#9d9d9d"
              />
              <YAxis
                domain={getPaddedDomain(rates)}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={3}
                // width={60}
                tickFormatter={(value) =>
                  new Intl.NumberFormat("en", {
                    notation: "compact",
                    maximumFractionDigits: 2,
                  }).format(value)
                }
                stroke="#9d9d9d"
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="rate"
                type="linear"
                fill="url(#rateGradient)"
                fillOpacity={0.4}
                stroke="var(--color-lime-500)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default RateAreaChart;
