"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export const Ticker = ({ items }: any) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  const tickerItems = [...items, ...items];

  useEffect(() => {
    if (trackRef.current) {
      setWidth(trackRef.current.scrollWidth / 2);
    }
  }, [items]);

  return (
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
          <div className="text-caption">
            {parseFloat(item?.rate?.toFixed(4))}
          </div>

          <div
            className={`flex items-center gap-2 text-captionMd ${
              item.direction === 1
                ? "text-green-500"
                : item.direction === -1
                  ? "text-red-500"
                  : "text-neutral-100"
            }`}
          >
            <div>
              {item?.direction === 1 ? "▲" : item?.direction === -1 ? "▼" : "-"}
            </div>
            <div>{parseFloat(item?.percentChange?.toFixed(2))}%</div>
          </div>
        </div>
      ))}
    </motion.div>
  );
};
