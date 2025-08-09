"use client";

import { useTranslation } from "@payloadcms/ui";
import axios from "axios";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import {
  type CustomTranslationsKeys,
  type CustomTranslationsObject,
} from "@/admin/translations/custom-translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type CustomTooltipProps,
} from "@/components/ui/chart";

type ChartData = {
  name: string;
  orders: number;
  revenue: number;
};

export const OverviewChart = () => {
  const { t } = useTranslation<CustomTranslationsObject, CustomTranslationsKeys>();

  const [ChartData, setChartData] = useState<ChartData[] | undefined>();

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const { data } = await axios.get<ChartData[]>("/api/orders/chart", {
          withCredentials: true,
        });
        setChartData(data);
      } catch (error) {
        console.log(error);
      }
    };
    void fetchChartData();
  }, []);

  const chartConfig = {
    revenue: {
      label: t("adminDashboard:revenue"),
    },
    orders: {
      label: t("adminDashboard:orders"),
    },
  } satisfies ChartConfig;
  return (
    <Card className="twp border-payload-elevation-150 rounded-xl border bg-transparent lg:col-span-4">
      <CardHeader>
        <CardTitle>{t("adminDashboard:overview")}</CardTitle>
      </CardHeader>
      <CardContent className="mt-6">
        <ResponsiveContainer width="100%" height={500}>
          <ChartContainer config={chartConfig}>
            <BarChart data={ChartData}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: string) => value.slice(0, 3)}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip
                cursor={false}
                labelClassName="text-payload-elevation-900"
                content={(props: CustomTooltipProps) => (
                  <ChartTooltipContent
                    {...props}
                    className="border-payload-elevation-150 bg-payload-elevation-50 text-payload-elevation-900 text-sm"
                  />
                )}
              />
              <Bar
                dataKey="revenue"
                fill="var(--theme-elevation-900)"
                stackId="a"
                className="fill-payload-elevation-900"
              />
              <Bar
                dataKey="orders"
                fill="var(--theme-elevation-600)"
                radius={[4, 4, 0, 0]}
                stackId="a"
                className="fill-payload-elevation-600"
              />
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
