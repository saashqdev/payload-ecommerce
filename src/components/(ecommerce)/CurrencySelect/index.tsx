"use client";

import { FieldLabel, Select, useField } from "@payloadcms/ui";
import axios from "axios";
import { type TextFieldClientComponent } from "payload";
import { useEffect, useState } from "react";

import { type ShopSetting } from "@/payload-types";

export const CurrencySelect: TextFieldClientComponent = ({ path }) => {
  const { value, setValue } = useField<string>({ path });
  const [options, setOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const { data } = await axios.get<ShopSetting>("/api/globals/shopSettings");
        setOptions(
          data.availableCurrencies.map((currency) => ({
            label: currency,
            value: currency,
          })),
        );
      } catch {
        setOptions([]);
      }
    };
    void fetchOptions();
  }, []);

  return (
    <div className="mx-[5px] my-auto flex h-fit flex-1 flex-col gap-[5px]">
      <FieldLabel label="Waluta" />
      <Select
        value={{
          label: value,
          value,
        }}
        onChange={(option: { value: string }) => setValue(option.value)}
        options={options}
      />
    </div>
  );
};
