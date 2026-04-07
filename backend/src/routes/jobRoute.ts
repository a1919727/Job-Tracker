import {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
} from "../controllers/jobController";
import express from "express";

const router = express.Router();

router.post("/", createJob);
router.get("/", getJobs);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;
