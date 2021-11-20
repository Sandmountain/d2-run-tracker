import { Box } from "@mui/system";
import React from "react";

import categoryData from "../../../data/categoryData.json";
import CategoryPanels from "./CategoryPanels/CategoryPanels";

const getCorrectColumns = () => {
  const arr1 = [];
  const arr2 = [];
  categoryData.forEach((cat, index) => {
    if (index % 2 === 0) {
      arr1.push(cat);
    } else {
      arr2.push(cat);
    }
  });
  return [arr1, arr2];
};

export default function Categories() {
  const [col1, col2] = getCorrectColumns();

  return (
    <Box sx={{ display: "flex", gap: "15px", padding: "15px", justifyContent: "center" }}>
      <Box sx={{ width: "45%", display: "flex", gap: "15px", flexDirection: "column" }}>
        {col1.map((category, index) => {
          return <CategoryPanels key={index} index={index} category={category} />;
        })}
      </Box>
      <Box sx={{ width: "45%", display: "flex", gap: "15px", flexDirection: "column" }}>
        {col2.map((category, index) => {
          return <CategoryPanels key={index} index={index} category={category} />;
        })}
      </Box>
    </Box>
  );
}
