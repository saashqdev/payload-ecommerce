"use client";
import { useTranslation } from "@payloadcms/ui";
import axios from "axios";
import { useState } from "react";

import {
  type CustomTranslationsKeys,
  type CustomTranslationsObject,
} from "@/admin/translations/custom-translations";

export const AdminResetPassword = () => {
  const [message, setMessage] = useState("");
  const handleResetPassword = async () => {
    setMessage("");
    const emailInput = document.getElementById("field-email") as HTMLInputElement;
    if (emailInput) {
      const email = emailInput.value;
      try {
        const res = await axios.post("/next/reset-password", { email, collection: "administrators" });
        console.log(res);
        if (res.status === 200) {
          setMessage(t("custom:resetPasswordSuccess"));
        }
      } catch {
        setMessage(t("custom:resetPasswordError"));
      }
    }
  };
  const { t } = useTranslation<CustomTranslationsObject, CustomTranslationsKeys>();
  return (
    <div className="twp">
      <a onClick={handleResetPassword} className="cursor-pointer text-foreground">
        {t("custom:resetPassword")}
      </a>
      <p className="mt-3 text-foreground opacity-85">{message}</p>
    </div>
  );
};
