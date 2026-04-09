export type JobCard = {
  id: string | number;
  company: string;
  role: string;
  location: string;
  status: JobStatus;
};

export type ApiJob = {
  _id: string;
  companyName: string;
  jobTitle: string;
  location?: string;
  status: JobStatus;
  applicationDate?: string;
  jobUrl?: string;
  notes?: string;
};

export const JOB_STATUSES = [
  "Saved",
  "Applied",
  "Interview",
  "Rejected",
  "Offer",
] as const;

export type JobStatus =
  | "Saved"
  | "Applied"
  | "Interview"
  | "Rejected"
  | "Offer";

export type JobFormData = {
  companyName: string;
  jobTitle: string;
  status: JobStatus;
  applicationDate: string;
  location: string;
  jobUrl: string;
  notes: string;
};
