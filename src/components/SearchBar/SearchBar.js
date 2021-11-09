import React, { useState, useEffect } from "react";
import {
  Paper,
  InputBase,
  Divider,
  IconButton,
  MenuItem,
  Menu,
  ListItemText,
  ListItemIcon,
  Fade,
  Collapse,
  Grow,
  Slide,
} from "@mui/material";
import { Box } from "@mui/system";

import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import CategoryIcon from "@mui/icons-material/Category";
import ClassIcon from "@mui/icons-material/Class";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SearchBarStandard from "./SearchBarStandard";
import SearchBarScroll from "./SearchBarScroll";

export default function SearchBar(props) {
  const { onChange, text, scrollingSearch } = props;

  return (
    <Box sx={{ mb: "54px" }}>
      <Fade in={!scrollingSearch}>
        <div>
          <SearchBarStandard onChange={onChange} />
        </div>
      </Fade>

      <Slide in={scrollingSearch} direction="right">
        <Box>
          <SearchBarScroll />
        </Box>
      </Slide>
    </Box>
  );
}
