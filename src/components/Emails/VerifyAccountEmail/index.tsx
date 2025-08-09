import { Button, Html, Text } from "@react-email/components";
import { getTranslations } from "next-intl/server";
import * as React from "react";

import { type Locale } from "@/i18n/config";

export const VerifyAccountEmail = async ({
  url,
  locale,
  name,
}: {
  url: string;
  locale: Locale;
  name: string;
}) => {
  const t = await getTranslations({ locale, namespace: "Emails.verify-email" });
  return (
    <Html>
      <Text
        style={{
          marginBottom: "24px",
          color: "#000",
          display: "block",
          textAlign: "center",
          fontSize: "16px",
        }}
      >
        {t("greeting", { name })},
      </Text>
      <Text
        style={{
          marginBottom: "24px",
          color: "#000",
          display: "block",
          textAlign: "center",
          fontSize: "16px",
        }}
      >
        {t("body")}
      </Text>
      <Button
        href={url}
        style={{
          background: "#000",
          color: "#fff",
          padding: "12px 20px",
          backgroundColor: "#6366f1",
          margin: "0 auto",
        }}
      >
        {t("button")}
      </Button>
    </Html>
  );
};
