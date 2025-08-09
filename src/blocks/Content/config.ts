import { AlignmentField } from "@/fields/alignmentField";
import { backgroundPicker } from "@/fields/backgroundPicker";
import { defaultLexical } from "@/fields/defaultLexical";
import { link } from "@/fields/link";
import { radiusFields } from "@/fields/radiusFields";
import { marginFields, paddingFields } from "@/fields/spacingFields";

import type { Block, Field } from "payload";

const columnFields: Field[] = [
  {
    name: "size",
    type: "select",
    defaultValue: "oneThird",
    options: [
      {
        label: "One Sixth",
        value: "oneSixth",
      },
      {
        label: "One Third",
        value: "oneThird",
      },
      {
        label: "Half",
        value: "half",
      },
      {
        label: "Two Thirds",
        value: "twoThirds",
      },
      {
        label: "Five Sixth",
        value: "fiveSixth",
      },
      {
        label: "Full",
        value: "full",
      },
    ],
  },
  {
    name: "richText",
    type: "richText",
    editor: defaultLexical,
    localized: true,
    label: false,
  },
  {
    name: "enableLink",
    type: "checkbox",
  },
  {
    name: "enableProse",
    type: "checkbox",
    defaultValue: true,
  },
  paddingFields,
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
  backgroundPicker,
];

export const Content: Block = {
  slug: "content",
  interfaceName: "ContentBlock",
  fields: [
    {
      name: "columns",
      type: "array",
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
    {
      label: "Styling Options",
      type: "collapsible",
      fields: [AlignmentField, marginFields, paddingFields, ...radiusFields, backgroundPicker],
    },
  ],
};
