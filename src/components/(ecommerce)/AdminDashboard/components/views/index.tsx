"use client";

import { useSearchParams } from "next/navigation";
import { type ReactNode } from "react";

import { Overview } from "./Overview";

export const AdminViews = () => {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  let ActiveTabComponent: ReactNode | null = null;

  switch (view) {
    case "overview": {
      ActiveTabComponent = <Overview />;
      break;
    }
    default: {
      ActiveTabComponent = <Overview />;
    }
  }
  return ActiveTabComponent;
};
