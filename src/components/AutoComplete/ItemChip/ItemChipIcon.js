import React from "react";

import Tooltip from "@mui/material/Tooltip";

import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

export default function ItemChipIcon(props) {
  const { indication } = props;

  const generateIcon = () => {
    switch (indication) {
      case "unset":
        return (
          <Tooltip title="Unset values!">
            <HelpOutlineOutlinedIcon color="info" sx={{ verticalAlign: "middle", marginRight: "-6px" }} />
          </Tooltip>
        );
      case "new":
        return (
          <Tooltip title="New item added to Holy Grail!">
            <NewReleasesOutlinedIcon color="primary" sx={{ verticalAlign: "middle", marginRight: "-6px" }} />
          </Tooltip>
        );
      case "upgrade":
        return (
          <Tooltip title="Upgrade added to Holy Grail!">
            <ArrowCircleUpIcon sx={{ verticalAlign: "middle", marginRight: "-6px", color: "green" }} />
          </Tooltip>
        );
      case "downgrade":
        return (
          <Tooltip title="Not worth keeping">
            <ArrowCircleDownIcon color="info" sx={{ verticalAlign: "middle", marginRight: "-6px", color: "red" }} />
          </Tooltip>
        );
      case "uncertain":
        return (
          <Tooltip title="Compare values to decide">
            <HelpOutlineOutlinedIcon color="info" sx={{ verticalAlign: "middle", marginRight: "-6px" }} />
          </Tooltip>
        );
      default:
        break;
    }
  };

  return <span>{generateIcon()}</span>;
}
