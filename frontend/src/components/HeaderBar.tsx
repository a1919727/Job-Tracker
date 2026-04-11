import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Drawer } from "@mui/material";
import SideBar from "./SideBar";

export default function HeaderBar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/logout",
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      console.log("Log out successfully", response);
      navigate("/login");
    } catch (error) {
      console.log("Failed to log out", error);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(135deg, #6b9fdc 0%, #a8c8f0 100%)",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            <SideBar onClose={toggleDrawer(false)} />
          </Drawer>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            Job Tracker
          </Typography>
          <Button
            color="inherit"
            sx={{ fontWeight: "bold" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
