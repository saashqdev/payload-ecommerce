import { subDays } from "date-fns";
import { type PayloadRequest, type Where } from "payload";

import { type Order } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";

export type RevenueResponse = {
  totalRevenue: number;
  percentage: number;
};

export const getRevenue = async (req: PayloadRequest) => {
  try {
    const payload = req.payload;

    if (req.method !== "POST") {
      return Response.json({ message: "Method not allowed" }, { status: 405 });
    }

    if (req.user?.collection !== "administrators") {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const dates = req.json && ((await req.json()) as { dateFrom?: string; dateTo?: string });

    const dateFrom = dates?.dateFrom && new Date(dates.dateFrom).setHours(0, 0, 0, 0);
    const dateTo = dates?.dateTo && new Date(dates.dateTo).setHours(23, 59, 59, 999);

    const dateFromISO = dateFrom && new Date(dateFrom).toISOString();
    const dateToISO = dateTo && new Date(dateTo).toISOString();

    let whereQuery: Where | undefined;
    let previousPeriodWhereQuery: Where;

    const dateCase = `${dateFromISO ? "from" : ""}${dateToISO ? "to" : ""}`;

    switch (dateCase) {
      case "from": {
        whereQuery = {
          createdAt: {
            greater_than_equal: dateFromISO,
          },
        };
        previousPeriodWhereQuery = {
          createdAt: {
            greater_than_equal: subDays(new Date(dateFrom!), 30).toISOString(),
            less_than: dateFromISO,
          },
        };
        break;
      }
      case "to": {
        const thirtyDaysAgo = subDays(new Date(), 30).toISOString();
        whereQuery = {
          createdAt: {
            greater_than_equal: thirtyDaysAgo,
            less_than_equal: dateToISO,
          },
        };
        previousPeriodWhereQuery = {
          createdAt: {
            greater_than_equal: subDays(new Date(), 60).toISOString(),
            less_than: thirtyDaysAgo,
          },
        };
        break;
      }
      case "fromto": {
        whereQuery = {
          createdAt: {
            greater_than_equal: dateFromISO,
            less_than_equal: dateToISO,
          },
        };
        previousPeriodWhereQuery = {
          createdAt: {
            greater_than_equal: subDays(new Date(dateFrom!), 30).toISOString(),
            less_than: dateFromISO,
          },
        };
        break;
      }
      default: {
        const thirtyDaysAgo = subDays(new Date(), 30).toISOString();
        previousPeriodWhereQuery = {
          createdAt: {
            greater_than_equal: subDays(new Date(), 60).toISOString(),
            less_than: thirtyDaysAgo,
          },
        };
      }
    }

    const { docs } = await payload.find({
      collection: "orders",
      depth: 1,
      pagination: false,
      select: {
        orderDetails: {
          total: true,
          currency: true,
        },
        createdAt: true,
      },
      where: whereQuery,
    });

    // console.log(whereQuery);
    // console.log(docs);

    const { availableCurrencies, currencyValues } = await getCachedGlobal("shopSettings", "en")();
    const defaultCurrency = availableCurrencies[0];

    const totalRevenue = Number(
      docs
        .reduce((acc: number, doc: Order) => {
          if (doc.orderDetails.currency === defaultCurrency) {
            return acc + doc.orderDetails.total;
          }
          return (
            acc +
            doc.orderDetails.total /
              (currencyValues?.find((currency) => currency?.currency === doc.orderDetails.currency)?.value ??
                1)
          );
        }, 0)
        .toFixed(2),
    );

    const { docs: previousPeriodDocs } = await payload.find({
      collection: "orders",
      depth: 1,
      pagination: false,
      select: {
        orderDetails: {
          total: true,
          currency: true,
        },
      },
      where: previousPeriodWhereQuery,
    });

    const previousPeriodRevenue = Number(
      previousPeriodDocs
        .reduce((acc: number, doc: Order) => {
          if (doc.orderDetails.currency === defaultCurrency) {
            return acc + doc.orderDetails.total;
          }
          return (
            acc +
            doc.orderDetails.total /
              (currencyValues?.find((currency) => currency?.currency === doc.orderDetails.currency)?.value ??
                1)
          );
        }, 0)
        .toFixed(2),
    );

    const percentage =
      previousPeriodRevenue === 0
        ? 100
        : Number((((totalRevenue - previousPeriodRevenue) / previousPeriodRevenue) * 100).toFixed(1));

    return Response.json(
      {
        totalRevenue,
        percentage,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
};
