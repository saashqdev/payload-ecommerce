"use client";

import { useRowLabel } from "@payloadcms/ui";

export const VariantLabel = () => {
  const { data } = useRowLabel<{
    variantSlug: string;
  }>();

  return <p>{data.variantSlug}</p>;
};
