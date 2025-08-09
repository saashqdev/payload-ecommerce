import { type Field } from "payload";

import { currencyField } from "./currencyField";

export const weightRangesField: Field = {
  name: "range",
  type: "array",
  label: {
    en: "Weight ranges",
    pl: "Zakresy wagowe",
  },
  labels: {
    plural: {
      en: "Weight ranges",
      pl: "Zakresy wagowe",
    },
    singular: {
      en: "Weight range",
      pl: "Zakres wagowy",
    },
  },
  admin: {
    components: {
      RowLabel: "@/components/(ecommerce)/RowLabels/WeightRangeRowLabel#WeightRangeRowLabel",
    },
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "weightFrom",
          label: {
            en: "Weight from (g)",
            pl: "Waga od (g)",
          },
          type: "number",
          required: true,
        },
        {
          name: "weightTo",
          label: {
            en: "Weight to (g)",
            pl: "Waga do (g)",
          },
          type: "number",
          required: true,
        },
      ],
    },
    {
      name: "pricing",
      type: "array",
      label: {
        en: "Pricing",
        pl: "Cennik",
      },
      minRows: 1,
      required: true,
      labels: {
        singular: {
          en: "Price",
          pl: "Cena",
        },
        plural: {
          en: "Prices",
          pl: "Ceny",
        },
      },
      admin: {
        components: {
          RowLabel: "@/components/(ecommerce)/RowLabels/PriceRowLabel#PriceRowLabel",
        },
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "value",
              type: "number",
              label: {
                en: "Price",
                pl: "Cena",
              },
              required: true,
            },
            currencyField,
          ],
        },
      ],
    },
  ],
};
