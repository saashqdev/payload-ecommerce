import { defaultLexical } from "@/fields/defaultLexical";
import { linkGroup } from "@/fields/linkGroup";

import type { Field } from "payload";

export const hero: Field = {
  name: "hero",
  type: "group",
  fields: [
    {
      name: "type",
      type: "select",
      defaultValue: "lowImpact",
      label: "Type",
      options: [
        {
          label: "None",
          value: "none",
        },
        {
          label: "High Impact",
          value: "highImpact",
        },
        {
          label: "Medium Impact",
          value: "mediumImpact",
        },
        {
          label: "Low Impact",
          value: "lowImpact",
        },
      ],
      required: true,
    },
    {
      name: "richText",
      type: "richText",
      editor: defaultLexical,
      localized: true,
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: "media",
      type: "upload",
      admin: {
        condition: (_, { type } = {}) => ["highImpact", "mediumImpact"].includes(type as string),
      },
      relationTo: "media",
      required: true,
    },
    {
      name: "reversed",
      label: "Reverse photo and text",
      type: "checkbox",
      admin: {
        condition: (_, { type } = {}) => ["mediumImpact"].includes(type as string),
      },
      required: true,
    },
  ],
  label: false,
};
