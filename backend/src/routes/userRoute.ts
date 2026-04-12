import { getUser, updateUser } from "../controllers/userController";
import express from "express";

const router = express.Router();

router.get("/", getUser);
router.put("/", updateUser);

export default router;
