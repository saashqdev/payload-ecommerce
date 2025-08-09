import { authenticated } from "@/access/authenticated";
import { courierFields } from "@/fields/courierFields";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";

import type { GlobalConfig } from "payload";

export const InPostCourierCOD: GlobalConfig = {
  slug: "inpost-courier-cod",
  label: {
    en: "InPost COD Courier",
    pl: "InPost Kurier pobraniowy",
  },
  access: {
    read: () => true,
  },
  admin: {
    group: {
      en: "Courier integrations",
      pl: "Integracje kurierskie",
    },
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: {
            en: "InPost Courier",
            pl: "Kurier InPost",
          },
          fields: courierFields,
        },
        {
          label: {
            en: "API Keys",
            pl: "Klucze API",
          },
          fields: [
            {
              name: "clientId",
              type: "text",
              label: {
                en: "Client ID",
                pl: "ID Klienta",
              },
              access: {
                read: authenticated,
                create: authenticated,
                update: authenticated,
              },
              required: true,
              admin: {
                condition: (data) => Boolean(data.enabled),
              },
            },
            {
              name: "APIUrl",
              type: "select",
              label: {
                en: "Environment",
                pl: "Środowisko",
              },
              access: {
                read: authenticated,
                create: authenticated,
                update: authenticated,
              },
              required: true,
              defaultValue: "https://api-shipx-pl.easypack24.net",
              options: [
                {
                  label: {
                    en: "Production",
                    pl: "Produkcja",
                  },
                  value: "https://api-shipx-pl.easypack24.net",
                },
                {
                  label: {
                    en: "Sandbox",
                    pl: "Sandbox",
                  },
                  value: "https://sandbox-api-shipx-pl.easypack24.net",
                },
              ],
              admin: {
                condition: (data) => Boolean(data.enabled),
                description: {
                  en: "Remember to pass matching keys for choosen environment",
                  pl: "Pamiętaj o przekazaniu odpowiednich kluczy dla wybranego środowiska",
                },
              },
            },
            {
              name: "shipXAPIKey",
              type: "text",
              label: {
                en: "API ShipX key",
                pl: "Klucz API ShipX",
              },
              access: {
                read: authenticated,
                create: authenticated,
                update: authenticated,
              },
              required: true,
              admin: {
                condition: (data) => Boolean(data.enabled),
              },
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
