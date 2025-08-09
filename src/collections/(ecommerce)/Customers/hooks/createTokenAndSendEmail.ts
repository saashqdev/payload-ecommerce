import { render } from "@react-email/components";
import { getLocale, getTranslations } from "next-intl/server";

import { VerifyAccountEmail } from "@/components/Emails/VerifyAccountEmail";
import { type Locale } from "@/i18n/config";
import { sendEmail } from "@/utilities/nodemailer";

import type { CollectionAfterOperationHook } from "payload";

export const createTokenAndSendEmail: CollectionAfterOperationHook<"customers"> = async ({
  operation,
  result,
  req,
}) => {
  const payload = req.payload;
  if (operation !== "create" || !result) return result;

  const user = await payload.findByID({
    collection: "customers",
    id: result.id,
    req,
    showHiddenFields: true,
  });

  try {
    const locale = (await getLocale()) as Locale;

    const html = await render(
      await VerifyAccountEmail({
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/next/verify-email?token=${user._verificationToken}`,
        locale,
        name: result.firstName ?? "Customer",
      }),
    );

    const t = await getTranslations({ locale, namespace: "Emails.verify-email" });

    const res = await sendEmail({ to: result.email, subject: t("subject"), html });
    console.log(res);
  } catch (error) {
    console.log(error);
  }

  return result;
};
