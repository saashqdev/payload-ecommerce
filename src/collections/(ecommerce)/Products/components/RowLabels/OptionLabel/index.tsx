"use client";

import { useRowLabel } from "@payloadcms/ui";

export const OptionLabel = () => {
  const { data } = useRowLabel<{
    slug: string;
  }>();

  return <p>{data.slug}</p>;
};
