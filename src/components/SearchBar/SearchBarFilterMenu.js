import React from "react";

import { Divider, MenuItem, Menu, ListItemIcon, Typography } from "@mui/material";
import Check from "@mui/icons-material/Check";

import "./search-bar.css";

export default function SearchBarFilterMenu(props) {
  const { anchorEl, handleClose, open, activeItem, setActiveItem } = props;
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
      <Typography align="center" className="diablo-text caps">
        Sort By
      </Typography>
      <Divider />
      <MenuItem className="diablo-text caps searchBar-menu--item" onClick={() => setActiveItem("rarity")}>
        {activeItem === "rarity" && (
          <ListItemIcon size="small">
            <Check sx={{ height: "0.7em", width: "0.7em" }} />
          </ListItemIcon>
        )}
        Rarity
      </MenuItem>
      <MenuItem className="diablo-text caps  searchBar-menu--item" onClick={() => setActiveItem("level")}>
        {activeItem === "level" && (
          <ListItemIcon>
            <Check sx={{ height: "0.7em", width: "0.7em" }} />
          </ListItemIcon>
        )}
        Level
      </MenuItem>
      <MenuItem className="diablo-text caps searchBar-menu--item" onClick={() => setActiveItem("found")}>
        {activeItem === "found" && (
          <ListItemIcon>
            <Check sx={{ height: "0.7em", width: "0.7em" }} />
          </ListItemIcon>
        )}
        Found Items
      </MenuItem>
    </Menu>
  );
}
