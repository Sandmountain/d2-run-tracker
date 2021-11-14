import React from "react";

import "./main-layout.css";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/system";

import RunView from "../RunView/RunView";
import RunList from "../RunList/RunList";
import SummaryView from "../SummaryView/SummaryView";
import RunCreator from "../RunCreator/RunCreator";

import ExitRunDialog from "../../../components/Dialogs/ExitRunDialog";
import ExitSummaryDialog from "../../../components/Dialogs/ExitSummaryDialog";
import UnfinshiedRunDialog from "../../../components/Dialogs/UnfinishedRunDialog";

import { fetchActiveRun, clearActiveRun, fetchHistory } from "../../../Firebase/firebase.js";
import RunTimer from "../RunTimer/RunTimer";
import RunHistory from "../RunHistory/RunHistory";

// const mockGameData = {
//   name: "Random Name",
//   class: "Sorceress",
//   level: "67",
//   runType: "Mephisto",
//   cooldownTimer: 15,
// };

export default function RunLayout() {
  const [isActiveGame, setIsActiveGame] = React.useState(false);
  const [showSummary, setShowSummary] = React.useState(false);

  const [openExitDialog, setOpenExitDialog] = React.useState(false);
  const [openExitSummaryDialog, setOpenExitSummaryDialog] = React.useState(false);
  const [openUnfishiedRunDialog, setOpenUnfishiedRunDialog] = React.useState(false);

  const [runData, setRunData] = React.useState([]);
  const [gameData, setGameData] = React.useState({});
  const [gameTime, setGameTime] = React.useState(0);
  const [structuredLoot, setStructuredLoot] = React.useState({});

  const [retrivedData, setRetrivedData] = React.useState({});
  const [runHistory, setRunHistory] = React.useState([]);

  const handleExitGame = () => {
    setOpenExitDialog(false);
    setIsActiveGame(false);

    setGameData(undefined);
    setRunData([]);
    clearActiveRun();
  };

  const handleLeaveSummary = () => {
    setOpenExitSummaryDialog(false);
    setIsActiveGame(false);
    setShowSummary(false);

    // Reset data
    setStructuredLoot({});
    setGameData(undefined);
    setRunData([]);
    setGameTime(0);
    setStructuredLoot({});
  };

  const handleCloseExitDialog = () => {
    setOpenExitDialog(false);
  };

  // FAB that triggers this are in both screens
  const handleOpenExitDialog = () => {
    if (showSummary) {
      setOpenExitSummaryDialog(true);
    } else {
      setOpenExitDialog(true);
    }
  };

  // Remove Active Data
  const handleUnfishiedRunClose = () => {
    clearActiveRun();
    setOpenUnfishiedRunDialog(false);
  };

  // Remove active data and set temp data to the real data.
  const handleUnfishiedRunAccept = () => {
    clearActiveRun();
    setOpenUnfishiedRunDialog(false);
    setGameData(retrivedData.gameData);
    setRunData(retrivedData.runData);
    setIsActiveGame(true);
  };

  // When opening an old run from history menu
  const openOldSummary = (oldRunData) => {
    console.log(oldRunData);
    setGameTime(oldRunData.gameTime);
    setGameData(oldRunData.gameData);
    setRunData(oldRunData.runData);
    setStructuredLoot(oldRunData.loot);
    setShowSummary(true);
  };

  React.useEffect(() => {
    if (gameData && Object.entries(gameData).length > 0) {
      setIsActiveGame(true);
    }
  }, [gameData]);

  React.useEffect(() => {
    async function getHistoryData() {
      if (!isActiveGame) {
        setRunHistory(await fetchHistory());
      }
    }
    getHistoryData();
  }, [isActiveGame]);

  React.useEffect(() => {
    async function getData() {
      const activeRun = await fetchActiveRun();
      if (Object.keys(activeRun).length > 0) {
        setRetrivedData(activeRun);
        setOpenUnfishiedRunDialog(true);
      }

      setRunHistory(await fetchHistory());
    }
    getData();
  }, []);

  const renderConditionalView = () => {
    if (showSummary) {
      return <SummaryView runData={runData} gameData={gameData} gameTime={gameTime} loot={structuredLoot}></SummaryView>;
    }

    if (isActiveGame) {
      return (
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height: "calc(100% - 48px)",
          }}>
          <RunView
            setRunData={setRunData}
            runData={runData}
            gameData={gameData}
            setShowSummary={setShowSummary}
            setIsActiveGame={setIsActiveGame}></RunView>
          {runData.length > 0 && (
            <div className="runList-container">
              <RunList runData={runData}></RunList>
            </div>
          )}
        </Box>
      );
    } else {
      return (
        <div className="container">
          <h2 className="diablo-text" style={{ position: "absolute", bottom: "70%", color: "white" }}>
            START NEW RUN
          </h2>

          <RunCreator setGameData={setGameData}></RunCreator>
          {<RunHistory runHistory={runHistory} openOldSummary={openOldSummary} setRunHistory={setRunHistory}></RunHistory>}
        </div>
      );
    }
  };

  return (
    <>
      {renderConditionalView()}
      {(isActiveGame || showSummary) && (
        <Tooltip title={isActiveGame ? "Exit and end run" : "Exit to Main Screen"}>
          <Fab color="primary" onClick={handleOpenExitDialog} style={{ position: "absolute", top: 63, right: 15 }}>
            <ExitToAppIcon></ExitToAppIcon>
          </Fab>
        </Tooltip>
      )}

      <div className="totalRunTime">
        <RunTimer setGameTime={setGameTime} showSummary={showSummary} isActiveGame={isActiveGame} />
      </div>

      <ExitRunDialog
        openExitDialog={openExitDialog}
        handleCloseExitDialog={handleCloseExitDialog}
        handleExitGame={handleExitGame}
        showSummary={showSummary}></ExitRunDialog>
      <ExitSummaryDialog
        setOpenExitSummaryDialog={setOpenExitSummaryDialog}
        openExitSummaryDialog={openExitSummaryDialog}
        handleLeaveSummary={handleLeaveSummary}
      />
      <UnfinshiedRunDialog
        openUnfishiedRunDialog={openUnfishiedRunDialog}
        handleUnfishiedRunClose={handleUnfishiedRunClose}
        handleUnfishiedRunAccept={handleUnfishiedRunAccept}
        lostData={retrivedData}
      />
    </>
  );
}
