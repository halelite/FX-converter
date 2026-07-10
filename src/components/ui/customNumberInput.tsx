"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Decimal from "decimal.js";

interface NumberInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> {
  value?: string | null;
  onValueChange?: (value: string | null) => void;
  max?: number;
}

// Group digits with commas
function formatWithCommas(integerStr: string): string {
  return integerStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function NumberInput({
  value,
  onValueChange,
  max = 1_000_000_000_000,
  className,
  ...props
}: NumberInputProps) {
  const mirrorRef = React.useRef<HTMLSpanElement>(null);
  const [valueInput, setValueInput] = React.useState<string>(value ?? "");
  const [contentWidth, setContentWidth] = React.useState<number>(0);

  const [integer, decimal] = valueInput.split(".");
  const formattedInteger = formatWithCommas(integer || "0");
  const displayNumber =
    decimal !== undefined ? `${formattedInteger}.${decimal}` : formattedInteger;

  React.useEffect(() => {
    setValueInput(value ?? "");
  }, [value]);

  React.useLayoutEffect(() => {
    if (mirrorRef.current) {
      setContentWidth(mirrorRef.current.offsetWidth);
    }
  }, [displayNumber]);

  return (
    <div
      className="group relative min-w-0 max-w-full shrink text-h2! lg:text-h1!
        after:absolute after:left-px after:right-2 after:bottom-0 after:h-px after:bg-white
        after:opacity-0 after:transition-opacity
        [&:not(:focus-within):hover]:after:opacity-100 focus-within:after:opacity-0"
      style={{ width: `max(5ch, ${contentWidth + 2}px)` }}
    >
      {/* Hidden mirror — must match the input's font/size/weight exactly */}
      <span
        ref={mirrorRef}
        aria-hidden
        className={cn(
          "invisible absolute left-0 top-0 whitespace-pre pointer-events-none",
          "text-h2! lg:text-h1! p-1.25",
          className,
        )}
      >
        {displayNumber || "0"}
      </span>

      <input
        {...props}
        type="text"
        inputMode="numeric"
        value={displayNumber}
        onChange={(e) => {
          let raw = e.target.value.replace(/,/g, "");

          if (raw === "") {
            onValueChange?.(null);
            setValueInput("");
            return;
          }

          if (!/^\d*\.?\d*$/.test(raw)) return;

          // Strip leading zeros, but keep a single "0" if that's the whole integer part
          // (e.g. "0.5" should stay "0.5", "00" should become "0", "04" should become "4")
          raw = raw.replace(/^0+(?=\d)/, "");

          // Reject values exceeding max
          if (new Decimal(raw).gt(max)) return;

          setValueInput(raw);
          onValueChange?.(raw);
        }}
        className={cn(
          "border-none bg-transparent pe-1 rounded-lg",
          "focus:outline-2 focus:outline-lime-500 focus:outline-offset-2 rounded-lg",
          "w-full h-10! block",
          className,
        )}
      />
    </div>
  );
}

/*
interface NumberInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  onValueChange?: (value: number | null) => void;
  max?: number;
}

export function NumberInput({
  value,
  onValueChange,
  max = 1_000_000_000_000,
  className,
  ...props
}: NumberInputProps) {
  const mirrorRef = React.useRef<HTMLSpanElement>(null);
  const [valueInput, setValueInput] = React.useState<string>(
    value?.toString() ?? "",
  );
  const [contentWidth, setContentWidth] = React.useState<number>(0);
  const [integer, decimal] = valueInput.split(".");
  const formatted = Number(integer || 0).toLocaleString();
  const displayNumber =
    decimal !== undefined ? `${formatted}.${decimal}` : formatted;

  React.useEffect(() => {
    setValueInput(value?.toString() ?? "");
  }, [value]);

  // Measure the actual rendered width of the text via the mirror span.
  React.useLayoutEffect(() => {
    if (mirrorRef.current) {
      setContentWidth(mirrorRef.current.offsetWidth);
    }
  }, [displayNumber]);

  return (
    <div
      className="
        group
        relative
        min-w-0
        max-w-full
        shrink
        text-h2! lg:text-h1!

        after:absolute
        after:left-px
        after:right-2
        after:bottom-0
        after:h-px
        after:bg-white
        after:opacity-0
        after:transition-opacity

        [&:not(:focus-within):hover]:after:opacity-100
        focus-within:after:opacity-0
      "
      style={{
        width: `max(5ch, ${contentWidth + 2}px)`, // +2px buffer for caret
      }}
    >
      <span
        ref={mirrorRef}
        aria-hidden
        className={cn(
          "invisible absolute left-0 top-0 whitespace-pre pointer-events-none",
          "text-h2! lg:text-h1! p-1.25", // in sync with the input's text classes
          className,
        )}
      >
        {displayNumber || "0"}
      </span>

      <input
        {...props}
        type="text"
        inputMode="numeric"
        value={displayNumber}
        onChange={(e) => {
          const raw = e.target.value.replace(/,/g, "");

          // If the user deletes everything
          if (raw === "") {
            onValueChange?.(null);
            setValueInput("");
            return;
          }

          // allow only digits and floats
          if (!/^\d*\.?\d*$/.test(raw)) {
            return;
          }

          const numeric = new Decimal(raw);

          // Reject typing that would exceed max
          if (numeric.gt(max)) {
            return;
          }

          // Guard against floating-point precision loss regardless of `max`
          // if (!Number.isFinite(numeric) || numeric > Number.MAX_SAFE_INTEGER) {
          //   return;
          // }

          setValueInput(raw);

          onValueChange?.(numeric.toNumber());
        }}
        className={cn(
          "border-none bg-transparent -px-px pe-1 rounded-lg -underline-offset-2 -hover:decoration-1 -hover:decoration-white",
          // "-hover:not-focus:underline",
          "focus:outline-2 focus:outline-lime-500 focus:outline-offset-2 rounded-lg",
          "w-full h-10! block",
          className,
        )}
      />
    </div>
  );
} */
