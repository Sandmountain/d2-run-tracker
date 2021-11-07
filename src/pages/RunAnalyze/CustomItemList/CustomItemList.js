import React from "react";
import { ListItem, ListItemText, IconButton, Popover, Slider, Tooltip } from "@mui/material";
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
          <Tooltip title="Add sockets to item">
            <IconButton onClick={handleClick} aria-describedby={id}>
              <CommentIcon />
            </IconButton>
          </Tooltip>
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ width: "33%" }}>{newInputValue.name} </p>
            <p style={{ width: "33%", textAlign: "center", color: "gray" }} hidden={!(newInputValue.sockets > 0)}>
              {"sockets: " + newInputValue.sockets}
            </p>
            <div style={{ width: "33%" }}></div>
          </div>
        }
      />
    </ListItem>
  );
}
