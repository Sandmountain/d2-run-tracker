import { Paper, Typography, Divider } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function ItemCard(props) {
  const { item } = props;

  const formatRequirementStats = (text, item) => {
    let value;
    let property;

    // Never more than 2 values that varies.
    if (Array.isArray(text.requirement)) {
      let range = "";
      const splittedText = text.requirement[0].text.split(":");

      property = `${splittedText[0]}: `;
      range = `${text.requirement[0].low}-${text.requirement[1].high}`;

      return (
        <>
          <span>{property}</span>
          <span className="magic list-shadow">
            <span className="">{range}</span>
          </span>
        </>
      );
    }

    if (text.varies) {
      let range = "";

      range = `${text.requirement.low}-${text.requirement.high}`;

      const splittedText = text.requirement.text.split(":");

      property = `${splittedText[0]}: `;
      let [textBefore, textAfter] = splittedText[1].split("{0}");
      return (
        <>
          <span>{property}</span>
          <span className="magic list-shadow">
            <span>{textBefore}</span>
            <span className="">{range}</span>
            <span>{textAfter}</span>
          </span>
        </>
      );
    } else {
      const splittedText = text?.requirement.split(":");

      if (splittedText[0].includes("Chance to Block")) {
        property = `${splittedText[0]}: `;
        value = splittedText.reduce((res, item, index) => {
          if (!index) {
            return "";
          } else if (index === 1) {
            return (res += item);
          } else {
            return (res += item);
          }
        }, "");
      } else {
        property = `${splittedText[0]}: `;
        value = splittedText[1];
      }

      return (
        <>
          <span> {property}</span>
          <span className="magic list-shadow"> {value}</span>
        </>
      );
    }

    // const splittedText = text.split(":");
    // // split the text by spaces,
    // console.log(splittedText);
    // const property = splittedText[0];

    // //TODO: This should probably be done on the dataset but cba.
    // const value = splittedText[1];
    // let parsedValue = splittedText[0] === "Chance to Block" ? text.split("Chance to Block:") : value;
  };

  return (
    <Box sx={{ width: "300px" }}>
      <Paper sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "15px" }}>
        <img loading="lazy" width="35px" src={require(`../../assets/item-art/${item.image}.png`).default} alt="" />
        <Typography className={`${item.rarity} diablo-text caps shadow`} sx={{ marginTop: "10px" }}>
          {item.name}
        </Typography>
        <Typography variant="caption" sx={{ lineHeight: "1" }}>
          {item.type}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80%" }}>
          {item.level && <Typography variant="caption">Required level: {item.level}</Typography>}
          {item.requirements.length > 0 &&
            item.requirements.map((requirement, idx) => {
              return (
                <Typography key={idx} variant="caption">
                  {formatRequirementStats(requirement, item)}
                </Typography>
              );
            })}

          {item.stats.length > 0 &&
            item.stats.map((stat, idx) => {
              return (
                <Typography key={idx} variant="caption">
                  {/* {stat.detail} */}
                </Typography>
              );
            })}
        </Box>
      </Paper>
    </Box>
  );
}
