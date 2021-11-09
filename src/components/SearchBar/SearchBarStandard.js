import React from "react";
import { Paper, InputBase, Divider, IconButton, MenuItem, Menu, ListItemText, ListItemIcon } from "@mui/material";
import { Box } from "@mui/system";

import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import CategoryIcon from "@mui/icons-material/Category";
import ClassIcon from "@mui/icons-material/Class";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function SearchBarStandard(props) {
  const { onChange } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", pt: "15px", justifyContent: "center" }}>
      <Paper
        elevation={5}
        className="paper-design"
        sx={{
          p: "2px 4px",
          width: "400px",
          display: "flex",
          alignItems: "center",
          position: "absolute",
        }}>
        <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Enter an item name" onChange={onChange} autoFocus />

        <IconButton color="primary" size="small" sx={{ m: "5px" }} aria-label="directions" type="submit" onClick={onChange}>
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton size="small" color="primary" sx={{ mr: "5px", ml: "5px" }} aria-label="directions" type="submit" onClick={handleClick}>
          <SortIcon />
        </IconButton>
      </Paper>
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
        <ListItemText> Sort By </ListItemText>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <AutoAwesomeIcon fontSize="small" />
          </ListItemIcon>
          Rarity
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <CategoryIcon fontSize="small" />
          </ListItemIcon>
          Category
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ClassIcon fontSize="small" />
          </ListItemIcon>
          Found Items
        </MenuItem>
      </Menu>
    </Box>
  );
}
