import express from "express";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());

// Routes

// Error handler
app.use(errorHandler);

export default app;
