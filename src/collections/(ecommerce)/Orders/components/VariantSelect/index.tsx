import { FieldLabel } from "@payloadcms/ui";
import { type TextFieldServerComponent } from "payload";

import { VariantSelectClient } from "./VariantSelect.client";

export type VariantsArr = {
  label: string | null | undefined;
  value: string | null | undefined;
}[];

export const VariantSelect: TextFieldServerComponent = async ({ path }) => {
  return (
    <div className="mx-[5px] my-auto flex h-fit w-full max-w-1/2 flex-1 flex-col gap-[5px]">
      <FieldLabel label="Wariant" />
      <VariantSelectClient path={path} />
    </div>
  );
};
