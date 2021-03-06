import React from "react";

import { Button, DialogActions, DialogTitle, DialogContent, Alert } from "@mui/material";
import { DoubleArrow } from "@mui/icons-material";
import { RockDialog } from "../overriden-mui-components/Dialog/Dialog";
import { useHistory } from "react-router-dom";

export default function EndRunDialog(props) {
  const {
    openEndRunDialog,
    setOpenEndRunDialog,
    setShowSummary,
    setIsActiveGame,
    handleGoBackSummaryCooldown,
    openCooldownDialog,
    handleStart,
  } = props;

  const history = useHistory();

  const handleShowSummary = () => {
    setIsActiveGame(false);
    setShowSummary(true);
    history.push(`/run-analyze/summary`);
  };

  const handleGoBack = () => {
    if (openCooldownDialog) {
      setOpenEndRunDialog(false);
      handleGoBackSummaryCooldown();
    } else {
      handleStart();
      setOpenEndRunDialog(false);
    }
  };

  return (
    <RockDialog
      open={openEndRunDialog}
      onClose={handleGoBack}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle className="diablo-text" id="alert-dialog-title">
        {"ARE YOU SURE YOU WANT TO END THE RUN?"}
      </DialogTitle>
      <DialogContent>
        <Alert severity="info">
          This action will end your run. Make sure that you have added the loot from your last round before going to the summary.
        </Alert>
        <DialogContent style={{ marginTop: 15 }}>
          Once the run is ended, you can't proceed and add more data to this run.
          <p style={{ margin: "15px 0 0", fontWeight: "bold" }}> Are you sure you wish to continue?</p>
        </DialogContent>
      </DialogContent>

      <DialogActions>
        <Button color="info" onClick={handleGoBack} autoFocus>
          Go back
        </Button>
        <Button endIcon={<DoubleArrow></DoubleArrow>} variant="text" color="secondary" onClick={handleShowSummary}>
          GO TO Summary
        </Button>
      </DialogActions>
    </RockDialog>
  );
}
