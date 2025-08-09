import { type Field } from "payload";

export const backgroundPicker: Field = {
  name: "background",
  label: "Background",
  type: "text",
  admin: {
    components: {
      Field: "@/components/AdminColorPicker#AdminColorPicker",
    },
  },
};
