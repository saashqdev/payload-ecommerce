import { render } from "@react-email/components";
import { getLocale, getTranslations } from "next-intl/server";

import { WelcomeEmail } from "@/components/Emails/WelcomeEmail";
import { type Locale } from "@/i18n/config";
import { type Customer } from "@/payload-types";
import { sendEmail } from "@/utilities/nodemailer";

import type { CollectionAfterChangeHook } from "payload";

export const sendWelcomeEmail: CollectionAfterChangeHook<Customer> = async ({ previousDoc, doc }) => {
  if (previousDoc._verified === false && doc._verified === true) {
    try {
      const locale = (await getLocale()) as Locale;

      const html = await render(
        await WelcomeEmail({
          customer: doc,
          locale,
        }),
      );

      const t = await getTranslations({ locale, namespace: "Emails.welcome" });

      const res = await sendEmail({ to: doc.email, subject: t("subject"), html });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return doc;
};
