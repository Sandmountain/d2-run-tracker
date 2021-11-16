import { Box } from "@mui/system";
import React from "react";
import AddItemButtons from "./AddItemButtons/AddItemButtons";
import Categories from "./Categories/Categories";

export default function HolyGrailLayout() {
  const [itemsToAdd, setItemsToAdd] = React.useState([]);

  React.useEffect(() => {
    console.log(itemsToAdd);
  }, [itemsToAdd]);

  return (
    <Box>
      <AddItemButtons itemsToAdd={itemsToAdd} setItemsToAdd={setItemsToAdd} />
      <Categories />
    </Box>
  );
}
