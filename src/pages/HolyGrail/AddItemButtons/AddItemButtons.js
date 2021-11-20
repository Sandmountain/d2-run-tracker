import { ArrowBack } from "@mui/icons-material";
import { Button, Fab } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AutoComplete from "../../../components/AutoComplete/AutoComplete";
import ReadExcel from "./ReadExcel/ReadExcel";

const data = require("../../../data/testdata.json");

export default function AddItemButtons(props) {
  //const { itemsToAdd, setItemsToAdd } = props;

  //TODO: Not pretty with this, but had to be done since the original data gets mutated, and this is the only way to reset it.
  const [templateData, setTemplateData] = React.useState(JSON.parse(JSON.stringify(data)));

  const [showAutoComplete, setShowAutoComplete] = React.useState(false);
  const [tempItems, setTempItems] = React.useState([]);

  const [itemSubmitted, setItemSubmitted] = React.useState(false);

  const handleSubmit = () => {
    // Reset to an unedited version.
    setTemplateData(JSON.parse(JSON.stringify(data)));

    setItemSubmitted(true);
    setTempItems([]);
  };

  const handleGoBack = () => {
    setShowAutoComplete(false);
    setTempItems([]);
  };

  return (
    <Box>
      {!showAutoComplete ? (
        <Box sx={{ display: "flex", justifyContent: "center", margin: "15px" }}>
          <Button onClick={() => setShowAutoComplete(true)}>Add Items</Button>
          <ReadExcel setItemsToAdd={setTempItems} setShowAutoComplete={setShowAutoComplete} />
        </Box>
      ) : (
        <>
          <Box>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
              <Fab color="primary" size="small" sx={{ margin: "15px 15px 0 0" }} variant="contained" onClick={handleGoBack}>
                <ArrowBack></ArrowBack>
              </Fab>
            </Box>
            <Box sx={{ width: "60%", position: "relative", margin: "0 auto" }}>
              <AutoComplete
                data={templateData}
                itemSubmitted={itemSubmitted}
                customItems={false}
                dialogItems={tempItems}
                setDialogItems={setTempItems}
              />
            </Box>
          </Box>
          <Box></Box>
        </>
      )}
      {tempItems.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={handleSubmit}>
            Add items to your Holy Grail
          </Button>
        </Box>
      )}
    </Box>
  );
}
