import React from "react";

import { Button, DialogActions, DialogTitle, DialogContent, Alert, Box, Typography } from "@mui/material";
import { RockDialog } from "../overriden-mui-components/Dialog/Dialog";
import AreYouSureDialog from "./AreYouSureDialog";
import { deleteAllHistory, deleteHolyGrail } from "../../Firebase/firebase";

export default function UserSettingsDialog(props) {
  const { openUserSettingsDialog, setOpenUserSettingsDialog } = props;
  const [openAreYouSureDialog, setOpenAreYouSureDialog] = React.useState(false);
  const [toDelete, setToDelete] = React.useState("");

  const [historyDeleted, setHistoryDeleted] = React.useState(false);
  const [holyDeleted, setHolyDeleted] = React.useState(false);

  const deleteHistory = async () => {
    await deleteAllHistory();
    setHistoryDeleted(true);
  };

  const deleteHoly = async () => {
    deleteHolyGrail().then(() => {
      setHolyDeleted(true);
    });
  };

  const prepareDelete = (toDelete) => {
    setToDelete(toDelete);
    setOpenAreYouSureDialog(true);
  };

  const willDelete = async () => {
    if (toDelete === "holy") {
      await deleteHoly();
    } else {
      await deleteHistory();
    }
    setOpenAreYouSureDialog(false);
  };

  return (
    <RockDialog
      open={openUserSettingsDialog}
      onClose={() => setOpenUserSettingsDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title" className="diablo-text caps shadow">
        {"User Settings"}
      </DialogTitle>
      <DialogContent>
        <Alert severity="error" variant="outlined">
          By pressing these buttons, you will delete all of the data in the specified collections.{" "}
          <strong>All actions are non-reversable.</strong>
        </Alert>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", mt: "30px" }}>
          <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
            <Button color="error" variant="contained" fullWidth sx={{ width: "40%" }} onClick={() => prepareDelete("history")}>
              Delete Run History
            </Button>
            <Typography variant="caption">
              {historyDeleted ? <Box sx={{ color: "red" }}>Deleted</Box> : "This will delete all your run history."}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", mt: "15px", alignItems: "center" }}>
            <Button color="error" variant="contained" fullWidth sx={{ width: "40%" }} onClick={() => prepareDelete("holy")}>
              Delete Holy grail
            </Button>
            <Typography variant="caption">
              {holyDeleted ? <Box sx={{ color: "red" }}>Deleted</Box> : "This will delete your entire Holy Grail collection"}
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="text" color="primary" onClick={() => setOpenUserSettingsDialog(false)}>
          Close Settings
        </Button>
      </DialogActions>
      <AreYouSureDialog
        setOpenAreYouSureDialog={setOpenAreYouSureDialog}
        openAreYouSureDialog={openAreYouSureDialog}
        willDelete={willDelete}
      />
    </RockDialog>
  );
}
