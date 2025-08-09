import { getPayload } from "payload";

import { type Locale } from "@/i18n/config";
import { type Order } from "@/payload-types";
import config from "@/payload.config";

export const getOrderProducts = async (orderProducts: Order["products"] | null, locale: Locale) => {
  try {
    const payload = await getPayload({ config });
    console.log(orderProducts);
    return (
      orderProducts &&
      (await Promise.all(
        orderProducts.map(async (product) => {
          const filledProduct = await payload.findByID({
            collection: "products",
            id:
              typeof product.product === "string"
                ? product.product
                : (product.product?.id ?? product.id ?? ""),
            locale,
          });
          return {
            ...product,
            ...filledProduct,
          };
        }),
      ))
    );
  } catch (error) {
    console.error(error);
    return [];
  }
};
