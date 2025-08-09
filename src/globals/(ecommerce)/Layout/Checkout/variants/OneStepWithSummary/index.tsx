import { getTranslations } from "next-intl/server";

import { type Locale } from "@/i18n/config";
import { getCustomer } from "@/utilities/getCustomer";
import { getCachedGlobal } from "@/utilities/getGlobals";

import { CheckoutForm } from "./components/CheckoutForm";

export const OneStepWithSummary = async ({ locale }: { locale: Locale }) => {
  const user = await getCustomer();

  const { geowidgetToken } = await getCachedGlobal("inpost-pickup", locale, 1)();

  const t = await getTranslations("CheckoutFormServer");

  return (
    <div className="relative">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">{t("checkout")}</h2>
        <CheckoutForm geowidgetToken={geowidgetToken ?? undefined} user={user} />
      </div>
      <div className="absolute top-1/2 left-1/2 -z-10 h-full min-h-dvh w-screen -translate-1/2 bg-gray-50"></div>
    </div>
  );
};
