import React from "react";
import { TextField, Autocomplete, Box, Chip, Typography, List } from "@mui/material";

import { getColor } from "../../utils/utils.js";
import "./auto-complete.css";
import CustomItemList from "../CustomItemList/CustomItemList.js";
const data = require("../../data/data.json");

export default function AutoComplete(props) {
  const { setDialogItems, dialogItems } = props;

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
          url: "",
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
      <form onSubmit={handleDialogSubmit} style={{ marginTop: 10 }}>
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
                <img loading="lazy" width="25" src={require(`../../images/${option.image}.png`).default} alt="" />
              </div>
              <Typography className={`${option.rarity} list-shadow`}>{option.name}</Typography>
            </Box>
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                style={{
                  color: getColor(option),
                  fontWeight: "bold",
                }}
                label={option.name ? option.name : option}
                size="small"
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <Box className="autoComplete-container">
              <TextField autoFocus color="primary" {...params} label="Add Items" />
            </Box>
          )}
        />
      </form>

      {noDataInput && (
        <div style={{ marginTop: 15 }}>
          <List dense sx={{ width: "100%" }}>
            {noDataInput.map((item, index) => generateNoDataItem(item, index))}
          </List>
        </div>
      )}
    </>
  );
}
