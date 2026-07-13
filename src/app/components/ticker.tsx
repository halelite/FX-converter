"use client";

import { formatRate } from "@/lib/helpers";
import { motion, useAnimate, useReducedMotion } from "motion/react";
import { useLayoutEffect } from "react";

export const Ticker = ({ items }: any) => {
  const [scope, animate] = useAnimate();
  const shouldReduceMotion = useReducedMotion();

  const tickerItems = [...items, ...items];

  useLayoutEffect(() => {
    if (shouldReduceMotion) return;
    if (!scope.current) return;

    const width = scope.current.scrollWidth / 2;

    const controls = animate(
      scope.current,
      { x: [0, -width] },
      {
        duration: 25,
        ease: "linear",
        repeat: Infinity,
      },
    );

    const element = scope.current;

    const handleEnter = () => controls.pause();
    const handleLeave = () => controls.play();
    const handleFocus = () => controls.pause();
    const handleBlur = () => controls.play();

    element.addEventListener("pointerenter", handleEnter);
    element.addEventListener("pointerleave", handleLeave);
    element.addEventListener("focus", handleFocus);
    element.addEventListener("blur", handleBlur);

    return () => {
      element.removeEventListener("pointerenter", handleEnter);
      element.removeEventListener("pointerleave", handleLeave);
      element.removeEventListener("focus", handleFocus);
      element.removeEventListener("blur", handleBlur);
      controls.stop();
    };
  }, [items]);

  return (
    <motion.div ref={scope} className="flex w-max" tabIndex={0}>
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
