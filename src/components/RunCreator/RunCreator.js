import React, { useState } from "react";
import { Typography, IconButton, Divider, InputBase, Paper } from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import "./run-creator.css";

import NewGameDialog from "../Dialogs/NewGameDialog";

export default function RunCreator(props) {
  const { setGameData } = props;

  const [openExtrasDialog, setOpenExtrasDialog] = React.useState(false);
  const [runName, setRunName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setOpenExtrasDialog(true);
  };

  const onChange = (e) => {
    setRunName(e.target.value);
  };

  return (
    <div>
      <div className="emblem-parent">
        <div className="emblem"></div>
      </div>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
        }}
        onSubmit={onSubmit}>
        <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Enter Run Name" onChange={onChange} />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions" type="submit">
          <DirectionsIcon />
        </IconButton>
      </Paper>

      <NewGameDialog
        openExtrasDialog={openExtrasDialog}
        setOpenExtrasDialog={setOpenExtrasDialog}
        setGameData={setGameData}></NewGameDialog>
    </div>
  );
}
