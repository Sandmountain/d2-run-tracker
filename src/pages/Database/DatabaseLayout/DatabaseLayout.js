import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";

import { Box } from "@mui/system";

import ItemCard from "../../../components/ItemCard/ItemCard";
import data from "../../../data/testdata.json";
import "./database-layout.css";
import SearchBar from "../../../components/SearchBar/SearchBar";

const breakpointColumnsObj = {
  default: 5,
  1600: 4,
  1100: 3,
  900: 2,
  500: 1,
};

export default function DatabaseLayout() {
  const [loadAmount, setLoadAmount] = useState(50);
  const [items, setItems] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollingSearch, setScrollingSearch] = useState(false);

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.value?.length > 0) {
      setItems(data.filter((val) => val.name.toLowerCase().includes(e.target.value.toLowerCase())));
    } else {
      setItems(data);
    }
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset / document.documentElement.scrollHeight > 0.5) {
        setLoadAmount((prevState) => prevState + prevState);
      }

      if (window.pageYOffset > 30) {
        setScrollingSearch(true);
      } else {
        setScrollingSearch(false);
      }
    };
  }, []);

  return (
    <Box>
      <SearchBar onChange={onChange} text={searchQuery} scrollingSearch={scrollingSearch} />
      <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
        {items.map((item, idx) => idx < loadAmount && <ItemCard item={item} />)}
      </Masonry>
    </Box>
  );
}
