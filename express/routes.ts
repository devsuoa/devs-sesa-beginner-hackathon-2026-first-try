import OpenAI from "openai";
import SYSTEM_PROMPT from "./prompt";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

export async function checkEquivalence(answer: string, modelAnswer: string) {
  const response = await client.chat.completions.create({
    model: "openrouter/elephant-alpha",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Correct answer: ${modelAnswer}\nUser answer: ${answer}`,
      },
    ],
    temperature: 0,
  });

  return response.choices[0].message.content;
}
