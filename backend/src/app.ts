import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { setupSwagger } from "./config/swagger";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello, Job Track backend");
});

// Swagger
setupSwagger(app);

// Error handler
app.use(errorHandler);

export default app;
