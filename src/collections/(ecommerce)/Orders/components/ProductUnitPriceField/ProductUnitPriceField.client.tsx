"use client";
import { NumberField, useField, useForm, useFormFields } from "@payloadcms/ui";
import { type SanitizedFieldPermissions, type NumberFieldClient } from "payload";
import { useEffect } from "react";

export const ProductUnitPriceFieldClient = ({
  path,
  // isFromAPI,
  unitPrice,
  field,
  schemaPath,
  permissions,
}: {
  path: string;
  unitPrice?: number;
  isFromAPI: boolean;
  field: Omit<NumberFieldClient, "type"> & Partial<Pick<NumberFieldClient, "type">>;
  schemaPath?: string;
  permissions?: SanitizedFieldPermissions;
}) => {
  const { value, setValue } = useField<number>({ path });

  const checkboxPath = path.replace("price", "autoprice");
  const checkboxValue = useFormFields(([fields]) => {
    return fields[checkboxPath]?.value as boolean;
  });
  const { dispatchFields } = useForm();

  const handleUnlock = () => {
    dispatchFields({
      type: "UPDATE",
      path: checkboxPath,
      value: !checkboxValue,
    });
  };

  useEffect(() => {
    if (checkboxValue) {
      setValue(unitPrice);
    }
  }, [checkboxValue, setValue, value, unitPrice]);

  return (
    <div className="no-twp">
      <NumberField
        readOnly={checkboxValue}
        field={field}
        path={path}
        onChange={(e) => {
          setValue(e);
        }}
        schemaPath={schemaPath}
        permissions={permissions}
      />

      <p className="mt-2 cursor-pointer" onClick={handleUnlock}>
        {!checkboxValue ? "Włącz auto-cenę" : "Wyłącz auto-cenę"}
      </p>
    </div>
  );
};
