"use client";
import { useTranslations } from "next-intl";
import { type ReactNode, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { InPostGeowidget } from "@/components/(ecommerce)/InPostGeowidget";
import { PriceClient } from "@/components/(ecommerce)/PriceClient";
import { Media } from "@/components/Media";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { type CheckoutFormData } from "@/schemas/checkoutForm.schema";

import { type FilledCourier } from "./CheckoutForm";

export const DeliveryMethod = ({
  deliveryMethod,
  geowidgetToken,
}: {
  deliveryMethod: FilledCourier;
  geowidgetToken?: string;
}) => {
  let Additional: ReactNode;
  const t = useTranslations("DeliveryMethods");
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useFormContext<CheckoutFormData>();

  const { title, turnaround, pricing, slug, icon } = deliveryMethod;

  const pickupPointID = useWatch({ control: form.control, name: "shipping.pickupPointID" });
  const pickupPointAddress = useWatch({ control: form.control, name: "shipping.pickupPointAddress" });
  const selectedDeliveryMethod = useWatch({ control: form.control, name: "deliveryMethod" });

  const onPointSelect = (
    event: CustomEvent<{
      name?: string;
      address_details: {
        street?: string;
        building_number?: string;
        post_code?: string;
        city?: string;
      };
    }>,
  ) => {
    form.setValue("shipping.pickupPointID", event.detail.name);
    form.setValue(
      "shipping.pickupPointAddress",
      `${event.detail.address_details.street ?? ""} ${event.detail.address_details.building_number ?? ""}${event.detail.address_details.building_number || event.detail.address_details.street ? ", " : ""}${event.detail.address_details.post_code} ${event.detail.address_details.city}`,
    );
    setDialogOpen(false);
  };

  switch (slug) {
    case "inpost-pickup":
      Additional = selectedDeliveryMethod === slug && (
        <div className="mt-2 flex flex-row-reverse">
          <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
            <DialogTrigger asChild>
              <Button type="button" variant="tailwind" className="ml-auto w-fit">
                {t("choose-pickup")}
              </Button>
            </DialogTrigger>
            <DialogContent className="flex h-[75dvh] w-[95vw] max-w-(--breakpoint-xl) flex-col sm:w-[80vw]">
              <DialogHeader>
                <DialogTitle>
                  <h3 className="text-lg font-semibold leading-none tracking-tight">{t("choose-pickup")}</h3>
                </DialogTitle>
              </DialogHeader>
              <InPostGeowidget token={geowidgetToken ?? ""} onPointSelect={onPointSelect} />
            </DialogContent>
          </Dialog>

          {pickupPointID && (
            <p className="mr-auto flex items-center text-sm">
              {pickupPointID}, {pickupPointAddress}
            </p>
          )}
        </div>
      );
      break;
    default:
      Additional = null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <span className="flex flex-1 items-center gap-3">
        {icon?.url && <Media resource={icon} className="block aspect-31/24 max-h-12 w-fit max-w-[62px]" />}
        <div className="flex-1">
          <span className="block text-sm font-medium text-gray-900">{title}</span>
          <span className="block items-center text-sm text-gray-500">{turnaround}</span>
        </div>
        <span className="ml-auto text-right text-sm font-medium text-gray-900">
          <PriceClient pricing={pricing ?? []} />
        </span>
      </span>
      {Additional}
    </div>
  );
};
