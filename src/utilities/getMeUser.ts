import { cookies } from "next/headers";

import { type Locale } from "@/i18n/config";
import { redirect } from "@/i18n/routing";

import { getClientSideURL } from "./getURL";

import type { Administrator } from "@/payload-types";

export const getMeUser = async (args?: {
  nullUserRedirect?: string;
  locale?: Locale;
  validUserRedirect?: string;
}): Promise<{
  token: string;
  user: Administrator;
}> => {
  const { nullUserRedirect, validUserRedirect, locale } = args ?? {};
  const cookieStore = await cookies();
  const token = cookieStore.get("payload-token")?.value;

  const meUserReq = await fetch(`${getClientSideURL()}/api/administrators/me`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });

  const {
    user,
  }: {
    user: Administrator;
  } = (await meUserReq.json()) as { user: Administrator };

  if (validUserRedirect && meUserReq.ok && user) {
    return redirect({ locale: locale ?? "en", href: validUserRedirect });
  }

  if (nullUserRedirect && (!meUserReq.ok || !user)) {
    return redirect({ locale: locale ?? "en", href: nullUserRedirect });
  }

  // Token will exist here because if it doesn't the user will be redirected
  return {
    token: token!,
    user,
  };
};
