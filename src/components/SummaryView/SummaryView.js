import React from "react";

export default function SummaryView(props) {
  const { gameData, runData, totalTime } = props;

  console.log(gameData, runData, totalTime);

  return <div>WoW great summary!</div>;
}
