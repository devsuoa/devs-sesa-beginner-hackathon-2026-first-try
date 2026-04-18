import ky from "ky";
import { env } from "@/lib/env";

export interface GetHello {
  message: string;
}

export async function getHello() {
  return await ky.get(`${env.NEXT_PUBLIC_FASTAPI_URL}/hello`).json<GetHello>();
}
