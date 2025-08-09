import { type GlobalConfig } from "payload";

import { countryList } from "../Couriers/utils/countryList";

export const Fulfilment: GlobalConfig = {
  slug: "fulfilment",
  admin: {
    group: {
      en: "Orders",
      pl: "Zamówienia",
    },
  },
  label: {
    en: "Fulfilment data",
    pl: "Dane realizacji",
  },
  fields: [
    {
      name: "shopAddress",
      type: "group",
      label: {
        en: "Shop Address",
        pl: "Adres sklepu",
      },
      fields: [
        {
          name: "name",
          type: "text",
          label: {
            en: "Name",
            pl: "Nazwa",
          },
          required: true,
        },
        {
          name: "address",
          type: "text",
          label: {
            en: "Address",
            pl: "Adres",
          },
          required: true,
        },
        {
          type: "row",
          fields: [
            {
              name: "city",
              type: "text",
              label: {
                en: "City",
                pl: "Miasto",
              },
              admin: {
                width: "50%",
              },
              required: true,
            },
            {
              name: "country",
              type: "select",
              label: {
                en: "Country",
                pl: "Kraj",
              },
              options: [...countryList],
              admin: {
                width: "50%",
              },
              required: true,
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "region",
              type: "text",
              label: {
                en: "Region",
                pl: "Region",
              },
              admin: {
                width: "50%",
              },
              required: true,
            },
            {
              name: "postalCode",
              type: "text",
              label: {
                en: "Postal Code",
                pl: "Kod pocztowy",
              },
              admin: {
                width: "50%",
              },
              required: true,
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "email",
              type: "text",
              label: {
                en: "Email",
                pl: "Email",
              },
              admin: {
                width: "50%",
              },
              required: true,
            },
            {
              name: "phone",
              type: "text",
              label: {
                en: "Phone number",
                pl: "Numer telefonu",
              },
              admin: {
                width: "50%",
              },
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
