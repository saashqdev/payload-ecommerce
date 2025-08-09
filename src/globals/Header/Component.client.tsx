import { type ReactNode } from "react";

import { DefaultHeader } from "./variants/DefaultHeader";
import { FloatingHeader } from "./variants/FloatingHeader";

import type { Header } from "@/payload-types";

type HeaderClientProps = {
  data: Header;
  disableCart?: boolean;
};

export const HeaderClient = ({ data, disableCart }: HeaderClientProps) => {
  let header: ReactNode = null;

  switch (data.type) {
    case "default":
      header = <DefaultHeader disableCart={disableCart} data={data} />;
      break;
    case "floating":
      header = <FloatingHeader data={data} />;
      break;
    default:
      header = <DefaultHeader disableCart={disableCart} data={data} />;
      break;
  }

  return header;
};
