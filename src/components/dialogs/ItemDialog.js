import React from "react";

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import AutoComplete from "../AutoComplete/AutoComplete";
import { RockDialog } from "../../override-components/Dialog/Dialog";

export default function ItemDialog(props) {
  const { openNewRunDialog, handleCloseNewRunDialog, setDialogItems, dialogItems } = props;
  return (
    <RockDialog fullWidth maxWidth="sm" open={openNewRunDialog} onClose={handleCloseNewRunDialog}>
      <DialogTitle className="diablo-text">FOUND ANYTHING OF INTEREST?</DialogTitle>
      <DialogContent>
        <DialogContentText>Search for an item down below, or add a custom one by pressing return.</DialogContentText>
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
