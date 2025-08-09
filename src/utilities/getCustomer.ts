"use server";

import { unstable_cache } from "next/cache";
import { headers as getHeaders, cookies } from "next/headers";
import { getPayload } from "payload";

import config from "@payload-config";

export const getCustomer = async () => {
  const headers = await getHeaders();
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  const customer = await unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config });

        const { user } = await payload.auth({
          headers,
        });

        // console.log("User on login:", user);
        // console.log("Cookies on login:", cookieStore.toString());

        if (!user || user.collection !== "customers") {
          return null;
        }

        return user;
      } catch (error) {
        console.error("Auth error:", error);
        return null;
      }
    },
    ["user-auth", cookieString],
    {
      revalidate: 1,
      tags: ["user-auth"],
    },
  )();

  return customer ?? undefined;
};
