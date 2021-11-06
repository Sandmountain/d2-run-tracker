import React from "react";

import { Button, DialogActions, DialogTitle, DialogContent, Alert, DialogContentText } from "@mui/material";
import { RockDialog } from "../../override-components/Dialog/Dialog";

export default function ExitRunDialog(props) {
  const { openExitSummaryDialog, setOpenExitSummaryDialog, handleLeaveSummary } = props;

  return (
    <RockDialog
      open={openExitSummaryDialog}
      onClose={() => setOpenExitSummaryDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title" className="diablo-text caps shadow">
        {"Are you sure you want to return to the start?"}
      </DialogTitle>
      <DialogContent>
        <Alert severity="success" variant="outlined">
          Your data has been saved, and you will be able to see return to this screen from the main screen.
        </Alert>
        <DialogContentText style={{ marginTop: 15 }}>Are you sure you wish to go back?</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button color="info" onClick={() => setOpenExitSummaryDialog(false)} autoFocus>
          Go back
        </Button>
        <Button variant="text" color="primary" onClick={handleLeaveSummary}>
          Exit
        </Button>
      </DialogActions>
    </RockDialog>
  );
}
