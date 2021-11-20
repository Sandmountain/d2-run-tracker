import React from "react";

import { Alert, Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import AutoComplete from "../AutoComplete/AutoComplete";
import { RockDialog } from "../overriden-mui-components/Dialog/Dialog";

const data = require("../../data/testdata.json");

export default function ItemDialog(props) {
  const { openNewRunDialog, handleCloseNewRunDialog, setDialogItems, dialogItems } = props;

  //TODO: Not pretty with this, but had to be done since the original data gets mutated, and this is the only way to reset it.
  const [templateData, setTemplateData] = React.useState(JSON.parse(JSON.stringify(data)));

  // Resetting the items that have been overriden in memory.
  const handleClosing = () => {
    setTemplateData(JSON.parse(JSON.stringify(data)));
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

        <AutoComplete setDialogItems={setDialogItems} dialogItems={dialogItems} data={templateData}></AutoComplete>
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
