import { defaultLexical } from "@/fields/defaultLexical";
import { linkGroup } from "@/fields/linkGroup";
import { marginFields, paddingFields } from "@/fields/spacingFields";

import type { Block } from "payload";

export const CallToAction: Block = {
  slug: "cta",
  interfaceName: "CallToActionBlock",
  fields: [
    {
      name: "richText",
      type: "richText",
      editor: defaultLexical,
      localized: true,
      label: false,
    },
    linkGroup({
      appearances: ["default", "outline"],
      overrides: {
        maxRows: 2,
      },
    }),
    marginFields,
    paddingFields,
  ],
  labels: {
    plural: "Calls to Action",
    singular: "Call to Action",
  },
};
