import { getHello } from "./hello";

export const fastapi = {
  getHello,
};

export type FastApi = typeof fastapi;
