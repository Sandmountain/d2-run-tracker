import { Paper, Typography, Divider } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./item-card.css";

export default function ItemCard(props) {
  const { item } = props;

  const formatRequirementStats = (text, prevValue) => {
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
            <a className="" href="">
              {range}
            </a>
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
        property = `${splittedText[0]}`;
        if (!property.includes("Slots")) {
          property += ": ";
        }
        value = splittedText[1];
      }

      return (
        <>
          <span> {property}</span>
          <span className="magic list-shadow"> {value}</span>
        </>
      );
    }
  };

  const formatDetailStats = (stat, item) => {
    if (Array.isArray(stat.detail)) {
      //console.log(stat, item);
      return;
    }

    if (stat.varies) {
      let range = "";

      range = `${stat.detail.low}-${stat.detail.high}`;
      const [textBefore, textAfter] = stat.detail.text.split("{0}");

      return (
        <>
          <span className="magic list-shadow">
            <span>{textBefore}</span>
            <a className="" href="">
              {range}
            </a>
            <span>{textAfter}</span>
          </span>
        </>
      );
    } else {
      if (stat.detail.includes("Items)") || stat.detail.includes("Set")) {
        return <span className="set list-shadow">{stat.detail}</span>;
      } else {
        return <span className="magic list-shadow">{stat.detail}</span>;
      }
    }
  };

  return (
    <Box className="itemContainer">
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "15px",
          backgroundColor: "rgba(18,18,18,0.1)",
        }}
        square>
        <img loading="lazy" width="35px" src={require(`../../assets/item-art/${item.image}.png`).default} alt="" className="item-image" />
        <Typography
          className={`${item.rarity} diablo-text caps shadow`}
          sx={{ marginTop: "10px", maxWidth: "80%", textAlign: "center", mb: "5px" }}>
          {item.name}
        </Typography>

        <Typography variant="caption" sx={{ lineHeight: "1" }}>
          {item.type && item.type}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {item.level > 0 && <Typography variant="caption">Required level: {item.level}</Typography>}
          {item.requirements.length > 0 &&
            item.requirements.map((requirement, idx) => {
              return (
                <Typography key={idx} variant="caption" sx={{ textAlign: "center" }}>
                  {formatRequirementStats(requirement, idx > 0 && item.requirements[idx - 1])}
                </Typography>
              );
            })}
          {item.stats.length > 0 &&
            item.stats.map((stat, idx) => {
              return (
                <Typography key={idx} variant="caption" sx={{ textAlign: "center" }}>
                  {formatDetailStats(stat, item)}
                </Typography>
              );
            })}
        </Box>
      </Paper>
    </Box>
  );
}
