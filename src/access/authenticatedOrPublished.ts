import type { Access } from "payload";

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user?.collection === "administrators") {
    return true;
  }

  return {
    _status: {
      equals: "published",
    },
  };
};
