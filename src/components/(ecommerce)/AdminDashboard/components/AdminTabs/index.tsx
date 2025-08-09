"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AdminTabs = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("view", value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Tabs defaultValue="overview" onValueChange={handleValueChange}>
      <TabsList className="bg-payload-elevation-50 h-fit rounded-lg p-1.5 text-base">
        <TabsTrigger
          className="text-payload-elevation-900 data-[state=active]:bg-payload-background-color rounded-lg px-3.5 text-base"
          value="overview"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          className="text-payload-elevation-900 data-[state=active]:bg-payload-background-color rounded-lg text-base"
          value="analytics"
        >
          Analytics
        </TabsTrigger>
        <TabsTrigger
          className="text-payload-elevation-900 data-[state=active]:bg-payload-background-color rounded-lg text-base"
          value="reports"
        >
          Reports
        </TabsTrigger>
        <TabsTrigger
          className="text-payload-elevation-900 data-[state=active]:bg-payload-background-color rounded-lg text-base"
          value="notifications"
        >
          Notifications
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
