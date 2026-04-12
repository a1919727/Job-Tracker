import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Snackbar,
  Alert,
  AlertTitle,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { API_BASE_URL } from "../config/api";

export default function SignInSide() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const palette = {
    panel: "#f7fbff",
    title: "#1f4e79",
    primary: "#3a7fc4",
    primaryHover: "#2f6eac",
    border: "#bfd9f2",
    link: "#2f73b7",
    text: "#29506f",
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      console.log("Log in successfully", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/Dashboard");
    } catch (error) {
      console.log("Failed to login", error);
      setError("Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          size={{ xs: 0, sm: 4, md: 7 }}
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            px: { sm: 4, md: 7 },
            background:
              "linear-gradient(0deg, rgba(186, 195, 224, 1) 0%, rgba(211, 225, 235, 1) 87%)",
            backgroundColor: "#bac3e0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              maxWidth: 500,
              color: "#17324d",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                mb: 2,
              }}
            >
              Job Tracker
            </Typography>

            <Typography
              variant="h6"
              sx={{
                lineHeight: 1.6,
                color: "rgba(23, 50, 77, 0.78)",
              }}
            >
              Track applications, monitor progress, and never miss an
              opportunity.
            </Typography>
          </Box>
        </Grid>
        <Grid
          size={{ xs: 12, sm: 8, md: 5 }}
          component={Paper}
          elevation={6}
          square
          sx={{
            bgcolor: palette.panel,
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              p: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontWeight: "bold", color: palette.title }}
            >
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleLogin}
              sx={{ mt: 1, width: "100%", maxWidth: 480 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      sx={{
                        color: palette.primary,
                        "&.Mui-checked": {
                          color: palette.primary,
                        },
                      }}
                    />
                  }
                  label="Remember me"
                  sx={{ m: 0, color: palette.text }}
                />
                <Link
                  href="#"
                  variant="body2"
                  underline="none"
                  sx={{ color: palette.link, fontWeight: 500 }}
                >
                  Forgot password?
                </Link>
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: palette.primary,
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: palette.primaryHover,
                    boxShadow: "none",
                  },
                }}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
              <Grid container>
                <Grid size={{ sm: 12 }}>
                  <Link
                    href="/signup"
                    variant="body2"
                    underline="none"
                    sx={{ color: palette.link, fontWeight: 500 }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
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
    </Grid>
  );
}
