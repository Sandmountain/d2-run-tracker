import React from "react";

import { Alert, Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import AutoComplete from "../AutoComplete/AutoComplete";
import { RockDialog } from "../overriden-mui-components/Dialog/Dialog";
import { resetCustomValue } from "../../utils/utils";

export default function ItemDialog(props) {
  const { openNewRunDialog, handleCloseNewRunDialog, setDialogItems, dialogItems } = props;

  // Resetting the items that have been overriden in memory.
  const handleClosing = () => {
    // dialogItems.forEach((it) => {
    //   resetCustomValue(it);
    // });

    handleCloseNewRunDialog();
  };

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
        <Button style={{ color: "gray" }} onClick={handleClosing}>
          Continue
        </Button>
        <Button style={{ color: "white" }} onClick={handleClosing}>
          Add items
        </Button>
      </DialogActions>
    </RockDialog>
  );
}
