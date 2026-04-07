import mongoose, { Document } from "mongoose";

export const JOB_STATUSES = [
  "Applied",
  "Interview",
  "Rejected",
  "Offer",
] as const;

type JobStatus = "Applied" | "Interview" | "Rejected" | "Offer";

export interface Job extends Document {
  user: mongoose.Types.ObjectId;
  companyName: string;
  jobTitle: string;
  status: JobStatus;
  applicationDate: Date;
  location?: string;
  jobUrl?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: JOB_STATUSES,
      default: "Applied",
    },
    applicationDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      default: "",
      trim: true,
    },
    jobUrl: {
      type: String,
      default: "",
      trim: true,
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Jobs = mongoose.model<Job>("Jobs", jobSchema);
export default Jobs;
