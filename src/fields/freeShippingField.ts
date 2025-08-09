import { type Field } from "payload";

import { currencyField } from "./currencyField";

export const freeShippingField: Field = {
  name: "freeShipping",
  type: "array",
  label: {
    en: "Free shipping from",
    pl: "Darmowa dostawa od",
  },
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
};
