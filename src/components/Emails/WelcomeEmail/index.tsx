import { Html } from "@react-email/components";
import { type ReactNode } from "react";

import { type Locale } from "@/i18n/config";
import { type Customer } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";

import { Default } from "./variants/Default";

export const WelcomeEmail = async ({ customer, locale }: { customer: Customer; locale: Locale }) => {
  const { messages } = await getCachedGlobal("emailMessages", locale, 1)();

  let Email: ReactNode = <Html></Html>;

  switch (messages.template) {
    case "default":
      Email = <Default customer={customer} locale={locale} />;
  }
  return Email;
};
