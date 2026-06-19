"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const LiveMarkets = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  const items = [
    {
      pair: "USD/CHF",
      number: 0.9098,
      rate: 0.13,
    },
    {
      pair: "USD/CHF",
      number: 0.9098,
      rate: -0.13,
    },
    {
      pair: "USD/CHF",
      number: 0.9098,
      rate: 0.14,
    },
    {
      pair: "USD/CHF",
      number: 0.9098,
      rate: -0.14,
    },
    {
      pair: "USD/CHF",
      number: 0.9098,
      rate: 0.15,
    },
  ];

  const tickerItems = [...items, ...items];

  useEffect(() => {
    if (trackRef.current) {
      setWidth(trackRef.current.scrollWidth / 2);
    }
  }, [items]);

  return (
    <div className="flex relative">
      <div className="w-fit shrink-0 bg-lime-500 flex items-center gap-2 px-4 py-3">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neutral-300 opacity-75"></span>
          <span className="relative inline-flex size-1.5 rounded-full bg-neutral-900 leading-none"></span>
        </span>

        <div className="text-caption font-medium text-neutral-900 uppercase">
          Live markets
        </div>
      </div>

      <div className="flex overflow-x-hidden bg-neutral-700">
        <motion.div
          ref={trackRef}
          className="flex w-max"
          animate={{
            // x: ["0%", "-50%"],
            x: ["0%", -width],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {tickerItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 p-3 border-e border-neutral-500 whitespace-nowrap"
            >
              <div className="text-neutral-200 text-captionMd">{item.pair}</div>
              <div className="text-caption">{item.number}</div>

              <div
                className={`flex items-center gap-2 text-captionMd ${
                  item.rate >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {/* <ArrowDownFilled
                  className={item.rate >= 0 ? "rotate-180" : ""}
                /> */}

                <div>{item?.rate > 0 ? "▲" : "▼"}</div>
                <div>{item.rate}%</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LiveMarkets;
