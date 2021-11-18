import React from "react";

import { Chip, Tooltip } from "@mui/material";

import ItemCard from "../../ItemCard/ItemCard.js";

import { compareCustomValues, getColor } from "../../../utils/utils.js";
import ItemChipIcon from "./ItemChipIcon.js";
import { useHolyGrail } from "../../../Context/HolyGrailContext.js";

export default function ItemChip(props) {
  const { getTagProps, item, setDialogItems, dialogItems, index } = props;
  const { holyGrail } = useHolyGrail();

  const [symbolIndication, setSymbolIndication] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const updateItem = (item) => {
    const idx = dialogItems.findIndex((it) => it.name === item.name);
    setDialogItems((prev) => prev.map((it, i) => (i === idx ? item : it)));
  };

  const handleChipIcons = React.useCallback(() => {
    if (holyGrail[item.category]?.length > 0 && (symbolIndication !== "unset" || symbolIndication === "")) {
      // Using first index, because there will always only be one.
      const holyGrailItem = holyGrail[item.category].filter((it) => it.name === item.name)[0];
      if (holyGrailItem) {
        const result = compareCustomValues(holyGrailItem, item);

        if (result.isCertainlyBetter) {
          // Upgrade!
          // Add to Holy Grail
          setSymbolIndication("upgrade");
          return;
        }

        if (result.isCertainlyWorse) {
          setSymbolIndication("downgrade");
          return;
        }
        setSymbolIndication("uncertain");
        // Show comparison Dialog and let user choose.
      } else {
        // New item!!
        setSymbolIndication("new");
      }
    } else {
      setSymbolIndication("new");
    }
  }, [holyGrail, item, symbolIndication]);

  // TODO: Every time a new item is added, the icon is lost. This will recalcuate the value for it.
  // Could possibly store the value inside the item instead for performance reasons.
  React.useEffect(() => {
    handleChipIcons();
  }, [handleChipIcons]);

  // Only disable the tooltip if the mouse leaves, not when losing focus (changing values).
  const handleCloseTooltip = (event) => {
    if (event.type === "blur") {
      return;
    } else {
      setOpen(false);
      handleChipIcons();
    }
  };

  React.useEffect(() => {
    // Don't do anything if dialog items are reset
    if (!dialogItems.length) {
      return;
    }
    let indicatorType = "";
    setSymbolIndication(indicatorType);

    dialogItems[index].requirements?.length > 0 &&
      dialogItems[index].requirements.forEach((req) => {
        if (req.varies && req.customValue === 0) {
          indicatorType = "unset";
        }
      });
    dialogItems[index].stats?.length > 0 &&
      dialogItems[index].stats.forEach((stat) => {
        if (stat.varies && stat.customValue === 0) {
          indicatorType = "unset";
        }
      });
    if (indicatorType !== "") {
      setSymbolIndication(indicatorType);
      return;
    }
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
          onClick={() => setOpen(true)}
          icon={<ItemChipIcon indication={symbolIndication} />}
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
