import { type Cart } from "@/stores/CartStore/types";

import { type FilledProduct } from "./getFilledProducts";

export const getTotalWeight = (filledProducts: FilledProduct[], cart: Cart) =>
  filledProducts.reduce((acc, product) => {
    if (product.enableVariantWeights && product.variants) {
      const variantWeight = product.variants
        .filter((variant) =>
          cart.some(
            (cartProduct) =>
              cartProduct.id === product.id && cartProduct.chosenVariantSlug === variant.variantSlug,
          ),
        )
        .reduce((varAcc, variant) => varAcc + (variant.weight ?? 0), 0);

      return acc + variantWeight;
    }

    return acc + (product.weight ?? 0);
  }, 0);
