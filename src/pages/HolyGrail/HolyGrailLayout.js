import { Box } from "@mui/system";
import React from "react";
import AddItemButtons from "./AddItemButtons/AddItemButtons";
import Categories from "./Categories/Categories";

import { addItemToHolyGrail } from "../../Firebase/firebase.js";

export default function HolyGrailLayout() {
  const [itemsToAdd, setItemsToAdd] = React.useState([]);

  React.useEffect(() => {
    if (itemsToAdd.length > 0) {
      console.log("adding!");
      addItemToHolyGrail(itemsToAdd[0]);
    }
  }, [itemsToAdd]);

  return (
    <Box>
      <AddItemButtons itemsToAdd={itemsToAdd} setItemsToAdd={setItemsToAdd} />
      <Categories />
    </Box>
  );
}
