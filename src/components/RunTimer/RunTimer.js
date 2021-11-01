import React, { useEffect } from "react";

import useTimer from "../hooks/useTimer.js";
import { formatTime } from "../../utils/utils.js";
import Typography from "@mui/material/Typography";

export default function RunTimer(props) {
  const { setTotalTime, showSummary } = props;

  const { timer, isActive, handleStart, clearInterval } = useTimer(0);

  useEffect(() => {
    if (!isActive) {
      handleStart();
    }

    if (showSummary) {
      clearInterval();
      setTotalTime(timer);
    }
  }, [handleStart, isActive, setTotalTime, showSummary, timer, clearInterval]);

  return (
    <Typography variant="body2" color="gray" style={{ marginLeft: "auto" }}>
      Total time: {formatTime(timer)}
    </Typography>
  );
}
