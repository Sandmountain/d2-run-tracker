import React from "react";

import { Alert, Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import AutoComplete from "../AutoComplete/AutoComplete";
import { RockDialog } from "../overriden-mui-components/Dialog/Dialog";
import { useHolyGrail } from "../../Context/HolyGrailContext";

const data = require("../../data/testdata.json");

export default function ItemDialog(props) {
  const { openNewRunDialog, handleCloseNewRunDialog, setDialogItems, dialogItems } = props;
  const { addToHolyGrail } = useHolyGrail();

  //TODO: Not pretty with this, but had to be done since the original data gets mutated, and this is the only way to reset it.
  const [templateData, setTemplateData] = React.useState(JSON.parse(JSON.stringify(data)));
  const [chipStatus, setChipStatus] = React.useState([]);
  const [unsetError, setUnsetError] = React.useState(false);

  // Resetting the items that have been overriden in memory.
  const handleClosing = () => {
    //addToHolyGrail(tempItems, chipStatus);
    // Reset to an unedited version.

    console.log(dialogItems);
    if (chipStatus.filter((it) => it.indicator === "unset").length > 0) {
      if (unsetError) {
        handleCloseNewRunDialog();
        addToHolyGrail(dialogItems, chipStatus);
        setTemplateData(JSON.parse(JSON.stringify(data)));
        setChipStatus([]);
      }
      setUnsetError(true);
    } else {
      addToHolyGrail(dialogItems, chipStatus);
      handleCloseNewRunDialog();
      setTemplateData(JSON.parse(JSON.stringify(data)));
      setChipStatus([]);
    }
  };

  return (
    <RockDialog fullWidth maxWidth="sm" open={openNewRunDialog}>
      <DialogTitle className="diablo-text">FOUND ANYTHING OF INTEREST?</DialogTitle>
      <DialogContent>
        <Alert severity="info">
          Add your item's rolls by hovering it and change the values. This will compare it to your prior finds to see if it is an upgrade.
        </Alert>
        {unsetError && (
          <Alert severity="warning" sx={{ mt: "5px" }}>
            You have unset item values. If you continue, the items will not be added to your Holy Grail.
          </Alert>
        )}
        <DialogContentText sx={{ marginTop: "15px" }}>
          Search for an item down below, or add a custom one by pressing return.
        </DialogContentText>

        <AutoComplete
          setDialogItems={setDialogItems}
          dialogItems={dialogItems}
          data={templateData}
          chipStatus={chipStatus}
          setChipStatus={setChipStatus}></AutoComplete>
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
