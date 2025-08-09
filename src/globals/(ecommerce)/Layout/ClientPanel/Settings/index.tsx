import { useTranslations } from "next-intl";

import { type Customer } from "@/payload-types";

import { ChangeData } from "./components/ChangeData";
import { ChangePassword } from "./components/ChangePassword";

export const Settings = ({ user }: { user: Customer }) => {
  const t = useTranslations("Account.settings");
  return (
    <div>
      <h2 className="mb-8 text-xl font-bold">{t("title")}</h2>

      <dl className="mt-6 divide-y divide-gray-100 border-gray-200 text-sm/6">
        <div className="items-center py-6 sm:flex">
          <dt className="h-fit items-center font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            {t("firstName")}
          </dt>
          <dd className="mt-1 flex items-center justify-between gap-x-6 sm:mt-0 sm:flex-auto">
            <ChangeData
              value={user.firstName ?? ""}
              text={t("update")}
              altText={t("save")}
              name="firstName"
              userID={String(user.id)}
            />
          </dd>
        </div>
        <div className="items-center py-6 sm:flex">
          <dt className="h-fit items-center font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            {t("lastName")}
          </dt>
          <dd className="mt-1 flex items-center justify-between gap-x-6 sm:mt-0 sm:flex-auto">
            <ChangeData
              value={user.lastName ?? ""}
              text={t("update")}
              altText={t("save")}
              name="lastName"
              userID={String(user.id)}
            />
          </dd>
        </div>
        <div className="items-center py-6 sm:flex">
          <dt className="h-fit items-center font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            {t("email")}
          </dt>
          <dd className="mt-1 flex items-center justify-between gap-x-6 sm:mt-0 sm:flex-auto">
            <ChangeData
              value={user.email}
              text={t("update")}
              altText={t("save")}
              name="email"
              userID={String(user.id)}
            />
          </dd>
        </div>
        <div className="items-center py-6 sm:flex">
          <dt className="h-fit items-center font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            {t("password")}
          </dt>
          <dd className="mt-1 flex items-center justify-between gap-x-6 sm:mt-0 sm:flex-auto">
            <div className="text-gray-900">••••••••••••</div>
            <ChangePassword user={user} />
          </dd>
        </div>
        <div className="items-center py-6 sm:flex">
          <dt className="h-fit items-center font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            {t("birthDate")}
          </dt>
          <dd className="mt-1 flex items-center justify-between gap-x-6 sm:mt-0 sm:flex-auto">
            <ChangeData
              value={user.birthDate ?? ""}
              text={t("update")}
              type="date"
              altText={t("save")}
              name="birthDate"
              userID={String(user.id)}
            />
          </dd>
        </div>
      </dl>
    </div>
  );
};
