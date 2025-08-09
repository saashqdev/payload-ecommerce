"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useTranslations } from "next-intl";
import { type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";

import { ShippingAddressForm } from "@/components/(ecommerce)/ShippingAddressForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { type Customer } from "@/payload-types";
import { type CheckoutFormData, useCheckoutFormSchema } from "@/schemas/checkoutForm.schema";

export const AddNewAddressDialog = ({
  open,
  setOpen,
  user,
  setShipping,
}: {
  open: boolean;
  user: Customer;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setShipping: (shipping: CheckoutFormData["shipping"]) => void;
}) => {
  const { ShippingFormSchemaResolver } = useCheckoutFormSchema();
  const form = useForm<{ shipping: CheckoutFormData["shipping"] }>({
    resolver: zodResolver(ShippingFormSchemaResolver),
    defaultValues: {
      shipping: {
        name: "",
        address: "",
        city: "",
        country: "pl",
        region: "",
        postalCode: "",
        phone: "",
        email: "",
      },
    },
  });

  const t = useTranslations("CheckoutForm.add-address-dialog");

  const onSubmit = async (values: { shipping: CheckoutFormData["shipping"] }) => {
    try {
      const { data } = await axios.patch<{
        doc: Customer;
      }>(
        `/api/customers/${user?.id}`,
        {
          shippings: [...(user.shippings ?? []), values.shipping],
        },
        {
          withCredentials: true,
        },
      );
      if (data.doc.shippings) {
        setShipping({
          ...data.doc.shippings[data.doc.shippings.length - 1],
          id: data.doc.shippings[data.doc.shippings.length - 1].id ?? undefined,
        });
        setOpen(false);
      }
    } catch {
      form.setError("root", {
        message: "Internal server error",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent className="max-w-(--breakpoint-sm)">
        <DialogHeader>
          <DialogTitle className="mb-4">{t("add-address")}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <ShippingAddressForm />
            <Button variant="tailwind" type="submit" className="col-span-2 mt-4">
              {form.formState.isSubmitting ? t("saving") : t("save")}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
