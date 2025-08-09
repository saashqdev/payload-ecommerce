import { type Product } from "@/payload-types";
type BaseProduct = {
  id: string;
  chosenVariantSlug?: string;
};

type CartProduct = BaseProduct & {
  quantity: number;
};

type WishlistProduct = BaseProduct;

export const getFilledProducts = <T extends CartProduct | WishlistProduct>(
  products: Product[],
  items: T[],
) => {
  const isCart = (item: CartProduct | WishlistProduct): item is CartProduct => "quantity" in item;

  const filledProducts = products.flatMap((product) => {
    if (!product.variants || product.variants.length === 0) {
      const item = items.find((item) => item.id === product.id);
      return item
        ? [
            {
              ...product,
              image: typeof product.images[0] !== "string" ? product.images[0] : null,
              slug: product.slug,
              enableVariantPrices: product.enableVariantPrices,
              // eslint-disable-next-line
              variant: null as any,
              stock: product.stock,
              pricing: product.pricing,
              ...(isCart(item) ? { quantity: item.quantity } : {}),
            },
          ]
        : [];
    }

    return product.variants
      .filter((variant) => {
        return items.some((item) => item.id === product.id && item.chosenVariantSlug === variant.variantSlug);
      })
      .map((variant) => {
        const item = items.find(
          (item) => item.id === product.id && item.chosenVariantSlug === variant.variantSlug,
        );

        return {
          ...product,
          image: typeof product.images[0] !== "string" ? product.images[0] : null,
          slug: product.slug,
          enableVariantPrices: product.enableVariantPrices,
          variant: {
            ...variant,
            color: product.colors?.find((color) => color.slug === variant.color),
            size: product.sizes?.find((size) => size.slug === variant.size),
            slug: variant.variantSlug,
            stock: variant.stock,
            image: typeof variant.image !== "string" ? variant.image : null,
            pricing: variant.pricing,
          },
          ...(isCart(item!) ? { quantity: item.quantity } : {}),
        };
      });
  });
  return filledProducts;
};

export type FilledProduct = ReturnType<typeof getFilledProducts<CartProduct | WishlistProduct>>[number];
