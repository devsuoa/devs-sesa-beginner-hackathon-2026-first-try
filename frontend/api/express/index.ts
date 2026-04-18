import { getHello } from "./hello";

export const express = {
  getHello,
};

export type ExpressApi = typeof express;
