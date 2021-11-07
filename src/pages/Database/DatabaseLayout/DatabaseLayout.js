import { Typography } from "@mui/material";
import React from "react";
import ItemCard from "../../../components/ItemCard/ItemCard";

import data from "../../../data/testdata.json";

export default function DatabaseLayout() {
  const items = data;
  return (
    <div>
      <Typography> This is database layout weey </Typography>
      {items.map((item, idx) => {
        return <ItemCard item={item}></ItemCard>;
      })}
      {/* <ItemCard item={items[161]}></ItemCard> */}
    </div>
  );
}
