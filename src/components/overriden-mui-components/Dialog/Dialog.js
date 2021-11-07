import { Dialog } from "@mui/material";
import { styled } from "@mui/material/styles";

import texture from "../../../assets/graphic-assets/stone-texture.png";
import border from "../../../assets/graphic-assets/custom-frame.png";

export const RockDialog = styled((props) => <Dialog {...props} />)(({ theme }) => ({
  "& .MuiDialog-paper": {
    padding: "30px",
    background: `url(${texture}), rgba(15, 15, 15, 1)`,
    border: "black",
    borderRadius: 0,
    borderStyle: "solid",
    borderColor: "inherit",
    borderImage: `url(${border}) 130 repeat`,
    borderImageWidth: "135px",
    boxShadow: "0px 0px 10px 6px rgba(0, 0, 0, 0.35), inset 0px 0px 10px 30px #000000",
  },
}));
