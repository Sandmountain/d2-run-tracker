import React from "react";

import { Button, Dialog, DialogActions, DialogTitle, DialogContent, Alert } from "@mui/material";
import Logout from "@mui/icons-material/Logout";

export default function LogoutDialog(props) {
  const { setOpenLogoutDialog, openLogoutDialog, logoutUser } = props;

  return (
    <Dialog
      open={openLogoutDialog}
      onClose={() => setOpenLogoutDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle className="diablo-text" id="alert-dialog-title">
        {"ARE YOU SURE YOU WISH TO LOG OUT?"}
      </DialogTitle>
      <DialogContent>
        <Alert severity="info">
          By logging out, all your data will still be saved and stored with this user. Just log in with the same account to continue on your
          progress.
        </Alert>
        <DialogContent style={{ marginTop: 20, padding: 0 }}>
          <p style={{ fontWeight: "bold", margin: 0 }}> Are you sure you wish to continue?</p>
        </DialogContent>
      </DialogContent>

      <DialogActions>
        <Button color="info" onClick={() => setOpenLogoutDialog(false)} autoFocus>
          Go back
        </Button>
        <Button startIcon={<Logout></Logout>} variant="contained" color="primary" onClick={() => logoutUser()}>
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
}
