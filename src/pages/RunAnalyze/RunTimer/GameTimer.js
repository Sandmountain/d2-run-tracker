import React, { useEffect } from "react";

import useTimer from "../../../hooks/useTimer.js";
import { formatTime } from "../../../utils/utils.js";
import Typography from "@mui/material/Typography";

export default function GameTimer(props) {
  const { setGameTime, showSummary, isActiveGame } = props;

  const { timer, isActive, handleStart, handlePause } = useTimer(0);

  useEffect(() => {
    if (!isActive && isActiveGame) {
      handleStart();
    }

    if (showSummary) {
      setGameTime(timer);
      handlePause();
    }
  }, [setGameTime, showSummary, timer, handlePause, handleStart, isActive, isActiveGame]);

  return (
    <>
      {isActiveGame && (
        <Typography variant="body2" color="gray" style={{ marginLeft: "auto" }}>
          Game time: {formatTime(timer)}
        </Typography>
      )}
    </>
  );
}
