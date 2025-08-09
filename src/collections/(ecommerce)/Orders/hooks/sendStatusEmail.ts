import { render } from "@react-email/components";
import { getLocale, getTranslations } from "next-intl/server";

import { OrderStatusEmail } from "@/components/Emails/OrderStatusEmail";
import { type Locale } from "@/i18n/config";
import { type Order } from "@/payload-types";
import { sendEmail } from "@/utilities/nodemailer";

import type { FieldHook } from "payload";

export const sendStatusEmail: FieldHook<Order, Order["orderDetails"]["status"] | undefined> = async ({
  operation,
  value,
  originalDoc,
}) => {
  if (operation !== "update" || !originalDoc || !value) return value;

  const disabledStatuses: Order["orderDetails"]["status"][] = ["cancelled", "completed", "pending"];

  try {
    const order = originalDoc;
    const locale = (await getLocale()) as Locale;
    const t = await getTranslations("Order");

    if (!disabledStatuses.includes(value)) {
      const html = await render(await OrderStatusEmail({ locale, order }));

      await sendEmail({
        html,
        subject: t(`${order.orderDetails.status}.title`),
        to: order.shippingAddress.email,
      });
    }
  } catch (error) {
    console.log(error);
  }
  return value;
};
