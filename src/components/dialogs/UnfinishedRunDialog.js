import React from "react";

import { Button, Alert, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { RockDialog } from "../overriden-mui-components/Dialog/Dialog";

export default function UnfinshiedRunDialog(props) {
  const { openUnfishiedRunDialog, handleUnfishiedRunClose, handleUnfishiedRunAccept, lostData } = props;
  return (
    <RockDialog fullWidth maxWidth="sm" open={openUnfishiedRunDialog}>
      <DialogTitle className="diablo-text caps shadow">A backup has been found!</DialogTitle>
      <DialogContent>
        <Alert severity="warning" variant="outlined">
          A backup of your latest unfinished run has been retrived of your run:
          <br />
          <br /> Name: <strong>{lostData?.gameData?.name}</strong> <br />
          Location: <strong>{lostData?.gameData?.runType}</strong>. <br />
          <br /> If you choose not to proceed, the data will be lost <strong>forever!</strong>
        </Alert>
        <DialogContentText sx={{ marginTop: "15px" }}>
          Do you wish to continue your run: <strong>{lostData?.gameData?.name}</strong>?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button style={{ color: "gray" }} onClick={handleUnfishiedRunClose}>
          No
        </Button>
        <Button style={{ color: "white" }} onClick={handleUnfishiedRunAccept}>
          Yes
        </Button>
      </DialogActions>
    </RockDialog>
  );
}
