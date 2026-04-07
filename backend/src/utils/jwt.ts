import { Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = (process.env.JWT_SECRET as string) || "secret";
const JWT_EXPIRY = (process.env.JWT_EXPIRY ||
  "1h") as jwt.SignOptions["expiresIn"];

export const generateJWT = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });
};

export const sendJWT = (res: Response, userId: string) => {
  const token = generateJWT(userId);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
    path: "/",
  });

  return token;
};

export const clearJWT = (res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });
};
