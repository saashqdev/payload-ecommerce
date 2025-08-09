import { backgroundPicker } from "@/fields/backgroundPicker";
import { link } from "@/fields/link";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";

import type { GlobalConfig } from "payload";

export const Header: GlobalConfig = {
  slug: "header",
  access: {
    read: () => true,
  },
  admin: {
    group: {
      en: "Page Settings",
      pl: "Ustawienia strony",
    },
  },
  label: {
    en: "Header",
    pl: "Nagłówek",
  },
  fields: [
    {
      name: "navItems",
      type: "array",
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: "@/globals/Header/RowLabel#RowLabel",
        },
      },
    },
    {
      name: "type",
      type: "select",
      options: [
        {
          label: "Default",
          value: "default",
        },
        {
          label: "Floating",
          value: "floating",
        },
      ],
      required: true,
      defaultValue: "default",
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      localized: true,
    },
    {
      name: "hideOnScroll",
      label: "Hide on Scroll",
      type: "checkbox",
      defaultValue: false,
    },
    backgroundPicker,
  ],
  hooks: {
    afterChange: [revalidateGlobal],
  },
};
