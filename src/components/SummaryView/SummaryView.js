import { Paper, Typography } from "@mui/material";
import React from "react";

import { formatTime } from "../../utils/utils.js";

import "./summary-view.css";

export default function SummaryView(props) {
  const { gameData, runData, totalTime } = props;

  console.log(gameData, runData, totalTime);

  const calculateTotalTime = (data) => {
    return formatTime(data.reduce((prev, next) => prev + next.time, 0));
  };

  const calculateAvgTime = (data) => {
    const time = Math.round(data.reduce((prev, next) => prev + next.time, 0) / runData.length);
    return formatTime(time);
  };

  return (
    <div className="summaryView-container">
      <Paper style={{ width: "fit-content", margin: "0 auto", padding: 15 }}>
        <div className="runStats-container">
          <img height="150px" className="charImg" src={require(`../../gifs/${gameData.class.toLowerCase()}.gif`).default} alt="" />
          <div className={`charShadow ${gameData.class.toLowerCase()}`}></div>
          <div className="runStats-data">
            <Typography variant="h6" color="primary" className="diablo-text shadow">
              {gameData.name}
            </Typography>
            <div className="dataTable">
              <Typography className="diablo-text caps">Amount of runs:</Typography>
              <Typography className="alignData diablo-text caps">{runData.length} runs</Typography>
              <Typography className="diablo-text caps">Total game time:</Typography>
              <Typography className="alignData diablo-text caps">{totalTime}</Typography>
              <Typography className="diablo-text caps" style={{ width: "100%" }}>
                Total run time:
              </Typography>
              <Typography className="alignData diablo-text caps">{calculateTotalTime(runData)}</Typography>
              <Typography className="diablo-text caps">Average run time:</Typography>
              <Typography className="alignData diablo-text caps">{calculateAvgTime(runData)}</Typography>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
}
