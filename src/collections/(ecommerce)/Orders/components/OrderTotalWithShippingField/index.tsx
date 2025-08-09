"use client";

import { NumberField, useField, useFormFields } from "@payloadcms/ui";
import { type NumberFieldClientComponent } from "payload";
import { useEffect } from "react";

export const OrderTotalWithShippingField: NumberFieldClientComponent = (props) => {
  const { path } = props;
  const { setValue } = useField<number>({ path });

  const totalPrice = useFormFields(([fields]) => {
    return fields["orderDetails.total"].value as number;
  });
  const shippingPrice = useFormFields(([fields]) => {
    return fields["orderDetails.shippingCost"].value as number;
  });

  useEffect(() => {
    setValue(totalPrice + shippingPrice);
  }, [totalPrice, shippingPrice, setValue]);

  return <NumberField {...props} readOnly />;
};
