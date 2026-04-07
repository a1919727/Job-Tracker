import "dotenv/config";
import cors from "cors";
import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { setupSwagger } from "./config/swagger";
import authRouter from "./routes/authRoute";
import userRouter from "./routes/userRoute";
import jobRouter from "./routes/jobRoute";
import { requireAuth } from "./middleware/authMiddleware";

const app = express();
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello, Job Track backend");
});

// Swagger
setupSwagger(app);

app.use("/api/auth", authRouter);
app.use("/api/user", requireAuth, userRouter);
app.use("/api/job", requireAuth, jobRouter);

// Error handler
app.use(errorHandler);

export default app;
