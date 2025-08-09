"use client";

import { useRowLabel } from "@payloadcms/ui";

export const ShippingAddressRowLabel = () => {
  const { data } = useRowLabel<{
    name?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    phone?: string;
    email?: string;
  }>();

  return (
    <p>
      {data?.name}, {data?.address} {data?.postalCode} {data?.city} | {data?.phone}, {data?.email}
    </p>
  );
};
