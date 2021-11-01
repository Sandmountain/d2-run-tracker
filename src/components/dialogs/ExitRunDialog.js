import React from "react";

import { Button, Dialog, DialogActions, DialogTitle, DialogContent, Alert, DialogContentText } from "@mui/material";

export default function ExitRunDialog(props) {
  const { openExitDialog, handleCloseExitDialog, handleExitGame } = props;

  return (
    <Dialog
      open={openExitDialog}
      onClose={handleCloseExitDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{"Are you sure you want to exit the run?"}</DialogTitle>
      <DialogContent>
        <Alert severity="warning" variant="outlined">
          Doing this action will lose all your run data and nothing will be saved.{" "}
        </Alert>
        <DialogContentText style={{ marginTop: 15 }}>Are you sure you wish to continue?</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button color="info" onClick={handleCloseExitDialog} autoFocus>
          Go back
        </Button>
        <Button variant="contained" color="primary" onClick={handleExitGame}>
          Exit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
