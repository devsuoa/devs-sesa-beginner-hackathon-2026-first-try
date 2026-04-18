import "dotenv/config";
import SYSTEM_PROMPT from "./prompt";
import { checkEquivalence } from "./routes";

import express, { type Request, type Response } from "express";

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
