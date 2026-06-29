"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RateAreaChart from "./rateChart";

const History = () => {
  const statsItems = [
    {
      title: "Open",
      value: 0.8516,
    },
    {
      title: "Last",
      value: 0.853,
    },
    {
      title: "CHANGE",
      value: 0.8516,
    },
    {
      title: "% CHANGE",
      value: +0.0014,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
        <div className="w-full grid grid-cols-2 sm:w-auto sm:grid-cols-4 gap-4 shrink-0">
          {statsItems.map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              className="bg-card border border-neutral-600 px-5 py-3 rounded-2xl sm:w-35"
            >
              <div className="text-bodySm opacity-70 mb-4">{item.title}</div>
              <div className="text-h3">{item.value}</div>
            </div>
          ))}
        </div>

        <Tabs>
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

      <RateAreaChart />
    </div>
  );
};

export default History;
