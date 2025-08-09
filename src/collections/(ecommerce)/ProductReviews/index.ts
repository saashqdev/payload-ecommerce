import { type CollectionConfig } from "payload";

export const ProductReviews: CollectionConfig = {
  slug: "productReviews",
  access: {},
  admin: {
    group: {
      en: "Products",
      pl: "Produkty",
    },
  },
  labels: {
    singular: {
      en: "Product Review",
      pl: "Opinia o produkcie",
    },
    plural: {
      en: "Product Reviews",
      pl: "Opinie o produktach",
    },
  },
  fields: [
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      required: true,
    },
    {
      name: "author",
      label: {
        pl: "Autor opinii",
        en: "Review author",
      },
      type: "relationship",
      relationTo: "customers",
      required: true,
    },
    {
      name: "rating",
      label: {
        pl: "Ocena",
        en: "Rating",
      },
      type: "number",
      required: true,
      max: 5,
      min: 1,
    },
    {
      name: "review",
      label: {
        pl: "Treść opinii",
        en: "Review content",
      },
      type: "richText",
    },
  ],
};
