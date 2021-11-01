import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button, ButtonGroup, Tooltip } from "@mui/material";

import "./run-view.css";

import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";

import useTimer from "../hooks/useTimer.js";
import { formatTime } from "../../utils/utils.js";
import RunTimer from "../RunTimer/RunTimer.js";

import ItemDialog from "../Dialogs/ItemDialog";
import CooldownDialog from "../Dialogs/CooldownDialog";
import EndRunDialog from "../Dialogs/EndRunDialog";

let cooldownRef = undefined;

export default function RunView(props) {
  const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(0);

  const { setRunData, runData, gameData, setShowSummary, setIsActiveGame, setGameTime } = props;

  const [currentRun, setCurrentRun] = useState(1);
  const [totaltTime, setTotalTime] = useState(0);

  const [dialogItems, setDialogItems] = useState([]);

  const [openNewRunDialog, setOpenNewRunDialog] = useState(false);

  const [openCooldownDialog, setOpenCooldownDialog] = useState(false);
  const [timeleft, setTimeLeft] = useState(gameData.cooldownTimer);

  const [openEndRunDialog, setOpenEndRunDialog] = useState(false);

  const onNewRun = () => {
    setTotalTime(totaltTime + timer);

    if (runData[runData.length - 1].name !== "Run " + currentRun) {
      addData();
    }

    setCurrentRun(currentRun + 1);

    // Fix so that timer doesn't multiply
    handlePause();
    handleReset();
    handleStart();
    setDialogItems([]);
  };

  const addData = () => {
    setRunData([
      ...runData,
      {
        name: "Run " + currentRun,
        loot: dialogItems,
        time: timer,
      },
    ]);
  };

  const handleNewRunDialog = () => {
    handlePause();
    setOpenNewRunDialog(true);
  };

  const handleCloseNewRunDialog = () => {
    setOpenNewRunDialog(false);
    setOpenCooldownDialog(true);
    startCooldown(gameData.cooldownTimer);
  };

  const startCooldown = (countdownTime) => {
    let time = countdownTime;
    setTimeLeft(time);

    cooldownRef = setInterval(() => {
      if (time <= 1) {
        setOpenCooldownDialog(false);
        clearInterval(cooldownRef);
        onNewRun();
      }
      time -= 1;
      setTimeLeft(time);
    }, 1000);
  };

  const handleGoBackSummaryCooldown = () => {
    let time = timeleft;

    cooldownRef = setInterval(() => {
      if (time <= 1) {
        setOpenCooldownDialog(false);
        clearInterval(cooldownRef);
        onNewRun();
      }
      time -= 1;
      setTimeLeft(time);
    }, 1000);
  };

  const handleShowSummary = () => {
    handlePause();
    clearTimeout(cooldownRef);
    // Prevent data from being added multiple times if going back and fourth.
    if (runData[runData.length - 1].name !== "Run " + currentRun) {
      addData();
    }
    setOpenEndRunDialog(true);
  };

  return (
    <div>
      <div className="totalRunTime">
        <RunTimer setGameTime={setGameTime}></RunTimer>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" color="primary" className="diablo-text shadow">
          {gameData.name}
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
            <Tooltip title="End run and show summary">
              <Button onClick={handleShowSummary}>
                <StopIcon></StopIcon>
              </Button>
            </Tooltip>
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
      <CooldownDialog openCooldownDialog={openCooldownDialog} timeleft={timeleft} handleShowSummary={handleShowSummary}></CooldownDialog>
      <EndRunDialog
        openEndRunDialog={openEndRunDialog}
        setOpenEndRunDialog={setOpenEndRunDialog}
        handleGoBackSummaryCooldown={handleGoBackSummaryCooldown}
        openCooldownDialog={openCooldownDialog}
        setShowSummary={setShowSummary}
        setIsActiveGame={setIsActiveGame}
        handleStart={handleStart}></EndRunDialog>
    </div>
  );
}

// She was also here
