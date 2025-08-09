"use client";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type CheckoutFormData } from "@/schemas/checkoutForm.schema";

export const ShippingAddressForm = () => {
  const form = useFormContext<CheckoutFormData>();
  const t = useTranslations("CheckoutForm.form");
  const c = useTranslations("CheckoutForm.countries");
  return (
    <>
      <FormField
        control={form.control}
        name="shipping.name"
        render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel>{t("full-name")}</FormLabel>
            <FormControl>
              <Input placeholder={t("full-name-placeholder")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="shipping.address"
        render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel>{t("address")}</FormLabel>
            <FormControl>
              <Input placeholder={t("address-placeholder")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="shipping.city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("city")}</FormLabel>
            <FormControl>
              <Input placeholder={t("city-placeholder")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="shipping.country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("country")}</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value ?? "pl"}>
                <FormControl>
                  <SelectTrigger className="w-full appearance-none rounded-md bg-white py-2 pr-3 text-base text-gray-900 outline-solid outline-1 -outline-offset-1 outline-gray-300 focus:outline-solid focus:outline-2 focus:-outline-offset-2 focus:outline-main-600 focus:ring-0 focus:ring-offset-0 sm:text-sm/6">
                    <SelectValue placeholder={t("country-placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="pl">{c("pl")}</SelectItem>
                  <SelectItem value="gb">{c("gb")}</SelectItem>
                  <SelectItem value="us">{c("us")}</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="shipping.region"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("region")}</FormLabel>
            <FormControl>
              <Input placeholder={t("region-placeholder")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="shipping.postalCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("postal-code")}</FormLabel>
            <FormControl>
              <Input placeholder={t("postal-code-placeholder")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="shipping.phone"
        render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel>{t("phone")}</FormLabel>
            <FormControl>
              <Input placeholder={t("phone-placeholder")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="shipping.email"
        render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel>{t("email")}</FormLabel>
            <FormControl>
              <Input placeholder={t("email-placeholder")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
