import React, { useEffect } from "react";

import useTimer from "../hooks/useTimer.js";
import { formatTime } from "../../utils/utils.js";
import Typography from "@mui/material/Typography";

export default function RunTimer() {
  const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(0);

  useEffect(() => {
    handleStart();
  }, []);

  return (
    <Typography variant="body2" color="gray" style={{ marginLeft: "auto" }}>
      Total time: {formatTime(timer)}
    </Typography>
  );
}
