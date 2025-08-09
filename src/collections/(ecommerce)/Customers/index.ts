import { revalidateTag } from "next/cache";
import { type CollectionConfig } from "payload";

import { countryList } from "@/globals/(ecommerce)/Couriers/utils/countryList";

import { createTokenAndSendEmail } from "./hooks/createTokenAndSendEmail";

export const Customers: CollectionConfig = {
  slug: "customers",
  access: {
    create: () => true,
  },
  labels: {
    singular: {
      en: "Customer",
      pl: "Klient",
    },
    plural: {
      en: "Customers list",
      pl: "Lista Klientów",
    },
  },
  admin: {
    group: {
      en: "Clients",
      pl: "Klienci",
    },
    defaultColumns: ["fullName", "email", "createdAt", "updatedAt"],
    useAsTitle: "fullName",
  },
  auth: {
    maxLoginAttempts: 30,
    lockTime: 30 * 1000,
    verify: true,
  },
  hooks: {
    afterOperation: [createTokenAndSendEmail],
    afterLogin: [
      async () => {
        revalidateTag("user-auth");
      },
    ],
    beforeChange: [
      async ({ data }) => {
        return { ...data, fullName: `${data.firstName} ${data.lastName}` };
      },
    ],
  },
  fields: [
    {
      name: "fullName",
      type: "text",
      admin: {
        hidden: true,
      },
      // virtual: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "firstName",
          label: {
            en: "First Name",
            pl: "Imię",
          },
          type: "text",
        },
        {
          name: "lastName",
          label: {
            en: "Last Name",
            pl: "Nazwisko",
          },
          type: "text",
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "birthDate",
          label: {
            en: "Birth Date",
            pl: "Data urodzenia",
          },
          type: "date",
          admin: {
            width: "50%",
          },
        },
        {
          name: "lastBuyerType",
          label: {
            en: "Last Buyer Type",
            pl: "Ostatni typ kupującego",
          },
          type: "select",
          admin: {
            width: "50%",
          },
          options: [
            { value: "individual", label: { en: "Individual", pl: "Osoba fizyczna" } },
            { value: "company", label: { en: "Company", pl: "Firma" } },
          ],
        },
      ],
    },
    {
      name: "shippings",
      type: "array",
      label: {
        en: "Shipping adresses",
        pl: "Adresy dostaw",
      },
      labels: {
        singular: {
          en: "Shipping address",
          pl: "Adres dostawy",
        },
        plural: {
          en: "Shipping addresses",
          pl: "Adresy dostaw",
        },
      },
      admin: {
        initCollapsed: true,
        components: {
          RowLabel:
            "@/collections/(ecommerce)/Customers/ui/RowLabels/ShippingAddressRowLabel#ShippingAddressRowLabel",
        },
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
              admin: {
                width: "50%",
              },
              options: [...countryList],
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
              required: true,
            },
            {
              name: "postalCode",
              type: "text",
              label: {
                en: "Postal Code",
                pl: "Kod pocztowy",
              },
              required: true,
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "phone",
              type: "text",
              label: {
                en: "Phone",
                pl: "Telefon",
              },
              required: true,
            },
            {
              name: "email",
              type: "text",
              label: {
                en: "Email",
                pl: "Email",
              },
              required: true,
            },
          ],
        },
        {
          name: "default",
          type: "checkbox",
          label: {
            en: "Default",
            pl: "Domyślny",
          },
          defaultValue: false,
        },
      ],
    },
    {
      name: "orders",
      label: {
        en: "Client Orders",
        pl: "Zamówienia klienta",
      },
      type: "join",
      collection: "orders",
      on: "customer",
    },
    {
      name: "cart",
      type: "json",
      label: {
        en: "Cart",
        pl: "Koszyk",
      },
      admin: {
        hidden: true,
      },
    },
    {
      name: "wishlist",
      type: "json",
      label: {
        en: "Wishlist",
        pl: "Lista życzeń",
      },
      admin: {
        hidden: true,
      },
    },
  ],
};
