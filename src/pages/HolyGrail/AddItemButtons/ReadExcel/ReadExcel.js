import { InfoSharp } from "@mui/icons-material";
import { Button, CircularProgress, Tooltip } from "@mui/material";
import React from "react";
import * as XLSX from "xlsx";

import data from "../../../../data/testdata.json";

export default function ReadExcel(props) {
  const { setItemsToAdd, setShowAutoComplete } = props;
  const [isLoading, setIsLoading] = React.useState(false);

  const handleFile = ({ target }) => {
    const reader = new FileReader();

    reader.onload = (evt) => {
      setIsLoading(true);
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const sheetData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      /* Update state */
      findItems(sheetData);
    };
    reader.readAsBinaryString(target.files[0]);

    // This is a fix for the change to apply second time if multiple files are uploaded.
    target.value = "";
  };

  const findItems = (sheetData) => {
    const foundItems = [];
    sheetData.forEach((row) => {
      if (row.length > 0) {
        row.forEach((col) => {
          if (col) {
            const foundItem = data.find((item) => item.name.toLocaleLowerCase() === col.toLocaleLowerCase());
            foundItem && foundItems.push(foundItem);
          }
        });
      }
    });
    setIsLoading(false);
    setItemsToAdd(foundItems);
    setShowAutoComplete(true);
  };

  return (
    <>
      <Button
        startIcon={isLoading && <CircularProgress style={{ height: "1em", width: "1em" }} size="small" />}
        endIcon={
          <Tooltip title="Upload a .csv or .xlsx. Will only parse exact matches.">
            <InfoSharp />
          </Tooltip>
        }
        variant="text"
        component="label">
        Mass import items
        <input type="file" accept=".csv,.xlsx" hidden onChange={handleFile} />
      </Button>
    </>
  );
}
