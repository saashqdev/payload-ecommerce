import { noBlocksLexical } from "@/fields/noBlocksLexical";
import { marginFields, paddingFields } from "@/fields/spacingFields";

import type { Block, Field } from "payload";

const faqFields: Field[] = [
  {
    name: "title",
    type: "text",
    localized: true,
    required: true,
  },
  {
    name: "content",
    type: "richText",
    localized: true,
    editor: noBlocksLexical,
    required: true,
  },
];

export const Accordion: Block = {
  slug: "accordion",
  interfaceName: "AccordionBlock",
  imageURL: "/blocksThumbnails/accordion.png",
  imageAltText: "Accordion",
  fields: [
    {
      name: "title",
      type: "richText",
      localized: true,
      editor: noBlocksLexical,
    },
    {
      name: "items",
      type: "array",
      admin: {
        initCollapsed: true,
      },
      required: true,
      fields: faqFields,
    },
    marginFields,
    paddingFields,
  ],
};
