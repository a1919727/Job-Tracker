import {
  getUser,
  updateUser,
  changePassword,
} from "../controllers/userController";
import express from "express";

const router = express.Router();

router.get("/", getUser);
router.put("/", updateUser);
router.put("/change-password", changePassword);

export default router;
