"use client";

import { useEffect } from "react";

import { useCart } from "@/stores/CartStore";

export const SynchronizeCart = () => {
  const { synchronizeCart } = useCart();
  useEffect(() => {
    void synchronizeCart();
  }, [synchronizeCart]);
  return <></>;
};
