import { getLocale, getTranslations } from "next-intl/server";
import { getPayload } from "payload";

import { Media } from "@/components/Media";
import { Card } from "@/components/ui/card";
import { type Locale } from "@/i18n/config";
import { Link } from "@/i18n/routing";
import { formatDateTime } from "@/utilities/formatDateTime";
import { formatPrice } from "@/utilities/formatPrices";
import { getCustomer } from "@/utilities/getCustomer";
import config from "@payload-config";

export const WithSidebarOrders = async () => {
  const payload = await getPayload({ config });
  const user = await getCustomer();
  const locale = (await getLocale()) as Locale;

  if (!user) {
    return null;
  }
  const t = await getTranslations("Account.orders");

  const orders = await payload.find({
    collection: "orders",
    where: {
      customer: {
        equals: user?.id,
      },
    },
    pagination: false,
  });

  return (
    <div className="no-prose flex flex-col gap-4">
      <h2 className="mb-8 text-xl font-bold">{t("title")}</h2>
      {orders.docs.map((order) => (
        <Link href={`/order/${order.id}`} key={order.id}>
          <Card className="flex flex-col overflow-clip rounded-[6px] border bg-transparent sm:flex-row">
            <div className="r flex flex-col gap-2 bg-gray-50 p-4 sm:w-1/3 sm:pr-8">
              {t.rich(order.orderDetails.status, {
                yellow: (chunks) => <p className="font-medium text-yellow-600">{chunks}</p>,
                green: (chunks) => <p className="font-medium text-green-600">{chunks}</p>,
                red: (chunks) => <p className="font-medium text-red-600">{chunks}</p>,
              })}
              <p className="text-sm">{formatDateTime(order.createdAt, "EU")}</p>
              <p className="text-xs">Nr: {order.id}</p>
              <p className="font-medium">
                {formatPrice(order.orderDetails?.total ?? 0, order.orderDetails?.currency ?? "PLN", locale)}
              </p>
            </div>
            <div className="flex items-center gap-2 overflow-y-auto p-4 sm:pl-8">
              {order.products?.map((product) => {
                const hasVariant = product.variantSlug;

                const variantImage =
                  typeof product.product !== "string" &&
                  typeof product.product !== "number" &&
                  product.product &&
                  hasVariant &&
                  product.product.variants?.find((variant) => variant.variantSlug === product.variantSlug)
                    ?.image;

                const productImage =
                  product.product &&
                  typeof product.product !== "string" &&
                  typeof product.product !== "number" &&
                  Array.isArray(product.product.images) &&
                  typeof product.product.images[0] !== "string" &&
                  product.product.images[0];

                const image = variantImage && typeof variantImage !== "string" ? variantImage : productImage;

                return (
                  image && (
                    <Media
                      key={`${product.id}-${product.variantSlug}`}
                      alt={product.productName ?? ""}
                      resource={image}
                      className="aspect-square w-20 rounded-[6px] border object-cover shadow-xs"
                    />
                  )
                );
              })}
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};
