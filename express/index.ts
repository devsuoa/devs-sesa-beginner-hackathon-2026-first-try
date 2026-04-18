import "dotenv/config";

import express, { type Request, type Response } from "express";
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are a semantic equivalence checker.

Return ONLY true or false.

Decide TRUE if:
- The user answer clearly refers to the same idea as the correct answer
- Even if words are missing, shortened, or grammatically incorrect
- As long as no new incorrect idea is introduced

Decide FALSE if:
- The meaning changes
- Or it refers to a different concept entirely

Do NOT require exact words.
Do NOT require all keywords to be present.
Do NOT be strict about grammar.

Return only true or false.
`.trim();

async function checkEquivalence(answer: string, modelAnswer: string) {
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

const app = express();
const port = Number(process.env.PORT) || 8001;

app.use(express.json());

app.post("/", async (req: Request, res: Response) => {
  const { answer, modelAnswer } = req.body;

  if (!answer || !modelAnswer) {
    res.status(400).json({ error: "answer and modelAnswer are required" });
    return;
  }

  try {
    const result = await checkEquivalence(answer, modelAnswer);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to check answer" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
