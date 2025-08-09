import { Logout } from "@payloadcms/ui";
import { RenderServerComponent } from "@payloadcms/ui/elements/RenderServerComponent";
import { type EntityToGroup, EntityType, groupNavItems } from "@payloadcms/ui/shared";
import { type ServerProps } from "payload";

import { NavHamburger } from "./NavHamburger";
import { NavWrapper } from "./NavWrapper";
import { getNavPrefs } from "./getNavPrefs";
import { NavClient } from "./index.client";

export const baseClass = "nav";

export const AdminNavbar = async (props: ServerProps) => {
  const {
    documentSubViewType,
    i18n,
    locale,
    params,
    payload,
    permissions,
    searchParams,
    user,
    viewType,
    visibleEntities,
  } = props;

  if (!payload?.config || !permissions) {
    return null;
  }

  const {
    admin: {
      components: { afterNavLinks, beforeNavLinks, logout },
    },
    collections,
    globals,
  } = payload.config;

  const groups = groupNavItems(
    [
      ...collections
        .filter(({ slug }) => visibleEntities?.collections.includes(slug))
        .map(
          (collection) =>
            ({
              type: EntityType.collection,
              entity: collection,
            }) satisfies EntityToGroup,
        ),
      ...globals
        .filter(({ slug }) => visibleEntities?.globals.includes(slug))
        .map(
          (global) =>
            ({
              type: EntityType.global,
              entity: global,
            }) satisfies EntityToGroup,
        ),
    ],
    permissions,
    i18n,
  );

  const navPreferences = await getNavPrefs({ payload, user });

  const LogoutComponent = RenderServerComponent({
    clientProps: {
      documentSubViewType,
      viewType,
    },
    Component: logout?.Button,
    Fallback: Logout,
    importMap: payload.importMap,
    serverProps: {
      i18n,
      locale,
      params,
      payload,
      permissions,
      searchParams,
      user,
    },
  });

  return (
    <NavWrapper baseClass={baseClass}>
      <nav className={`${baseClass}__wrap`}>
        {RenderServerComponent({
          clientProps: {
            documentSubViewType,
            viewType,
          },
          Component: beforeNavLinks,
          importMap: payload.importMap,
          serverProps: {
            i18n,
            locale,
            params,
            payload,
            permissions,
            searchParams,
            user,
          },
        })}
        <NavClient groups={groups} navPreferences={navPreferences} />
        {RenderServerComponent({
          clientProps: {
            documentSubViewType,
            viewType,
          },
          Component: afterNavLinks,
          importMap: payload.importMap,
          serverProps: {
            i18n,
            locale,
            params,
            payload,
            permissions,
            searchParams,
            user,
          },
        })}
        <div className={`${baseClass}__controls`}>{LogoutComponent}</div>
      </nav>
      <div className={`${baseClass}__header`}>
        <div className={`${baseClass}__header-content`}>
          <NavHamburger baseClass={baseClass} />
        </div>
      </div>
    </NavWrapper>
  );
};
