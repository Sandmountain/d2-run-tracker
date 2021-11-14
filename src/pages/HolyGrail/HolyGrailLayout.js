import { ArrowBack } from "@mui/icons-material";
import { Button, Fab, IconButton } from "@mui/material";
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

  return (
    <Box>
      {!showAutoComplete ? (
        <>
          <Button onClick={() => setShowAutoComplete(true)}>Add Items</Button>
          <ReadExcel setItemsToAdd={setItemsToAdd} />
        </>
      ) : (
        <Box>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
            <Fab
              color="primary"
              size="small"
              sx={{ margin: "15px 15px 0 0" }}
              variant="contained"
              onClick={() => setShowAutoComplete(false)}>
              <ArrowBack></ArrowBack>
            </Fab>
          </Box>
          <Box sx={{ width: "60%", position: "relative", margin: "0 auto" }}>
            <AutoComplete customItems={false} dialogItems={itemsToAdd} setDialogItems={setItemsToAdd} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
