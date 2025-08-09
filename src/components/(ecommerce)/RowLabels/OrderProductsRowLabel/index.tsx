"use client";

import { useRowLabel } from "@payloadcms/ui";

export const OrderProductsRowLabel = () => {
  const { data } = useRowLabel<{
    productName?: string;
    color?: string;
    size?: string;
    quantity: number;
  }>();

  const label = [data.productName, data.color, data.size].filter(Boolean).join(", ");

  return (
    <p>
      {label} x {data.quantity}
    </p>
  );
};
