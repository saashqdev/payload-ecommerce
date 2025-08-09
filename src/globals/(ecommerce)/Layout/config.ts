import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { Accordion } from "@/blocks/Accordion/config";
import { Banner } from "@/blocks/Banner/config";
import { Carousel } from "@/blocks/Carousel/config";
import { Code } from "@/blocks/Code/config";
import { FormBlock } from "@/blocks/Form/config";
import { MediaBlock } from "@/blocks/MediaBlock/config";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";

import type { GlobalConfig } from "payload";

export const ShopLayout: GlobalConfig = {
  slug: "shopLayout",
  label: {
    en: "Shop Layout",
    pl: "Wygląd sklepu",
  },
  access: {
    read: () => true,
  },
  admin: {
    group: {
      en: "Shop settings",
      pl: "Ustawienia sklepu",
    },
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: {
            en: "Product Details",
            pl: "Karta produktu",
          },
          name: "productDetails",
          fields: [
            {
              name: "type",
              type: "select",
              options: [
                {
                  label: {
                    en: "With image gallery and expandable details",
                    pl: "Z galerią zdjęć i rozszerzalnymi szczegółami",
                  },
                  value: "WithImageGalleryExpandableDetails",
                },
              ],
              label: {
                en: "Type of product card",
                pl: "Rodzaj karty produktu",
              },
              required: true,
              defaultValue: "WithImageGalleryExpandableDetails",
            },
            {
              name: "reviewsEnabled",
              type: "checkbox",
              label: {
                en: "Enable product reviews",
                pl: "Włącz opinie o produkcie",
              },
              defaultValue: true,
              required: true,
            },
          ],
        },
        {
          label: {
            en: "Product List",
            pl: "Lista produktów",
          },
          name: "productList",
          fields: [
            {
              name: "filters",
              type: "select",
              label: {
                en: "Filters",
                pl: "Filtry",
              },
              required: true,
              options: [
                {
                  label: {
                    en: "None",
                    pl: "Brak",
                  },
                  value: "none",
                },
                {
                  label: {
                    en: "With sidebar",
                    pl: "Z bocznym panelem",
                  },
                  value: "withSidebar",
                },
                {
                  label: {
                    en: "Sort only",
                    pl: "Tylko sortowanie",
                  },
                  value: "sortOnly",
                },
              ],
            },
          ],
        },
        {
          label: {
            en: "Cart and Wishlist",
            pl: "Koszyk i lista życzeń",
          },
          name: "cartAndWishlist",
          fields: [
            {
              name: "type",
              type: "select",
              options: [
                {
                  label: {
                    en: "Slide-over",
                    pl: "Wysuwane",
                  },
                  value: "slideOver",
                },
              ],
              label: {
                en: "Type of cart and wishlist",
                pl: "Rodzaj koszyka i listy życzeń",
              },
              defaultValue: "slideOver",
              required: true,
            },
          ],
        },
        {
          label: {
            en: "Checkout page",
            pl: "Strona checkout",
          },
          name: "checkout",
          fields: [
            {
              name: "type",
              type: "select",
              options: [
                {
                  label: {
                    en: "One Step With Summary",
                    pl: "Jeden krok z podsumowaniem",
                  },
                  value: "OneStepWithSummary",
                },
              ],
              label: {
                en: "Type of checkout page",
                pl: "Rodzaj strony checkout",
              },
              required: true,
              defaultValue: "OneStepWithSummary",
            },
          ],
        },
        {
          label: {
            en: "Client panel",
            pl: "Panel klienta",
          },
          name: "clientPanel",
          fields: [
            {
              name: "type",
              type: "select",
              options: [
                {
                  label: {
                    en: "With sidebar",
                    pl: "Z bocznym panelem",
                  },
                  value: "withSidebar",
                },
              ],
              label: {
                en: "Type of client panel",
                pl: "Rodzaj panelu klienta",
              },
              required: true,
              defaultValue: "withSidebar",
            },
            {
              name: "help",
              type: "group",
              label: {
                en: "Help page",
                pl: "Strona pomocy",
              },
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: {
                    en: "Title",
                    pl: "Tytuł",
                  },
                  localized: true,
                  required: true,
                },
                {
                  name: "content",
                  type: "richText",
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => {
                      return [
                        ...rootFeatures,
                        HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
                        BlocksFeature({ blocks: [Banner, Code, MediaBlock, Accordion, Carousel, FormBlock] }),
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                        HorizontalRuleFeature(),
                      ];
                    },
                  }),
                  label: {
                    en: "Content",
                    pl: "Treść",
                  },
                  localized: true,
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal],
  },
};
