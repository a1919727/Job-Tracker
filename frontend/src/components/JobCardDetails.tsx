import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkIcon from "@mui/icons-material/Link";
import NotesIcon from "@mui/icons-material/Notes";

type JobCardDetailsProps = {
  open: boolean;
  onClose: () => void;
  companyName: string;
  jobTitle: string;
  location: string;
  applicationDate: string;
  jobUrl: string;
  notes: string;
};

export default function JobCardDetails({
  open,
  onClose,
  companyName,
  jobTitle,
  location,
  applicationDate,
  jobUrl,
  notes,
}: JobCardDetailsProps) {
  const [error, setError] = useState("");

  const formatDate = new Date(applicationDate).toLocaleDateString();

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 3,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, color: "#16324a" }}>
        Job Details
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <BusinessIcon />
            <Typography
              variant="subtitle1"
              sx={{
                color: "#17324d",
                fontWeight: 700,
              }}
            >
              {companyName}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <WorkIcon />
            <Typography
              variant="subtitle1"
              sx={{
                color: "#17324d",
                fontWeight: 700,
              }}
            >
              {jobTitle}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <CalendarMonthIcon />
            <Typography
              variant="subtitle1"
              sx={{
                color: "#17324d",
                fontWeight: 700,
              }}
            >
              {formatDate}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <LocationOnIcon />
            <Typography
              variant="subtitle1"
              sx={{
                color: "#17324d",
                fontWeight: 700,
              }}
            >
              {location}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <LinkIcon />
            <Typography
              variant="subtitle1"
              sx={{
                color: "#17324d",
                fontWeight: 700,
              }}
            >
              {jobUrl}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <NotesIcon />
            <TextField
              value={notes}
              fullWidth
              multiline
              minRows={4}
              maxRows={8}
            />
          </Box>
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
        <Button
          onClick={onClose}
          sx={{
            textTransform: "none",
            color: "#2f73b7",
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
