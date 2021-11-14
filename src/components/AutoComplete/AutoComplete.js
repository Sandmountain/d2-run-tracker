import React from "react";
import { TextField, Autocomplete, Box, Typography, List } from "@mui/material";

import "./auto-complete.css";
import CustomItemList from "../../pages/RunAnalyze/CustomItemList/CustomItemList.js";

import ItemChip from "./ItemChip/ItemChip.js";

const data = require("../../data/testdata.json");

export default function AutoComplete(props) {
  const { setDialogItems, dialogItems, useList = true, customItems = true } = props;

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

  return (
    <>
      <form onSubmit={handleDialogSubmit} style={{ marginTop: 10, overflow: "hidden" }}>
        <Autocomplete
          multiple
          fullWidth
          freeSolo={customItems}
          size="small"
          open={open}
          value={dialogItems}
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
              <ItemChip
                item={option}
                key={index}
                index={index}
                setDialogItems={setDialogItems}
                dialogItems={dialogItems}
                getTagProps={getTagProps}></ItemChip>
            ))
          }
          renderInput={(params) => (
            <Box className="autoComplete-container" sx={!customItems ? { padding: "65px" } : {}}>
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
