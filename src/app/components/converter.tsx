"use client";

import Image from "next/image";
import exchange from "../../../public/images/icon-exchange.svg";
import { Button } from "@/components/ui/button";
import { StarFilled } from "@/assets/icons/star-filled";
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
} from "@/components/ui/combobox";
import { ArrowDownFilled } from "@/assets/icons/arrow-down-filled";
import { InputGroupAddon } from "@/components/ui/input-group";
import { SearchOutlined } from "@/assets/icons/search-outlined";

const testNum = 1000;

const CurrencyConverter = () => {
  const comboItems = [
    {
      value: "Americas",
      items: [
        "(GMT-5) New York",
        "(GMT-8) Los Angeles",
        "(GMT-6) Chicago",
        "(GMT-5) Toronto",
        "(GMT-8) Vancouver",
        "(GMT-3) São Paulo",
      ],
    },
    {
      value: "Europe",
      items: [
        "(GMT+0) London",
        "(GMT+1) Paris",
        "(GMT+1) Berlin",
        "(GMT+1) Rome",
        "(GMT+1) Madrid",
        "(GMT+1) Amsterdam",
      ],
    },
  ];

  return (
    <div>
      <div className="text-h3 mb-4">CHECK THE RATE</div>
      <div className="bg-neutral-700 rounded-lg">
        <div className="flex items-center gap-6 p-4">
          <div className="flex-1 bg-neutral-600 border border-neutral-500 p-4 rounded-lg">
            <div className="text-bodySm mb-5">SEND</div>

            <div className="flex items-center justify-between">
              <div className="text-h1">{testNum.toLocaleString()}</div>

              <Combobox items={comboItems}>
                <ComboboxTrigger
                  render={
                    <Button
                      variant="outline"
                      className="justify-between text-bodySm! p-2.5! bg-neutral-500!"
                    >
                      <ComboboxValue placeholder="select a currency" />
                      <ArrowDownFilled className="size-3!" />
                    </Button>
                  }
                />
                <ComboboxContent className="p-1">
                  <ComboboxInput
                    showTrigger={false}
                    placeholder="Search currencies..."
                    className="focus-within:ring-0!"
                  >
                    <InputGroupAddon className="me-1.25!">
                      <SearchOutlined className="text-white/80! h-5!" />
                    </InputGroupAddon>
                  </ComboboxInput>
                  <ComboboxList>
                    {(group) => (
                      <ComboboxGroup key={group.value} items={group.items}>
                        <ComboboxLabel className="flex items-center justify-between border-b mb-1! py-2! text-captionMd! uppercase">
                          <span>{group.value}</span>
                          <span>3</span>
                        </ComboboxLabel>
                        <ComboboxCollection>
                          {(item) => (
                            <ComboboxItem
                              key={item}
                              value={item}
                              className="px-2! py-3! text-bodySm!"
                            >
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxCollection>
                      </ComboboxGroup>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>
          </div>

          <div className="size-12 flex items-center justify-center bg-neutral-600 border border-neutral-500 rounded-lg">
            <Image src={exchange} alt="exchange" className="w-4 h-4.5" />
          </div>

          <div className="flex-1 bg-neutral-600 border border-neutral-500 p-4 rounded-lg">
            <div className="text-bodySm mb-5">RECEIVE</div>

            <div className="flex items-center justify-between">
              <div className="text-h1 text-lime-500">
                {(853.02).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-4 border-t border-t-neutral-500 border-dashed">
          <div className="text-captionMd">1 USD = 0.8530 EUR</div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="uppercase">
              <StarFilled />
              Favorite/Favorited
            </Button>

            <Button variant="outline" className="uppercase bg-transparent!">
              Log conversion
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
