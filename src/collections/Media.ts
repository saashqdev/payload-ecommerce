import path from "path";
import { fileURLToPath } from "url";

import { FixedToolbarFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";

import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";

import type { CollectionConfig } from "payload";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  labels: {
    singular: {
      en: "Media",
      pl: "Plik",
    },
    plural: {
      en: "Media",
      pl: "Pliki",
    },
  },
  admin: {
    group: {
      en: "Page Settings",
      pl: "Ustawienia strony",
    },
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "caption",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()];
        },
      }),
      localized: true,
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, "../../public/media"),
    adminThumbnail: "thumbnail",
    focalPoint: true,
    imageSizes: [
      {
        name: "thumbnail",
        width: 300,
      },
      {
        name: "square",
        width: 500,
        height: 500,
      },
      {
        name: "small",
        width: 600,
      },
      {
        name: "medium",
        width: 900,
      },
      {
        name: "large",
        width: 1400,
      },
      {
        name: "xlarge",
        width: 1920,
      },
      {
        name: "og",
        width: 1200,
        height: 630,
        crop: "center",
      },
    ],
  },
};
