import { getPayload } from "payload";
import { type ReactNode } from "react";

import {
  paddingBottomClasses,
  paddingTopClasses,
  spacingBottomClasses,
  spacingTopClasses,
} from "@/blocks/globals";
import RichText from "@/components/RichText";
import { WithInlinePrice } from "@/globals/(ecommerce)/Layout/ProductList/variants/listings/WithInlinePrice";
import { type HotspotBlock as HotspotBlockProps, type Product } from "@/payload-types";
import { cn } from "@/utilities/cn";
import config from "@payload-config";

import { WithInlinePriceSlider } from "./variants/WithInlinePriceSlider";

export const HotspotBlock = async ({
  appearance,
  type,
  category,
  limit,
  paddingBottom,
  paddingTop,
  spacingBottom,
  spacingTop,
  subcategory,
  title,
  sort,
  products,
}: HotspotBlockProps) => {
  const payload = await getPayload({ config });

  let productsToShow: Product[] = [];

  switch (type) {
    case "category": {
      const { docs: categoryProducts } = await payload.find({
        collection: "products",
        depth: 2,
        where: {
          "categoriesArr.category": {
            equals:
              typeof category === "string"
                ? category
                : typeof category === "number"
                  ? category
                  : category?.id,
          },
        },
        limit: limit ?? 4,
        sort: sort?.split(",") ?? ["-bought"],
      });
      productsToShow = categoryProducts;
      break;
    }
    case "subcategory": {
      const { docs: subcategoryProducts } = await payload.find({
        collection: "products",
        depth: 2,
        where: {
          "categoriesArr.subcategories": {
            in:
              typeof subcategory === "string"
                ? subcategory
                : typeof subcategory === "number"
                  ? subcategory
                  : subcategory?.id,
          },
        },
        limit: limit ?? 4,
        sort: sort?.split(",") ?? ["-bought"],
      });
      productsToShow = subcategoryProducts;
      break;
    }
    case "manual": {
      productsToShow = Array.isArray(products)
        ? products.filter(
            (product): product is Product => typeof product !== "string" && typeof product !== "number",
          )
        : [];
      break;
    }
  }

  let HotspotComponent: ReactNode | null = null;

  switch (appearance) {
    case "default": {
      HotspotComponent = (
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
          <WithInlinePrice products={productsToShow} />;
        </div>
      );
      break;
    }
    case "slider": {
      HotspotComponent = <WithInlinePriceSlider products={productsToShow} />;
      break;
    }
    case "sliderLoop": {
      HotspotComponent = <WithInlinePriceSlider opts={{ loop: true }} products={productsToShow} />;
      break;
    }
  }

  return (
    <section
      className={cn(
        "container",
        spacingTopClasses[spacingTop ?? "medium"],
        spacingBottomClasses[spacingBottom ?? "medium"],
        paddingTopClasses[paddingTop ?? "medium"],
        paddingBottomClasses[paddingBottom ?? "medium"],
      )}
    >
      {title && <RichText data={title} className="mb-6" />}
      {HotspotComponent}
    </section>
  );
};
