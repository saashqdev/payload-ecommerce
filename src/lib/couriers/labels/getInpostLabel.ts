import axios from "axios";
import { getLocale } from "next-intl/server";

import { type Locale } from "@/i18n/config";
import { getCachedGlobal } from "@/utilities/getGlobals";

export const getInpostLabel = async (
  packageID: string,
  courierSlug: "inpost-pickup" | "inpost-courier" | "inpost-courier-cod",
) => {
  const locale = (await getLocale()) as Locale;
  const inpostSettings = await getCachedGlobal(courierSlug, locale, 1)();
  const { APIUrl, shipXAPIKey } = inpostSettings;

  const { data }: { data: ArrayBuffer } = await axios.get(
    `${APIUrl}/v1/shipments/${packageID}/label?type=A6`,
    {
      headers: {
        Authorization: `Bearer ${shipXAPIKey}`,
      },
      responseType: "arraybuffer",
    },
  );

  return data;
};
