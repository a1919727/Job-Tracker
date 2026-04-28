import { useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
  CssBaseline,
} from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import ChangePasswordDialog from "../components/ChangePasswordDialog";

const palette = {
  panel: "#f7fbff",
  title: "#1f4e79",
  primary: "#3a7fc4",
  primaryHover: "#2f6eac",
  border: "#bfd9f2",
  link: "#2f73b7",
  text: "#29506f",
};

const getToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [linkedln, setLinkedln] = useState("");
  const [github, setGithub] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [passwordDialogLoading, setPasswordDialogLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = getToken();

        if (!token) throw new Error("Missing auth token");

        const response = await axios.get(`${API_BASE_URL}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setUsername(response.data.username || "");
        setEmail(response.data.email || "");
        setLinkedln(response.data.linkedln || "");
        setGithub(response.data.github || "");
      } catch (error) {
        console.log("Failed to fetch profile", error);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Missing auth token");
      }

      const data: Record<string, string> = {
        username: username.trim(),
        email: email.trim(),
        linkedln: linkedln.trim(),
        github: github.trim(),
      };

      const response = await axios.put(`${API_BASE_URL}/api/user/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setUsername(response.data.username || "");
      setEmail(response.data.email || "");
      setLinkedln(response.data.linkedln || "");
      setGithub(response.data.github || "");
      setMessage("Update profile successfully");
      setError("");
    } catch (error) {
      console.log("Failed to update profile", error);
      setError("Failed to update profile");
    }
  };

  const cleanPasswordForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleClose = async () => {
    setPasswordDialog(false);
    cleanPasswordForm();
  };

  const handlePasswordSubmit = async () => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Missing auth token");
      }

      if (!currentPassword || !newPassword || !confirmPassword) {
        setError("Missing current password, new password, or confirm password");
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("New password and confirm passowrd do not match");
        return;
      }

      setPasswordDialogLoading(true);

      const response = await axios.put(
        `${API_BASE_URL}/api/user/change-password`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      setMessage(response.data.message || "Password updated successfully");
      setError("");
      setPasswordDialog(false);
      cleanPasswordForm();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Failed to reset password");
        console.log(error.response);
      } else {
        console.error(error);
      }
    } finally {
      setPasswordDialogLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "radial-gradient(circle at top left, rgba(181, 214, 243, 0.55), transparent 28%), linear-gradient(180deg, #eef6fb 0%, #f8fbfd 48%, #edf2f7 100%)",
          py: { xs: 4, md: 5 },
        }}
      >
        <Container maxWidth="md" sx={{ px: { xs: 2, md: 4 } }}>
          <Paper
            elevation={0}
            sx={{
              mt: 3,
              borderRadius: 6,
              p: { xs: 4, md: 8 },
              m: { xs: 2, md: 6 },
              bgcolor: "rgba(255,255,255,0.82)",
              border: "1px solid rgba(31, 78, 121, 0.08)",
            }}
          >
            <Stack spacing={3} alignItems="center">
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  fontSize: 64,
                  bgcolor: "#d9e7f6",
                  color: "#16324a",
                }}
              >
                {username.charAt(0).toUpperCase()}
              </Avatar>

              <Stack
                spacing={2}
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                  mt: 10,
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
                    variant="h6"
                    sx={{
                      color: "rgba(22, 50, 74, 0.58)",
                      flexShrink: 0,
                      width: 140,
                    }}
                  >
                    Username
                  </Typography>
                  <TextField
                    required
                    id="outlined-required"
                    defaultValue={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    variant="h6"
                    sx={{
                      color: "rgba(22, 50, 74, 0.58)",
                      flexShrink: 0,
                      width: 140,
                    }}
                  >
                    Email
                  </Typography>
                  <TextField
                    required
                    id="outlined-required"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    variant="h6"
                    sx={{
                      color: "rgba(22, 50, 74, 0.58)",
                      flexShrink: 0,
                      width: 140,
                    }}
                  >
                    Linkedln
                  </Typography>
                  <TextField
                    label="Optional"
                    value={linkedln ?? ""}
                    onChange={(e) => setLinkedln(e.target.value)}
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
                    variant="h6"
                    sx={{
                      color: "rgba(22, 50, 74, 0.58)",
                      flexShrink: 0,
                      width: 140,
                    }}
                  >
                    Github
                  </Typography>
                  <TextField
                    label="Optional"
                    value={github ?? ""}
                    onChange={(e) => setGithub(e.target.value)}
                    fullWidth
                  />
                </Box>
              </Stack>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  onClick={() => setPasswordDialog(true)}
                  sx={{
                    mt: 3,
                    mb: 2,
                    bgcolor: palette.primary,
                    boxShadow: "none",
                    "&:hover": {
                      bgcolor: palette.primaryHover,
                      boxShadow: "none",
                    },
                    width: "30%",
                    height: 50,
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                >
                  {loading ? "Changing" : "Change Password"}
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  onClick={handleSubmit}
                  sx={{
                    mt: 3,
                    mb: 2,
                    bgcolor: palette.primary,
                    boxShadow: "none",
                    "&:hover": {
                      bgcolor: palette.primaryHover,
                      boxShadow: "none",
                    },
                    width: "30%",
                    height: 50,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  {loading ? "Updating..." : "Update profile"}
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Container>
      </Box>
      <ChangePasswordDialog
        open={passwordDialog}
        loading={passwordDialogLoading}
        currentPassword={currentPassword}
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        onClose={handleClose}
        onSubmit={handlePasswordSubmit}
        onCurrentPassword={setCurrentPassword}
        onNewPassword={setNewPassword}
        onConfirmPassword={setConfirmPassword}
      />
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
      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setMessage("")}
      >
        <Alert severity="success" onClose={() => setMessage("")}>
          <AlertTitle>Success</AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
