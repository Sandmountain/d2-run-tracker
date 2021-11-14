import React from "react";

import { Box } from "@mui/system";
import { Collapse, Divider, IconButton, ListItemButton, List, ListItemText, Slide } from "@mui/material";
import { DeleteOutline, KeyboardArrowDown } from "@mui/icons-material";

import { deleteHistoryRun } from "../../../Firebase/firebase";

export default function RunHistory(props) {
  const { runHistory, setRunHistory, openOldSummary } = props;
  const [open, setOpen] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    if (runHistory && runHistory.length > 0) {
      setIsLoaded(true);
    }
  }, [runHistory]);

  const itemsFound = ({ loot }) => {
    let uncategorizedItems = "";
    let runeItems = "";
    let setItems = "";
    let uniqueItems = "";

    if (loot.uncategorized.length > 0) {
      uncategorizedItems = <span className="uncategorized">{loot.uncategorized.length}</span>;
    }
    if (loot.runes.length > 0) {
      runeItems = <span className="rune">{loot.runes.length}</span>;
    }
    if (loot.set.length > 0) {
      setItems = <span className="set">{loot.set.length}</span>;
    }
    if (loot.unique.length > 0) {
      uniqueItems = <span className="unique">{loot.unique.length}</span>;
    }

    return (
      <Box sx={{ pr: 1 }}>
        {uncategorizedItems} {runeItems} {setItems} {uniqueItems}
      </Box>
    );
  };

  const deleteEntry = (data) => {
    // Delete Entry in Firestore
    deleteHistoryRun(data);
    // console.log(runHistory);
    // console.log(data);
    // setRunHistory((prev) => prev.map((run) => {

    // }));
  };

  return (
    <Slide direction="left" in={isLoaded}>
      <Box sx={{ position: "absolute", top: "63px", right: "15px", width: "300px", overflow: "hidden" }}>
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", padding: 0 }} dense>
          <Box sx={{}}>
            <ListItemButton
              alignItems="flex-start"
              onClick={() => setOpen(!open)}
              sx={{
                px: 3,
                pt: 1,
                pb: 1,
                color: "white",
                "&:hover, &:focus": { "& svg": { opacity: 1 } },
              }}>
              <ListItemText
                primary="Run History"
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: "medium",
                  lineHeight: "20px",
                }}
                secondary="See your previous runs"
                secondaryTypographyProps={{
                  noWrap: true,
                  fontSize: 12,
                  lineHeight: "16px",
                  color: "rgba(255,255,255,0.5)",
                }}
                sx={{ my: 0 }}
              />

              <KeyboardArrowDown
                sx={{
                  alignSelf: "center",
                  mr: -1,
                  opacity: 1,
                  transform: open ? "rotate(-180deg)" : "rotate(0)",
                  transition: "0.2s",
                }}
              />
            </ListItemButton>
            {open && <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)", boxShadow: "0 1px 1px 1px rgba(0,0,0,.3)" }} />}
            <Collapse orientation="vertical" in={open}>
              <Box
                sx={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  bgcolor: "rgba(24, 24, 24, 0.8)",
                }}>
                {runHistory
                  .map((run, index) => {
                    return (
                      <ListItemButton key={index} sx={{ py: "2px", pr: 1, minHeight: 32, color: "rgba(255,255,255,.8)" }}>
                        <ListItemText
                          onClick={(_, e) => openOldSummary(run)}
                          primary={run.label}
                          primaryTypographyProps={{ fontSize: 14, fontWeight: "medium", maxWidth: "5%", whiteSpace: "nowrap" }}
                          secondary={run.gameData.runType}
                          secondaryTypographyProps={{ fontSize: 10, fontWeight: "thin" }}>
                          {run.gameData.name}
                        </ListItemText>
                        <ListItemText primary={run.label} primaryTypographyProps={{ fontSize: 12, fontWeight: "thin", textAlign: "end" }}>
                          {itemsFound(run)}
                        </ListItemText>
                        <IconButton edge="end" size="small" onClick={() => deleteEntry(run)}>
                          <DeleteOutline></DeleteOutline>
                        </IconButton>
                      </ListItemButton>
                    );
                  })
                  .reverse()}
              </Box>
            </Collapse>
          </Box>
        </List>
      </Box>
    </Slide>
  );
}
