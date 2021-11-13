import React from "react";

import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import AutoComplete from "../AutoComplete/AutoComplete";
import { RockDialog } from "../overriden-mui-components/Dialog/Dialog";

export default function ItemDialog(props) {
  const { openNewRunDialog, handleCloseNewRunDialog, setDialogItems, dialogItems } = props;
  return (
    <RockDialog fullWidth maxWidth="sm" open={openNewRunDialog}>
      <DialogTitle className="diablo-text">FOUND ANYTHING OF INTEREST?</DialogTitle>
      <DialogContent>
        <Alert severity="info">
          Add your item's rolls by hovering it and change the values. This will compare it to your prior finds to see if it is an upgrade.
        </Alert>
        <DialogContentText sx={{ marginTop: "15px" }}>
          Search for an item down below, or add a custom one by pressing return.
        </DialogContentText>

        <AutoComplete setDialogItems={setDialogItems} dialogItems={dialogItems}></AutoComplete>
      </DialogContent>

      <DialogActions>
        <Button style={{ color: "gray" }} onClick={handleCloseNewRunDialog}>
          Continue
        </Button>
        <Button style={{ color: "white" }} onClick={handleCloseNewRunDialog}>
          Add items
        </Button>
      </DialogActions>
    </RockDialog>
  );
}
