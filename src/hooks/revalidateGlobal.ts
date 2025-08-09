/* eslint-disable */
import { revalidateTag } from "next/cache";

import type { GlobalAfterChangeHook } from "payload";

export const revalidateGlobal: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating ${doc.globalType}`);

    revalidateTag(`global_${doc.globalType}`);
  }

  return doc;
};
