import React, { useEffect } from "react";
import { Paper, Tooltip, Typography } from "@mui/material";

import GenerateSocketImage from "../../../components/GenerateSocketImage/GenerateSocketImage";
import { formatTime, getColor } from "../../../utils/utils.js";
import ScrollContainer from "react-indiana-drag-scroll";

import "./summary-view.css";
import { Box } from "@mui/system";
import { addToHistory } from "../../../Firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import ItemCard from "../../../components/ItemCard/ItemCard";

export default function SummaryView(props) {
  const { gameData, runData, gameTime, loot = {} } = props;
  const [stucturedLoot, setStructuredLoot] = React.useState({ uncategorized: [], set: [], unique: [], runes: [] });

  useEffect(() => {
    structureLootByRarity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateTotalTime = (data) => {
    return formatTime(data.reduce((prev, next) => prev + next.time, 0));
  };

  const calculateAvgTime = (data) => {
    const time = Math.round(data.reduce((prev, next) => prev + next.time, 0) / runData.length);
    return formatTime(time);
  };

  const structureLootByRarity = () => {
    // When opening an old summary, set structured loot and then return.
    if (Object.keys(loot).length > 0) {
      setStructuredLoot(loot);
      return;
    }

    const tempLoot = {
      uncategorized: [],
      set: [],
      unique: [],
      runes: [],
    };
    runData.forEach((run) => {
      run.loot.forEach((item) => {
        switch (item.rarity) {
          case "set":
            tempLoot.set.push({ item, run: run.name });
            break;
          case "unique":
            tempLoot.unique.push({ item, run: run.name });
            break;
          case "rune":
            tempLoot.runes.push({ item, run: run.name });
            break;
          default:
            tempLoot.uncategorized.push({ item, run: run.name });
            break;
        }
      });
    });

    setStructuredLoot(tempLoot);

    addToHistory({
      id: uuidv4(),
      date: Date.now(),
      loot: tempLoot,
      gameData,
      gameTime,
      runData: runData.map((run) => {
        delete run.loot;
        return run;
      }),
    });
  };

  const generateLootItem = (item, run, index) => {
    return (
      <Tooltip
        key={index}
        placement={"top"}
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: "rgba(0,0,0,0)",
            },
          },
        }}
        title={item.image ? <ItemCard customizable={false} tooltip={true} item={item} /> : "no extra information for custom items"}>
        <div key={index} id={index} className="lootItem-container">
          {item.image && <img loading="lazy" height="40" src={require(`../../../assets/item-art/${item.image}.png`).default} alt="" />}
          {!item.image ? <GenerateSocketImage sockets={item.sockets} summary={true} /> : <div />}
          <span className="lootItem-text summary-text" style={{ color: getColor(item) }}>
            {item.name}
          </span>
          <Typography variant="overline" className="diablo-text" sx={{ lineHeight: 1 }}>
            {run}
          </Typography>
        </div>
      </Tooltip>
    );
  };

  return (
    <div className="summaryView-container">
      <Paper className="runView-container" sx={{ width: "fit-content", margin: "0 auto", padding: "15px 40px" }}>
        <Box className="runStats-container" onDragStart={(e) => e.preventDefault()}>
          <img
            height="150px"
            className="charImg"
            src={require(`../../../assets/gifs/${gameData.class.toLowerCase()}.gif`).default}
            alt=""
          />
          <div className={`charShadow ${gameData.class.toLowerCase()}`} />
          <div className="runStats-data">
            <Typography variant="h6" color="primary" className="diablo-text shadow">
              {gameData.name}
            </Typography>
            <div className="dataTable">
              <Typography variant="body2" className="diablo-text caps">
                Amount of runs:
              </Typography>
              <Typography variant="body2" className="alignData diablo-text caps">
                {runData.length} runs
              </Typography>
              <Typography variant="body2" className="diablo-text caps">
                Total game time:
              </Typography>
              <Typography variant="body2" className="alignData diablo-text caps">
                {gameTime}
              </Typography>
              <Typography variant="body2" className="diablo-text caps" style={{ width: "100%" }}>
                Total run time:
              </Typography>
              <Typography variant="body2" className="alignData diablo-text caps">
                {calculateTotalTime(runData)}
              </Typography>
              <Typography variant="body2" className="diablo-text caps">
                Average run time:
              </Typography>
              <Typography variant="body2" className="alignData diablo-text caps">
                {calculateAvgTime(runData)}
              </Typography>
            </div>
          </div>
        </Box>
      </Paper>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          margin: "40px 15px",
        }}>
        <Typography color="primary" align="center" variant="h4" style={{ marginBottom: 25 }} className="diablo-text shadow caps">
          Loot Summary
        </Typography>
        <Box sx={{ display: "flex", gap: "15px", flexDirection: "column" }}>
          {Object.keys(stucturedLoot).length > 0 && (
            <Paper className="scrollableItem-container runView-container" sx={{ flex: 1 }}>
              <Typography className="diablo-text shadow unique" style={{ width: "7%" }}>
                Unique
              </Typography>
              <ScrollContainer style={{ display: "flex", width: "93%" }} vertical={false}>
                {Object.keys(stucturedLoot).length > 0 &&
                  stucturedLoot.unique.length > 0 &&
                  stucturedLoot.unique.map((item, index) => generateLootItem(item.item, item.run, index))}
              </ScrollContainer>
            </Paper>
          )}
          {Object.keys(stucturedLoot).length > 0 && stucturedLoot.set.length > 0 && (
            <Paper className="scrollableItem-container runView-container" sx={{ flex: 1, overflow: "hidden" }}>
              <Typography className="diablo-text shadow set" style={{ width: "7%" }}>
                Set{" "}
              </Typography>
              <ScrollContainer style={{ display: "flex", width: "93%" }} vertical={false}>
                {stucturedLoot.set.map((item, index) => generateLootItem(item.item, item.run, index))}
              </ScrollContainer>
            </Paper>
          )}
          <Box className="itemBoxes-container">
            {Object.keys(stucturedLoot).length > 0 && stucturedLoot.runes.length > 0 && (
              <Paper className="scrollableItem-container runView-container" sx={{ flex: 1, overflow: "hidden" }}>
                <Typography className="diablo-text shadow crafting" style={{ width: "7%" }}>
                  Runes{" "}
                </Typography>
                <ScrollContainer style={{ display: "flex", width: "93%" }} vertical={false}>
                  {stucturedLoot.runes.map((item, index) => generateLootItem(item.item, item.run, index))}
                </ScrollContainer>
              </Paper>
            )}
            {Object.keys(stucturedLoot).length > 0 && stucturedLoot.uncategorized.length > 0 && (
              <Paper className="scrollableItem-container runView-container" sx={{ flex: 1, overflow: "hidden", paddingLeft: "-6px" }}>
                <Typography className="diablo-text shadow" style={{ width: "10%" }}>
                  <span className="magic">Magic</span> & Normal
                </Typography>
                <ScrollContainer style={{ display: "flex", width: "90%" }} vertical={false}>
                  {stucturedLoot.uncategorized.map((item, index) => generateLootItem(item.item, item.run, index))}
                </ScrollContainer>
              </Paper>
            )}
          </Box>
        </Box>
      </div>
    </div>
  );
}
