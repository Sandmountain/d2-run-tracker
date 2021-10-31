import React from "react";
import { TextField, Autocomplete, Box, Chip, Typography } from "@mui/material";
import { getColor } from "../../utils/utils.js";
import "./auto-complete.css";
const data = require("../../data/database.json");

export default function AutoComplete(props) {
  const { setDialogItems } = props;

  const [inputValue, setInputValue] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleDialogSubmit = (e) => {
    e.preventDefault();
  };

  const handleChoices = (_, choices) => {
    setDialogItems(choices);
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
  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue.length > 1) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <form onSubmit={handleDialogSubmit} style={{ marginTop: 10 }}>
      <Autocomplete
        multiple
        fullWidth
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
              <img loading="lazy" width="25" src={require(`../../images/${option.url}.png`).default} alt="" />
            </div>
            <Typography className={`${option.rarity} list-shadow`}>{option.name}</Typography>
          </Box>
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              style={{
                color: getColor(option.rarity),
                fontWeight: "bold",
              }}
              label={option.name}
              size="small"
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => <TextField color="info" {...params} label="Items" />}
      />
    </form>
  );
}
