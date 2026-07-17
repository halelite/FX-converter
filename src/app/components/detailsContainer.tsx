"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import History from "./history";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import Compare from "./compare";
import Favorites from "./favorites";
import Logs from "./logs";
import { useFavorites } from "../context/favoritesContext";
import { useLogs } from "../context/logsContext";
import { CompareRate } from "../(root)/types";

type DetailsProps = {
  baseCurrency: string;
  toCurrency: string;
  amount: number;
  compareList: CompareRate[];
};

const DetailsContainer = ({
  baseCurrency,
  toCurrency,
  amount,
  compareList,
}: DetailsProps) => {
  const [selectedTab, setSelectedTab] = useState("history");
  const { favorites } = useFavorites();
  const { logs } = useLogs();

  const tabItems = [
    {
      value: "history",
      title: "HISTORY",
      content: <History baseCurrency={baseCurrency} toCurrency={toCurrency} />,
    },
    {
      value: "compare",
      title: "COMPARE",
      content: (
        <Compare
          baseCurrency={baseCurrency}
          amount={amount}
          compareList={compareList}
        />
      ),
    },
    {
      value: "favorites",
      title: (
        <div className="me-6 w-full flex items-center justify-between gap-2 sm:me-0">
          <span>FAVORITES</span>
          <div className="size-5 flex items-center justify-center rounded-full text-captionSm text-lime-800 dark:text-lime-500 bg-lime-500 dark:bg-lime-800 pt-0.5">
            {favorites.length}
          </div>
        </div>
      ),
      content: <Favorites favoritePairs={favorites} />,
    },
    {
      value: "log",
      title: (
        <div className="me-6 w-full flex items-center justify-between gap-2 sm:me-0">
          <span>LOG</span>
          <div className="size-5 flex items-center justify-center rounded-full text-captionSm text-lime-800 dark:text-lime-500 bg-lime-500 dark:bg-lime-800 pt-0.5">
            {logs.length}
          </div>
        </div>
      ),
      content: <Logs logs={logs} />,
    },
  ];

  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab}>
      <div className="hidden sm:block border-b border-b-neutral-200 dark:border-b-neutral-600">
        <TabsList variant="line">
          {tabItems.map((item) => (
            <TabsTrigger key={item.value} value={item.value}>
              {item.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <div className="sm:hidden">
        <Select value={selectedTab} onValueChange={setSelectedTab}>
          <SelectTrigger className="w-full! h-10! px-3! text-bodyMd!">
            <SelectValue />
          </SelectTrigger>

          <SelectContent position="popper">
            <SelectGroup className="p-2!">
              {tabItems.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className="text-bodyMd! py-2.5! px-2!"
                >
                  {item.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {tabItems.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default DetailsContainer;
