import React from "react";
import { Paper, InputBase, Divider, IconButton } from "@mui/material";
import { Box } from "@mui/system";

import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import SearchBarFilterMenu from "./SearchBarFilterMenu";

export default function SearchBarStandard(props) {
  const { onChange, setSortBy, sortBy } = props;

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

      <SearchBarFilterMenu anchorEl={anchorEl} handleClose={handleClose} open={open} activeItem={sortBy} setActiveItem={setSortBy} />
    </Box>
  );
}
