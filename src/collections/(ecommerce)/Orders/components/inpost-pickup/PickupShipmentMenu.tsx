import { type Order } from "@/payload-types";

import { PickupShipmentMenuClient } from "./PickupShipmentMenu.client";

export const PickupShipmentMenu = ({ data }: { data: Order }) => {
  return <PickupShipmentMenuClient orderID={data.id} />;
};
