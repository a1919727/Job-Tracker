import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

type SideBarPropos = {
  onClose?: () => void;
};
const navPages = [
  {
    label: "Kanban board",
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: <AnalyticsIcon />,
  },
] as const;

const navItems = [
  {
    label: "Profile",
    path: "/profile",
    icon: <AccountCircleIcon />,
  },
  {
    label: "Logout",
    path: "/",
    icon: <LogoutIcon />,
  },
] as const;

export default function SideBar({ onClose }: SideBarPropos) {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("");

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose?.();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("email");

    navigate("/login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return "Missing token";

      const response = await axios.get(`${API_BASE_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setUserName(response.data.username);
    };
    fetchUser();
  }, []);

  return (
    <Box
      sx={{
        width: 250,
      }}
      role="presentation"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
          mb: 2,
        }}
      >
        <Avatar sx={{ width: 56, height: 56, fontSize: 24 }}>
          {userName.charAt(0).toUpperCase()}
        </Avatar>
      </Box>
      <List>
        {navPages.map((page) => (
          <ListItem key={page.label} disablePadding>
            <ListItemButton
              selected={location.pathname === page.path}
              onClick={() => handleNavigate(page.path)}
            >
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                if (item.label === "Logout") {
                  handleLogout();
                } else {
                  handleNavigate(item.path);
                }
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
