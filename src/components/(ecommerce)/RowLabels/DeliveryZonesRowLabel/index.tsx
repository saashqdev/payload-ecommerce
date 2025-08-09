"use client";

import { useRowLabel } from "@payloadcms/ui";

export const DeliveryZonesRowLabel = () => {
  const { data } = useRowLabel<{
    countries?: string[];
  }>();

  return <p>{data.countries?.join(", ")}</p>;
};
