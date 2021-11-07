import React from "react";
import { Typography, Dialog, DialogTitle, DialogContent, Button, DialogActions } from "@mui/material";
import { RockDialog } from "../overriden-mui-components/Dialog/Dialog";

export default function CooldownDialog(props) {
  const { openCooldownDialog, timeleft, handleShowSummary } = props;

  return (
    <RockDialog open={openCooldownDialog}>
      <DialogTitle className="diablo-text">NEXT ROUND STARTS IN:</DialogTitle>
      <DialogContent>
        <Typography className="diablo-text shadow" style={{ textAlign: "center", fontSize: "20px" }}>
          {timeleft}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="text" size="small" onClick={() => handleShowSummary()}>
          End Run?
        </Button>
      </DialogActions>
    </RockDialog>
  );
}
