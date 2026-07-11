"use client";

import { formatRate } from "@/lib/helpers";
import { motion, useAnimate } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";

export const Ticker = ({ items }: any) => {
  const [scope, animate] = useAnimate();

  const tickerItems = [...items, ...items];

  useLayoutEffect(() => {
    if (!scope.current) return;

    const width = scope.current.scrollWidth / 2;

    const controls = animate(
      scope.current,
      { x: [0, -width] },
      {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    );

    const element = scope.current;

    const handleEnter = () => controls.pause();
    const handleLeave = () => controls.play();

    element.addEventListener("pointerenter", handleEnter);
    element.addEventListener("pointerleave", handleLeave);

    return () => {
      element.removeEventListener("pointerenter", handleEnter);
      element.removeEventListener("pointerleave", handleLeave);
      controls.stop();
    };
  }, [items]);

  return (
    <motion.div ref={scope} className="flex w-max">
      {tickerItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-2.5 p-3 border-e border-neutral-500 whitespace-nowrap"
        >
          <div className="text-neutral-200 text-captionMd">{item.pair}</div>
          <div className="text-caption">{formatRate(item.rate, 4)}</div>

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
            <div>{formatRate(item.percentChange, 2)}%</div>
          </div>
        </div>
      ))}
    </motion.div>
  );
};
