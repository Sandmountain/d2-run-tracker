import { Grid, ImageList, ImageListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ItemCard from "../../../components/ItemCard/ItemCard";
import Masonry from "react-masonry-css";

import data from "../../../data/testdata.json";

import "./database-layout.css";

const breakpointColumnsObj = {
  default: 5,
  1600: 4,
  1100: 3,
  900: 2,
  500: 1,
};

export default function DatabaseLayout() {
  const items = data;
  return (
    <div>
      <Typography> This is database layout weey </Typography>
      <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
        {items.map((item, idx) => (
          <ItemCard item={item}></ItemCard>
        ))}
      </Masonry>
    </div>
  );
}
