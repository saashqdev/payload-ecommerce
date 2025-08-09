"use client";

import { FunnelIcon } from "@heroicons/react/20/solid";
import { useTranslations } from "next-intl";

import { useMobileFilters } from "../stores/MobileFiltersContext";

export const MobileFunnelFiltersButton = () => {
  const { setMobileFiltersOpen } = useMobileFilters();
  const t = useTranslations("ProductList");
  return (
    <button
      type="button"
      onClick={() => setMobileFiltersOpen(true)}
      className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
    >
      <span className="sr-only">{t("filters")}</span>
      <FunnelIcon aria-hidden="true" className="size-5" />
    </button>
  );
};
