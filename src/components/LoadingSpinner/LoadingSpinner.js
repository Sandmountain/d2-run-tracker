import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function LoadingSpinner(props) {
  const { text } = props;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <CircularProgress />
      <Typography color="gray" className="diablo-text caps">
        {text}
      </Typography>
    </Box>
  );
}
