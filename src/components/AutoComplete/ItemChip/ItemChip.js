import React from "react";

import { Chip, Tooltip } from "@mui/material";

import ItemCard from "../../ItemCard/ItemCard.js";

import { compareCustomValues, getColor } from "../../../utils/utils.js";
import ItemChipIcon from "./ItemChipIcon.js";
import { useHolyGrail } from "../../../Context/HolyGrailContext.js";
import CompareItemsDialog from "../../Dialogs/CompareItemsDialog.js";

export default function ItemChip(props) {
  const { getTagProps, item, setDialogItems, dialogItems, index, chipStatus, processChip } = props;
  const { holyGrail } = useHolyGrail();

  const [showComparisonDialog, setShowComparisonDialog] = React.useState(false);

  const [storedItem, setStoredItem] = React.useState({});
  const [foundItem, setFoundItem] = React.useState({});

  const [open, setOpen] = React.useState(false);

  const updateItem = (item) => {
    const idx = dialogItems.findIndex((it) => it.name === item.name);
    setDialogItems((prev) => prev.map((it, i) => (i === idx ? item : it)));
    handleCompareItems();
  };

  const handleChosenItem = (newItem) => {
    if (newItem) {
      processChip("upgrade", index, true);
    } else {
      processChip("downgrade", index, true);
    }
    setOpen(false);
  };

  // Only disable the tooltip if the mouse leaves, not when losing focus (changing values).
  const handleCloseTooltip = (event) => {
    if (event.type === "blur") {
      return;
    } else {
      setOpen(false);
      handleCompareItems();
    }
  };

  const handleCompareItems = React.useCallback(() => {
    if (chipStatus[index].indicator !== "unset") {
      if (holyGrail[item.category]?.length > 0) {
        // Using first index, because there will always only be one.
        const holyGrailItem = holyGrail[item.category].filter((it) => it.name === item.name)[0];
        if (holyGrailItem) {
          const result = compareCustomValues(holyGrailItem, item);

          if (result.isCertainlyBetter) {
            // Upgrade!
            // Add to Holy Grail and show snackbar!
            processChip("upgrade", index);
            //setSymbolIndication("upgrade");
            return;
          }

          if (result.isCertainlyWorse) {
            processChip("downgrade", index);
            //setSymbolIndication("downgrade");
            return;
          }
          if (!chipStatus[index].decided) {
            processChip("", index, true);
            //setSymbolIndication("uncertain");
            // Show comparison Dialog and let user choose.
            setStoredItem(holyGrailItem);
            setFoundItem(item);

            setShowComparisonDialog(true);
          }
        } else {
          // Add to Holy Grail and show snackbar!
          processChip("new", index);
        }
      } else {
        // Add to Holy Grail and show snackbar!
        processChip("new", index);
      }
    }
  }, [chipStatus, holyGrail, index, item, processChip]);

  React.useEffect(() => {
    // Don't do anything if dialog items are reset
    if (!dialogItems.length) {
      return;
    }

    if (chipStatus[index]?.indicator === "" || chipStatus[index]?.indicator === "unset") {
      let indicatorType = "";
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
      if (indicatorType === "" && !chipStatus[index].decided) {
        processChip(indicatorType, index);
        handleCompareItems();
      }
    }
  }, [dialogItems, index, chipStatus, processChip, item, handleCompareItems]);

  return (
    <>
      <Tooltip
        open={open && !showComparisonDialog}
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
              <ItemCard item={item} customizable={true} handleUpdatedItem={(item) => updateItem(item)} />
            ) : (
              "No info for custom items"
            )}
          </>
        }>
        <Chip
          variant="outlined"
          onMouseEnter={() => setOpen(true)}
          onClick={() => setOpen(true)}
          icon={<ItemChipIcon indication={chipStatus[index].indicator} />}
          style={{
            color: getColor(item),
            fontWeight: "bold",
          }}
          label={item.name ? item.name : item}
          size="small"
          {...getTagProps({ index })}
        />
      </Tooltip>
      <CompareItemsDialog
        showComparisonDialog={showComparisonDialog}
        setShowComparisonDialog={setShowComparisonDialog}
        storedItem={storedItem}
        foundItem={foundItem}
        handleChosenItem={handleChosenItem}></CompareItemsDialog>
    </>
  );
}
