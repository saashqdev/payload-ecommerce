import { useTranslation } from "@payloadcms/ui";
import { type ReactNode } from "react";

import {
  type CustomTranslationsKeys,
  type CustomTranslationsObject,
} from "@/admin/translations/custom-translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const OverviewCard = ({
  label,
  value,
  percentage,
  icon,
}: {
  label: string;
  value: string | number;
  percentage: number;
  icon: ReactNode;
}) => {
  const { t } = useTranslation<CustomTranslationsObject, CustomTranslationsKeys>();
  return (
    <Card className="rounded-xl border-payload-elevation-150 bg-transparent">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-payload-elevation-900">
        <CardTitle className="text-base font-medium">{label}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="text-payload-elevation-900">
        <div className="text-3xl font-bold">{value}</div>
        <p className="mt-1 text-sm text-payload-elevation-900 opacity-75">
          +{percentage}% {t("adminDashboard:from-last-month")}
        </p>
      </CardContent>
    </Card>
  );
};
