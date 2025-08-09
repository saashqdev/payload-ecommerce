import axios from "axios";
import { getLocale } from "next-intl/server";
import { getPayload } from "payload";

import { type Locale } from "@/i18n/config";
import { type Order } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";
import config from "@payload-config";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const createInpostPickupPackage = async (order: Order, dimension: string) => {
  const locale = (await getLocale()) as Locale;
  const inpostPickupSettings = await getCachedGlobal("inpost-pickup", locale, 1)();
  const fulfilment = await getCachedGlobal("fulfilment", locale, 1)();
  const { APIUrl, shipXAPIKey, clientId } = inpostPickupSettings;
  const { shopAddress } = fulfilment;
  const { shippingAddress } = order;

  const payload = await getPayload({ config });

  const addressParts = shopAddress.address.split(" ");
  const building_number = addressParts[addressParts.length - 1];
  const street = addressParts.slice(0, -1).join(" ");

  if (!shippingAddress) {
    throw new Error("No shipping address found");
  }

  const { data } = await axios.post<{ id: string }>(
    `${APIUrl}/v1/organizations/${clientId}/shipments`,
    {
      sender: {
        company_name: shopAddress.name,
        email: shopAddress.email,
        phone: shopAddress.phone,
        address: {
          street,
          building_number,
          city: shopAddress.city,
          post_code: shopAddress.postalCode,
          country_code: shopAddress.country.toUpperCase(),
        },
      },
      receiver: {
        ...(order.invoice?.isCompany
          ? { company_name: shippingAddress.name }
          : {
              first_name: shippingAddress.name.split(" ")[0],
              last_name: shippingAddress.name.split(" ").slice(1).join(" "),
            }),
        email: shippingAddress.email,
        phone: shippingAddress.phone,
      },
      parcels: {
        template: dimension,
      },
      custom_attributes: {
        target_point: shippingAddress.pickupPointID,
      },
      service: "inpost_locker_standard",
      reference: order.id,
    },
    {
      headers: {
        Authorization: `Bearer ${shipXAPIKey}`,
      },
    },
  );

  const packageID: string = data.id;

  // TODO: universal type for all 3 couriers
  const checkShipmentStatus = async (maxAttempts = 10): Promise<string> => {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const { data: shipmentData } = await axios.get<{ status: string; tracking_number: string }>(
        `${APIUrl}/v1/shipments/${packageID}`,
        {
          headers: {
            Authorization: `Bearer ${shipXAPIKey}`,
          },
        },
      );
      if (shipmentData.status === "confirmed" && shipmentData.tracking_number) {
        await payload.update({
          id: order.id,
          collection: "orders",
          data: {
            orderDetails: {
              trackingNumber: shipmentData.tracking_number,
            },
            printLabel: {
              packageNumber: packageID,
            },
          },
        });

        return packageID;
      }

      await wait(2000);
    }

    throw new Error("Timeout waiting for shipment confirmation");
  };

  await checkShipmentStatus();

  return packageID;
};
