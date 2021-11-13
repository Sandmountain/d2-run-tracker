import React from "react";

import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Tooltip from "@mui/material/Tooltip";

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
        break; // <NewReleasesOutlinedIcon />
      case "upgrade":
        break;
      default:
        break;
    }
  };

  return <span>{generateIcon()}</span>;
}
