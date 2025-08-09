"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

import { useMobileFilters } from "../stores/MobileFiltersContext";

export const MobileFiltersCloseButton = () => {
  const { setMobileFiltersOpen } = useMobileFilters();
  const t = useTranslations("ProductList");
  return (
    <button
      type="button"
      onClick={() => setMobileFiltersOpen(false)}
      className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
    >
      <span className="sr-only">{t("close-filters")}</span>
      <XMarkIcon aria-hidden="true" className="size-6" />
    </button>
  );
};
