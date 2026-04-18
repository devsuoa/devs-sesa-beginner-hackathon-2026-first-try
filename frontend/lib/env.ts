import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_FASTAPI_URL: z.string().default("http://localhost:8000"),
    NEXT_PUBLIC_EXPRESS_URL: z.string().default("http://localhost:8001"),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_FASTAPI_URL: process.env.NEXT_PUBLIC_FASTAPI_URL,
    NEXT_PUBLIC_EXPRESS_URL: process.env.NEXT_PUBLIC_EXPRESS_URL,
  },
});
