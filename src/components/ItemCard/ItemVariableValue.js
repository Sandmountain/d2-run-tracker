import { Button, Slider, Tooltip, Popover, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function ItemVariableValue(props) {
  const { high, low, customizable } = props;

  const [rolledValue, setRolledValue] = React.useState(0);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const marks = [
    { value: parseInt(low), label: low },
    { value: parseInt(high), label: high },
  ];

  const handleCommitedValue = (val) => {
    handleClose();
    setRolledValue(val);
  };

  const valueLabelFormat = (value) => {
    return marks.findIndex((mark) => mark.value === value) + 1;
  };

  return (
    <>
      <Button
        style={{ color: "gray", cursor: "default" }}
        sx={{ padding: 0, margin: 0, minWidth: 0, fontSize: "1em", verticalAlign: "baseline" }}
        onClick={handleClick}
        disabled={!customizable}>
        {rolledValue !== 0 ? rolledValue : `${low}-${high}`}
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{ zIndex: 1500, marginLeft: "130px" }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}>
        <Box sx={{ width: "150px", padding: "15px", display: "flex", justifyContent: "center", flexDirection: "column" }}>
          <Typography>
            Choose a value between {low} and {high}
          </Typography>
          <Slider
            size="small"
            min={parseInt(low)}
            max={parseInt(high)}
            valueLabelDisplay="auto"
            marks={marks}
            onChangeCommitted={(_, v) => handleCommitedValue(v)}></Slider>
        </Box>
      </Popover>
    </>
  );
}
