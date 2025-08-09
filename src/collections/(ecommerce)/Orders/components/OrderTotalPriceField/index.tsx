"use client";

import { NumberField, useField, useFormFields } from "@payloadcms/ui";
import { type NumberFieldClientComponent } from "payload";
import { useEffect } from "react";

export const OrderTotalPriceField: NumberFieldClientComponent = (props) => {
  const { path } = props;
  const { setValue } = useField<number>({ path });

  const totalPrice = useFormFields((context) => {
    return Object.entries(context[0])
      .filter(([key]) => key.includes(".priceTotal"))
      .map(([_, value]) => value.value as number)
      .reduce((acc, curr) => acc + curr, 0);
  });

  useEffect(() => {
    setValue(totalPrice);
  }, [totalPrice, setValue]);

  return <NumberField {...props} readOnly />;
};
