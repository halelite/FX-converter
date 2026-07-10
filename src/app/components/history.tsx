"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RateAreaChart from "./rateChart";
import { useEffect, useState } from "react";
import { getPairRatesByRange, RangeKey } from "@/lib/helpers";
import { Rate } from "../(root)/types";
import ConversionStats from "./conversionStats";

type HistoryProps = {
  baseCurrency: string;
  toCurrency: string;
};

const History = ({ baseCurrency, toCurrency }: HistoryProps) => {
  const [selectedRange, setSelectedRange] = useState<RangeKey>("1M");
  const [rates, setRates] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);

      try {
        const data = await getPairRatesByRange(
          selectedRange,
          baseCurrency,
          toCurrency,
        );

        setRates(data);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [selectedRange, baseCurrency, toCurrency]);

  return (
    <>
      {!loading && rates.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-10">
          <div className="text-h3 text-neutral-100">
            No chart data available
          </div>
          <div className="w-5/6 text-neutral-200 text-bodySm text-center lg:w-2/4">
            We couldn't load rate history for {baseCurrency}/{toCurrency} right
            now. This usually clears up in a minute.
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
            <ConversionStats rates={rates} loading={loading} />

            <Tabs
              value={selectedRange}
              onValueChange={(v) => setSelectedRange(v as RangeKey)}
            >
              <TabsList>
                <TabsTrigger value="1D">1D</TabsTrigger>
                <TabsTrigger value="1W">1W</TabsTrigger>
                <TabsTrigger value="1M">1M</TabsTrigger>
                <TabsTrigger value="3M">3M</TabsTrigger>
                <TabsTrigger value="1Y">1Y</TabsTrigger>
                <TabsTrigger value="5Y">5Y</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <RateAreaChart
            rates={rates}
            timeRange={selectedRange}
            baseCurrency={baseCurrency}
            toCurrency={toCurrency}
            loading={loading}
          />
        </>
      )}
    </>
  );
};

export default History;
