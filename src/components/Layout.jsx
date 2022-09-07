import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Logo from "../../src/assets/logo.png";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { NavLinks } from "../content";

// const NavLinks = import.meta.glob("../content", { import: "NavLinks" });

const drawerWidth = 240;

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [screenWidth, setScreenWidth] = useState(undefined);

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    if (isDrawerOpen && screenWidth <= 900) {
      setIsDrawerOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenWidth]);

  useEffect(() => {
    if (screenWidth <= 900) {
      setIsDrawerOpen(false);
    } else {
      setIsDrawerOpen(true);
    }
  }, [screenWidth, setIsDrawerOpen]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "#068488",
        }}
        style={{ width: !isDrawerOpen ? "100%" : "" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              border: "1px solid white",
              display: "flex",
              gap: "5px",
              p: 1,
              borderRadius: "5px",
            }}
          >
            <SearchIcon sx={{ color: "#f2f2f2" }} />
            <input
              type="text"
              placeholder="Search for recipe"
              style={{
                backgroundColor: "transparent",
                outline: "none",
                border: "none",
                color: "#fff",
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {isDrawerOpen && (
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#068488",
                fontWeight: "bold",
              }}
            >
              <img
                src={Logo}
                alt="eat healthy logo"
                style={{
                  width: "20%",
                  backgroundColor: "transparent",
                }}
              />
              Eat Healthy
            </Typography>
          </Toolbar>
          <Divider />
          <List>
            {NavLinks.map((link) => (
              <ListItem
                key={link.id}
                disablePadding
                onClick={() => {
                  navigate(link.path);
                  handleCloseSidebar();
                }}
                style={{
                  backgroundColor:
                    location.pathname === link.path ? "rgba(0,0,0,0.05)" : "",
                }}
              >
                <ListItemButton>
                  <ListItemIcon style={{ color: "#068488" }}>
                    {<link.icon />}
                  </ListItemIcon>
                  <ListItemText primary={link.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
