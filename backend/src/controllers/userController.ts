import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";

const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get user" });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const username = String(req.body.username || "").trim();
    const email = String(req.body.email || "").trim();
    const password = String(req.body.password || "").trim();
    const linkedln = String(req.body.linkedln || "").trim();
    const github = String(req.body.github || "").trim();

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!username || !email) {
      return res.status(400).json({ message: "Missing username and email" });
    }

    const updateData: Record<string, string> = {
      username,
      email,
      linkedln,
      github,
    };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const newUserData = await User.findByIdAndUpdate(userId, updateData, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!newUserData) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(newUserData);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to update user information" });
  }
};

const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const currentPassword = String(req.body.currentPassword || "").trim();
    const newPassword = String(req.body.newPassword || "").trim();

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Missing current password or new password",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        message: "New password should be at least 8 characters",
      });
    }

    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    return res.status(200).json({ message: "Update password successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to change password" });
  }
};
export { getUser, updateUser, changePassword };
