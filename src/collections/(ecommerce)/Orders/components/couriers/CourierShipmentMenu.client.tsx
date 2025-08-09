"use client";

import { FieldLabel, useField, useForm, useTranslation } from "@payloadcms/ui";
import axios, { isAxiosError } from "axios";
import { useState } from "react";

import {
  type CustomTranslationsKeys,
  type CustomTranslationsObject,
} from "@/admin/translations/custom-translations";
import { type Dimensions } from "@/app/(frontend)/next/package/route";
import { AdminInput } from "@/components/ui/AdminInput";
import { Button } from "@/components/ui/button";
import { cn } from "@/utilities/cn";

import { getShippingLabel } from "../../utils/getShippingLabel";

export const CourierShipmentMenuClient = ({ orderID }: { orderID: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");
  const { value: width, setValue: setWidth } = useField<number>({ path: "printLabel.width" });
  const { value: height, setValue: setHeight } = useField<number>({ path: "printLabel.height" });
  const { value: length, setValue: setLength } = useField<number>({ path: "printLabel.length" });
  const { value: weight, setValue: setWeight } = useField<number>({ path: "printLabel.weight" });

  const dimensions: Dimensions = { width, height, length, weight };

  const { value } = useField<string>({ path: "printLabel.packageNumber" });

  const { t } = useTranslation<CustomTranslationsObject, CustomTranslationsKeys>();

  const form = useForm();

  const createPackage = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post<string>(`/next/package`, {
        orderID,
        dimensions,
      });

      await form.submit({ skipValidation: true, overrides: { printLabel: { packageNumber: data } } });
    } catch (error) {
      if (isAxiosError(error) && error.response?.data) {
        const errorData = JSON.stringify(error.response.data);
        console.log("Error:", errorData);
        setError(errorData || "Error downloading file");
      } else {
        console.log("Unknown error:", error);
        setError("Unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPackage = async () => {
    try {
      await form.submit({ skipValidation: true, overrides: { printLabel: { packageNumber: "" } } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col gap-4 md:flex-row lg:flex-col xl:flex-row">
        <div className="min-h-[38px] md:w-2/3 lg:w-full xl:w-2/3">
          <form className="grid flex-1 grid-cols-2 gap-4 md:flex lg:grid xl:flex">
            <div className="flex-1">
              <FieldLabel htmlFor="width" label="Szerokość [mm]" />
              <AdminInput
                type="number"
                id="width"
                value={width ?? 0}
                onChange={(e) => {
                  setWidth(e.target.value ? Number(e.target.value) : 0);
                }}
              />
            </div>
            <div className="flex-1">
              <FieldLabel htmlFor="height" label="Wysokość [mm]" />
              <AdminInput
                type="number"
                id="height"
                value={height ?? 0}
                onChange={(e) => {
                  setHeight(e.target.value ? Number(e.target.value) : 0);
                }}
              />
            </div>
            <div className="flex-1">
              <FieldLabel htmlFor="length" label="Długość [mm]" />
              <AdminInput
                type="number"
                id="length"
                value={length ?? 0}
                onChange={(e) => {
                  setLength(e.target.value ? Number(e.target.value) : 0);
                }}
              />
            </div>
            <div className="flex-1">
              <FieldLabel htmlFor="weight" label="Waga [kg]" />
              <AdminInput
                type="number"
                id="weight"
                value={weight ?? 0}
                onChange={(e) => {
                  setWeight(e.target.value ? Number(e.target.value) : 0);
                }}
              />
            </div>
          </form>
          <p className="mt-3">{t("custom:inPostMessage")}</p>
        </div>
        <Button
          disabled={Boolean(value) && value.length > 0}
          className={cn(
            "twp bg-payload-elevation-900 text-payload-elevation-50 hover:bg-payload-elevation-700 mt-7 min-h-[38px] w-full flex-1 cursor-pointer border-0 border-transparent text-base transition-colors md:w-1/6 lg:w-full xl:w-1/6",
            ((value && value.length > 0) || isLoading) && "pointer-events-none cursor-not-allowed opacity-50",
          )}
          onClick={createPackage}
        >
          {isLoading ? t("custom:generating") : t("custom:createPackage")}
        </Button>
        <div className="mt-7 flex flex-col md:w-1/6 lg:w-full xl:w-1/6">
          <Button
            disabled={!value}
            className={cn(
              "twp bg-payload-elevation-900 text-payload-elevation-50 hover:bg-payload-elevation-700 max-h-[38px] min-h-[38px] w-full flex-1 cursor-pointer border-0 border-transparent text-base transition-colors",
              (!value || isDownloading) && "pointer-events-none cursor-not-allowed opacity-50",
            )}
            onClick={() => getShippingLabel({ setIsDownloading, setError, orderID })}
          >
            {isDownloading ? t("custom:downloadingLabel") : t("custom:downloadLabel")}
          </Button>

          <Button
            variant="link"
            onClick={handleResetPackage}
            disabled={!value}
            className="text-payload-elevation-900 mt-2 cursor-pointer border-0 p-0 pl-0"
          >
            {t("custom:resetPackage")}
          </Button>
        </div>
      </div>
      <p className="twp mt-3 text-red-600">{error}</p>
    </>
  );
};
