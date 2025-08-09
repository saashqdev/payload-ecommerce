import { useLocale, useTranslations } from "next-intl";
import { Suspense } from "react";

import { SelectItem } from "@/components/ui/select";
import { routing } from "@/i18n/routing";

import { LocaleSwitchSelect } from "./LocaleSwitchSelect";

export function LocaleSwitch() {
  const t = useTranslations("LocaleSwitch");
  const locale = useLocale();

  return (
    //TODO; better fallback
    <Suspense fallback="loading...">
      <LocaleSwitchSelect defaultValue={locale} label={t("label")}>
        {routing.locales.map((cur) => (
          <SelectItem key={cur} value={cur}>
            {t("locale", { locale: cur })}
          </SelectItem>
        ))}
      </LocaleSwitchSelect>
    </Suspense>
  );
}
