import { type Field } from "payload";

export const radiusFields: Field[] = [
  {
    name: "radius",
    label: "Border Radius",
    type: "checkbox",
    defaultValue: false,
  },
  {
    name: "specifiedRadius",
    label: "Specify Border Radius",
    type: "checkbox",
    defaultValue: false,
    admin: {
      condition: (_, siblingData) => Boolean(siblingData.radius),
    },
  },
  {
    name: "radiusAll",
    label: "Border Radius",
    type: "select",
    options: [
      {
        label: "None",
        value: "rounded-none",
      },
      {
        label: "Small",
        value: "rounded-sm",
      },
      {
        label: "Medium",
        value: "rounded-md",
      },
      {
        label: "Large",
        value: "rounded-lg",
      },
      {
        label: "Extra Large",
        value: "rounded-xl",
      },
      {
        label: "Double Extra Large",
        value: "rounded-2xl",
      },
      {
        label: "Triple Extra Large",
        value: "rounded-3xl",
      },
      {
        label: "Full",
        value: "rounded-full",
      },
    ],
    defaultValue: "rounded-none",
    admin: {
      condition: (_, siblingData) => Boolean(siblingData.radius && !siblingData.specifiedRadius),
    },
  },
  {
    type: "row",
    fields: [
      {
        name: "radiusTopLeft",
        label: "Top Left",
        type: "select",
        options: [
          {
            label: "None",
            value: "rounded-tl-none",
          },
          {
            label: "Small",
            value: "rounded-tl-sm",
          },
          {
            label: "Medium",
            value: "rounded-tl-md",
          },
          {
            label: "Large",
            value: "rounded-tl-lg",
          },
          {
            label: "Extra Large",
            value: "rounded-tl-xl",
          },
          {
            label: "Double Extra Large",
            value: "rounded-tl-2xl",
          },
          {
            label: "Triple Extra Large",
            value: "rounded-tl-3xl",
          },
          {
            label: "Full",
            value: "rounded-tl-full",
          },
        ],
        defaultValue: "rounded-tl-none",
        admin: {
          condition: (_, siblingData) => Boolean(siblingData.radius && siblingData.specifiedRadius),
        },
      },
      {
        name: "radiusTopRight",
        label: "Top Right",
        type: "select",
        options: [
          {
            label: "None",
            value: "rounded-tr-none",
          },
          {
            label: "Small",
            value: "rounded-tr-sm",
          },
          {
            label: "Medium",
            value: "rounded-tr-md",
          },
          {
            label: "Large",
            value: "rounded-tr-lg",
          },
          {
            label: "Extra Large",
            value: "rounded-tr-xl",
          },
          {
            label: "Double Extra Large",
            value: "rounded-tr-2xl",
          },
          {
            label: "Triple Extra Large",
            value: "rounded-tr-3xl",
          },
          {
            label: "Full",
            value: "rounded-tr-full",
          },
        ],
        defaultValue: "rounded-tr-none",
        admin: {
          condition: (_, siblingData) => Boolean(siblingData.radius && siblingData.specifiedRadius),
        },
      },
    ],
  },
  {
    type: "row",
    fields: [
      {
        name: "radiusBottomLeft",
        label: "Bottom Left",
        type: "select",
        options: [
          {
            label: "None",
            value: "rounded-bl-none",
          },
          {
            label: "Small",
            value: "rounded-bl-sm",
          },
          {
            label: "Medium",
            value: "rounded-bl-md",
          },
          {
            label: "Large",
            value: "rounded-bl-lg",
          },
          {
            label: "Extra Large",
            value: "rounded-bl-xl",
          },
          {
            label: "Double Extra Large",
            value: "rounded-bl-2xl",
          },
          {
            label: "Triple Extra Large",
            value: "rounded-bl-3xl",
          },
          {
            label: "Full",
            value: "rounded-bl-full",
          },
        ],
        defaultValue: "rounded-bl-none",
        admin: {
          condition: (_, siblingData) => Boolean(siblingData.radius && siblingData.specifiedRadius),
        },
      },
      {
        name: "radiusBottomRight",
        label: "Bottom Right",
        type: "select",
        options: [
          {
            label: "None",
            value: "rounded-br-none",
          },
          {
            label: "Small",
            value: "rounded-br-sm",
          },
          {
            label: "Medium",
            value: "rounded-br-md",
          },
          {
            label: "Large",
            value: "rounded-br-lg",
          },
          {
            label: "Extra Large",
            value: "rounded-br-xl",
          },
          {
            label: "Double Extra Large",
            value: "rounded-br-2xl",
          },
          {
            label: "Triple Extra Large",
            value: "rounded-br-3xl",
          },
          {
            label: "Full",
            value: "rounded-br-full",
          },
        ],
        defaultValue: "rounded-br-none",
        admin: {
          condition: (_, siblingData) => Boolean(siblingData.radius && siblingData.specifiedRadius),
        },
      },
    ],
  },
];
