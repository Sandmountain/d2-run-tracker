import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button, ButtonGroup, Tooltip } from "@mui/material";

import "./run-view.css";

import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import useTimer from "../hooks/useTimer.js";
import { formatTime } from "../../utils/utils.js";

import ItemDialog from "../Dialogs/ItemDialog";
import CooldownDialog from "../Dialogs/CooldownDialog";

export default function RunView(props) {
  const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(0);

  const { setRunData, runData } = props;

  const [currentRun, setCurrentRun] = useState(1);
  const [totaltTime, setTotalTime] = useState(0);

  const [dialogItems, setDialogItems] = useState([]);

  const [runHistory, setRunHistory] = useState([]);

  const [openNewRunDialog, setOpenNewRunDialog] = useState(false);

  const [openCooldownDialog, setOpenCooldownDialog] = useState(false);
  const [timeleft, setTimeLeft] = useState(10);

  const onNewRun = () => {
    setTotalTime(totaltTime + timer);

    setRunData([
      ...runData,
      {
        name: "Run " + currentRun,
        loot: dialogItems,
        time: timer,
      },
    ]);

    setCurrentRun(currentRun + 1);

    // Fix so that timer doesn't multiply
    handlePause();
    handleReset();
    handleStart();
    setDialogItems([]);
  };

  const handleNewRunDialog = () => {
    handlePause();
    setOpenNewRunDialog(true);
  };

  const handleCloseNewRunDialog = () => {
    setOpenNewRunDialog(false);
    setOpenCooldownDialog(true);
    startCooldown(2);
  };

  const startCooldown = (countdownTime) => {
    let time = countdownTime;
    setTimeLeft(time);

    var downloadTimer = setInterval(() => {
      if (time <= 1) {
        setOpenCooldownDialog(false);
        clearInterval(downloadTimer);
        onNewRun();
      }
      time -= 1;
      setTimeLeft(time);
    }, 1000);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" color="primary" className="diablo-text shadow">
          Mephisto 100
        </Typography>
        <Typography variant="body2" color="gray" style={{ alignSelf: "self-end" }}>
          Total time: {formatTime(totaltTime)}
        </Typography>
      </div>
      <Paper
        style={{
          width: "50vw",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 15px",
          textAlign: "center",
        }}>
        <p className="count-text diablo-text" style={{ width: "33%", textAlign: "start" }}>
          Run {currentRun}
        </p>
        <div style={{ width: "33%" }}>
          <ButtonGroup variant="contained" aria-label="">
            {!isActive ? <Button onClick={handleStart}>Start Run</Button> : <Button onClick={handleNewRunDialog}>Next Run</Button>}

            {isPaused ? (
              <Tooltip title="Pause timer">
                <Button onClick={handlePause}>
                  <PauseIcon></PauseIcon>
                </Button>
              </Tooltip>
            ) : (
              <Tooltip title="Resume timer">
                <Button onClick={isActive ? handleResume : handleStart}>
                  <PlayArrowIcon></PlayArrowIcon>
                </Button>
              </Tooltip>
            )}
          </ButtonGroup>
        </div>
        <Typography variant="h6" className="diablo-text" style={{ width: "33%", textAlign: "end" }}>
          {formatTime(timer)}
        </Typography>
      </Paper>

      <ItemDialog
        openNewRunDialog={openNewRunDialog}
        handleCloseNewRunDialog={handleCloseNewRunDialog}
        setDialogItems={setDialogItems}
        dialogItems={dialogItems}></ItemDialog>
      <CooldownDialog openCooldownDialog={openCooldownDialog} timeleft={timeleft}></CooldownDialog>
    </div>
  );
}

// She was also here
