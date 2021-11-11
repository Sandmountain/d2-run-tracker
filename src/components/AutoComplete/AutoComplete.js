import React from "react";
import { TextField, Autocomplete, Box, Chip, Typography, List, Tooltip, CircularProgress } from "@mui/material";

import { getColor } from "../../utils/utils.js";
import "./auto-complete.css";
import CustomItemList from "../../pages/RunAnalyze/CustomItemList/CustomItemList.js";
import { Badge } from "@mui/icons-material";

// Use for new item
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
// Use for potential upgrade
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ItemCard from "../ItemCard/ItemCard.js";

const data = require("../../data/testdata.json");

export default function AutoComplete(props) {
  const { setDialogItems, dialogItems, useList = true } = props;

  const [inputValue, setInputValue] = React.useState("");
  const [noDataInput, setNoDataInput] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleDialogSubmit = (e) => {
    e.preventDefault();
  };

  const handleChoices = (_, choices) => {
    const theChoices = [];

    choices.forEach((choice, index) => {
      if (typeof choice === "string" && dialogItems[index]?.name !== choice) {
        const newItem = {
          name: choice,
          image: "",
          set: "",
          type: "",
          reqLvl: "",
          rarity: "normal",
          sockets: 0,
        };
        theChoices.push(newItem);
      } else if (dialogItems[index]?.name === choice) {
        theChoices.push(dialogItems[index]);
      } else {
        theChoices.push(choice);
      }
    });

    setNoDataInput(theChoices.filter((choice) => choice.rarity === "normal"));
    setDialogItems(theChoices);
  };

  const handleOpen = (e) => {
    // When the dropdown button is clicked
    if (e.type === "click") {
      setOpen(true);
    }

    if (inputValue.length > 1) {
      setOpen(true);
    }
  };

  const handleInputChange = (_, newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue.length > 1) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const generateNoDataItem = (newInputValue, index) => {
    return (
      <CustomItemList key={index} newInputValue={newInputValue} dialogItems={dialogItems} setDialogItems={setDialogItems}></CustomItemList>
    );
  };

  const updateItem = (item) => {
    console.log(item);
    console.log(dialogItems);
    const idx = dialogItems.findIndex((it) => it.name === item.name);
    //   ...prev,
    //   requirements: prev.requirements.map((obj, index) => {
    //     return idx === index ? { ...obj, customValue: val } : obj;
    //   }),
    // }));

    setDialogItems((prev) => prev.map((it, i) => (i === idx ? item : it)));
  };

  return (
    <>
      <form onSubmit={handleDialogSubmit} style={{ marginTop: 10, overflow: "hidden" }}>
        <Autocomplete
          multiple
          fullWidth
          freeSolo
          size="small"
          open={open}
          onOpen={handleOpen}
          onClose={() => setOpen(false)}
          options={data}
          onInputChange={handleInputChange}
          onChange={(e, choices) => handleChoices(e, choices)} // Emilie was here
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
              <div className="listImage-container">
                <img loading="lazy" width="25" src={require(`../../assets/item-art/${option.image}.png`).default} alt="" />
              </div>
              <Typography className={`${option.rarity} list-shadow`}>{option.name}</Typography>
              <Typography sx={{ color: "#3e3e3e", marginLeft: "auto", fontWeight: "bold" }}>{option.type}</Typography>
            </Box>
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <>
                {console.log(value)}
                <Tooltip
                  key={index}
                  title={
                    <>
                      {option.image ? (
                        <ItemCard item={option} tooltip={true} handleUpdatedItem={(item) => updateItem(item)} />
                      ) : (
                        "No info for custom items"
                      )}
                    </>
                  }
                  placement={"top"}>
                  <Chip
                    data-for="soclose"
                    variant="outlined"
                    icon={
                      <Tooltip title="new item!">
                        <NewReleasesOutlinedIcon />
                        {/* <CircularProgress sx={{ height: "15px", width: "15px" }} /> */}
                      </Tooltip>
                    }
                    style={{
                      color: getColor(option),
                      fontWeight: "bold",
                    }}
                    label={option.name ? option.name : option}
                    size="small"
                    {...getTagProps({ index })}
                  />
                </Tooltip>
              </>
            ))
          }
          renderInput={(params) => (
            <Box className="autoComplete-container">
              <TextField autoFocus color="primary" {...params} label="Add Items" />
            </Box>
          )}
        />
      </form>

      {noDataInput && useList && (
        <div style={{ marginTop: 15, overflow: "auto", maxHeight: "350px" }}>
          <List dense sx={{ width: "100%" }}>
            {noDataInput.map((item, index) => generateNoDataItem(item, index))}
          </List>
        </div>
      )}
    </>
  );
}
