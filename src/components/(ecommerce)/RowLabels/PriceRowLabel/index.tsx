"use client";

import { useRowLabel } from "@payloadcms/ui";

export const PriceRowLabel = () => {
  const { data } = useRowLabel<{
    currency: string;
    value: string;
  }>();

  return (
    <p>
      {data.value} {data.currency}
    </p>
  );
};
