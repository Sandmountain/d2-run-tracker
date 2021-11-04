import * as React from "react";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import "../RunView/run-view.css";
import "./run-list.css";
import "../GenerateSocketImage/generate-socket-image.css";

import { formatTime, getColor } from "../../utils/utils.js";
import GenerateSocketImage from "../GenerateSocketImage/GenerateSocketImage";

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    style={{}}
    expandIcon={props.hasitems === "true" && <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function RunList(props) {
  const { runData } = props;

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const generateLootText = (loot) => {
    const found = {
      magic: 0,
      unique: 0,
      set: 0,
      rune: 0,
      crafting: 0,
      normal: 0,
    };

    loot.forEach((item) => {
      switch (item?.rarity) {
        case "set":
          found.set = found.set + 1;
          break;
        case "unique":
          found.unique = found.unique + 1;
          break;
        case "magic":
          found.magic = found.magic + 1;
          break;
        case "rune":
          found.rune = found.rune + 1;
          break;
        case "crafting":
          found.crafting = found.crafting + 1;
          break;
        default:
          found.normal = found.normal + 1;
          break;
      }
    });

    return (
      <span style={{ opacity: 0.6 }}>
        {found.magic > 0 && <span className="magic">{found.magic} Magic </span>}
        {found.set > 0 && <span className="set">{found.set} Set </span>}
        {found.unique > 0 && <span className="unique">{found.unique} Unique </span>}
        {found.rune > 0 && <span className="rune">{found.rune} Rune</span>}
        {found.crafting > 0 && <span className="crafting">{found.crafting} Mat</span>}
        {found.normal > 0 && <span className="normal">{found.normal} Base</span>}
      </span>
    );
  };

  const generateInfoLoot = (item, idx) => {
    return (
      <div key={idx} className="lootItem-container">
        {item.image && <img loading="lazy" height="60" src={require(`../../images/${item.image}.png`).default} alt="" />}
        {!item.image ? <GenerateSocketImage sockets={item.sockets}></GenerateSocketImage> : <div></div>}
        <span className="lootItem-text" style={{ color: getColor(item) }}>
          {item.name}
        </span>
      </div>
    );
  };

  const generateListItem = (runItem, index) => {
    return (
      <Accordion key={index} expanded={expanded === runItem.name} onChange={handleChange(runItem.name)}>
        <AccordionSummary hasitems={(runItem.loot.length > 0).toString()} aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography className="diablo-text" sx={{ width: "33%", flexShrink: 0, fontWeight: "bold" }}>
            {runItem.name}
          </Typography>
          {runItem.loot.length > 0 ? (
            <Typography sx={{ color: "text.secondary" }} style={{ textAlign: "end", width: "100%" }}>
              {generateLootText(runItem.loot)}
            </Typography>
          ) : (
            <Typography sx={{ color: "text.secondary" }} style={{ textAlign: "end", width: "100%" }} className="diablo-text">
              {formatTime(runItem.time)}
            </Typography>
          )}
        </AccordionSummary>
        {runItem.loot.length > 0 && (
          <AccordionDetails>
            <div className="accordation-details-container">
              <div className="loot-container">{runItem.loot.map((item, idx) => generateInfoLoot(item, idx))}</div>

              <div className="diablo-text">{formatTime(runItem.time)}</div>
            </div>
          </AccordionDetails>
        )}
      </Accordion>
    );
  };

  return (
    <div style={{ width: "40vw", position: "relative" }}>
      {runData && runData.map((item, index) => generateListItem(item, index)).reverse()}
    </div>
  );
}
