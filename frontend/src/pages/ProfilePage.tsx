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

const palette = {
  panel: "#f7fbff",
  title: "#1f4e79",
  primary: "#3a7fc4",
  primaryHover: "#2f6eac",
  border: "#bfd9f2",
  link: "#2f73b7",
  text: "#29506f",
};

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [linkedln, setLinkedln] = useState("");
  const [github, setGithub] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

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
        if (response.data.password) {
          setPassword("");
        }
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
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Missing auth token");
      }

      const data: Record<string, string> = {
        username: username.trim(),
        email: email.trim(),
        linkedln: linkedln.trim(),
        github: github.trim(),
      };

      if (password.trim()) {
        data.password = password.trim();
      }

      const response = await axios.put(`${API_BASE_URL}/api/user/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setUsername(response.data.username || "");
      setEmail(response.data.email || "");
      setPassword(response.data.password);
      setLinkedln(response.data.linkedln || "");
      setGithub(response.data.github || "");
      setMessage("Update profile successfully");
      setError("");
    } catch (error) {
      console.log("Failed to update profile", error);
      setError("Failed to update profile");
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
                    Password
                  </Typography>
                  <TextField
                    type="password"
                    label="New password"
                    placeholder="Change your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                }}
              >
                {loading ? "Updating..." : "Update profile"}
              </Button>
            </Stack>
          </Paper>
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
      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setMessage("")}
      >
        <Alert severity="success" onClose={() => setMessage("")}>
          <AlertTitle>Success</AlertTitle>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
