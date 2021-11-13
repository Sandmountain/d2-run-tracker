import React from "react";

import { Chip, Tooltip, Popover } from "@mui/material";

// Use for new item
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
// Use for potential upgrade
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ItemCard from "../../ItemCard/ItemCard.js";

import { getColor } from "../../../utils/utils.js";
import ItemChipIcon from "./ItemChipIcon.js";

export default function ItemChip(props) {
  const { getTagProps, item, setDialogItems, dialogItems, index } = props;

  const [indication, setIndication] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const updateItem = (item) => {
    const idx = dialogItems.findIndex((it) => it.name === item.name);
    setDialogItems((prev) => prev.map((it, i) => (i === idx ? item : it)));
  };

  // Only disable the tooltip if the mouse leaves, not when losing focus (changing values).
  const handleCloseTooltip = (event) => {
    if (event.type === "blur") {
      return;
    } else {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    let type = "";
    dialogItems[index].requirements.forEach((req) => {
      if (req.varies && req.customValue === 0) {
        type = "unset";
      }
    });
    dialogItems[index].stats.forEach((stat) => {
      if (stat.varies && stat.customValue === 0) {
        type = "unset";
      }
    });
    if (type !== "") {
      setIndication(type);
      return;
    }
    // TODO: Add code for comparing data to Holy Grail.
  }, [dialogItems, index]);

  return (
    <>
      <Tooltip
        open={open}
        placement={"top"}
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: "rgba(0,0,0,0)",
            },
          },
        }}
        onClose={(e) => handleCloseTooltip(e)}
        title={
          <>
            {item.image ? (
              <ItemCard item={item} tooltip={true} handleUpdatedItem={(item) => updateItem(item)} />
            ) : (
              "No info for custom items"
            )}
          </>
        }>
        <Chip
          variant="outlined"
          onMouseEnter={() => setOpen(true)}
          icon={<ItemChipIcon indication={indication} />}
          style={{
            color: getColor(item),
            fontWeight: "bold",
          }}
          label={item.name ? item.name : item}
          size="small"
          {...getTagProps({ index })}
        />
      </Tooltip>
    </>
  );
}
