import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import type { ChangePasswordDialogProps } from "../types/password.types";
import { Box, Stack, Typography } from "@mui/material";

export default function ChangePasswordDialog({
  open,
  loading,
  currentPassword,
  newPassword,
  confirmPassword,
  onClose,
  onSubmit,
  onCurrentPassword,
  onNewPassword,
  onConfirmPassword,
}: ChangePasswordDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle variant="h5" sx={{ textAlign: "center", mb: 5 }}>
        Change Password
      </DialogTitle>
      <DialogContent>
        <Stack
          spacing={2}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              width: "100%",
              maxWidth: 640,
            }}
          >
            <Typography
              variant="inherit"
              sx={{
                color: "rgba(22, 50, 74, 0.58)",
                flexShrink: 0,
                width: 140,
              }}
            >
              Current Passowrd
            </Typography>
            <TextField
              required
              id="outlined-required"
              defaultValue={currentPassword}
              onChange={(e) => onCurrentPassword(e.target.value)}
              fullWidth
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              width: "100%",
              maxWidth: 640,
            }}
          >
            <Typography
              variant="inherit"
              sx={{
                color: "rgba(22, 50, 74, 0.58)",
                flexShrink: 0,
                width: 140,
              }}
            >
              New Password
            </Typography>
            <TextField
              required
              id="outlined-required"
              defaultValue={newPassword}
              onChange={(e) => onNewPassword(e.target.value)}
              fullWidth
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              width: "100%",
              maxWidth: 640,
            }}
          >
            <Typography
              variant="inherit"
              sx={{
                color: "rgba(22, 50, 74, 0.58)",
                flexShrink: 0,
                width: 140,
              }}
            >
              Confirm Password
            </Typography>
            <TextField
              required
              id="outlined-required"
              defaultValue={confirmPassword}
              onChange={(e) => onConfirmPassword(e.target.value)}
              fullWidth
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            textTransform: "none",
            "&:hover": {
              bgcolor: "#f5f5f5",
              boxShadow: 2,
            },
            fontWeight: 600,
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={onSubmit}
          disabled={loading}
          form="subscription-form"
          sx={{
            textTransform: "none",
            "&:hover": {
              bgcolor: "#f5f5f5",
              boxShadow: 2,
            },
            fontWeight: 600,
          }}
        >
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
