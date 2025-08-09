import { formatSlugHook } from "./formatSlug";

import type { CheckboxField, TextField } from "payload";

type Overrides = {
  slugOverrides?: Partial<TextField>;
  checkboxOverrides?: Partial<CheckboxField>;
};

type Slug = (fieldToUse?: string, overrides?: Overrides, localized?: boolean) => [TextField, CheckboxField];

export const slugField: Slug = (fieldToUse = "title", overrides = {}) => {
  const { slugOverrides, checkboxOverrides } = overrides;

  const checkBoxField: CheckboxField = {
    name: "slugLock",
    type: "checkbox",
    defaultValue: true,
    admin: {
      hidden: true,
      position: "sidebar",
    },
    ...checkboxOverrides,
  };

  // Expect ts error here because of typescript mismatching Partial<TextField> with TextField
  // @ts-expect-error - some message
  const slugField: TextField = {
    name: "slug",
    type: "text",
    index: true,
    label: "Slug",

    // decide if localized or not
    // localized: true,
    ...(slugOverrides ?? {}),
    hooks: {
      // Kept this in for hook or API based updates
      beforeValidate: [formatSlugHook(fieldToUse)],
    },
    admin: {
      position: "sidebar",
      ...(slugOverrides?.admin ?? {}),
      components: {
        Field: {
          path: "@/fields/slug/SlugComponent#SlugComponent",
          clientProps: {
            fieldToUse,
            checkboxFieldPath: checkBoxField.name,
          },
        },
      },
    },
  };

  return [slugField, checkBoxField];
};
