import { type Dimensions } from "@/app/(frontend)/next/package/route";
import { type Locale } from "@/i18n/config";
import { getInpostLabel } from "@/lib/couriers/labels/getInpostLabel";
import { createInpostCODCourierPackage } from "@/lib/couriers/packages/createInpostCODCourierPackage";
import { createInpostCourierPackage } from "@/lib/couriers/packages/createInpostCourierPackage";
import { createInpostPickupPackage } from "@/lib/couriers/packages/createInpostPickupPackage";
import { type Order } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";

export const createCouriers = (locale: Locale) =>
  [
    {
      key: "inpost-pickup",
      getSettings: () => getCachedGlobal("inpost-pickup", locale, 1)(),
      prepaid: true,
      createPackage: (order: Order, dimension: string, _dimensions?: Dimensions) =>
        createInpostPickupPackage(order, dimension),
      getLabel: (packageID: string) => getInpostLabel(packageID, "inpost-pickup"),
    },
    {
      key: "inpost-courier",
      getSettings: () => getCachedGlobal("inpost-courier", locale, 1)(),
      prepaid: true,
      createPackage: (order: Order, _dimension: string, dimensions: Dimensions) =>
        createInpostCourierPackage(order, dimensions),
      getLabel: (packageID: string) => getInpostLabel(packageID, "inpost-courier"),
    },
    {
      key: "inpost-courier-cod",
      getSettings: () => getCachedGlobal("inpost-courier-cod", locale, 1)(),
      prepaid: false,
      createPackage: (order: Order, _dimension: string, dimensions: Dimensions) =>
        createInpostCODCourierPackage(order, dimensions),
      getLabel: (packageID: string) => getInpostLabel(packageID, "inpost-courier-cod"),
    },
  ] as const;

export const courierSelectOptions = [
  {
    value: "inpost-pickup",
    label: {
      en: "InPost Pickup",
      pl: "InPost Paczkomat",
    },
  },
  {
    value: "inpost-courier",
    label: {
      en: "InPost Courier",
      pl: "InPost Kurier",
    },
  },
  {
    value: "inpost-courier-cod",
    label: {
      en: "InPost Courier COD",
      pl: "InPost Kurier pobranie",
    },
  },
];

export const getCouriersArray = async (locale: Locale, withZones?: boolean) => {
  const couriers = createCouriers(locale);
  const deliveryMethods = await Promise.all(
    couriers.map(async (courier) => {
      const { settings, enabled, deliveryZones, icon } = await courier.getSettings();
      return enabled && settings
        ? {
            slug: courier.key,
            title: settings.label,
            turnaround: settings.description ?? "",
            icon: icon,
            deliveryZones: withZones ? deliveryZones : undefined,
          }
        : null;
    }),
  ).then((methods) => methods.filter(Boolean));

  return deliveryMethods;
};
