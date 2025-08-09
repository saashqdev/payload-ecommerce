import { type PayloadRequest, type CollectionSlug } from "payload";

import { type Locale } from "@/i18n/config";

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: "/posts",
  pages: "",
};

type Props = {
  collection: keyof typeof collectionPrefixMap;
  slug: string;
  req: PayloadRequest;
};

export const generatePreviewPath1 = ({ collection, slug, req }: Props) => {
  const locale = req.query.locale as Locale;
  const path = `${collectionPrefixMap[collection]}/${slug}`;

  const params = {
    locale,
    slug,
    collection,
    path,
  };

  const encodedParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    encodedParams.append(key, value);
  });

  const isProduction =
    process.env.NODE_ENV === "production" || Boolean(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  const protocol = isProduction ? "https:" : req.protocol;

  const url = `${protocol}//${req.host}/next/preview?${encodedParams.toString()}`;

  return url;
};

export const generatePreviewPath = ({ path, locale }) =>
  `/next/preview?path=${encodeURIComponent(path as string)}&locale=${locale}`;
