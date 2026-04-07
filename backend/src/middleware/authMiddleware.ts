import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers.authorization;
  const token = String(header && header.split(" ")[1]);
  const JWT_SECRET = process.env.jwtSercet as string;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
