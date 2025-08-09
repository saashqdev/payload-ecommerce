import { type CollectionConfig } from "payload";

import { getChartData } from "@/endpoints/adminDashboard/getChartData";
import { getOrderCount } from "@/endpoints/adminDashboard/getOrderCount";
import { getRevenue } from "@/endpoints/adminDashboard/getRevenue";
import { currencyField } from "@/fields/currencyField";
import { countryList } from "@/globals/(ecommerce)/Couriers/utils/countryList";
import { courierSelectOptions } from "@/globals/(ecommerce)/Couriers/utils/couriersConfig";

import { generateID } from "./hooks/generateID";
import { restoreStocks } from "./hooks/restoreStocks";
import { sendStatusEmail } from "./hooks/sendStatusEmail";

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "id",
    group: {
      en: "Orders",
      pl: "Zamówienia",
    },
  },
  labels: {
    singular: {
      en: "Order",
      pl: "Zamówienie",
    },
    plural: {
      en: "Orders",
      pl: "Zamówienia",
    },
  },
  hooks: {
    beforeValidate: [generateID],
  },
  endpoints: [
    {
      path: "/revenue",
      method: "post",
      handler: getRevenue,
    },
    {
      path: "/count",
      method: "post",
      handler: getOrderCount,
    },
    {
      path: "/chart",
      method: "get",
      handler: getChartData,
    },
  ],
  fields: [
    {
      name: "id",
      type: "text",
      admin: {
        hidden: true,
      },
      required: true,
      unique: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          label: {
            en: "General",
            pl: "Ogólne",
          },
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "customer",
                  type: "relationship",
                  relationTo: "customers",
                  label: {
                    en: "Customer",
                    pl: "Klient",
                  },
                },
                {
                  name: "date",
                  label: {
                    en: "Order Date",
                    pl: "Data zamówienia",
                  },
                  type: "date",
                  admin: {
                    date: {
                      pickerAppearance: "dayAndTime",
                    },
                    readOnly: true,
                  },
                },
              ],
            },
            {
              name: "extractedFromStock",
              type: "checkbox",
              admin: {
                hidden: true,
                readOnly: true,
              },
            },
            {
              name: "products",
              type: "array",
              label: { en: "Products", pl: "Produkty" },
              admin: {
                components: {
                  RowLabel: "@/components/(ecommerce)/RowLabels/OrderProductsRowLabel#OrderProductsRowLabel",
                },
              },
              fields: [
                {
                  name: "product",
                  type: "relationship",
                  relationTo: "products",
                },
                {
                  name: "productName",
                  type: "text",
                  admin: {
                    hidden: true,
                    components: {
                      Field: "@/collections/(ecommerce)/Orders/components/ProductNameField#ProductNameField",
                    },
                  },
                },
                {
                  name: "isFromAPI",
                  type: "checkbox",
                  admin: { hidden: true },
                  required: true,
                  defaultValue: false,
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "color",
                      type: "text",
                      admin: {
                        hidden: true,
                      },
                    },
                    {
                      name: "size",
                      type: "text",
                      admin: {
                        hidden: true,
                      },
                    },
                    {
                      name: "variantSlug",
                      type: "text",
                      label: {
                        en: "Variant Slug",
                        pl: "Wariant",
                      },
                      admin: {
                        components: {
                          Field: "@/collections/(ecommerce)/Orders/components/VariantSelect#VariantSelect",
                        },
                        width: "50%",
                      },
                    },
                    {
                      name: "quantity",
                      type: "number",
                      label: {
                        en: "Quantity",
                        pl: "Ilość",
                      },
                      admin: {
                        width: "50%",
                      },
                      required: true,
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "price",
                      type: "number",
                      label: {
                        en: "Price per unit",
                        pl: "Cena za sztukę",
                      },
                      admin: {
                        components: {
                          Field:
                            "@/collections/(ecommerce)/Orders/components/ProductUnitPriceField#ProductUnitPriceField",
                        },
                        width: "50%",
                      },
                    },
                    {
                      name: "autoprice",
                      type: "checkbox",
                      label: {
                        en: "Auto Price",
                        pl: "Automatyczna cena",
                      },
                      defaultValue: false,
                      admin: {
                        readOnly: true,
                        hidden: true,
                      },
                    },
                    {
                      name: "priceTotal",
                      type: "number",
                      label: {
                        en: "Price Total",
                        pl: "Cena całkowita",
                      },
                      admin: {
                        width: "50%",
                        components: {
                          Field:
                            "@/collections/(ecommerce)/Orders/components/ProductTotalPriceField#ProductTotalPriceField",
                        },
                      },
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: {
            en: "Invoice",
            pl: "Dokument sprzedaży",
          },
          fields: [
            {
              name: "invoice",
              label: { en: "Invoice data", pl: "Dane do faktury" },
              type: "group",
              fields: [
                {
                  name: "isCompany",
                  type: "checkbox",
                  label: {
                    en: "Company",
                    pl: "Firma",
                  },
                },
                {
                  name: "name",
                  type: "text",
                  label: {
                    en: "Name",
                    pl: "Nazwa",
                  },
                },
                {
                  name: "tin",
                  type: "text",
                  label: {
                    en: "TIN",
                    pl: "NIP",
                  },
                  admin: {
                    condition: (_, siblingData) => Boolean(siblingData.isCompany),
                  },
                },
                {
                  name: "address",
                  type: "text",
                  label: {
                    en: "Address",
                    pl: "Adres",
                  },
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "city",
                      type: "text",
                      label: {
                        en: "City",
                        pl: "Miasto",
                      },
                      admin: {
                        width: "50%",
                      },
                    },
                    {
                      name: "country",
                      type: "select",
                      label: {
                        en: "Country",
                        pl: "Kraj",
                      },
                      options: [...countryList],
                      admin: {
                        width: "50%",
                      },
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "region",
                      type: "text",
                      label: {
                        en: "Region",
                        pl: "Region",
                      },
                      admin: {
                        width: "50%",
                      },
                    },
                    {
                      name: "postalCode",
                      type: "text",
                      label: {
                        en: "Postal Code",
                        pl: "Kod pocztowy",
                      },
                      admin: {
                        width: "50%",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: {
            en: "Shipping",
            pl: "Dostawa",
          },
          fields: [
            {
              name: "printLabel",
              label: { en: "Printing Labels", pl: "Drukowanie etykiet" },
              type: "group",
              fields: [
                {
                  name: "packageNumber",
                  type: "text",
                  admin: {
                    readOnly: true,
                    hidden: true,
                  },
                },
                {
                  name: "pickupShipmentMenu",
                  type: "ui",
                  admin: {
                    condition: (data) =>
                      Boolean(
                        // eslint-disable-next-line
                        data.orderDetails?.shipping === "inpost-pickup",
                      ),
                    components: {
                      Field:
                        "@/collections/(ecommerce)/Orders/components/inpost-pickup/PickupShipmentMenu#PickupShipmentMenu",
                    },
                  },
                },
                {
                  name: "width",
                  type: "number",
                  admin: {
                    hidden: true,
                  },
                  defaultValue: 0,
                },
                {
                  name: "height",
                  type: "number",
                  admin: {
                    hidden: true,
                  },
                  defaultValue: 0,
                },
                {
                  name: "length",
                  type: "number",
                  admin: {
                    hidden: true,
                  },
                  defaultValue: 0,
                },
                {
                  name: "weight",
                  type: "number",
                  admin: {
                    hidden: true,
                  },
                  defaultValue: 0,
                },
                {
                  name: "dimension",
                  type: "text",
                  admin: {
                    hidden: true,
                  },
                  defaultValue: "small",
                },
                {
                  name: "courierShipmentMenu",
                  type: "ui",
                  admin: {
                    // eslint-disable-next-line
                    condition: (data) => data.orderDetails.shipping !== "inpost-pickup",
                    components: {
                      Field:
                        "@/collections/(ecommerce)/Orders/components/couriers/CourierShipmentMenu#CourierShipmentMenu",
                    },
                  },
                },
              ],
            },
            {
              name: "shippingAddress",
              type: "group",
              label: {
                en: "Shipping Address",
                pl: "Adres dostawy",
              },
              fields: [
                {
                  name: "name",
                  type: "text",
                  label: {
                    en: "Name",
                    pl: "Nazwa",
                  },

                  required: true,
                },
                {
                  name: "address",
                  type: "text",
                  label: {
                    en: "Address",
                    pl: "Adres",
                  },

                  required: true,
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "pickupPointID",
                      type: "text",
                      label: {
                        en: "Pickup point ID",
                        pl: "ID punktu odbioru",
                      },
                      admin: {
                        width: "50%",
                        // eslint-disable-next-line
                        condition: (data) => data.orderDetails.shipping === "inpost-pickup",
                      },
                    },
                    {
                      name: "pickupPointAddress",
                      type: "text",
                      label: {
                        en: "Pickup point address",
                        pl: "Adres punktu odbioru",
                      },
                      admin: {
                        width: "50%",
                        // eslint-disable-next-line
                        condition: (data) => data.orderDetails.shipping === "inpost-pickup",
                      },
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "city",
                      type: "text",
                      label: {
                        en: "City",
                        pl: "Miasto",
                      },
                      admin: {
                        width: "50%",
                      },
                      required: true,
                    },
                    {
                      name: "country",
                      type: "select",
                      label: {
                        en: "Country",
                        pl: "Kraj",
                      },
                      options: [...countryList],
                      admin: {
                        width: "50%",
                      },
                      required: true,
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "region",
                      type: "text",
                      label: {
                        en: "Region",
                        pl: "Region",
                      },
                      admin: {
                        width: "50%",
                      },
                      required: true,
                    },
                    {
                      name: "postalCode",
                      type: "text",
                      label: {
                        en: "Postal Code",
                        pl: "Kod pocztowy",
                      },
                      admin: {
                        width: "50%",
                      },
                      required: true,
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "email",
                      type: "text",
                      label: {
                        en: "Email",
                        pl: "Email",
                      },
                      admin: {
                        width: "50%",
                      },
                      required: true,
                    },
                    {
                      name: "phone",
                      type: "text",
                      label: {
                        en: "Phone number",
                        pl: "Numer telefonu",
                      },
                      admin: {
                        width: "50%",
                      },
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "orderDetails",
      label: {
        en: "Order Details",
        pl: "Szczegóły zamówienia",
      },
      type: "group",
      admin: {
        position: "sidebar",
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "total",
              type: "number",
              label: {
                en: "Total (without shipping)",
                pl: "Suma (bez kosztów dostawy)",
              },
              admin: {
                components: {
                  Field:
                    "@/collections/(ecommerce)/Orders/components/OrderTotalPriceField#OrderTotalPriceField",
                },
              },
              required: true,
            },
            {
              name: "shippingCost",
              type: "number",
              label: {
                en: "Shipping Cost",
                pl: "Koszt dostawy",
              },

              required: true,
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "totalWithShipping",
              type: "number",
              label: {
                en: "Total (with shipping)",
                pl: "Suma (z kosztami dostawy)",
              },
              admin: {
                components: {
                  Field:
                    "@/collections/(ecommerce)/Orders/components/OrderTotalWithShippingField#OrderTotalWithShippingField",
                },
                width: "50%",
              },
              required: true,
            },
            currencyField,
          ],
        },
        {
          name: "amountPaid",
          type: "number",
          defaultValue: 0,
          label: { en: "Amount Paid", pl: "Zapłacona kwota" },
        },
        {
          name: "shipping",
          type: "select",
          label: {
            en: "Choosen Shipping Method",
            pl: "Wybrana metoda dostawy",
          },
          options: courierSelectOptions,
        },
        {
          name: "transactionID",
          type: "text",
          label: {
            en: "Transaction ID",
            pl: "ID transakcji",
          },
          admin: {
            readOnly: true,
          },
        },
        {
          name: "status",
          type: "select",
          label: {
            en: "Status",
            pl: "Status",
          },
          hooks: {
            afterChange: [sendStatusEmail, restoreStocks],
          },
          options: [
            {
              label: {
                en: "Pending",
                pl: "Oczekujące",
              },
              value: "pending",
            },
            {
              label: {
                en: "Paid",
                pl: "Opłacone",
              },
              value: "paid",
            },
            {
              label: {
                en: "Unpaid",
                pl: "Nieopłacone",
              },
              value: "unpaid",
            },
            {
              label: {
                en: "Processing",
                pl: "W trakcie realizacji",
              },
              value: "processing",
            },
            {
              label: {
                en: "Shipped",
                pl: "Wysłane",
              },
              value: "shipped",
            },
            {
              label: {
                en: "Completed",
                pl: "Zakończone",
              },
              value: "completed",
            },
            {
              label: {
                en: "Cancelled",
                pl: "Anulowane",
              },
              value: "cancelled",
            },
            {
              label: {
                en: "Returned",
                pl: "Zwrócone",
              },
              value: "returned",
            },
          ],
          required: true,
          defaultValue: "pending",
        },
        {
          name: "shippingDate",
          label: {
            en: "Shipping Date",
            pl: "Data wysyłki",
          },
          type: "date",
        },
        {
          name: "trackingNumber",
          label: {
            en: "Tracking Number",
            pl: "Numer przesyłki",
          },
          admin: {
            readOnly: true,
          },
          type: "text",
        },
        {
          name: "orderNote",
          label: {
            en: "Order Note",
            pl: "Notatka do zamówienia",
          },
          type: "textarea",
        },
      ],
    },
  ],
};
