import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";
import type { ApiJob, JobStatus } from "../types/job.types";

type AnalyticsPieChartProps = {
  jobs: ApiJob[];
};

const statusColors: Record<JobStatus, string> = {
  Saved: "#c1c7cf",
  Applied: "#9dc9ed",
  Interview: "#f9e0ba",
  Rejected: "#edb2b2",
  Offer: "#acefd3",
};

const statuses: JobStatus[] = [
  "Saved",
  "Applied",
  "Interview",
  "Rejected",
  "Offer",
];

export default function AnalyticsPieChart({ jobs }: AnalyticsPieChartProps) {
  const radius = 55;

  const statusCounts = statuses.map((status) => {
    const value = jobs.filter((job) => job.status === status).length;

    return {
      id: status,
      label: status,
      value,
      color: statusColors[status],
    };
  });

  const chartData = statusCounts.filter((status) => status.value > 0);

  return (
    <Box
      sx={{
        width: "100%",
        p: 4,
        borderRadius: 5,
        bgcolor: "rgba(255,255,255,0.82)",
        border: "1px solid rgba(31, 78, 121, 0.08)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 8,
        }}
      >
        <Typography variant="h6" sx={{ color: "#16324a", fontWeight: 700 }}>
          Job status distribution
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#16324a", fontWeight: "bold" }}
        >
          Total jobs: {jobs.length}
        </Typography>
      </Box>

      {chartData.length === 0 ? (
        <Box
          sx={{
            height: 320,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1" sx={{ color: "#53708c" }}>
            Please add jobs on kanban board
          </Typography>
        </Box>
      ) : (
        <PieChart
          height={400}
          series={[
            {
              data: chartData,
              innerRadius: radius,
              arcLabel: (params) => (params.value > 0 ? params.label : ""),
            },
          ]}
        />
      )}
    </Box>
  );
}
