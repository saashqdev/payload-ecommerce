import { noBlocksLexical } from "@/fields/noBlocksLexical";
import { marginFields, paddingFields } from "@/fields/spacingFields";

import type { Block } from "payload";

export const Hotspot: Block = {
  slug: "hotspotZone",
  interfaceName: "hotspotBlock",
  labels: {
    singular: {
      pl: "Strefa hotspot",
      en: "Hotspot",
    },
    plural: {
      pl: "Strefy hotspot",
      en: "Hotspots",
    },
  },
  //   imageURL: "/blocksThumbnails/accordion.png",
  //   imageAltText: "Hotspot",
  fields: [
    {
      name: "title",
      type: "richText",
      localized: true,
      editor: noBlocksLexical,
    },
    {
      type: "row",
      fields: [
        {
          name: "type",
          type: "select",
          label: {
            pl: "Typ",
            en: "Type",
          },
          required: true,
          options: [
            { label: { pl: "Z danej kategorii", en: "From category" }, value: "category" },
            { label: { pl: "Z danej podkategorii", en: "From subcategory" }, value: "subcategory" },
            { label: { pl: "Ręcznie wybrane produkty", en: "Manual picked products" }, value: "manual" },
          ],
          defaultValue: "category",
          admin: {
            width: "50%",
          },
        },
        {
          name: "appearance",
          type: "select",
          label: {
            pl: "Wygląd",
            en: "Appearance",
          },
          required: true,
          options: [
            { label: { pl: "Domyślny", en: "Default" }, value: "default" },
            { label: { pl: "Z sliderem", en: "With slider" }, value: "slider" },
            { label: { pl: "Z zapętlonym sliderem", en: "With infinite slider" }, value: "sliderLoop" },
          ],
          defaultValue: "default",
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      type: "row",
      admin: {
        condition: (_, siblingData) => siblingData.type !== "manual",
      },
      fields: [
        {
          name: "category",
          type: "relationship",
          relationTo: "productCategories",
          admin: {
            condition: (_, siblingData) => siblingData.type === "category",
            width: "50%",
          },
        },
        {
          name: "subcategory",
          type: "relationship",
          relationTo: "productSubCategories",
          admin: {
            condition: (_, siblingData) => siblingData.type === "subcategory",
            width: "50%",
          },
        },
        {
          name: "sort",
          type: "select",
          label: {
            pl: "Sortuj według",
            en: "Sort by",
          },
          options: [
            { label: { pl: "Ilość sprzedanych", en: "Quantity sold" }, value: "-bought" },
            { label: { pl: "Najnowsze", en: "Newest" }, value: "-createdAt" },
            { label: { pl: "Najstarsze", en: "Oldest" }, value: "createdAt" },
            { label: { pl: "Najtańsze", en: "Cheapest" }, value: "variants.pricing[0].value,pricing.value" },
            {
              label: { pl: "Najdroższe", en: "Most expensive" },
              value: "-variants.pricing[0].value,-pricing.value",
            },
          ],
          admin: {
            condition: (_, siblingData) => siblingData.type !== "manual",
            width: "50%",
            description: {
              en: "Sort is applied only when type is set to 'category' or 'subcategory', in manual mode you can manually sort products in the list",
              pl: "Sortowanie jest stosowane tylko gdy typ jest ustawiony na 'category' lub 'subcategory', w trybie manualnym możesz ręcznie sortować produkty na liście",
            },
          },
        },
      ],
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
      access: {
        read: () => true,
      },
      admin: {
        condition: (_, siblingData) => siblingData.type === "manual",
        description: {
          pl: "Kolejność produktów będzie taka jak w kolejności wybrania",
          en: "Products order will be the same as the order of selection",
        },
      },
    },
    {
      name: "limit",
      type: "number",
      label: {
        pl: "Limit produktów",
        en: "Products limit",
      },
      admin: {
        condition: (_, siblingData) => siblingData.type !== "manual",
      },
      required: true,
      defaultValue: 4,
    },
    marginFields,
    paddingFields,
  ],
};
