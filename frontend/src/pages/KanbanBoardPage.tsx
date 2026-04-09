import { useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  Divider,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddJobDialog from "../components/AddJobDialog";
import type { JobFormData, JobStatus, ApiJob } from "../types/job.types";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Draggable from "../components/Draggable";
import Droppable from "../components/Droppable";

const columns: Array<{
  id: JobStatus;
  title: string;
  accent: string;
}> = [
  {
    id: "Saved",
    title: "Saved",
    accent: "#7d8ea3",
  },
  {
    id: "Applied",
    title: "Applied",
    accent: "#1f6fb2",
  },
  {
    id: "Interview",
    title: "Interview",
    accent: "#c07b16",
  },
  {
    id: "Rejected",
    title: "Rejected",
    accent: "#b05454",
  },
  {
    id: "Offer",
    title: "Offer",
    accent: "#2a8a62",
  },
];

export default function KanbanBoardPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<ApiJob[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogStatus, setDialogStatus] = useState<JobStatus>("Saved");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeJobId, setActiveJobId] = useState<string | null>(null);

  const openAddDialog = (status: JobStatus) => {
    setDialogStatus(status);
    setDialogOpen(true);
  };

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
        setJobs(jobsFromApi);
      } catch (error) {
        console.log("Failed to fetch jobs", error);
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleAddCard = async (values: JobFormData) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        throw new Error("Missing auth token");
      }

      const response = await axios.post(
        "http://localhost:5001/api/job/",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const newJob = response.data.job;
      setJobs((current) => [newJob, ...current]);
      setDialogOpen(false);
    } catch (error) {
      console.log("Failed to add card", error);
      setError("Failed to add card. Please sign in again if needed.");
    }
  };

  const handleDragStart = (event: any) => {
    setActiveJobId(String(event.active.id));
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    setActiveJobId(null);

    if (!over) return;
    if (!active.data.current?.supports?.includes(over.data.current?.type)) {
      return;
    }

    const jobId = active.data.current?.jobId;
    const nextStatus = over.data.current?.status;

    if (!jobId || !nextStatus) return;

    const draggedJob = jobs.find((job) => job._id === jobId);
    if (!draggedJob || draggedJob.status === nextStatus) return;

    setJobs((current) =>
      current.map((job) =>
        job._id === jobId ? { ...job, status: nextStatus } : job,
      ),
    );
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Missing auth token");
      }

      await axios.put(
        `http://localhost:5001/api/job/${jobId}`,
        {
          companyName: draggedJob.companyName,
          jobTitle: draggedJob.jobTitle,
          status: nextStatus,
          applicationDate: draggedJob.applicationDate || "",
          location: draggedJob.location,
          jobUrl: draggedJob.jobUrl,
          notes: draggedJob.notes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
    } catch (error) {
      console.log("Failed to drag job", error);
      setError("Failed to drag jobs");
    }
  };
  const handleDragCancel = () => {
    setActiveJobId(null);
  };

  const handleViewAnalytics = () => {
    navigate("/analytics");
  };

  const activeJob = jobs.find((job) => job._id === activeJobId);

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
                  Track your jobs
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: "rgba(22, 50, 74, 0.72)" }}
                >
                  Organise your applications and track each stage.
                </Typography>
              </Box>
              <Button
                variant="outlined"
                sx={{ fontWeight: "bold" }}
                onClick={handleViewAnalytics}
              >
                View analytics
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
                Loading jobs...
              </Typography>
            </Paper>
          ) : (
            <DndContext
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragCancel={handleDragCancel}
            >
              <Box
                sx={{
                  mt: 3,
                  overflowX: "auto",
                  pb: 1,
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      lg: "repeat(5, minmax(260px, 1fr))",
                    },
                    gap: 2,
                    alignItems: "start",
                    minWidth: { xs: "100%", lg: 1360 },
                  }}
                >
                  {columns.map((column) => {
                    const cards = jobs.filter(
                      (job) => job.status === column.id,
                    );

                    return (
                      <Droppable key={column.id} id={column.id}>
                        <Paper
                          key={column.id}
                          elevation={0}
                          sx={{
                            minHeight: { xs: "auto", lg: 520 },
                            borderRadius: 5,
                            p: 2,
                            bgcolor: "rgba(255,255,255,0.68)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(31, 78, 121, 0.08)",
                          }}
                        >
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            spacing={2}
                          >
                            <Typography
                              variant="h6"
                              sx={{ color: "#16324a", fontWeight: 700 }}
                            >
                              {column.title}
                            </Typography>

                            <Chip
                              label={cards.length}
                              size="small"
                              sx={{
                                bgcolor: `${column.accent}18`,
                                color: column.accent,
                                fontWeight: 700,
                              }}
                            />
                          </Stack>

                          <Divider sx={{ my: 2 }} />

                          <Stack spacing={2}>
                            {cards.length === 0 && (
                              <Typography
                                variant="body2"
                                sx={{ color: "rgba(23, 50, 77, 0.55)" }}
                              >
                                No jobs
                              </Typography>
                            )}

                            {cards.map((job) => (
                              <Draggable key={job._id} job={job}>
                                <Paper
                                  elevation={0}
                                  sx={{
                                    borderRadius: 4,
                                    p: 2,
                                    bgcolor: "#ffffff",
                                    border: "1px solid rgba(31, 78, 121, 0.08)",
                                    boxShadow:
                                      "0 12px 30px rgba(40, 68, 94, 0.06)",
                                  }}
                                >
                                  <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    spacing={2}
                                  >
                                    <Stack
                                      direction="row"
                                      spacing={1.5}
                                      alignItems="center"
                                    >
                                      <Avatar
                                        sx={{
                                          width: 42,
                                          height: 42,
                                          bgcolor: `${column.accent}22`,
                                          color: column.accent,
                                          fontWeight: 700,
                                        }}
                                      >
                                        {job.companyName?.[0] || ""}
                                      </Avatar>

                                      <Box>
                                        <Typography
                                          variant="subtitle1"
                                          sx={{
                                            color: "#17324d",
                                            fontWeight: 700,
                                          }}
                                        >
                                          {job.jobTitle}
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          sx={{
                                            color: "rgba(23, 50, 77, 0.68)",
                                          }}
                                        >
                                          {job.companyName}
                                        </Typography>
                                      </Box>
                                    </Stack>

                                    <Chip
                                      label={column.title}
                                      size="small"
                                      sx={{
                                        bgcolor: `${column.accent}16`,
                                        color: column.accent,
                                        fontWeight: 600,
                                      }}
                                    />
                                  </Stack>

                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: "#53708c",
                                      mt: 2,
                                      mb: 1.5,
                                    }}
                                  >
                                    {job.location || "No location provided"}
                                  </Typography>

                                  <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{ mt: 1.5 }}
                                  ></Stack>
                                </Paper>
                              </Draggable>
                            ))}

                            <Button
                              variant="text"
                              onClick={() => openAddDialog(column.id)}
                              sx={{
                                alignSelf: "flex-start",
                                color: "#2f73b7",
                                textTransform: "none",
                                fontWeight: 600,
                              }}
                            >
                              + Add card
                            </Button>
                          </Stack>
                        </Paper>
                      </Droppable>
                    );
                  })}
                </Box>
              </Box>
              <DragOverlay>
                {activeJob ? (
                  <Paper
                    elevation={6}
                    sx={{
                      borderRadius: 5,
                      p: 2,
                      bgcolor: "rgba(255,255,255,0.68)",
                      border: "1px solid rgba(31, 78, 121, 0.08)",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "#17324d", fontWeight: 700 }}
                    >
                      {activeJob.jobTitle}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(23, 50, 77, 0.68)" }}
                    >
                      {activeJob.companyName}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#53708c", mt: 2 }}
                    >
                      {activeJob.location || "No location provided"}
                    </Typography>
                  </Paper>
                ) : null}
              </DragOverlay>
            </DndContext>
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

      <AddJobDialog
        open={dialogOpen}
        initialStatus={dialogStatus}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleAddCard}
      />
    </>
  );
}
