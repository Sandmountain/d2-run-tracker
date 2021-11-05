import React from "react";
import img from "./logo.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div" display="flex" alignItems="center">
            <Avatar alt="Remy Sharp" src={img} style={{ marginRight: "10px" }} />
            <span className="diablo-text shadow">Diablo Runtracker</span>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
