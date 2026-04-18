import ky from "ky";
import { env } from "@/lib/env";

export interface GetExpressHello {
  message: string;
}

export async function getHello() {
  return await ky
    .get(`${env.NEXT_PUBLIC_EXPRESS_URL}/hello`)
    .json<GetExpressHello>();
}
