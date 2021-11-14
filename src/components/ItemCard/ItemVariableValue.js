import { Button, Slider, Popover, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function ItemVariableValue(props) {
  const { high, low, customizable, item, handleUpdatedItem, detail, idx } = props;

  const [rolledValue, setRolledValue] = React.useState(0);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCommitedValue = (val) => {
    handleClose();
    setRolledValue(val);
    if (detail) {
      // If I choose to go back to make this using state.
      // setItemUpdated((prev) => ({
      //   ...prev,
      //   stats: prev.stats.map((obj, index) => {
      //     return idx === index ? { ...obj, customValue: val } : obj;
      //   }),
      // }));
      item.stats[idx].customValue = val;
      handleUpdatedItem(item);
    } else {
      // If I choose to go back to make this using state.
      // setItemUpdated((prev) => ({
      //   ...prev,
      //   requirements: prev.requirements.map((obj, index) => {
      //     return idx === index ? { ...obj, customValue: val } : obj;
      //   }),
      // }));
      item.requirements[idx].customValue = val;
      handleUpdatedItem(item);
    }
  };

  const generateButtonText = () => {
    if (rolledValue !== 0) {
      return rolledValue;
    }

    if (detail) {
      if (item.stats[idx].customValue !== 0) {
        return item.stats[idx].customValue;
      }
    } else {
      if (item.requirements[idx].customValue !== 0) {
        return item.requirements[idx].customValue;
      }
    }

    return (
      <span className="glowing-text">
        {low}-{high}
      </span>
    );
  };

  return (
    <>
      <Button
        sx={{ padding: 0, margin: 0, minWidth: 0, fontSize: "1em", verticalAlign: "baseline", color: "gray", cursor: "default" }}
        onClick={handleClick}
        disabled={!customizable}>
        {generateButtonText()}
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{ zIndex: 1500 }}
        PaperProps={{
          sx: {
            borderRadius: 0,
            backgroundImage: "none",
            backgroundColor: "rgba(18,18,18, 0.95)",
          },
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}>
        <Box
          className="itemSlider-frame"
          sx={{ width: "150px", padding: "15px", display: "flex", justifyContent: "center", flexDirection: "column" }}>
          <Typography variant="caption">
            Select the rolled value between {low} and {high}.
          </Typography>
          <Slider
            size="small"
            min={parseInt(low)}
            max={parseInt(high)}
            valueLabelDisplay="auto"
            onChangeCommitted={(_, v) => handleCommitedValue(v)}></Slider>
        </Box>
      </Popover>
    </>
  );
}
