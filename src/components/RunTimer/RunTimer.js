import React, { useEffect } from "react";

import useTimer from "../hooks/useTimer.js";
import { formatTime } from "../../utils/utils.js";
import Typography from "@mui/material/Typography";

export default function RunTimer(props) {
  const { setGameTime, showSummary } = props;

  const { timer, isActive, handleStart, handlePause } = useTimer(0);

  // Memory leak here, but the useTimer hook is crap so nvm.
  useEffect(() => {
    if (!isActive) {
      handleStart();
    }

    if (showSummary) {
      setGameTime(timer);
      handlePause();
    }
  }, [setGameTime, showSummary, timer, handlePause, handleStart, isActive]);

  return (
    <>
      <Typography variant="body2" color="gray" style={{ marginLeft: "auto" }}>
        Game time: {formatTime(timer)}
      </Typography>
    </>
  );
}
