import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { clearJWT, generateJWT } from "../utils/jwt";

dotenv.config();

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ message: "Missing credentials!" });
      return;
    }

    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });
    if (existingEmail || existingUsername) {
      res.status(400).json({
        message: existingEmail
          ? "Email already exists!"
          : "Username already exists!",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = generateJWT(String(user._id));
    res
      .status(201)
      .json({ token: token, message: "Create user successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to register" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const email = String(req.body.email).trim();
    const password = String(req.body.password);

    if (!email || !password) {
      res.status(400).json({ message: "Missing credentials" });
      return;
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(400).json({ message: "User not found!" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid password!" });
      return;
    }
    const token = generateJWT(String(user._id));
    res.status(200).json({ token: token, message: "Login successful!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to login" });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    clearJWT(res);
    res.status(200).json({ message: "Logout successful!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to logout" });
  }
};
