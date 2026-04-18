import cors from "cors";
import express from "express";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.get("/hello", (_request, response) => {
  response.json({ message: "Hello from Express!" });
});

app.listen(8001, () => {
  console.log(`Express server listening on http://localhost:8001`);
});
