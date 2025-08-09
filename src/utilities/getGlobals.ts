import { unstable_cache } from "next/cache";
import { type DataFromGlobalSlug, getPayload } from "payload";

import { type Locale } from "@/i18n/config";
import configPromise from "@payload-config";

import type { Config } from "@/payload-types";

type Global = keyof Config["globals"];

async function getGlobal(slug: Global, depth = 5, locale: Locale) {
  const payload = await getPayload({ config: configPromise });

  const global = await payload.findGlobal({
    slug,
    locale,
    depth,
  });

  return global;
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = <T extends Global>(
  slug: T,
  locale: Locale,
  depth?: number,
): (() => Promise<DataFromGlobalSlug<T>>) =>
  unstable_cache(
    async (): Promise<DataFromGlobalSlug<T>> => {
      return (await getGlobal(slug, depth, locale)) as DataFromGlobalSlug<T>;
    },
    [slug],
    {
      tags: [`global_${slug}`],
    },
  );
