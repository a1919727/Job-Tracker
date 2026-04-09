import { Box } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";
import type { JobStatus } from "../types/job.types";

type DroppableProps = {
  id: JobStatus;
  children: React.ReactNode;
};

export default function DroppableColumn({ id, children }: DroppableProps) {
  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: "column",
      status: id,
    },
  });

  return <Box ref={setNodeRef}>{children}</Box>;
}
