import { type Order } from "@/payload-types";

import { CourierShipmentMenuClient } from "./CourierShipmentMenu.client";

export const CourierShipmentMenu = ({ data }: { data: Order }) => {
  return <CourierShipmentMenuClient orderID={data.id} />;
};
