import { getLocale } from "next-intl/server";

import RichText from "@/components/RichText";
import { type Locale } from "@/i18n/config";
import { getCachedGlobal } from "@/utilities/getGlobals";

export const ClientHelp = async () => {
  const locale = (await getLocale()) as Locale;
  const { clientPanel } = await getCachedGlobal("shopLayout", locale, 1)();
  return (
    <div className="no-prose">
      <h2 className="mb-8 text-xl font-bold">{clientPanel.help?.title}</h2>
      <RichText data={clientPanel.help?.content} />
    </div>
  );
};
