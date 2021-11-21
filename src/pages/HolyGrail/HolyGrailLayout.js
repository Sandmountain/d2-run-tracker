import React from "react";
import { Box } from "@mui/system";
import AddItemButtons from "./AddItemButtons/AddItemButtons";
import Categories from "./Categories/Categories";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function HolyGrailLayout() {
  const [showSpinner, setShowSpinner] = React.useState(true);
  const handleLoading = (val) => {
    setShowSpinner(val);
  };

  React.useEffect(() => {
    window.addEventListener("load", handleLoading(false));

    return () => {
      window.removeEventListener("load", handleLoading(true));
    };
  }, []);

  return (
    <>
      {showSpinner ? (
        <Box sx={{ width: "100%", height: "100%", display: "flex", position: "relative", top: "30%", justifyContent: "center" }}>
          <LoadingSpinner text="Loading Data" />
        </Box>
      ) : (
        <Box sx={{ height: "100%" }}>
          <AddItemButtons />
          <Categories />
        </Box>
      )}
    </>
  );
}
