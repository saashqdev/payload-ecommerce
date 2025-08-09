import Link from "next/link";
import { getLocale } from "next-intl/server";

import { CMSLink } from "@/components/Link";
import { LocaleSwitch } from "@/components/LocaleSwitch/LocaleSwitch";
import { Logo } from "@/components/Logo/Logo";
import RichText from "@/components/RichText";
import { type Locale } from "@/i18n/config";
import { CurrencySelector } from "@/stores/Currency/CurrencySelector";
import { getCachedGlobal } from "@/utilities/getGlobals";

import type { Footer, ShopSetting } from "@/payload-types";

export async function Footer() {
  const locale = (await getLocale()) as Locale;
  const footerData: Footer = await getCachedGlobal("footer", locale, 1)();
  const shopSettings: ShopSetting = await getCachedGlobal("shopSettings", locale, 1)();
  const navItems = footerData?.navItems ?? [];

  return (
    <footer className="mt-auto border-t border-border bg-black text-white dark:bg-card">
      <div className="container flex flex-col gap-8 py-8 md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        <div className="flex flex-col-reverse items-start gap-4 md:flex-row md:items-center">
          <CurrencySelector currencyOptions={shopSettings.availableCurrencies} />
          <LocaleSwitch />
          <nav className="flex flex-col gap-4 md:flex-row">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />;
            })}
          </nav>
        </div>
      </div>
      {footerData.attribution ? (
        <div className="flex border-t p-4 text-xs">
          <div className="container">
            <RichText data={footerData.attribution} />
          </div>
        </div>
      ) : null}
    </footer>
  );
}
