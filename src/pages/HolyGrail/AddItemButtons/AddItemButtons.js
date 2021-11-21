import { ArrowBack, Close } from "@mui/icons-material";
import { Button, Card, Fab, Typography, Snackbar, Alert } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AutoComplete from "../../../components/AutoComplete/AutoComplete";
import { RockSnackbar } from "../../../components/overriden-mui-components/Snackbar/Snackbar";
import { useHolyGrail } from "../../../Context/HolyGrailContext";
import ReadExcel from "./ReadExcel/ReadExcel";

const data = require("../../../data/testdata.json");

export default function AddItemButtons() {
  const { holyGrail, addToHolyGrail } = useHolyGrail();
  //TODO: Not pretty with this, but had to be done since the original data gets mutated, and this is the only way to reset it.
  const [templateData, setTemplateData] = React.useState(JSON.parse(JSON.stringify(data)));

  const [showAutoComplete, setShowAutoComplete] = React.useState(false);
  const [tempItems, setTempItems] = React.useState([]);

  const [itemSubmitted, setItemSubmitted] = React.useState(false);
  const [chipStatus, setChipStatus] = React.useState([]);

  const [showChipError, setShowChipError] = React.useState(false);

  const handleSubmit = () => {
    if (chipStatus.filter((it) => it.indicator === "unset").length > 0) {
      setShowChipError(true);
    } else {
      addToHolyGrail(tempItems, chipStatus);

      // Reset to an unedited version.
      setTemplateData(JSON.parse(JSON.stringify(data)));
      setItemSubmitted(true);
      setTempItems([]);
      setChipStatus([]);
    }
  };

  const handleGoBack = () => {
    setShowAutoComplete(false);
    setTempItems([]);
  };

  const calculateFoundItems = () => {
    return Object.values(holyGrail).reduce((prev, items) => {
      items.length > 0 &&
        items.forEach((it) => {
          prev += 1;
        });
      return prev;
    }, 0);
  };

  return (
    <>
      <Card>
        {!showAutoComplete ? (
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", justifyContent: "center", margin: "15px" }}>
              <Button onClick={() => setShowAutoComplete(true)}>Add Items</Button>
              <ReadExcel setItemsToAdd={setTempItems} setShowAutoComplete={setShowAutoComplete} />
            </Box>
            <Box sx={{ p: "15px" }}>
              <Typography className="diablo-text caps">Holy Grail: {calculateFoundItems()} / 548</Typography>
            </Box>
          </Box>
        ) : (
          <>
            <Box>
              <Box sx={{ width: "100%", display: "flex", justifyContent: "end", position: "absolute" }}>
                <Fab color="primary" size="small" sx={{ margin: "15px 15px 0 0" }} variant="contained" onClick={handleGoBack}>
                  <ArrowBack></ArrowBack>
                </Fab>
              </Box>
              <Box sx={{ width: "60%", position: "relative", margin: "15px auto" }}>
                <AutoComplete
                  chipStatus={chipStatus}
                  setChipStatus={setChipStatus}
                  data={templateData}
                  itemSubmitted={itemSubmitted}
                  customItems={false}
                  dialogItems={tempItems}
                  setDialogItems={setTempItems}
                  useList={false}
                />
              </Box>
            </Box>
          </>
        )}
        {tempItems.length > 0 && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: "15px" }}>
            <Button variant="contained" onClick={handleSubmit}>
              Add items to your Holy Grail
            </Button>
          </Box>
        )}
      </Card>
      <RockSnackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
        open={showChipError}
        onClose={() => setShowChipError(false)}>
        <Alert onClose={() => setShowChipError(false)} severity="error" sx={{ width: "100%" }}>
          You have unset item values. You can't add an item unless they are all set.
        </Alert>
      </RockSnackbar>
    </>
  );
}
