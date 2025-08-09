"use client";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import debounce from "lodash.debounce";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";

import { PriceClient } from "@/components/(ecommerce)/PriceClient";
import { Media as MediaComponent } from "@/components/Media";
import { Button } from "@/components/ui/button";
import { type FilledVariant } from "@/globals/(ecommerce)/Layout/ProductDetails/types";
import { type Locale } from "@/i18n/config";
import { Link } from "@/i18n/routing";
import { type Media, type Product } from "@/payload-types";
import { useCart } from "@/stores/CartStore";
import { type Currency } from "@/stores/Currency/types";
import { useWishListState } from "@/stores/WishListStateStore";
import { useWishList } from "@/stores/WishlistStore";
import { type WishList } from "@/stores/WishlistStore/types";

type ProductWithFilledVariants = Omit<Product, "variants" | "pricing"> & {
  variant: FilledVariant | undefined;
  image: Media | null;
  pricing: {
    value: number;
    currency: Currency;
    id?: string | null;
  }[];
};
// TODO (optional): Merge with Cart into one reusable component, as it's very similar.
export const SlideOver = () => {
  const { isOpen, setWishListState, toggleWishList } = useWishListState();

  const { wishlist, removeFromWishList } = useWishList();

  const { updateCart } = useCart();

  const [wishlistProducts, setWishListProducts] = useState<ProductWithFilledVariants[]>([]);

  const locale = useLocale() as Locale;

  const fetchWishListProducts = useCallback(
    async (wishlistToFill: WishList | null) => {
      try {
        const { data } = await axios.post<{
          status: number;
          filledProducts: ProductWithFilledVariants[];
        }>("/next/wishListProducts", { wishlist: wishlistToFill, locale });
        const { filledProducts = [] } = data;
        setWishListProducts(filledProducts);
      } catch (error) {
        console.error(error);
      }
    },
    [locale, setWishListProducts],
  );

  const debouncedFetchWishListProducts = useMemo(
    () => debounce(fetchWishListProducts, 300),
    [fetchWishListProducts],
  );

  useEffect(() => {
    void debouncedFetchWishListProducts(wishlist);
  }, [wishlist, debouncedFetchWishListProducts]);

  const t = useTranslations("WishList");

  return (
    <Dialog open={isOpen} onClose={toggleWishList} className="relative z-100">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-1 flex-col overflow-y-auto bg-white px-4 py-6 shadow-xl sm:px-6">
                <div className="flex items-start justify-between">
                  <DialogTitle className="text-lg font-medium text-gray-900">{t("title")}</DialogTitle>
                  <div className="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      onClick={() => setWishListState(false)}
                      className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">{t("close-panel")}</span>
                      <XMarkIcon aria-hidden="true" className="size-6" />
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {wishlistProducts
                        .filter((product) =>
                          wishlist?.map((wishlistProduct) => wishlistProduct.id).includes(product.id),
                        )
                        .map((product) => (
                          <li key={`${product.id}-${product.variant?.slug}`} className="flex py-6">
                            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                              {product.variant?.image?.url ? (
                                <MediaComponent
                                  resource={product.variant.image}
                                  className="size-full object-cover"
                                />
                              ) : product.image?.url ? (
                                <MediaComponent resource={product.image} className="size-full object-cover" />
                              ) : null}
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <Link
                                      href={`/product/${product.slug}${product.enableVariants && product?.variant?.slug ? `?variant=${product.variant.slug}` : ""}`}
                                    >
                                      {product.title}
                                    </Link>
                                  </h3>
                                  <p className="ml-4">
                                    <PriceClient
                                      pricing={
                                        product.enableVariantPrices
                                          ? (product.variant?.pricing?.map((p) => ({
                                              ...p,
                                              value: p.value,
                                            })) ?? [])
                                          : product.pricing
                                            ? product.pricing.map((p) => ({
                                                ...p,
                                                value: p.value,
                                              }))
                                            : []
                                      }
                                    />
                                  </p>
                                </div>
                                <p>
                                  {[
                                    product.enableVariants && product.variant?.color?.label,
                                    product.enableVariants && product.variant?.size?.label,
                                  ]
                                    .filter(Boolean)
                                    .join(", ")}
                                </p>
                              </div>

                              <div className="flex flex-1 items-end justify-between text-sm">
                                <button
                                  type="button"
                                  onClick={() => {
                                    removeFromWishList(product.id, product.variant?.slug ?? undefined);
                                  }}
                                  className="text-main-600 hover:text-main-500 font-medium"
                                >
                                  {t("remove")}
                                </button>
                                <Button
                                  type="button"
                                  variant="tailwind"
                                  disabled={!product.variant?.stock || product.variant?.stock === 0}
                                  onClick={() => {
                                    updateCart([
                                      {
                                        id: product.id,
                                        quantity: 1,
                                        chosenVariantSlug: product.variant?.slug ?? undefined,
                                      },
                                    ]);
                                    removeFromWishList(product.id, product.variant?.slug ?? undefined);
                                  }}
                                  className="ml-auto w-fit font-medium"
                                >
                                  {!product.variant?.stock || product.variant?.stock === 0
                                    ? t("unavailable")
                                    : t("add-to-cart")}
                                </Button>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
