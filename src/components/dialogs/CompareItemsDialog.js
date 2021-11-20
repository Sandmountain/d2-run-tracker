import React from "react";

import { Alert, Button, DialogContent, DialogTitle } from "@mui/material";

import { RockDialog } from "../overriden-mui-components/Dialog/Dialog";
import ItemCard from "../ItemCard/ItemCard";
import { Box } from "@mui/system";
import { ThumbUp } from "@mui/icons-material";

export default function CompareItemsDialog(props) {
  const { storedItem, foundItem, showComparisonDialog, setShowComparisonDialog, handleChosenItem } = props;

  const handleItemChoice = (newItem) => {
    handleChosenItem(newItem);

    setShowComparisonDialog(false);
  };

  return (
    <RockDialog fullWidth maxWidth="md" open={showComparisonDialog}>
      <DialogTitle className="diablo-text">YOU HAVE POTENTIALLY FOUND AN UPGRADE!</DialogTitle>
      <DialogContent>
        <Alert severity="info">
          The item you found was potentially better than the one you had found before, please select the better item down below. The item
          you choose, will be the item that is saved in your Holy Grail.
        </Alert>
        <DialogContent sx={{ marginTop: "15px", display: "flex", justifyContent: "space-between", gap: "15px" }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItem: "center" }}>
            <ItemCard item={storedItem}></ItemCard>
            <Button
              variant="contained"
              endIcon={<ThumbUp></ThumbUp>}
              sx={{ mt: "15px", alignSelf: "center" }}
              onClick={() => handleItemChoice(false)}>
              Better
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItem: "center" }}>
            <ItemCard item={foundItem}></ItemCard>
            <Button
              variant="contained"
              endIcon={<ThumbUp></ThumbUp>}
              sx={{ mt: "15px", alignSelf: "center" }}
              onClick={() => handleItemChoice(true)}>
              Better
            </Button>
          </Box>
        </DialogContent>
      </DialogContent>
    </RockDialog>
  );
}
