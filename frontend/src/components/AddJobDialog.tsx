import { useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import type { JobStatus, JobFormData } from "../types/job.types";
import { JOB_STATUSES } from "../types/job.types";

type AddJobDialogProps = {
  open: boolean;
  initialStatus: JobStatus;
  onClose: () => void;
  onSubmit: (values: JobFormData) => Promise<void>;
};

const getToday = () => new Date().toISOString().slice(0, 10);

export default function AddJobDialog({
  open,
  initialStatus,
  onClose,
  onSubmit,
}: AddJobDialogProps) {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [status, setStatus] = useState<JobStatus>(initialStatus);
  const [applicationDate, setApplicationDate] = useState(getToday());
  const [location, setLocation] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    setCompanyName("");
    setJobTitle("");
    setStatus(initialStatus);
    setApplicationDate(getToday());
    setLocation("");
    setJobUrl("");
    setNotes("");
    setError("");
  }, [open, initialStatus]);

  const handleClose = () => {
    if (isSubmitting) return;
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!companyName.trim() || !jobTitle.trim()) {
      setError("Missing company name and job title.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await onSubmit({
        companyName: companyName.trim(),
        jobTitle: jobTitle.trim(),
        status,
        applicationDate,
        location: location.trim(),
        jobUrl: jobUrl.trim(),
        notes: notes.trim(),
      });

      onClose();
    } catch (error) {
      console.log("Failed to create job", error);
      setError("Failed to create job.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 1,
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 700, color: "#16324a" }}>
          Add job card
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              fullWidth
            />

            <TextField
              label="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
              fullWidth
            />

            <TextField
              select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value as JobStatus)}
              fullWidth
            >
              {JOB_STATUSES.map((jobStatus) => (
                <MenuItem key={jobStatus} value={jobStatus}>
                  {jobStatus}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Application Date"
              type="date"
              value={applicationDate}
              onChange={(e) => setApplicationDate(e.target.value)}
              fullWidth
            />

            <TextField
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
            />

            <TextField
              label="Job URL"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              fullWidth
            />

            <TextField
              label="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              fullWidth
              multiline
              minRows={4}
            />
          </Stack>
        </DialogContent>

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          message="Note archived"
        >
          <Alert severity="error" onClose={() => setError("")}>
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        </Snackbar>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Card"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
