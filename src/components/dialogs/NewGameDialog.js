import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  Box,
  MenuItem,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  Slider,
  Autocomplete,
} from "@mui/material";
import { RockDialog } from "../overriden-mui-components/Dialog/Dialog";

import "./new-game-dialog.css";

export default function NewGameDialog(props) {
  const { openExtrasDialog, setOpenExtrasDialog, setGameData, runName } = props;

  const [role, setRole] = React.useState({ role: "", error: false });
  const [runType, setRunType] = React.useState({ runType: "", error: false });
  const [level, setLevel] = React.useState({ level: undefined, error: false });

  const [cooldownTimer, setCooldownTimer] = React.useState(15);

  const handleRoleChange = (event) => {
    setRole({ role: event.target.value, error: false });
  };

  const classes = ["Amazon", "Assassin", "Necromancer", "Barbarian", "Paladin", "Sorceress", "Druid"];
  const runs = [
    "Crypt",
    "Mausoleum",
    "Secret Cow Level",
    "The Catacombs",
    "The Countess",
    "The Pit",
    "Andariel",
    "Ancient Tunnels",
    "Arcane Sanctuary",
    "Tomb Runs",
    "Maggot Lair",
    "Duriel",
    "Durance of Hate",
    "Forgotten Temple",
    "Lower Kurast",
    "Ruined Fane & Disused Reliquary",
    "The Sewers",
    "Travinical",
    "Mephisto",
    "Outer Steppes",
    "City of the Damned",
    "Plains of Despair",
    "River of Flame",
    "Chaos Sanctuary",
    "Diablo",
    "Frigid Highlands (Shenk & Eldritch)",
    "Pindleskin",
    "Shenk, Eldritch and Pindleskin",
    "Halls of Pain & Halls of Anguish",
    "Nihlathak & Halls of Vaught",
    "World Stone Keep",
    "Baal",
  ];

  const handleCloseNewGameDialog = () => {
    setOpenExtrasDialog(false);
    //setGameData;
  };

  const generateSelectItems = (role, idx) => {
    return (
      <MenuItem key={idx} value={role}>
        {role}
      </MenuItem>
    );
  };

  const handleRunType = (e) => {
    setRunType({ runType: e, error: false });
  };

  const handleSetLevel = (e) => {
    const pattern = new RegExp("^\\d*$");
    if (!e.target.value.match(pattern)) {
      setLevel({ level: undefined, error: true });
    } else {
      setLevel({ level: e.target.value, error: false });
    }
  };

  const onSubmitGameData = () => {
    if (role.role !== "" && runType.runType !== "" && level.level !== undefined) {
      setGameData({
        name: runName,
        class: role.role,
        level: level.level,
        runType: runType.runType,
        cooldownTimer: cooldownTimer,
      });

      handleCloseNewGameDialog();
    }
    if (role.role === "") {
      setRole({ role: "", error: true });
    }
    if (runType.runType === "") {
      setRunType({ runType: "", error: true });
    }
    if (level.level === undefined) {
      setLevel({ level: undefined, error: true });
    }
  };

  return (
    <RockDialog fullWidth maxWidth="sm" open={openExtrasDialog} onClose={handleCloseNewGameDialog}>
      <DialogTitle className="diablo-text">ADD EXTRA GAME OPTIONS</DialogTitle>
      <DialogContent>
        <DialogContentText>Add additional information down below.</DialogContentText>
        <Box sx={{ marginTop: "15px", display: "flex", flexDirection: "row" }}>
          <FormControl variant="filled" style={{ display: "flex", flexDirection: "row", gap: "15px", width: "100%" }}>
            <InputLabel style={{ width: "100%" }} color="info" id="demo-simple-select-label">
              Choose Class
            </InputLabel>
            <Select
              style={{ width: "100%" }}
              size="small"
              error={role.error}
              color="info"
              labelId="demo-simple-select-label"
              value={role.role}
              label="Choose Class"
              sx={{ borderRadius: 0, boxShadow: "0px 2px 3px 1px rgba(0,0,0,.2)" }}
              onChange={handleRoleChange}>
              {classes.map((role, idx) => generateSelectItems(role, idx))}
            </Select>
            <TextField
              error={level.error}
              InputProps={{ sx: { borderRadius: 0, boxShadow: "0px 2px 3px 1px rgba(0,0,0,.2)" } }}
              style={{ width: "30%" }}
              size="small"
              color="info"
              id="outlined-basic"
              label="Level"
              variant="filled"
              onChange={handleSetLevel}
            />
          </FormControl>
        </Box>
        <Box style={{ marginTop: 15 }}>
          <Autocomplete
            freeSolo
            id="combo-box-demo"
            onSubmit={(e) => handleRunType(e.target)}
            onChange={(e, choice) => handleRunType(choice)}
            options={runs}
            renderInput={(params) => (
              <TextField className="override-radius" {...params} error={runType.error} color="info" variant="filled" label="Select run" />
            )}
          />
        </Box>
        <Box style={{ marginTop: 15 }}>
          <Typography>Choose cooldown time between runs (default 15s):</Typography>
          <Slider
            size="small"
            aria-label="Small"
            valueLabelDisplay="auto"
            valueLabelFormat={(val) => val + "s"}
            min={1}
            defaultValue={15}
            max={120}
            onChangeCommitted={(_, val) => setCooldownTimer(val)}></Slider>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onSubmitGameData}>Start New Game</Button>
      </DialogActions>
    </RockDialog>
  );
}
