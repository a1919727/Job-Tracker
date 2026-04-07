import cors from "cors";
import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { setupSwagger } from "./config/swagger";
import authRouter from "./routes/authRoute";
import userRouter from "./routes/userRoute";
import jobRouter from "./routes/jobRoute";
import { requireAuth } from "./middleware/authMiddleware";

const app = express();

app.use(
  cors({
    origin: process.env.clientUrl,
  }),
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello, Job Track backend");
});

// Swagger
setupSwagger(app);

// Error handler
app.use(errorHandler);

app.use("/api/auth", authRouter);
app.use("/api/user", requireAuth, userRouter);
app.use("/api/job", requireAuth, jobRouter);

export default app;
