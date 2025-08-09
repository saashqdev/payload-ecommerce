"use client";
import {
  AdjustmentsHorizontalIcon,
  ClipboardDocumentCheckIcon,
  CubeIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { useSelectedLayoutSegment } from "next/navigation";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/routing";
import { cn } from "@/utilities/cn";

const navigation = [
  { name: "orders", href: "/account/orders", icon: CubeIcon },
  { name: "settings", href: "/account/settings", icon: AdjustmentsHorizontalIcon },
  { name: "orders-data", href: "/account/orders-data", icon: ClipboardDocumentCheckIcon },
  { name: "help", href: "/account/help", icon: QuestionMarkCircleIcon },
] as const;

export const AsideMenu = () => {
  const t = useTranslations("Account.navigation");
  const segment = useSelectedLayoutSegment();
  return (
    <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-16">
      <nav className="flex-none px-4 sm:px-6 lg:px-0">
        <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  segment === item.href.split("/")[2]
                    ? "bg-gray-50 text-indigo-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                  "group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm/6 font-semibold",
                )}
              >
                <item.icon
                  aria-hidden="true"
                  className={cn(
                    segment === item.href.split("/")[2]
                      ? "text-indigo-600"
                      : "text-gray-400 group-hover:text-indigo-600",
                    "size-6 shrink-0",
                  )}
                />
                {t(item.name)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
