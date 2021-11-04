import React from "react";

import "./main-layout.css";
import img from "./logo.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";

import RunView from "../RunView/RunView";
import RunList from "../RunList/RunList";
import RunCreator from "../RunCreator/RunCreator";
import ExitRunDialog from "../Dialogs/ExitRunDialog";
import SummaryView from "../SummaryView/SummaryView";

// const mockGameData = {
//   name: "Random Name",
//   class: "Sorceress",
//   level: "67",
//   runType: "Mephisto",
//   cooldownTimer: 15,
// };

export default function MainLayout() {
  const [isActiveGame, setIsActiveGame] = React.useState(false);
  const [showSummary, setShowSummary] = React.useState(false);

  const [openExitDialog, setOpenExitDialog] = React.useState(false);

  const [runData, setRunData] = React.useState([]);
  const [gameData, setGameData] = React.useState({});
  const [gameTime, setGameTime] = React.useState(0);

  const handleExitGame = () => {
    setOpenExitDialog(false);
    setIsActiveGame(false);
    setGameData(undefined);
  };

  const handleCloseExitDialog = () => {
    setOpenExitDialog(false);
  };

  const handleOpenExitDialog = () => {
    setOpenExitDialog(true);
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
        <>
          <RunView
            setRunData={setRunData}
            runData={runData}
            gameData={gameData}
            setGameTime={setGameTime}
            setShowSummary={setShowSummary}
            setIsActiveGame={setIsActiveGame}></RunView>
          <div className="runList-container">
            <RunList runData={runData}></RunList>
          </div>

          <Tooltip title="Stop Run and show summary">
            <Fab color="primary" onClick={handleOpenExitDialog} style={{ position: "absolute", top: 63, right: 15 }}>
              <ExitToAppIcon></ExitToAppIcon>
            </Fab>
          </Tooltip>
        </>
      );
    } else {
      return (
        <>
          <h2 className="diablo-text" style={{ position: "absolute", bottom: "70%", color: "white" }}>
            START NEW RUN
          </h2>
          <RunCreator setGameData={setGameData}></RunCreator>
        </>
      );
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div" display="flex" alignItems="center">
              <Avatar alt="Remy Sharp" src={img} style={{ marginRight: "10px" }} />
              <span className="diablo-text shadow">Diablo Runtracker</span>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="container">{renderConditionalView()}</div>
      <ExitRunDialog
        openExitDialog={openExitDialog}
        handleCloseExitDialog={handleCloseExitDialog}
        handleExitGame={handleExitGame}></ExitRunDialog>
    </>
  );
}
