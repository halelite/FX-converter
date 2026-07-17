import { ArrowDownFilled } from "@/assets/icons/arrow-down-filled";
import { SearchOutlined } from "@/assets/icons/search-outlined";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxList,
  ComboboxCollection,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxItem,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxInput,
  ComboboxEmpty,
} from "@/components/ui/combobox";
import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { InputGroupAddon } from "@/components/ui/input-group";
import { CircleFlag } from "react-circle-flags";
import { Currency, GroupedCurrency } from "../(root)/types";
import { RefObject, useMemo, useState } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";

type CurrencyPickerProps = Omit<
  // React.ComponentProps<typeof Combobox>,
  ComboboxPrimitive.Root.Props<Currency | null>,
  "items" | "value" | "onValueChange"
> & {
  currencies: GroupedCurrency;
  containerRef: RefObject<HTMLDivElement | null>;
  value: string;
  onValueChange?: (value: string | null) => void;
};

export const CurrencyPicker = ({
  currencies,
  value: stringValue,
  onValueChange: onStringValueChange,
  containerRef,
  ...props
}: CurrencyPickerProps) => {
  const allCurrencies = useMemo(
    () => Object.values(currencies).flat(),
    [currencies],
  );

  const objectValue =
    allCurrencies.find((c) => c.iso_code === stringValue) ?? null;

  const currencyComboItems = useMemo(
    () =>
      Object.entries(currencies).map(([key, items]) => ({ value: key, items })),
    [currencies],
  );

  return (
    <Combobox
      items={currencyComboItems}
      value={objectValue}
      onValueChange={(selected) => {
        if (selected) {
          onStringValueChange?.(selected.iso_code);
        }
      }}
      defaultValue={objectValue}
      {...props}
    >
      <ComboboxTrigger
        render={
          <Button
            variant="outline"
            className="justify-between text-bodySm! text-forground bg-neutral-50 hover:bg-input dark:bg-neutral-500! dark:hover:bg-neutral-400! p-2.5! h-10!"
          >
            <ComboboxValue placeholder="select a currency">
              {(selectedCurrency) => {
                if (!selectedCurrency) return "select a currency";
                return (
                  <div className="flex items-center gap-2">
                    <CircleFlag
                      countryCode={selectedCurrency?.country_code}
                      height={20}
                      className="size-5"
                    />
                    <span>{selectedCurrency?.iso_code}</span>
                  </div>
                );
              }}
            </ComboboxValue>
            <ArrowDownFilled className="size-3!" />
          </Button>
        }
      />
      <ComboboxContent
        className="min-w-77.5 p-1"
        anchor={useMediaQuery(640) ? containerRef : null}
      >
        <ComboboxInput
          showTrigger={false}
          placeholder="Search currencies..."
          className="focus-within:ring-0!"
        >
          <InputGroupAddon className="me-1.25!">
            <SearchOutlined className="text-white/80! h-5!" />
          </InputGroupAddon>
        </ComboboxInput>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(group) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel className="flex items-center justify-between border-b mb-1! py-2! text-captionMd! uppercase">
                <span>{group.value}</span>
                <span>{group?.items?.length}</span>
              </ComboboxLabel>
              <ComboboxCollection>
                {(item) => (
                  <ComboboxItem
                    key={item?.iso_code}
                    // value={item?.iso_code}
                    value={item}
                    className="px-2! py-3! text-bodySm!"
                  >
                    <div className="flex items-center gap-3 shrink me-4">
                      <CircleFlag
                        countryCode={item?.country_code}
                        className="size-5"
                      />
                      <div>{item?.iso_code}</div>
                      <div className="text-captionMd text-neutral-200">
                        {item?.name}
                      </div>
                    </div>
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
