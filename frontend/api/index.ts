import { express } from "./express";
import { fastapi } from "./fastapi";

export interface Api {
  express: typeof express;
  fastapi: typeof fastapi;
}

const api: Api = {
  express,
  fastapi,
};

export default api;
