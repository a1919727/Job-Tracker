import { Request, Response } from "express";
import Job from "../models/job";

// Create job
export const createJob = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const companyName = String(req.body.companyName || "").trim();
  const jobTitle = String(req.body.jobTitle || "").trim();
  const status = String(req.body.status || "Applied");
  const applicationDate = req.body.applicationDate;
  const location = String(req.body.location || "").trim();
  const jobUrl = String(req.body.jobUrl || "").trim();
  const notes = String(req.body.notes || "").trim();

  if (!companyName || !jobTitle || !applicationDate) {
    return res.status(400).json({
      message: "Missing companyName, jobTitle, or applicationDate",
    });
  }

  const parsedDate = new Date(String(applicationDate));
  if (Number.isNaN(parsedDate.getTime())) {
    return res.status(400).json({ message: "Invalid application date" });
  }

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const job = await Job.create({
    user: userId,
    companyName,
    jobTitle,
    status,
    applicationDate: parsedDate,
    location,
    jobUrl,
    notes,
  });

  return res.status(201).json({ message: "Create job successfully", job: job });
};

// Get job
export const getJobs = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const jobs = await Job.find({ user: userId }).sort({
    applicationDate: -1,
    createdAt: -1,
  });

  return res.status(200).json({ message: "Get job successfully", jobs: jobs });
};

// Update job
export const updateJob = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const companyName = String(req.body.companyName || "").trim();
  const jobTitle = String(req.body.jobTitle || "").trim();
  const status = String(req.body.status || "Applied");
  const applicationDate = req.body.applicationDate;
  const location = String(req.body.location || "").trim();
  const jobUrl = String(req.body.jobUrl || "").trim();
  const notes = String(req.body.notes || "").trim();

  if (!companyName || !jobTitle || !applicationDate) {
    return res.status(400).json({
      message: "Missing companyName, jobTitle, or applicationDate",
    });
  }

  const parsedDate = new Date(String(applicationDate));
  if (Number.isNaN(parsedDate.getTime())) {
    return res.status(400).json({ message: "Invalid application date" });
  }

  const job = await Job.findOneAndUpdate(
    { _id: req.params.id, user: userId },
    {
      companyName,
      jobTitle,
      status,
      applicationDate: parsedDate,
      location,
      jobUrl,
      notes,
    },
    { new: true },
  );

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  return res.status(200).json({ message: "Update job successfully", job: job });
};

// Delete job
export const deleteJob = async (req: Request, res: Response) => {
  const job = await Job.findOneAndDelete({
    _id: req.params.id,
    user: req.user?.userId,
  });

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  res.status(200).json({ message: "Delete job successfully" });
};
