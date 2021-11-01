import React from "react";

import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

export default function ExitRunDialog(props) {
  const { openExitDialog, handleCloseExitDialog, handleExitGame } = props;

  return (
    <Dialog
      open={openExitDialog}
      onClose={handleCloseExitDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{"Are you sure you want to exit the run?"}</DialogTitle>

      <DialogActions>
        <Button color="primary" onClick={handleCloseExitDialog} autoFocus>
          Go back
        </Button>
        <Button variant="contained" color="primary" onClick={handleExitGame}>
          Exit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
