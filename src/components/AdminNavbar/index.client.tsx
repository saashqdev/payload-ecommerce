"use client";

import { getTranslation } from "@payloadcms/translations";
import { NavGroup, useConfig, useTranslation } from "@payloadcms/ui";
import { EntityType, formatAdminURL, type NavGroupType } from "@payloadcms/ui/shared";
import LinkWithDefault from "next/link";
import { usePathname } from "next/navigation";
import { type NavPreferences } from "payload";

import { baseClass } from "./index";

import { getNavIcon } from "./navIconMap";

type Props = {
  groups: NavGroupType[];
  navPreferences: NavPreferences | null;
};

export const NavClient = ({ groups, navPreferences }: Props) => {
  const pathname = usePathname();

  const {
    config: {
      routes: { admin: adminRoute },
    },
  } = useConfig();

  const { i18n } = useTranslation();

  return (
    <>
      {groups.map(({ entities, label }, key) => {
        return (
          <NavGroup isOpen={navPreferences?.groups?.[label]?.open} key={key} label={label}>
            {entities.map(({ slug, type, label }, i) => {
              let href: string;
              let id: string;

              if (type === EntityType.collection) {
                href = formatAdminURL({ adminRoute, path: `/collections/${slug}` });
                id = `nav-${slug}`;
              } else {
                href = formatAdminURL({ adminRoute, path: `/globals/${slug}` });
                id = `nav-global-${slug}`;
              }

              const Link = LinkWithDefault;

              const LinkElement = Link || "a";
              const activeCollection =
                pathname.startsWith(href) && ["/", undefined].includes(pathname[href.length]);

              const Icon = getNavIcon(slug);

              return (
                <LinkElement
                  className={[`${baseClass}__link twp flex items-center py-2`, activeCollection && `active`]
                    .filter(Boolean)
                    .join(" ")}
                  href={href}
                  id={id}
                  key={i}
                  prefetch={false}
                >
                  {activeCollection && <div className={`${baseClass}__link-indicator`} />}
                  {Icon && <Icon width={20} height={20} className={`${baseClass}__icon mr-2`} />}
                  <span className={`${baseClass}__link-label text-lg leading-0`}>
                    {getTranslation(label, i18n)}
                  </span>
                </LinkElement>
              );
            })}
          </NavGroup>
        );
      })}
    </>
  );
};
