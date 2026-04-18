import { env } from "@/lib/env";
import ky from "ky";

export interface GetQuestionResponse {
  id: number;
  question: string;
}

export interface CheckAnswerValues {
  id: number;
  answer: string;
}

export interface CheckAnswerResponse {
  result: boolean;
}

export async function getQuestion() {
  return await ky.get(`${env.NEXT_PUBLIC_FASTAPI_URL}/getQuestion`).json<GetQuestionResponse>();
}

export async function checkAnswer(values: CheckAnswerValues) {
  return await ky.post(`${env.NEXT_PUBLIC_FASTAPI_URL}/checkAnswer`, {
    json: values,
  }).json<CheckAnswerResponse>();
}

export const api = {
  getQuestion,
  checkAnswer
};


export type Api = typeof api;
