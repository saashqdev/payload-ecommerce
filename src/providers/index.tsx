// import { getLocale } from "next-intl/server";
import { type ReactNode } from "react";

// import { HeaderThemeProvider } from "./HeaderTheme";
// import { ThemeProvider } from "./Theme";

// import { type Locale } from "@/i18n/config";
// import { type ShopSetting } from "@/payload-types";
// import { getCachedGlobal } from "@/utilities/getGlobals";

export const Providers = async ({ children }: { children: ReactNode }) => {
  // const locale = (await getLocale()) as Locale;
  // const shopSettings: ShopSetting = await getCachedGlobal("shopSettings", locale, 1)();
  return children;
};
