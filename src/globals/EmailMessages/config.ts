import { type GlobalConfig } from "payload";

import { authenticated } from "@/access/authenticated";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";

export const EmailMessages: GlobalConfig = {
  slug: "emailMessages",
  label: {
    en: "Email Messages",
    pl: "Wiadomości e-mail",
  },
  access: {
    read: authenticated,
    update: authenticated,
  },
  admin: {
    group: {
      en: "Shop settings",
      pl: "Ustawienia sklepu",
    },
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "smtp",
          label: {
            en: "SMTP",
            pl: "SMTP",
          },
          fields: [
            {
              name: "host",
              type: "text",
              required: true,
              label: {
                en: "Host",
                pl: "Host",
              },
            },
            {
              name: "port",
              type: "number",
              required: true,
              label: {
                en: "SMTP Port",
                pl: "Port SMTP",
              },
            },
            {
              name: "secure",
              type: "checkbox",
              label: {
                en: "Secure",
                pl: "Bezpieczne",
              },
              required: true,
              defaultValue: false,
            },
            {
              name: "user",
              type: "text",
              required: true,
              label: {
                en: "User",
                pl: "Użytkownik",
              },
            },
            {
              name: "password",
              type: "text",
              required: true,
              label: {
                en: "Password",
                pl: "Hasło",
              },
            },
            {
              name: "fromEmail",
              type: "text",
              required: true,
              label: {
                en: "From Email",
                pl: "Z adresu e-mail",
              },
            },
          ],
        },
        {
          name: "messages",
          label: {
            en: "Messages",
            pl: "Wiadomości",
          },
          fields: [
            {
              name: "logo",
              type: "upload",
              label: {
                en: "Logo",
                pl: "Logo",
              },
              relationTo: "media",
            },
            {
              name: "additionalText",
              type: "textarea",
              label: {
                en: "Additional text",
                pl: "Dodatkowy tekst",
              },
            },
            {
              name: "template",
              type: "select",
              required: true,
              defaultValue: "default",
              options: [{ value: "default", label: { en: "Default", pl: "Domyślny" } }],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal],
  },
};
