import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import DirectionsIcon from "@mui/icons-material/Directions";

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
