import React from "react";

import "./main-layout.css";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";

import RunView from "../RunView/RunView";
import RunList from "../RunList/RunList";
import RunCreator from "../RunCreator/RunCreator";
import ExitRunDialog from "../Dialogs/ExitRunDialog";
import ExitSummaryDialog from "../Dialogs/ExitSummaryDialog";
import SummaryView from "../SummaryView/SummaryView";

import { useHistory } from "react-router-dom";
import { Box } from "@mui/system";
import RunTimer from "../RunTimer/RunTimer";

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

  const [runData, setRunData] = React.useState([]);
  const [gameData, setGameData] = React.useState({});
  const [gameTime, setGameTime] = React.useState(0);

  //const history = useHistory();

  const handleExitGame = () => {
    setOpenExitDialog(false);
    setIsActiveGame(false);

    setGameData(undefined);
    setRunData([]);
  };

  const handleLeaveSummary = () => {
    //Upload data
    setOpenExitDialog(false);
    setIsActiveGame(false);
    setShowSummary(false);
  };

  const handleCloseExitDialog = () => {
    setOpenExitDialog(false);
  };

  const handleOpenExitDialog = () => {
    if (showSummary) {
      setOpenExitSummaryDialog(true);
    } else {
      setOpenExitDialog(true);
    }
  };

  React.useEffect(() => {
    if (gameData && Object.entries(gameData).length > 0) {
      setIsActiveGame(true);
    }
  }, [gameData]);

  const renderConditionalView = () => {
    if (showSummary) {
      return <SummaryView runData={runData} gameData={gameData} gameTime={gameTime}></SummaryView>;
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
        <div className="container ">
          <h2 className="diablo-text" style={{ position: "absolute", bottom: "70%", color: "white" }}>
            START NEW RUN
          </h2>
          <RunCreator setGameData={setGameData}></RunCreator>
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
      {isActiveGame && (
        <div className="totalRunTime">
          <RunTimer setGameTime={setGameTime} showSummary={showSummary} />
        </div>
      )}
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
    </>
  );
}
