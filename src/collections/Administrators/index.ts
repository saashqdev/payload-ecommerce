import { authenticated } from "@/access/authenticated";

import type { CollectionConfig } from "payload";

export const Administrators: CollectionConfig = {
  slug: "administrators",
  labels: {
    singular: {
      en: "Administrator",
      pl: "Administrator",
    },
    plural: {
      en: "Administrators",
      pl: "Administratorzy",
    },
  },
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["name", "email"],
    useAsTitle: "name",
    group: {
      en: "Page Settings",
      pl: "Ustawienia strony",
    },
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
    },
  ],
  timestamps: true,
};
