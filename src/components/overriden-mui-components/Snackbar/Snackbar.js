import { Snackbar } from "@mui/material";
import { styled } from "@mui/material/styles";

import texture from "../../../assets/graphic-assets/stone-texture.png";
import border from "../../../assets/graphic-assets/custom-frame.png";

export const RockSnackbar = styled((props) => <Snackbar {...props} />)(({ theme }) => ({
  "& .MuiPaper-root": {
    padding: "10px 15px",
    background: `url(${texture}), rgba(5, 5, 5, .99)`,
    border: "black",
    borderRadius: 0,
    borderStyle: "solid",
    borderColor: "inherit",
    borderImage: `url(${border}) 130 repeat`,
    borderImageWidth: "135px",
    boxShadow: "0px 0px 10px 6px rgba(0, 0, 0, 0.35), inset 0px 0px 5px 10px rgba(0,0,0,.4)",
  },
}));
