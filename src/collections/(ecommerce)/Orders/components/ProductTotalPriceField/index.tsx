"use client";

import { NumberField, useField, useFormFields } from "@payloadcms/ui";
import { type NumberFieldClientComponent } from "payload";
import { useCallback, useEffect } from "react";

export const ProductTotalPriceField: NumberFieldClientComponent = (props) => {
  const { path } = props;
  const { setValue } = useField<number>({ path });

  const unitPricePath = path.replace("priceTotal", "price");
  const unitPriceValue = useFormFields(([fields]) => {
    return fields[unitPricePath]?.value as number;
  });

  const quantityPath = path.replace("priceTotal", "quantity");
  const quantityValue = useFormFields(([fields]) => {
    return fields[quantityPath]?.value as number;
  });

  const handleUpdate = useCallback(() => {
    setValue(unitPriceValue * quantityValue);
  }, [unitPriceValue, quantityValue, setValue]);

  useEffect(() => {
    handleUpdate();
  }, [unitPriceValue, quantityValue, handleUpdate]);

  return <NumberField {...props} readOnly />;
};
