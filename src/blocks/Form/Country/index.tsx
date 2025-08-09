/* eslint-disable */
import { Controller, type Control, type FieldErrorsImpl, type FieldValues } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { countryOptions } from "./options";

import { Error } from "../Error";
import { Width } from "../Width";

import type { CountryField } from "@payloadcms/plugin-form-builder/types";

export const Country = ({
  name,
  control,
  errors,
  label,
  required,
  width,
}: CountryField & {
  control: Control<FieldValues, any>;
  errors: Partial<FieldErrorsImpl<Record<string, any>>>;
}) => {
  return (
    <Width width={width}>
      <Label className="" htmlFor={name}>
        {label}
      </Label>
      <Controller
        control={control}
        defaultValue=""
        name={name}
        render={({ field: { onChange, value } }) => {
          const controlledValue = countryOptions.find((t) => t.value === value);

          return (
            <Select onValueChange={(val) => onChange(val)} value={controlledValue?.value}>
              <SelectTrigger className="w-full" id={name}>
                <SelectValue placeholder={label} />
              </SelectTrigger>
              <SelectContent>
                {countryOptions.map(({ label, value }) => {
                  return (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          );
        }}
        rules={{ required }}
      />
      {required && errors[name] && <Error />}
    </Width>
  );
};
