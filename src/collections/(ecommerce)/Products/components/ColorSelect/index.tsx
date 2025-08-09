"use client";

import { FieldLabel, Select, useField, useForm } from "@payloadcms/ui";
import { type TextFieldClientComponent } from "payload";
import { useCallback, useEffect } from "react";

import { type Product } from "@/payload-types";

export const ColorSelect: TextFieldClientComponent = ({ path }) => {
  const { value, setValue } = useField<string>({ path });

  const variantSlugPath = path.replace(/[^.]+$/, "variantSlug");

  const { setValue: setVariantSlugValue } = useField<string>({
    path: variantSlugPath,
  });

  const { getDataByPath, getSiblingData } = useForm();

  const { value: variantType } = useField<string>({ path: "variantsType" });

  const colors = getDataByPath<Product["colors"]>("colors");

  const handleColorChange = useCallback(
    (option: { value: string }) => {
      setValue(option.value);

      const siblings = getSiblingData(path);

      const size = siblings.size as string;

      setVariantSlugValue(`${option.value ?? ""}${option.value && size ? "-" : ""}${size ?? ""}`);
    },
    [getSiblingData, path, setVariantSlugValue, setValue],
  );

  useEffect(() => {
    if (variantType === "sizes") {
      handleColorChange({ value: "" });
    }
  }, [variantType, handleColorChange]);

  return variantType !== "sizes" ? (
    <div className="my-auto flex h-fit flex-1 flex-col gap-[5px]">
      <FieldLabel label="Kolor" />
      <Select
        value={{
          label: colors?.find((color) => color.slug === value)?.label,
          value,
        }}
        onChange={handleColorChange}
        options={
          colors
            ? colors?.map((color) => ({
                label: color.label,

                value: color.slug,
              }))
            : []
        }
      />
    </div>
  ) : null;
};
