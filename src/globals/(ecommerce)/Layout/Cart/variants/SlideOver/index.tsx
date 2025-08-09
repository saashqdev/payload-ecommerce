"use client";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import debounce from "lodash.debounce";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";

import { PriceClient } from "@/components/(ecommerce)/PriceClient";
import { QuantityInput } from "@/components/(ecommerce)/QuantityInput";
import { Media as MediaComponent } from "@/components/Media";
import { type FilledVariant } from "@/globals/(ecommerce)/Layout/ProductDetails/types";
import { type Locale } from "@/i18n/config";
import { Link } from "@/i18n/routing";
import { type Media, type Product } from "@/payload-types";
import { useCartState } from "@/stores/CartStateStore";
import { useCart } from "@/stores/CartStore";
import { type Cart } from "@/stores/CartStore/types";
import { type Currency } from "@/stores/Currency/types";

export type ProductWithFilledVariants = Omit<Product, "variants" | "pricing"> & {
  variant: FilledVariant | undefined;
  image: Media | null;
  quantity: number;
  pricing: {
    value: number;
    currency: Currency;
    id?: string | null;
  }[];
};

export const SlideOver = () => {
  const { isOpen, setCartState, toggleCart } = useCartState();

  const { cart, updateCart, setCart, removeFromCart } = useCart();

  const [cartProducts, setCartProducts] = useState<ProductWithFilledVariants[]>([]);
  const [total, setTotal] = useState<
    {
      currency: Currency;
      value: number;
    }[]
  >([]);

  const locale = useLocale() as Locale;

  const fetchCartProducts = useCallback(
    async (cartToCalculate: Cart | null) => {
      try {
        const { data } = await axios.post<{
          status: number;
          productsWithTotal: {
            filledProducts: ProductWithFilledVariants[];
            total: {
              currency: Currency;
              value: number;
            }[];
            totalQuantity: number;
          };
        }>("/next/cartProducts", { cart: cartToCalculate, locale });
        const { filledProducts = [], total = [] } = data.productsWithTotal;
        setCartProducts(filledProducts);
        setTotal(total);
      } catch (error) {
        console.error(error);
      }
    },
    [locale, setCartProducts, setTotal],
  );

  const debouncedFetchCartProducts = useMemo(() => debounce(fetchCartProducts, 300), [fetchCartProducts]);

  useEffect(() => {
    void debouncedFetchCartProducts(cart);
  }, [cart, debouncedFetchCartProducts]);

  const setCartQuantity = (quantity: number, productID: string, productVariantSlug: string | undefined) => {
    const numericProductID = Number(productID);
    setCart([
      ...(cart?.filter((cartProduct) => cartProduct.id !== numericProductID) ?? []),
      {
        id: numericProductID,
        quantity,
        chosenVariantSlug: productVariantSlug,
      },
    ]);
  };

  const updateCartQuantity = (delta: number, productID: string, productVariantSlug: string | undefined) => {
    updateCart([
      {
        id: Number(productID),
        quantity: delta,
        chosenVariantSlug: productVariantSlug,
      },
    ]);
  };

  const t = useTranslations("Cart");

  return (
    <Dialog open={isOpen} onClose={toggleCart} className="relative z-100">
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
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">{t("title")}</DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setCartState(false)}
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
                        {cartProducts
                          .filter((product) =>
                            cart?.map((cartProduct) => cartProduct.id).includes(product.id),
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
                                  <MediaComponent
                                    resource={product.image}
                                    className="size-full object-cover"
                                  />
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
                                                value: p.value * product.quantity,
                                              })) ?? [])
                                            : product.pricing
                                              ? product.pricing.map((p) => ({
                                                  ...p,
                                                  value: p.value * product.quantity,
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
                                  <QuantityInput
                                    quantity={
                                      cart?.find(
                                        (cartProduct) =>
                                          cartProduct.id === product.id &&
                                          cartProduct.chosenVariantSlug === product.variant?.slug,
                                      )?.quantity ?? 1
                                    }
                                    inputVariant="cart"
                                    setQuantity={(quantity) => {
                                      setCartQuantity(
                                        quantity,
                                        String(product.id),
                                        product.variant?.slug ?? undefined,
                                      );
                                    }}
                                    updateQuantity={(delta) => {
                                      updateCartQuantity(
                                        delta,
                                        String(product.id),
                                        product.variant?.slug ?? undefined,
                                      );
                                    }}
                                    maxQuantity={
                                      product.enableVariants
                                        ? (product.variant?.stock ?? 0)
                                        : (product.stock ?? 0)
                                    }
                                    minQuantity={1}
                                  />

                                  <div className="flex">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        removeFromCart(
                                          String(product.id),
                                          product.variant?.slug ?? undefined,
                                        );
                                      }}
                                      className="text-main-600 hover:text-main-500 font-medium"
                                    >
                                      {t("remove")}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>{t("subtotal")}</p>
                    <p>
                      <PriceClient pricing={total} />
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{t("subtotal-info")}</p>
                  <div className="mt-6">
                    <Link
                      href="/checkout"
                      onClick={() => setCartState(false)}
                      className="bg-main-600 hover:bg-main-700 flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-xs"
                    >
                      {t("checkout")}
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      {t("or")}{" "}
                      <button
                        type="button"
                        onClick={() => setCartState(false)}
                        className="text-main-600 hover:text-main-500 font-medium"
                      >
                        {t("continue-shopping")}
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
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
