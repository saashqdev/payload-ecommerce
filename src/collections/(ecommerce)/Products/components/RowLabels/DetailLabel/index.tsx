"use client";

import { useRowLabel } from "@payloadcms/ui";

export const DetailLabel = () => {
  const { data } = useRowLabel<{
    title: string;
  }>();

  return <p>{data?.title}</p>;
};
