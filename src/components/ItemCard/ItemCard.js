import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./item-card.css";
import ItemVariableValue from "./ItemVariableValue";

export default function ItemCard(props) {
  const { item, customizable = false, handleUpdatedItem, tooltip = false } = props;
  const formatRequirementStats = (text, idx) => {
    let value;
    let property;

    // Never more than 2 values that varies.
    if (Array.isArray(text.requirement)) {
      const splittedText = text.requirement[0].text.split(":");
      property = `${splittedText[0]}: `;

      return (
        <>
          <span>{property}</span>
          <span className="magic list-shadow">
            <ItemVariableValue
              customizable={customizable}
              low={text.requirement[0].low}
              high={text.requirement[1].high}
              handleUpdatedItem={handleUpdatedItem}
              item={item}
              detail={false}
              idx={idx}></ItemVariableValue>
          </span>
        </>
      );
    }

    if (text.varies) {
      const splittedText = text.requirement.text.split(":");

      property = `${splittedText[0]}: `;
      let [textBefore, textAfter] = splittedText[1].split("{0}");
      return (
        <>
          <span>{property}</span>
          <span className="magic list-shadow">
            <span>{textBefore}</span>
            <ItemVariableValue
              customizable={customizable}
              low={text.requirement.low}
              high={text.requirement.high}
              handleUpdatedItem={handleUpdatedItem}
              item={item}
              detail={false}
              idx={idx}></ItemVariableValue>
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

  const formatDetailStats = (stat, idx) => {
    if (Array.isArray(stat.detail)) {
      return;
    }

    if (stat.varies) {
      const [textBefore, textAfter] = stat.detail.text.split("{0}");
      //console.log(item);
      return (
        <>
          <span className="magic list-shadow">
            <span>{textBefore}</span>
            <ItemVariableValue
              customizable={customizable}
              low={stat.detail.low}
              high={stat.detail.high}
              handleUpdatedItem={handleUpdatedItem}
              item={item}
              detail={true}
              idx={idx}></ItemVariableValue>
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
    <Box>
      <Paper
        className="itemContainer"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "15px 15px 30px 15px",
          backgroundColor: "rgba(18,18,18,1)",
        }}
        square>
        <img loading="lazy" width="35px" src={require(`../../assets/item-art/${item.image}.png`).default} alt="" className="item-image" />
        <Typography className={`${item.rarity} diablo-text caps shadow`} sx={{ marginTop: "10px", maxWidth: "80%", textAlign: "center" }}>
          {item.name}
        </Typography>

        <Typography variant="caption" sx={{ lineHeight: "1", color: "gray", mb: "5px" }}>
          {item.type && item.type}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {item.level > 0 && <Typography variant="caption">Required level: {item.level}</Typography>}
          {item.requirements.length > 0 &&
            item.requirements.map((requirement, idx) => {
              return (
                <Typography key={idx} variant="caption" sx={{ textAlign: "center" }}>
                  {formatRequirementStats(requirement, idx)}
                </Typography>
              );
            })}
          {item.stats.length > 0 &&
            item.stats.map((stat, idx) => {
              return (
                <Typography key={idx} variant="caption" sx={{ textAlign: "center" }}>
                  {formatDetailStats(stat, idx)}
                </Typography>
              );
            })}
          {item.counter && !tooltip && (
            <Box>
              <Typography className="diablo-text caps" sx={{ textAlign: "center", fontSize: "10px", lineHeight: 1, mt: "5px" }}>
                Found: {item.counter} time{item.counter > 1 ? "s" : ""}
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
