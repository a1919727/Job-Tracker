import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/material";
import { useDraggable } from "@dnd-kit/core";
import type { ApiJob } from "../types/job.types";

type DraggableProps = {
  job: ApiJob;
  children: React.ReactNode;
};

export default function DraggableJobCard({ job, children }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: job._id,
    data: {
      type: "job",
      supports: ["column"],
      jobId: job._id,
      currentStatus: job.status,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Box ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </Box>
  );
}
