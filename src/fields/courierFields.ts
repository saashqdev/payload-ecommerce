import { type Field } from "payload";

import { countryPickerField } from "./countryPickerField";
import { courierSettingsFields } from "./courierSettingsFields";
import { freeShippingField } from "./freeShippingField";
import { weightRangesField } from "./weightRangesField";

export const courierFields: Field[] = [
  {
    name: "enabled",
    type: "checkbox",
    label: {
      en: "Enable this courier",
      pl: "Włącz tego kuriera",
    },
  },
  {
    name: "settings",
    label: {
      en: "Settings",
      pl: "Ustawienia",
    },
    type: "group",

    fields: courierSettingsFields,
  },
  {
    name: "deliveryZones",
    type: "array",
    label: {
      en: "Delivery zones",
      pl: "Strefy dostaw",
    },
    labels: {
      plural: {
        en: "Delivery zones",
        pl: "Strefy dostaw",
      },
      singular: {
        en: "Delivery zone",
        pl: "Strefa dostaw",
      },
    },

    fields: [countryPickerField, freeShippingField, weightRangesField],
    admin: {
      components: {
        RowLabel: "@/components/(ecommerce)/RowLabels/DeliveryZonesRowLabel#DeliveryZonesRowLabel",
      },
    },
  },
  {
    name: "icon",
    type: "upload",
    label: {
      en: "Icon",
      pl: "Ikona",
    },
    relationTo: "media",
    admin: {
      condition: (data) => Boolean(data.enabled),
    },
  },
];
