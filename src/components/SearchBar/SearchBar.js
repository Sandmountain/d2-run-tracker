import React from "react";
import { Fade } from "@mui/material";
import { Box } from "@mui/system";

import SearchBarStandard from "./SearchBarStandard";
import SearchBarScroll from "./SearchBarScroll";

export default function SearchBar(props) {
  const { onChange, scrollingSearch, setSortBy, sortBy } = props;

  return (
    <Box sx={{ mb: "54px" }}>
      <Fade in={!scrollingSearch}>
        <div>
          <SearchBarStandard onChange={onChange} setSortBy={setSortBy} sortBy={sortBy} />
        </div>
      </Fade>

      <Fade in={scrollingSearch} direction="right">
        <Box>
          <SearchBarScroll setSortBy={setSortBy} />
        </Box>
      </Fade>
    </Box>
  );
}
