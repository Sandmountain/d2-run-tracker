import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import texture from "./button-texture.png";
import border from "./ram-test.png";

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
  // flexDirection: "row-reverse",
  // "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
  //   transform: "rotate(90deg)",
  // },
  // "& .MuiAccordionSummary-content": {
  //   marginLeft: theme.spacing(1),
  // },
}));

/*
position: relative;
  border-style: solid;
  border-color: inherit;

		border-image: url(./ram-test.png) 130 repeat;
		border-image-width: 130px;
		background-color: rgba(0, 0, 0, 0.24);
		z-index: 0;
		box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.35);
	}



*/
