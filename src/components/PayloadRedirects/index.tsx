import { notFound } from "next/navigation";

import { redirect } from "@/i18n/routing";
import { getCachedDocument } from "@/utilities/getDocument";
import { getCachedRedirects } from "@/utilities/getRedirects";

import type { Page, Post } from "@/payload-types";

type Props = {
  disableNotFound?: boolean;
  url: string;
  locale: string;
};

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects = async ({ disableNotFound, url, locale }: Props) => {
  const redirects = await getCachedRedirects()();

  const redirectItem = redirects.find((redirect) => redirect.from === url);

  if (redirectItem) {
    if (redirectItem.to?.url) {
      redirect({ href: redirectItem.to.url, locale });
    }

    let redirectUrl: string;

    if (typeof redirectItem.to?.reference?.value === "string") {
      const collection = redirectItem.to?.reference?.relationTo;
      const id = redirectItem.to?.reference?.value;

      const document = (await getCachedDocument(collection, id)()) as Page | Post;
      redirectUrl = `${redirectItem.to?.reference?.relationTo !== "pages" ? `/${redirectItem.to?.reference?.relationTo}` : ""}/${
        document?.slug
      }`;
    } else {
      redirectUrl = `${redirectItem.to?.reference?.relationTo !== "pages" ? `/${redirectItem.to?.reference?.relationTo}` : ""}/${
        typeof redirectItem.to?.reference?.value === "object" ? redirectItem.to?.reference?.value?.slug : ""
      }`;
    }

    if (redirectUrl) redirect({ href: redirectUrl, locale });
  }

  if (disableNotFound) return null;

  notFound();
};
