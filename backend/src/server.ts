import express, { Request, Response } from "express";
import { connectToDB } from "./config/mongoose";

const app = express();
const port = Number(process.env.PORT) || 5000;

connectToDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Job Track backend");
});

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
