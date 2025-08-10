import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URI: z.string().min(1),
    PAYLOAD_SECRET: z.string().min(1),
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_WEBHOOKS_ENDPOINT_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_SERVER_URL: z.url(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    DATABASE_URI: process.env.DATABASE_URI,
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    STRIPE_SECRET_KEY: process.env.PAYLOAD_SECRET,
    STRIPE_WEBHOOKS_ENDPOINT_SECRET: process.env.STRIPE_WEBHOOKS_ENDPOINT_SECRET,
  },
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_VALIDATION,
});
