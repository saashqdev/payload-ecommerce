import { type CollectionConfig } from "payload";

import { slugField } from "@/fields/slug";

export const ProductSubCategories: CollectionConfig = {
  slug: "productSubCategories",
  admin: {
    useAsTitle: "title",
    group: {
      en: "Products",
      pl: "Produkty",
    },
  },
  labels: {
    singular: {
      en: "Product Subcategory",
      pl: "Podkategoria produktu",
    },
    plural: {
      en: "Product Subcategories",
      pl: "Podkategorie produktów",
    },
  },
  fields: [
    {
      name: "category",
      type: "relationship",
      relationTo: "productCategories",
      label: {
        en: "Parent category",
        pl: "Kategoria nadrzędna",
      },
      required: true,
    },
    {
      name: "title",
      label: {
        en: "Subcategory name",
        pl: "Nazwa podkategorii",
      },
      type: "text",
      required: true,
      localized: true,
    },
    ...slugField(),
    {
      name: "products",
      label: {
        en: "Products in this category",
        pl: "Produkty w tej kategorii",
      },
      type: "join",
      collection: "products",
      on: "categoriesArr.subcategories",
    },
  ],
};
