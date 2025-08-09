"use client";
import { getTranslation } from "@payloadcms/translations";
import { useConfig, useTranslation } from "@payloadcms/ui";
import { EntityType, formatAdminURL, type NavGroupType } from "@payloadcms/ui/shared";
import Link from "next/link";
import { Fragment } from "react";

import {
  type CustomTranslationsKeys,
  type CustomTranslationsObject,
} from "@/admin/translations/custom-translations";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export const AdminSearch = ({ groups }: { groups: NavGroupType[] }) => {
  const {
    config: {
      routes: { admin: adminRoute },
    },
  } = useConfig();

  const { i18n, t } = useTranslation<CustomTranslationsObject, CustomTranslationsKeys>();

  return (
    <Command className="group twp relative order-3 w-full overflow-visible rounded-lg border border-b border-payload-elevation-150 bg-payload-elevation-50 text-payload-foreground shadow-md md:order-0 md:w-fit md:min-w-[450px]">
      <CommandInput
        className="border-payload-elevation-150 bg-payload-elevation-50 text-base opacity-75 placeholder:text-payload-elevation-900"
        placeholder={t("adminDashboard:search")}
      />
      <CommandList className="w-full-border twp absolute -left-px top-full z-50 hidden h-fit max-h-[350px] -translate-y-px border-b border-l border-r border-payload-elevation-150 border-l-payload-elevation-150 border-r-payload-elevation-150 bg-payload-elevation-50 group-focus-within:block">
        <CommandEmpty>{t("adminDashboard:searchNoResults")}</CommandEmpty>
        {groups.map((group, index) => (
          <Fragment key={`${group.label}-${index}`}>
            <CommandGroup
              key={`${group.label}-${index}`}
              heading={group.label}
              className="text-base text-payload-foreground"
            >
              {group.entities.map(({ label, slug, type }) => {
                let href = "/";
                let id: string = slug;

                if (type === EntityType.collection) {
                  href = formatAdminURL({ adminRoute, path: `/collections/${slug}` });
                  id = `nav-${slug}`;
                }

                if (type === EntityType.global) {
                  href = formatAdminURL({ adminRoute, path: `/globals/${slug}` });
                  id = `nav-global-${slug}`;
                }
                return (
                  <CommandItem
                    asChild
                    key={`${slug}-${index}-${id}`}
                    id={id}
                    className="cursor-pointer text-base data-[selected='true']:bg-payload-elevation-150 data-[selected=true]:text-payload-foreground"
                  >
                    <Link href={href}>{getTranslation(label, i18n)}</Link>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {index === groups.length - 1 ? null : <CommandSeparator className="bg-payload-elevation-50" />}
          </Fragment>
        ))}
      </CommandList>
    </Command>
  );
};
