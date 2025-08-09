"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useCurrency } from "..";
import { type Currency } from "../types";

export const CurrencySelector = ({ currencyOptions }: { currencyOptions: string[] }) => {
  const { setCurrency, currency } = useCurrency();

  const onCurrencyChange = (currencyToSet: Currency) => {
    if (currencyToSet !== currency) {
      setCurrency(currencyToSet);
    }
  };

  return (
    <Select onValueChange={onCurrencyChange} value={currency}>
      <SelectTrigger
        aria-label="Select a currency"
        className="w-auto gap-2 border-none bg-transparent pl-0 md:pl-3"
      >
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        {currencyOptions?.map((currencyOption) => (
          <SelectItem key={currencyOption} value={currencyOption}>
            {currencyOption}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
