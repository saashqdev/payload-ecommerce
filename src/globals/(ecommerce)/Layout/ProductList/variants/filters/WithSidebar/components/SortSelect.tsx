"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { type ReactNode } from "react";

import { Select } from "@/components/ui/select";

export const SortSelect = ({ children, defaultValue }: { children: ReactNode; defaultValue: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSortingOptions = (value: string) => {
    const currentParams = new URLSearchParams(searchParams?.toString());

    if (!value || value === "most-popular") {
      currentParams.delete("sortBy");
    } else {
      currentParams.set("sortBy", value);
    }

    router.push(`?${currentParams.toString()}`);
  };

  return (
    <Select defaultValue={defaultValue} onValueChange={handleSortingOptions}>
      {children}
    </Select>
  );
};
