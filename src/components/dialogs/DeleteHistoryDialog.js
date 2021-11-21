import React from "react";

import { Button, DialogActions, DialogTitle, DialogContent, Alert, DialogContentText, Typography } from "@mui/material";
import { RockDialog } from "../overriden-mui-components/Dialog/Dialog";

export default function DeleteHistoryDialog(props) {
  const { openDeleteHistory, setOpenDeleteHistory, deleteEntry, runToDelete } = props;

  return (
    <RockDialog
      open={openDeleteHistory}
      onClose={() => setOpenDeleteHistory(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title" className="diablo-text caps shadow">
        {"Are you sure you want to delete this run?"}
      </DialogTitle>
      <DialogContent>
        <Alert severity="error" variant="outlined">
          Doing this action is permanent and you will never be able to retrive this data.{" "}
        </Alert>
        <Typography sx={{ marginTop: "15px" }}>
          You are about to delete the run: <br />
          <Typography component="span" sx={{ mt: "15px", textAlign: "center", display: "block", fontWeight: "bold" }}>
            {runToDelete.gameData.name}
          </Typography>
        </Typography>
        <DialogContentText sx={{ marginTop: "15px" }}>Are you sure you wish to continue?</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button color="info" onClick={() => setOpenDeleteHistory(false)} autoFocus>
          Go back
        </Button>
        <Button variant="contained" color="error" onClick={() => deleteEntry()}>
          Delete
        </Button>
      </DialogActions>
    </RockDialog>
  );
}
