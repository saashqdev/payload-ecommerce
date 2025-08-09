/* eslint-disable */
import { Controller, type Control, type FieldErrorsImpl, type FieldValues } from "react-hook-form";

import { Label } from "@/components/ui/label";
import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Error } from "../Error";
import { Width } from "../Width";

import type { SelectField } from "@payloadcms/plugin-form-builder/types";

export const Select = ({
  name,
  control,
  errors,
  label,
  options,
  required,
  width,
}: SelectField & {
  control: Control<FieldValues, any>;
  errors: Partial<FieldErrorsImpl<Record<string, any>>>;
}) => {
  return (
    <Width width={width}>
      <Label htmlFor={name}>{label}</Label>
      <Controller
        control={control}
        defaultValue=""
        name={name}
        render={({ field: { onChange, value } }) => {
          const controlledValue = options.find((t) => t.value === value);

          return (
            <SelectComponent onValueChange={(val) => onChange(val)} value={controlledValue?.value}>
              <SelectTrigger className="w-full" id={name}>
                <SelectValue placeholder={label} />
              </SelectTrigger>
              <SelectContent>
                {options.map(({ label, value }) => {
                  return (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </SelectComponent>
          );
        }}
        rules={{ required }}
      />
      {required && errors[name] && <Error />}
    </Width>
  );
};
