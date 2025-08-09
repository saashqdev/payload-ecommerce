import { createHash } from "crypto";

import axios, { isAxiosError } from "axios";

import { type Locale } from "@/i18n/config";
import { type Customer } from "@/payload-types";
import { type Currency } from "@/stores/Currency/types";

export const getP24PaymentURL = async ({
  secretId,
  posId,
  crc,
  endpoint,
  sessionId,
  amount,
  currency,
  description,
  email,
  locale,
  client = undefined,
}: {
  secretId: string;
  posId: number;
  crc: string;
  endpoint: string;
  sessionId: string;
  amount: number;
  currency: Currency;
  description: string;
  email: string;
  locale: Locale;
  client?: Customer;
}) => {
  try {
    const amountInt = Math.round(amount * 100);

    const dataToSign = JSON.stringify({
      sessionId: sessionId,
      merchantId: posId,
      amount: amountInt,
      currency: currency,
      crc: crc,
    });

    const sign = createHash("sha384").update(dataToSign).digest("hex");

    const data = {
      merchantId: posId,
      posId,
      sessionId,
      amount: amountInt,
      currency,
      description,
      email: email,
      client: `${client?.firstName} ${client?.lastName}`,
      urlReturn: `${process.env.NEXT_PUBLIC_SERVER_URL}/${locale}/order/${sessionId}`,
      sign,
    };

    console.log(posId);

    const res = await axios.post<{
      data: {
        token: string;
      };
    }>(`${endpoint}/api/v1/transaction/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: `${posId}`,
        password: secretId,
      },
    });

    const token = res.data.data.token;

    return `${endpoint}/trnRequest/${token}`;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    }
    console.log(error);
    return null;
  }
};
