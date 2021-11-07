import React from "react";

import { Button, DialogActions, DialogTitle, DialogContent, Alert, DialogContentText } from "@mui/material";
import { RockDialog } from "../overriden-mui-components/Dialog/Dialog";

export default function ExitRunDialog(props) {
  const { openExitDialog, handleCloseExitDialog, handleExitGame } = props;

  return (
    <RockDialog
      open={openExitDialog}
      onClose={handleCloseExitDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title" className="diablo-text caps shadow">
        {"Are you sure you want to exit the run?"}
      </DialogTitle>
      <DialogContent>
        <Alert severity="error" variant="outlined">
          Doing this action will lose all your run data and nothing will be saved.
        </Alert>
        <DialogContentText style={{ marginTop: 15 }}>
          <strong>All your rundata will be lost</strong>. Are you sure you wish to continue?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button color="info" onClick={handleCloseExitDialog} autoFocus>
          Go back
        </Button>
        <Button variant="contained" color="error" onClick={() => handleExitGame()}>
          Exit
        </Button>
      </DialogActions>
    </RockDialog>
  );
}
