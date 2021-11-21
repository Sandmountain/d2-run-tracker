import React from "react";

import { Button, DialogActions, DialogTitle, DialogContent, Alert } from "@mui/material";

import { RockDialog } from "../overriden-mui-components/Dialog/Dialog";
import { DeleteForever } from "@mui/icons-material";

export default function AreYouSureDialog(props) {
  const { setOpenAreYouSureDialog, openAreYouSureDialog, willDelete } = props;
  return (
    <RockDialog
      open={openAreYouSureDialog}
      onClose={() => setOpenAreYouSureDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle className="diablo-text" id="alert-dialog-title">
        {"ARE YOU SURE YOU WISH TO REMOVE THIS DATA?"}
      </DialogTitle>
      <DialogContent>
        <Alert severity="error">This is the last warning. Your data will be permanently removed.</Alert>
        <DialogContent style={{ marginTop: 20, padding: 0 }}>
          <p style={{ fontWeight: "bold", margin: 0 }}> Are you sure you wish to continue?</p>
        </DialogContent>
      </DialogContent>

      <DialogActions>
        <Button color="info" onClick={() => setOpenAreYouSureDialog(false)} autoFocus>
          Go back
        </Button>
        <Button startIcon={<DeleteForever />} variant="contained" color="error" onClick={() => willDelete()}>
          Delete Data
        </Button>
      </DialogActions>
    </RockDialog>
  );
}
