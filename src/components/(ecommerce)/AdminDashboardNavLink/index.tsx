"use client";
import { useTranslation } from "@payloadcms/ui";
import { ChartNoAxesCombined } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  type CustomTranslationsObject,
  type CustomTranslationsKeys,
} from "@/admin/translations/custom-translations";

export const AdminDashboardNavLink = () => {
  const { t } = useTranslation<CustomTranslationsObject, CustomTranslationsKeys>();

  const pathname = usePathname();

  return (
    <Link
      href="/admin"
      className={`nav__link twp mb-2.5 flex items-center py-2 ${pathname === "/admin" ? "active" : ""}`}
    >
      <ChartNoAxesCombined width={20} height={20} className="mr-2" />
      {pathname === "/admin" && <div className="nav__link-indicator"></div>}
      {t("adminDashboard:linkTitle")}
    </Link>
  );
};
