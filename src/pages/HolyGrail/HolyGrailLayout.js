import { ArrowBack } from "@mui/icons-material";
import { Button, Fab } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AutoComplete from "../../components/AutoComplete/AutoComplete";
import ReadExcel from "./ReadExcel/ReadExcel";

export default function HolyGrailLayout() {
  const [itemsToAdd, setItemsToAdd] = React.useState([]);
  const [showAutoComplete, setShowAutoComplete] = React.useState(false);

  React.useEffect(() => {
    console.log(itemsToAdd);
  }, [itemsToAdd]);

  const handleSubmit = () => {
    console.log("submitted");
    setItemsToAdd([]);
  };

  const handleGoBack = () => {
    setShowAutoComplete(false);
    setItemsToAdd([]);
  };

  return (
    <Box>
      {!showAutoComplete ? (
        <Box sx={{ display: "flex", justifyContent: "center", margin: "15px" }}>
          <Button onClick={() => setShowAutoComplete(true)}>Add Items</Button>
          <ReadExcel setItemsToAdd={setItemsToAdd} setShowAutoComplete={setShowAutoComplete} />
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
              <AutoComplete handleSubmit={handleSubmit} customItems={false} dialogItems={itemsToAdd} setDialogItems={setItemsToAdd} />
            </Box>
          </Box>
          <Box></Box>
        </>
      )}
      {itemsToAdd.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={handleSubmit}>
            Add items to your Holy Grail
          </Button>
        </Box>
      )}
    </Box>
  );
}
