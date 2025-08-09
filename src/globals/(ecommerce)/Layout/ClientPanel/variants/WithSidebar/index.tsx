import { LogOutIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { type ReactNode } from "react";

import { LogoutButton } from "@/components/(ecommerce)/LogoutButton";

import { AsideMenu } from "./components/AsideMenu";

export const WithSidebar = ({ children }: { children: ReactNode }) => {
  const t = useTranslations("Account.wrapper");
  return (
    <div className="pt-16">
      <div className="container flex justify-between">
        <h1 className="text-2xl font-bold">{t("my-account")}</h1>

        <LogoutButton variant="ghost" aria-label={t("logout")}>
          <p className="sr-only">{t("logout")}</p>
          <LogOutIcon />
        </LogoutButton>
      </div>
      <div className="container mx-auto lg:flex lg:gap-x-16 lg:px-8">
        <AsideMenu />

        <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0">
          <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">{children}</div>
        </main>
      </div>
    </div>
  );
};
