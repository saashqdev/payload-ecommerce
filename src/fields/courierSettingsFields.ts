import { type Field } from "payload";

export const courierSettingsFields: Field[] = [
  { name: "label", type: "text", label: { en: "Label", pl: "Etykieta" }, localized: true, required: true },
  {
    name: "description",
    type: "text",
    label: { en: "Short description", pl: "Krótki opis" },
    localized: true,
    admin: {
      description: {
        en: "You can provide typical delivery time or any other information",
        pl: "Możesz podać typowy czas dostawy lub inne informacje",
      },
    },
  },
];
