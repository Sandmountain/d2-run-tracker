import React from "react";

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import AutoComplete from "../auto-complete/AutoComplete";

export default function ItemDialog(props) {
  const { openNewRunDialog, handleCloseNewRunDialog, setDialogItems } = props;
  return (
    <Dialog open={openNewRunDialog} onClose={handleCloseNewRunDialog}>
      <DialogTitle className="diablo-text">FOUND ANYTHING OF INTEREST?</DialogTitle>
      <DialogContent>
        <DialogContentText>Add items down below.</DialogContentText>
        <AutoComplete setDialogItems={setDialogItems}></AutoComplete>
      </DialogContent>

      <DialogActions>
        <Button style={{ color: "gray" }} onClick={handleCloseNewRunDialog}>
          Continue
        </Button>
        <Button style={{ color: "white" }} onClick={handleCloseNewRunDialog}>
          Add items
        </Button>
      </DialogActions>
    </Dialog>
  );
}
