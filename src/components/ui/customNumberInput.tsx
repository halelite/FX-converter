"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface NumberInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  onValueChange?: (value: number | null) => void;
}

export function NumberInput({
  value,
  onValueChange,
  className,
  ...props
}: NumberInputProps) {
  const [valueInput, setValueInput] = React.useState<string>(
    value?.toString() ?? "",
  );
  const [integer, decimal] = valueInput.split(".");
  const formatted = Number(integer || 0).toLocaleString();
  const displayNumber =
    decimal !== undefined ? `${formatted}.${decimal}` : formatted;

  /* let displayNumber = "";

  if (valueInput !== "") {
    const [integer, decimal] = valueInput.split(".");
    const formatted = Number(integer).toLocaleString();

    displayNumber =
      decimal !== undefined ? `${formatted}.${decimal}` : formatted;
  } */

  React.useEffect(() => {
    setValueInput(value?.toString() ?? "");
  }, [value]);

  return (
    <div
      className="
        group
        relative
        inline-block

        after:absolute
        after:left-px
        after:right-4
        after:bottom-1
        after:h-px
        after:bg-white
        after:opacity-0
        after:transition-opacity

        [&:not(:focus-within):hover]:after:opacity-100
        focus-within:after:opacity-0
      "
    >
      <input
        {...props}
        type="text"
        inputMode="numeric"
        value={displayNumber}
        // size={Math.max(displayNumber.length, 1)}
        style={{
          width: `${displayNumber.length + 0.5}ch`,
          minWidth: "5ch",
        }}
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

          setValueInput(raw);

          onValueChange?.(Number(raw));
        }}
        className={cn(
          "border-none bg-transparent px-px pe-1 rounded-lg -underline-offset-2 -hover:decoration-1 hover:decoration-white",
          // "-hover:not-focus:underline",
          "focus:outline-2 focus:outline-lime-500 focus:outline-offset-2 rounded-sm",
          className,
        )}
      />
    </div>
  );
}
