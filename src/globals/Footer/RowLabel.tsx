"use client";
import { useRowLabel } from "@payloadcms/ui";

import { type Header } from "@/payload-types";

export const RowLabel = () => {
  const data = useRowLabel<NonNullable<Header["navItems"]>[number]>();

  const label = data?.data?.link?.label
    ? `Nav item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ""}: ${data?.data?.link?.label}`
    : "Row";

  return <div>{label}</div>;
};
