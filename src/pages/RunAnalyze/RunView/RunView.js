import React, { useState } from "react";
import { Button, ButtonGroup, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";

import useTimer from "../../../hooks/useTimer.js";
import { formatTime } from "../../../utils/utils.js";

import ItemDialog from "../../../components/Dialogs/ItemDialog";
import CooldownDialog from "../../../components/Dialogs/CooldownDialog";
import EndRunDialog from "../../../components/Dialogs/EndRunDialog";
import { Prompt } from "react-router-dom";

import { addToActiveRun } from "../../../Firebase/firebase.js";

import "./run-view.css";

let cooldownRef = undefined;

export default function RunView(props) {
  const { setRunData, runData, gameData, setShowSummary, setIsActiveGame, openExitDialog } = props;

  const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(0);
  const [isBlocking, setIsBlocking] = useState(false);
  const [currentRun, setCurrentRun] = useState(!runData.length ? 1 : runData.length + 1);
  const [totaltTime, setTotalTime] = useState(0);

  const [dialogItems, setDialogItems] = useState([]);

  const [openNewRunDialog, setOpenNewRunDialog] = useState(false);

  const [openCooldownDialog, setOpenCooldownDialog] = useState(false);
  const [timeleft, setTimeLeft] = useState(gameData.cooldownTimer);

  const [openEndRunDialog, setOpenEndRunDialog] = useState(false);

  const onNewRun = () => {
    setTotalTime(totaltTime + timer);

    if (!runData.length || runData[runData.length - 1]?.name !== "Run " + currentRun) {
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
    setIsBlocking(true);
  };

  React.useEffect(() => {
    if (runData.length > 0) {
      addToActiveRun({
        gameData: gameData,
        runData: runData,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runData]);

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

  const stopCooldown = () => {
    clearInterval(cooldownRef);
    setOpenCooldownDialog(false);
    onNewRun();
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
    // Also set a soft timer for 10s, this is if the user changes their mind when tracker is running
    if (runData[runData.length - 1]?.name !== "Run " + 12 && timer > 10) {
      addData();
    }
    setOpenEndRunDialog(true);
  };

  return (
    <Box sx={{ position: "relative", top: "30%" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" color="primary" className="diablo-text shadow">
          {gameData.name}
        </Typography>
      </div>
      <Box
        sx={{
          height: "fit-content",
          padding: "15px",
          width: "50vw",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
        }}
        className="runView-container">
        <Typography color="white" className="count-text diablo-text" style={{ width: "33%", textAlign: "start" }}>
          Run {currentRun}
        </Typography>
        <div style={{ width: "33%" }}>
          <ButtonGroup variant="text" aria-label="">
            {!isActive ? <Button onClick={handleStart}>Start Run</Button> : <Button onClick={handleNewRunDialog}>Next Run</Button>}

            {isPaused ? (
              <Tooltip title="Pause timer">
                <Button onClick={handlePause}>
                  <PauseIcon />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip title="Resume timer">
                <Button onClick={isActive ? handleResume : handleStart}>
                  <PlayArrowIcon />
                </Button>
              </Tooltip>
            )}
            {isActive && (
              <Tooltip title="End run and show summary">
                <Button onClick={handleShowSummary}>
                  <StopIcon />
                </Button>
              </Tooltip>
            )}
          </ButtonGroup>
        </div>
        <Typography color="white" variant="h6" className="diablo-text" style={{ width: "33%", textAlign: "end" }}>
          {formatTime(timer)}
        </Typography>
      </Box>
      {openNewRunDialog && (
        <ItemDialog
          openNewRunDialog={openNewRunDialog}
          handleCloseNewRunDialog={handleCloseNewRunDialog}
          setDialogItems={setDialogItems}
          dialogItems={dialogItems}
        />
      )}
      <CooldownDialog
        openCooldownDialog={openCooldownDialog}
        timeleft={timeleft}
        handleShowSummary={handleShowSummary}
        stopCooldown={stopCooldown}
      />
      <EndRunDialog
        openEndRunDialog={openEndRunDialog}
        setOpenEndRunDialog={setOpenEndRunDialog}
        handleGoBackSummaryCooldown={handleGoBackSummaryCooldown}
        openCooldownDialog={openCooldownDialog}
        setShowSummary={setShowSummary}
        setIsActiveGame={setIsActiveGame}
        handleStart={handleStart}
      />

      <Prompt when={isBlocking && !openExitDialog && !openEndRunDialog} message="Are you sure you want to leave?" />
    </Box>
  );
}

// She was also here
