import { type Field } from "payload";

export const AlignmentField: Field = {
  name: "alignment",
  label: "Alignment",
  type: "select",
  defaultValue: "center",
  options: [
    {
      label: "Center",
      value: "center",
    },
    {
      label: "Left",
      value: "left",
    },
    {
      label: "Right",
      value: "right",
    },
    { label: "Full width", value: "full" },
  ],
};
