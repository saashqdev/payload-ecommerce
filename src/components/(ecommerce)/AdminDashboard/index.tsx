import { type DefaultTranslationKeys, type TFunction } from "@payloadcms/translations";
import { Button } from "@payloadcms/ui";
import { type EntityToGroup, EntityType, groupNavItems } from "@payloadcms/ui/shared";
import Link from "next/link";
import { getAccessResults, type PayloadRequest } from "payload";

import { type CustomTranslationsKeys } from "@/admin/translations/custom-translations";

import { AdminDatePicker } from "./components/AdminDatePicker";
import { AdminSearch } from "./components/AdminSearch";
import { AdminTabs } from "./components/AdminTabs";
import { AdminViews } from "./components/views";

export const AdminDashboard = async (req: PayloadRequest) => {
  const payload = req.payload;
  const { collections, globals } = payload.config;
  const { i18n } = req;
  const t: TFunction<CustomTranslationsKeys | DefaultTranslationKeys> = i18n.t;

  const permissions = await getAccessResults({ req: { ...req } });

  const groups = groupNavItems(
    [
      ...collections
        .filter((collection) => !collection.admin.hidden)
        .map(
          (collection) =>
            ({
              type: EntityType.collection,
              entity: collection,
            }) satisfies EntityToGroup,
        ),
      ...globals
        .filter((global) => !global.admin.hidden)
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

  return (
    <main className="gutter--left gutter--right dashboard__wrap">
      <section className="flex flex-wrap items-center gap-4">
        <h1 className="mr-auto">{t("adminDashboard:linkTitle")}</h1>
        <AdminSearch groups={groups} />
        <Button
          Link={Link}
          url="/admin/collections/products/create"
          to="/admin/collections/products/create"
          el="link"
          className="my-0 block min-h-11"
          icon="plus"
        >
          {t("adminDashboard:addProduct")}
        </Button>
      </section>
      <section className="twp my-6 flex flex-col justify-center gap-6 sm:flex-row sm:items-center sm:justify-between">
        <AdminTabs />
        <AdminDatePicker />
      </section>
      <AdminViews />
    </main>
  );
};
