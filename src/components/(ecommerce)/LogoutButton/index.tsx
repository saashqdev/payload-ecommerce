"use client";

import axios from "axios";
import { type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/routing";

export const LogoutButton = ({
  className,
  children,
  ...props
}: {
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
}) => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.post("/api/customers/logout");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button onClick={handleLogout} className={className} {...props}>
      {children}
    </Button>
  );
};
