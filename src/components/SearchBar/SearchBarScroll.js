import React from "react";
import { Paper, Divider, IconButton } from "@mui/material";
import { Box } from "@mui/system";

import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import SearchBarFilterMenu from "./SearchBarFilterMenu";

export default function SearchBarScroll(props) {
  const { sortBy, setSortBy } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchClick = (event) => {
    event?.preventDefault();
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ display: "flex", ml: "15px", position: "fixed", zIndex: 2, top: "15px" }}>
      <Paper
        elevation={5}
        className="paper-design"
        sx={{
          p: "2px 4px",
          width: "100px",
          display: "flex",
          alignItems: "center",
        }}>
        <IconButton color="primary" size="small" sx={{ m: "5px" }} aria-label="directions" type="submit" onClick={handleSearchClick}>
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
