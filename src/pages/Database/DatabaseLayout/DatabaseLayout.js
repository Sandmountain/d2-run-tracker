import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { Alert } from "@mui/material";
import { Box } from "@mui/system";

import ItemCard from "../../../components/ItemCard/ItemCard";
import data from "../../../data/data.json";
import "./database-layout.css";
import SearchBar from "../../../components/SearchBar/SearchBar";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

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
  const [sortBy, setSortBy] = useState("rarity");

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.value?.length > 0) {
      setItems(data.filter((val) => val.name.toLowerCase().includes(e.target.value.toLowerCase())));
    } else {
      setItems(data);
    }
    setSearchQuery(e.target.value);
  };

  const [showSpinner, setShowSpinner] = React.useState(true);

  const handleLoading = (val) => {
    setShowSpinner(val);
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
        // Reset load amount if scrolled to top
        setLoadAmount(50);
      }
    };

    window.addEventListener("load", handleLoading(false));

    return () => {
      setShowSpinner(true);
      window.removeEventListener("load", handleLoading());
    };
  }, []);

  useEffect(() => {
    if (sortBy === "found") return;
    else if (sortBy === "level") {
      const sorted = JSON.parse(JSON.stringify(data)); // sorts overwrites the array. rip.
      setItems(sorted.sort((a, b) => b.level - a.level));
    } else {
      setItems(data);
    }
  }, [sortBy]);

  return (
    <Box sx={{ height: "100%" }}>
      {showSpinner ? (
        <Box sx={{ width: "100%", height: "100%", display: "flex", position: "relative", top: "30%", justifyContent: "center" }}>
          <LoadingSpinner text="Loading Data" />
        </Box>
      ) : (
        <Box>
          <SearchBar onChange={onChange} text={searchQuery} scrollingSearch={scrollingSearch} setSortBy={setSortBy} sortBy={sortBy} />
          {items.length > 1 ? (
            <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
              {items.map((item, idx) => idx <= loadAmount && <ItemCard key={idx} item={item} />)}
            </Masonry>
          ) : items.length > 0 ? (
            <Box className="sole-item">
              <ItemCard item={items[0]} />
            </Box>
          ) : (
            <Box className="sole-item">
              <Alert severity="error" sx={{ backgroundColor: "#121212" }} elevation={2}>
                {" "}
                No items found ...
              </Alert>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
