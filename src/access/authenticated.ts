import type { Administrator } from "@/payload-types";
import type { AccessArgs } from "payload";

type isAuthenticated = (args: AccessArgs<Administrator>) => boolean;

export const authenticated: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user?.collection === "administrators");
};
