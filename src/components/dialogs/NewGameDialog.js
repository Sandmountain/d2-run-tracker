import React from "react";
import {
  Button,
  Dialog,
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

export default function NewGameDialog(props) {
  const { openExtrasDialog, setOpenExtrasDialog, setGameData, runName } = props;

  const [role, setRole] = React.useState("");
  const [level, setLevel] = React.useState(undefined);
  const [errorLevel, setErrorLevel] = React.useState(false);
  const [runType, setRunType] = React.useState("");
  const [cooldownTimer, setCooldownTimer] = React.useState(15);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
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

  const handleRunType = (_, e) => {
    setRunType(e);
  };

  const handleSetLevel = (e) => {
    const pattern = new RegExp("^\\d*$");
    if (!e.target.value.match(pattern)) {
      setErrorLevel(true);
    } else {
      setErrorLevel(false);
      setLevel(e.target.value);
    }
  };

  const onSubmitGameData = () => {
    if (!errorLevel) {
      setGameData({
        name: runName,
        class: role,
        level: level,
        runType: runType,
        cooldownTimer: cooldownTimer,
      });

      handleCloseNewGameDialog();
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={openExtrasDialog} onClose={handleCloseNewGameDialog}>
      <DialogTitle className="diablo-text">ADD EXTRA GAME OPTIONS</DialogTitle>
      <DialogContent>
        <DialogContentText>Add additional information down below.</DialogContentText>
        <Box sx={{ marginTop: "15px", display: "flex", flexDirection: "row" }}>
          <FormControl variant="filled" style={{ display: "flex", flexDirection: "row", gap: "15px", width: "100%" }}>
            <InputLabel style={{ width: "100%" }} size="small" color="info" id="demo-simple-select-label">
              Choose Class
            </InputLabel>
            <Select
              style={{ width: "100%" }}
              size="small"
              color="info"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="Choose Class"
              onChange={handleRoleChange}>
              {classes.map((role, idx) => generateSelectItems(role, idx))}
            </Select>
            <TextField
              error={errorLevel}
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
            onSubmit={(e, v) => console.log(e, v)}
            freeSolo
            id="combo-box-demo"
            onChange={(e, choices) => handleRunType(e, choices)}
            options={runs}
            renderInput={(params) => <TextField {...params} color="info" variant="filled" label="Select run" />}
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
        <Button variant="contained" onClick={onSubmitGameData}>
          Start New Game
        </Button>
      </DialogActions>
    </Dialog>
  );
}
