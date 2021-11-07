import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import texture from "../../assets/graphic-assets/stone-texture.png";
import border from "../../assets/graphic-assets/custom-frame.png";

export const RockButton = styled((props) => <Button {...props} />)(({ theme }) => ({
  background: `url(${texture}), rgba(0, 0, 0, .3)`,
  border: "black",
  borderRadius: 0,
  borderStyle: "solid",
  borderColor: "inherit",
  borderImage: `url(${border}) 130 repeat`,
  borderImageWidth: "130px",
  boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.35)",
  "&:hover": {
    color: "#a07839",
  },
  "& .MuiTouchRipple-child": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
}));
