import { TrashIcon } from "@heroicons/react/20/solid";
import { useTranslations } from "next-intl";

import { PriceClient } from "@/components/(ecommerce)/PriceClient";
import { QuantityInput } from "@/components/(ecommerce)/QuantityInput";
import { Media } from "@/components/Media";
import { type ProductWithFilledVariants } from "@/globals/(ecommerce)/Layout/Cart/variants/SlideOver";
import { Link } from "@/i18n/routing";
import { useCart } from "@/stores/CartStore";
import { type Currency } from "@/stores/Currency/types";

/**
 * This function merges two arrays of objects with currency and value, summing up the values with the same currency.
 * @param arr1 - array of objects with currency and value
 * @param arr2 - array of objects with currency and value
 * @returns - merged array of objects with currency and value
 */
const mergeAmounts = (
  arr1: { currency: Currency; value: number }[] | undefined,
  arr2: { currency: Currency; value: number }[] | undefined,
) => {
  const merged = new Map<Currency, number>();

  arr1?.forEach((item) => {
    merged.set(item.currency, (merged.get(item.currency) ?? 0) + item.value);
  });

  arr2?.forEach((item) => {
    merged.set(item.currency, (merged.get(item.currency) ?? 0) + item.value);
  });

  return Array.from(merged).map(([currency, value]) => ({ currency, value }));
};

export const OrderSummary = ({
  products,
  totalPrice,
  shippingCost,
  errorMessage,
}: {
  products?: ProductWithFilledVariants[];
  totalPrice?: {
    currency: Currency;
    value: number;
  }[];
  shippingCost?: {
    currency: Currency;
    value: number;
  }[];
  errorMessage?: string;
}) => {
  const totalPriceWithShipping = mergeAmounts(totalPrice, shippingCost);
  const { cart, updateCart, setCart, removeFromCart } = useCart();

  const setCartQuantity = (
    quantity: number,
    productID: string | number,
    productVariantSlug: string | undefined,
  ) => {
    const numericProductID = typeof productID === "string" ? Number(productID) : productID;
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
    const numericProductID = typeof productID === "string" ? Number(productID) : productID;
    updateCart([
      {
        id: numericProductID,
        quantity: delta,
        chosenVariantSlug: productVariantSlug,
      },
    ]);
  };

  const t = useTranslations("OrderSummary");

  return (
    <div className="mt-10 lg:sticky lg:top-28 lg:mt-0 lg:h-fit">
      <h2 className="text-lg font-medium text-gray-900">{t("order-summary")}</h2>

      <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-xs">
        <h3 className="sr-only">{t("items-in-cart")}</h3>
        <ul role="list" className="divide-y divide-gray-200">
          {products?.map((product) => (
            <li key={`${product.id}-${product.variant?.slug}`} className="flex px-4 py-6 sm:px-6">
              <div className="shrink-0">
                {product.variant?.image?.url ? (
                  <Media resource={product.variant.image} className="w-20 rounded-md" />
                ) : product.image?.url ? (
                  <Media resource={product.image} className="w-20 rounded-md" />
                ) : null}
              </div>

              <div className="ml-6 flex flex-1 flex-col">
                <div className="flex">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm">
                      <Link
                        className="font-medium text-gray-700 hover:text-gray-800"
                        href={`/product/${product.slug}${product.enableVariants && product?.variant?.slug ? `?variant=${product.variant.slug}` : ""}`}
                      >
                        {product.title}
                      </Link>
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {[
                        product.enableVariants && product.variant?.color?.label,
                        product.enableVariants && product.variant?.size?.label,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>

                  <div className="ml-4 flow-root shrink-0">
                    <button
                      type="button"
                      className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                      onClick={() => {
                        const numericProductID =
                          typeof product.id === "string" ? Number(product.id) : product.id;
                        removeFromCart(String(numericProductID), product.variant?.slug ?? undefined);
                      }}
                    >
                      <span className="sr-only">{t("remove")}</span>
                      <TrashIcon aria-hidden="true" className="size-5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-1 items-end justify-between pt-2">
                  <p className="mt-1 text-sm font-medium text-gray-900">
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

                  <div className="ml-4">
                    <div className="grid grid-cols-1">
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
                          setCartQuantity(quantity, product.id, product.variant?.slug ?? undefined);
                        }}
                        updateQuantity={(delta) => {
                          updateCartQuantity(delta, String(product.id), product.variant?.slug ?? undefined);
                        }}
                        maxQuantity={
                          product.enableVariants ? (product.variant?.stock ?? 0) : (product.stock ?? 0)
                        }
                        minQuantity={1}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex items-center justify-between">
            <dt className="text-sm">{t("subtotal")}</dt>
            <dd className="text-sm font-medium text-gray-900">
              <PriceClient pricing={totalPrice ?? []} />
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm">{t("shipping")}</dt>
            <dd className="text-sm font-medium text-gray-900">
              <PriceClient pricing={shippingCost ?? []} />
            </dd>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <dt className="text-base font-medium">{t("total")}</dt>
            <dd className="text-base font-medium text-gray-900">
              <PriceClient pricing={totalPriceWithShipping} />
            </dd>
          </div>
        </dl>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <button
            type="submit"
            className="bg-main-600 hover:bg-main-700 focus:ring-main-500 w-full rounded-md border border-transparent px-4 py-3 text-base font-medium text-white shadow-xs focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
          >
            {t("confirm")}
          </button>
        </div>
      </div>
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};
