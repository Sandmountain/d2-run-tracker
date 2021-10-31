import React from "react";
import { Typography, Dialog, DialogTitle, DialogContent } from "@mui/material";

export default function CooldownDialog(props) {
  const { openCooldownDialog, timeleft } = props;
  return (
    <Dialog open={openCooldownDialog}>
      <DialogTitle className="diablo-text">NEXT ROUND STARTS IN:</DialogTitle>
      <DialogContent>
        <Typography className="diablo-text shadow" style={{ textAlign: "center", fontSize: "20px" }}>
          {timeleft}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
