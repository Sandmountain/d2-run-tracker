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

import { fetchHistory, fetchActiveRun, clearActiveRun } from "../../../Firebase/firebase.js";

import { useHistory } from "react-router-dom";
import RunTimer from "../RunTimer/RunTimer";

import data from "../../../data/testdata.json";
import ItemCard from "../../../components/ItemCard/ItemCard";
import { Button } from "@mui/material";

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

  const [retrivedData, setRetrivedData] = React.useState({});

  const [open, setOpen] = React.useState(false);

  //const history = useHistory();

  const handleExitGame = () => {
    setOpenExitDialog(false);
    setIsActiveGame(false);

    setGameData(undefined);
    setRunData([]);
    clearActiveRun();
  };

  const handleLeaveSummary = () => {
    //Upload data
    setOpenExitSummaryDialog(false);
    setIsActiveGame(false);
    setShowSummary(false);
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

  React.useEffect(() => {
    if (gameData && Object.entries(gameData).length > 0) {
      setIsActiveGame(true);
    }
  }, [gameData]);

  React.useEffect(() => {
    async function getData() {
      const data = await fetchActiveRun();

      if (Object.keys(data).length > 0) {
        setRetrivedData(data);
        setOpenUnfishiedRunDialog(true);
      }
    }
    getData();
  }, []);

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
          <h2
            data-for="soclose"
            data-tip={JSON.stringify({ item: "lol" })}
            className="diablo-text"
            style={{ position: "absolute", bottom: "70%", color: "white" }}>
            START NEW RUN
          </h2>
          <Tooltip
            open={open}
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "rgba(0,0,0,0.0)",
                  "& .MuiTooltip-arrow": {
                    color: "common.black",
                  },
                },
              },
            }}
            placement="top"
            title={
              <>
                <ItemCard item={data[33]} tooltip={true}></ItemCard>
              </>
            }>
            <Button onClick={() => setOpen((state) => !state)}> Hover for Item</Button>
          </Tooltip>

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
