import React from "react";

import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import { DoubleArrow } from "@mui/icons-material";

export default function EndRunDialog(props) {
  const { openEndRunDialog, setOpenEndRunDialog, setShowSummary, setIsActiveGame } = props;

  const handleShowSummary = () => {
    setIsActiveGame(false);
    setShowSummary(true);
  };

  return (
    <Dialog
      open={openEndRunDialog}
      onClose={() => setOpenEndRunDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle className="diablo-text" id="alert-dialog-title">
        {"ARE YOU SURE YOU WANT TO END THE RUN?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <DialogContentText style={{ marginTop: 15 }}>
          This is a permanent move, and you can't continue your run after procceding. Are you sure you wish to continue?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button color="info" onClick={() => setOpenEndRunDialog(false)} autoFocus>
          Go back
        </Button>
        <Button endIcon={<DoubleArrow></DoubleArrow>} variant="contained" color="secondary" onClick={handleShowSummary}>
          GO TO Summary
        </Button>
      </DialogActions>
    </Dialog>
  );
}
