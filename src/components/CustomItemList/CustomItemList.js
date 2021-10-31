import React from "react";
import { ListItem, ListItemText, IconButton, Popover, Slider } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";

export default function CustomItemList(props) {
  const { newInputValue, dialogItems, setDialogItems } = props;

  // Popover
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sliderValue, setSliderValue] = React.useState(0);
  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (item) => {
    setAnchorEl(null);

    // Update sockets value
    const newItem = item;
    newItem.sockets = sliderValue;

    const dItemValues = dialogItems.map((item) => {
      if (item.name === newItem.name) {
        return newItem;
      } else {
        return item;
      }
    });
    setDialogItems(dItemValues);
  };

  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton onClick={handleClick} aria-describedby={id}>
            <CommentIcon />
          </IconButton>
          <Popover
            id={id}
            open={openPopover}
            anchorEl={anchorEl}
            onClose={() => handleClose(newInputValue)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}>
            <div style={{ padding: 20 }}>
              Set Amount of sockets:
              <Slider
                onChange={(e, val) => {
                  setSliderValue(val);
                }}
                onChangeCommitted={() => handleClose(newInputValue)}
                color="secondary"
                size="small"
                value={sliderValue}
                min={0}
                max={6}
                aria-label="Small"
                valueLabelDisplay="auto"
              />
            </div>
          </Popover>
        </>
      }>
      <ListItemText
        primary={
          <p style={{ width: "100%" }}>
            {newInputValue.name}{" "}
            <span style={{ textAlign: "center" }} hidden={!(newInputValue.sockets > 0)}>
              {"sockets: " + newInputValue.sockets}
            </span>
          </p>
        }
      />
    </ListItem>
  );
}
