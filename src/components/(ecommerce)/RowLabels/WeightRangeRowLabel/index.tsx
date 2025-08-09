"use client";

import { useRowLabel } from "@payloadcms/ui";

export const WeightRangeRowLabel = () => {
  const { data } = useRowLabel<{
    weightFrom: number;
    weightTo: number;
  }>();

  return (
    <p>
      {data.weightFrom}
      {(data.weightFrom || data.weightFrom === 0) && data.weightTo && " - "}
      {data.weightTo}
    </p>
  );
};
