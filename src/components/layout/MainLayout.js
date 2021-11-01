import React from "react";

import "./main-layout.css";
import img from "./pngegg.png";
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
import RunTimer from "../RunTimer/RunTimer";
import GenerateSocketImage from "../GenerateSocketImage/GenerateSocketImage";

export default function MainLayout() {
  const [runData, setRunData] = React.useState([]);

  const [isActiveGame, setIsActiveGame] = React.useState(false);
  const [openExitDialog, setOpenExitDialog] = React.useState(false);
  const [gameData, setGameData] = React.useState(undefined);

  const handleOpenExitDialog = () => {
    setOpenExitDialog(true);
  };

  const handleExitGame = () => {
    setOpenExitDialog(false);
    setIsActiveGame(false);

    //TODO: Save game data
    setGameData(undefined);
  };

  const handleCloseExitDialog = () => {
    setOpenExitDialog(false);
  };

  React.useEffect(() => {
    if (gameData) {
      setIsActiveGame(true);
    }
  }, [gameData]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div" display="flex" alignItems="center">
              <Avatar alt="Remy Sharp" src={img} style={{ marginRight: "10px" }} />
              <span className="diablo-text shadow">Diablo Runtracker</span>
            </Typography>
            {isActiveGame && <RunTimer></RunTimer>}
          </Toolbar>
        </AppBar>
      </Box>
      <div className="container">
        {!isActiveGame && (
          <h2 className="diablo-text" style={{ position: "absolute", bottom: "70%", color: "white" }}>
            START NEW RUN
          </h2>
        )}
        {!isActiveGame ? (
          <RunCreator setGameData={setGameData}></RunCreator>
        ) : (
          <>
            <RunView setRunData={setRunData} runData={runData} gameData={gameData}></RunView>
            <div className="runList-container">
              <RunList runData={runData}></RunList>
            </div>

            <Tooltip title="Exit Run and show summary">
              <Fab
                color="primary"
                onClick={handleOpenExitDialog}
                style={{ position: "absolute", top: 63, right: 15 }}
                onClick={handleOpenExitDialog}>
                <ExitToAppIcon></ExitToAppIcon>
              </Fab>
            </Tooltip>

            <ExitRunDialog
              openExitDialog={openExitDialog}
              handleCloseExitDialog={handleCloseExitDialog}
              handleExitGame={handleExitGame}></ExitRunDialog>
          </>
        )}
      </div>
    </>
  );
}
