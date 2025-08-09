"use client";
import { useTranslations } from "next-intl";
import { type Dispatch, type SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type Customer } from "@/payload-types";
import { type CheckoutFormData } from "@/schemas/checkoutForm.schema";
import { cn } from "@/utilities/cn";

export const ChangeAddressDialog = ({
  open,
  setOpen,
  shippingAddresses,
  setAddShippingDialogOpen,
  selectedID,
  setShipping,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setAddShippingDialogOpen: Dispatch<SetStateAction<boolean>>;
  shippingAddresses: NonNullable<Customer["shippings"]>;
  selectedID?: string;
  setShipping: (shipping: CheckoutFormData["shipping"]) => void;
}) => {
  const t = useTranslations("CheckoutForm.change-address-dialog");
  const c = useTranslations("CheckoutForm.countries");
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent className="max-w-(--breakpoint-sm)">
        <DialogHeader>
          <DialogTitle className="mb-4">{t("change-address")}</DialogTitle>
        </DialogHeader>
        <Button
          variant="tailwindOutline"
          onClick={() => {
            setAddShippingDialogOpen(true);
            setOpen(false);
          }}
        >
          {t("add-new")}
        </Button>
        <div className="grid gap-6 md:grid-cols-2">
          {shippingAddresses.map((shipping) => (
            <div
              onClick={() => {
                setShipping({
                  ...shipping,
                  id: shipping.id ?? undefined,
                });
              }}
              key={shipping.id}
              className={cn(
                "group relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-xs ring-2 ring-gray-200 focus:outline-hidden",
                shipping.id === selectedID && "ring-main-500",
              )}
            >
              <span className="flex flex-1">
                <span className="flex w-full flex-col">
                  <span className="block text-left text-sm font-medium text-gray-900">{shipping.name}</span>
                  <span className="mt-1 flex items-center text-sm text-gray-500">{shipping.address}</span>
                  <span className="mt-1 text-left text-sm font-medium text-gray-500">
                    {shipping.postalCode}, {shipping.city}, {c(shipping.country)}
                  </span>
                  <span className="mt-1 flex items-center text-sm text-gray-500">{shipping.phone}</span>
                  <span className="mt-1 flex items-center text-sm text-gray-500">{shipping.email}</span>
                </span>
              </span>
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose className="w-full">
            <Button variant="tailwind">{t("save")}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
