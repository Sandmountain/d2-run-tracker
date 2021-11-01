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
import SummaryView from "../SummaryView/SummaryView";

const mockGameData = {
  name: "Random Name",
  class: "Sorcerer",
  level: "67",
  runType: "Mephisto",
  cooldownTimer: 15,
};

const mockData = [
  {
    name: "Run 1",
    loot: [
      {
        name: "Ichorsting",
        url: "ichorsting",
        set: "",
        type: "Crossbow",
        reqLvl: 18,
        rarity: "unique",
      },
    ],
    time: 87,
  },
  {
    name: "Run 2",
    loot: [
      {
        name: "Iratha's Cuff",
        url: "irathas_cuff",
        set: "Iratha's Finery",
        type: "Light Gauntlets",
        reqLvl: 15,
        rarity: "set",
      },
      {
        name: "Cathan's Seal",
        url: "cathans_seal",
        set: "Cathan's Traps",
        type: "Ring",
        reqLvl: 11,
        rarity: "set",
      },
    ],
    time: 144,
  },
  {
    name: "Run 3",
    loot: [
      {
        name: "Kinemils Awl",
        url: "kinemils_awl",
        set: "",
        type: "Giant Sword",
        reqLvl: 23,
        rarity: "unique",
      },
      {
        name: "Isenhart's Parry",
        url: "isenharts_parry",
        set: "Isenhart's Armory",
        type: "Gothic Shield",
        reqLvl: 8,
        rarity: "set",
      },
    ],
    time: 133,
  },
  {
    name: "Run 4",
    loot: [
      {
        name: "Pierre Tombale Couant",
        url: "pierre_tombale_couant",
        set: "",
        type: "Partizan",
        reqLvl: 43,
        rarity: "unique",
      },
    ],
    time: 64,
  },
  {
    name: "Run 5",
    loot: [],
    time: 68,
  },
  {
    name: "Run 6",
    loot: [],
    time: 64,
  },
  {
    name: "Run 7",
    loot: [],
    time: 77,
  },
  {
    name: "Run 8",
    loot: [
      {
        name: "Thul Rune",
        url: "thul_rune",
        set: "",
        type: "Thul rune",
        reqLvl: "",
        rarity: "rune",
      },
    ],
    time: 67,
  },
  {
    name: "Run 9",
    loot: [
      {
        name: "Milabrega's Rod",
        url: "milabregas_rod",
        set: "Milabrega's Regalia",
        type: "War Scepter",
        reqLvl: 17,
        rarity: "set",
      },
    ],
    time: 81,
  },
  {
    name: "Run 10",
    loot: [],
    time: 76,
  },
  {
    name: "Run 11",
    loot: [],
    time: 0,
  },
];

export default function MainLayout() {
  const [isActiveGame, setIsActiveGame] = React.useState(true);
  const [showSummary, setShowSummary] = React.useState(false);

  const [openExitDialog, setOpenExitDialog] = React.useState(false);

  const [runData, setRunData] = React.useState(mockData);
  const [gameData, setGameData] = React.useState(mockGameData);
  const [totalTime, setTotalTime] = React.useState(0);

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
    if (gameData) {
      setIsActiveGame(true);
    }
  }, [gameData]);

  const renderConditionalView = () => {
    if (showSummary) {
      return <SummaryView runData={runData} gameData={gameData} totalTime={totalTime}></SummaryView>;
    }

    if (isActiveGame) {
      return (
        <>
          <RunView
            setRunData={setRunData}
            runData={runData}
            gameData={gameData}
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
            {isActiveGame && <RunTimer setTotalTime={setTotalTime} showSummary={showSummary}></RunTimer>}
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
