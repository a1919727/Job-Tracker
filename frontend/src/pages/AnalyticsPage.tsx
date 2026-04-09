import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { ApiJob, JobCard, JobStatus } from "../types/job.types";
import AnalyticsPieChart from "../components/AnalyticsPieChart";

const statusAccent: Record<JobStatus, string> = {
  Saved: "#7d8ea3",
  Applied: "#1f6fb2",
  Interview: "#c07b16",
  Rejected: "#b05454",
  Offer: "#2a8a62",
};

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const [allJobs, setAllJobs] = useState<JobCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Missing auth token");
        }

        const response = await axios.get("http://localhost:5001/api/job/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const jobsFromApi: ApiJob[] = response.data.jobs;

        setAllJobs(
          jobsFromApi.map((job) => ({
            id: job._id,
            company: job.companyName,
            role: job.jobTitle,
            location: job.location || "",
            status: job.status,
            applicationDate: job.applicationDate || new Date().toISOString(),
            jobUrl: job.jobUrl || "",
            notes: job.notes || "",
          })),
        );
      } catch (error) {
        console.log("Failed to fetch jobs", error);
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const recentJobs = [...allJobs]
    .sort((a, b) => {
      const dateA = new Date(a.applicationDate).getTime();
      const dateB = new Date(b.applicationDate).getTime();
      return dateB - dateA;
    })
    .slice(0, 5);

  const handleBackToBoard = () => {
    navigate("/Dashboard");
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "radial-gradient(circle at top left, rgba(181, 214, 243, 0.55), transparent 28%), linear-gradient(180deg, #eef6fb 0%, #f8fbfd 48%, #edf2f7 100%)",
          py: { xs: 3, md: 5 },
        }}
      >
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 } }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 6,
              p: { xs: 3, md: 4 },
              border: "1px solid rgba(31, 78, 121, 0.10)",
              background:
                "linear-gradient(135deg, rgba(247, 251, 255, 0.95) 0%, rgba(234, 243, 250, 0.92) 100%)",
              boxShadow: "0 20px 60px rgba(44, 76, 105, 0.08)",
            }}
          >
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={3}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", lg: "center" }}
            >
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#16324a",
                    fontWeight: 800,
                    lineHeight: 1.1,
                    mt: 1,
                  }}
                >
                  Analyze your jobs
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: "rgba(22, 50, 74, 0.72)" }}
                >
                  Recent activities across your applications.
                </Typography>
              </Box>

              <Button
                variant="outlined"
                sx={{ fontWeight: "bold" }}
                onClick={handleBackToBoard}
              >
                Back to board
              </Button>
            </Stack>
          </Paper>

          {loading ? (
            <Paper
              elevation={0}
              sx={{
                mt: 3,
                borderRadius: 5,
                p: 4,
                textAlign: "center",
                bgcolor: "rgba(255,255,255,0.75)",
              }}
            >
              <Typography variant="body1" sx={{ color: "#16324a" }}>
                Loading analytics...
              </Typography>
            </Paper>
          ) : (
            <Stack spacing={3} sx={{ mt: 3 }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    xl: "1.2fr 0.9fr",
                  },
                  gap: 2,
                }}
              >
                <AnalyticsPieChart jobs={allJobs} />

                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 5,
                    p: 4,
                    bgcolor: "rgba(255,255,255,0.82)",
                    border: "1px solid rgba(31, 78, 121, 0.08)",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "#16324a", fontWeight: 700 }}
                  >
                    Recent activity
                  </Typography>
                  <Stack spacing={1.5} sx={{ mt: 2.5 }}>
                    {recentJobs.length === 0 && (
                      <Typography
                        variant="body2"
                        sx={{ color: "#16324a", fontWeight: 700 }}
                      >
                        No jobs yet.
                      </Typography>
                    )}

                    {recentJobs.map((job) => (
                      <Paper
                        key={job.id}
                        elevation={0}
                        sx={{
                          borderRadius: 3,
                          p: 2,
                          bgcolor: "#ffffff",
                          border: "1px solid rgba(15, 40, 64, 0.08)",
                        }}
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={2}
                        >
                          <Box>
                            <Typography
                              variant="subtitle2"
                              sx={{ color: "#16324a", fontWeight: 700 }}
                            >
                              {job.role}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {job.company}
                            </Typography>
                          </Box>
                          <Chip
                            label={job.status}
                            size="small"
                            sx={{
                              bgcolor: `${statusAccent[job.status]}18`,
                              color: statusAccent[job.status],
                              fontWeight: 700,
                            }}
                          />
                        </Stack>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            display: "block",
                            mt: 1,
                          }}
                        >
                          {job.applicationDate
                            ? new Date(job.applicationDate).toLocaleDateString(
                                "en-AU",
                              )
                            : "No date"}
                        </Typography>
                      </Paper>
                    ))}
                  </Stack>
                </Paper>
              </Box>
            </Stack>
          )}
        </Container>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setError("")}
      >
        <Alert severity="error" onClose={() => setError("")}>
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
