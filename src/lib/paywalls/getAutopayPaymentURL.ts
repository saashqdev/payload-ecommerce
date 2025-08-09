import { createHash } from "crypto";

import axios from "axios";

import { type Paywall } from "@/payload-types";
import { type Currency } from "@/stores/Currency/types";

export const getAutopayPaymentURL = async ({
  total,
  autopay,
  orderID,
  currency,
  customerEmail,
}: {
  total: number;
  autopay: Paywall["autopay"];
  orderID: string;
  currency: Currency;
  customerEmail: string;
}) => {
  const serviceID = autopay?.serviceID ?? "";
  const hashKey = autopay?.hashKey ?? "";
  const endpoint = autopay?.endpoint ?? "";
  try {
    const data = {
      ServiceID: serviceID,
      OrderID: orderID,
      Amount: total.toString(),
      GatewayID: "0",
      Currency: currency,
      CustomerEmail: customerEmail,
      Hash: createHash("sha256")
        .update(`${serviceID}|${orderID}|${total.toString()}|0|${currency}|${customerEmail}|${hashKey}`)
        .digest("hex"),
    };

    const formData = new URLSearchParams(data);

    const { data: response } = await axios.post<string>(endpoint, formData, {
      headers: {
        BmHeader: "pay-bm-continue-transaction-url",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
