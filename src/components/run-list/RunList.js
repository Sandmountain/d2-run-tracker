import * as React from "react";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import "../run-view/runview.css";
import "./run-list.css";

import { formatTime, getColor } from "../../utils/utils.js";

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
  <MuiAccordionSummary style={{}} expandIcon={props.useDropdown && <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />} {...props} />
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
  console.log(runData);

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
    };

    loot.forEach((item) => {
      switch (item.rarity) {
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
          break;
      }
    });

    return (
      <span style={{ opacity: 0.6 }}>
        {found.magic > 0 && <span class="magic">{found.magic} Magic </span>}
        {found.set > 0 && <span class="set">{found.set} Set </span>}
        {found.unique > 0 && <span class="unique">{found.unique} Unique </span>}
        {found.rune > 0 && <span class="rune">{found.rune} Rune</span>}
        {found.crafting > 0 && <span class="crafting">{found.rune} Mat</span>}
      </span>
    );
  };

  const generateInfoLoot = (item) => {
    return (
      <div className="lootItem-container">
        <img loading="lazy" height="60" src={require(`../../images/${item.url}.png`).default} alt="" />
        <span className="lootItem-text" style={{ color: getColor(item.rarity) }}>
          {item.name}
        </span>
      </div>
    );
  };

  const generateListItem = (runItem) => {
    return (
      <Accordion expanded={expanded === runItem.name} onChange={handleChange(runItem.name)}>
        <AccordionSummary useDropdown={runItem.loot.length > 0} aria-controls="panel1bh-content" id="panel1bh-header">
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
              <div className="loot-container">{runItem.loot.map((item) => generateInfoLoot(item))}</div>
              <div className="diablo-text">{formatTime(runItem.time)}</div>
            </div>
          </AccordionDetails>
        )}
      </Accordion>
    );
  };

  return <div style={{ width: "40vw", position: "relative" }}>{runData && runData.map((item) => generateListItem(item))}</div>;
}

const mockData = [
  {
    name: "Run 1",
    loot: [
      {
        name: "Ichorsting",
        url: "ichorsting",
        set: "",
        type: "Crossbow",
        reqLvl: 18,
        rarity: "unique",
      },
    ],
    time: 87,
  },
  {
    name: "Run 2",
    loot: [
      {
        name: "Iratha's Cuff",
        url: "irathas_cuff",
        set: "Iratha's Finery",
        type: "Light Gauntlets",
        reqLvl: 15,
        rarity: "set",
      },
      {
        name: "Cathan's Seal",
        url: "cathans_seal",
        set: "Cathan's Traps",
        type: "Ring",
        reqLvl: 11,
        rarity: "set",
      },
    ],
    time: 144,
  },
  {
    name: "Run 3",
    loot: [
      {
        name: "Kinemils Awl",
        url: "kinemils_awl",
        set: "",
        type: "Giant Sword",
        reqLvl: 23,
        rarity: "unique",
      },
      {
        name: "Isenhart's Parry",
        url: "isenharts_parry",
        set: "Isenhart's Armory",
        type: "Gothic Shield",
        reqLvl: 8,
        rarity: "set",
      },
    ],
    time: 133,
  },
  {
    name: "Run 4",
    loot: [
      {
        name: "Pierre Tombale Couant",
        url: "pierre_tombale_couant",
        set: "",
        type: "Partizan",
        reqLvl: 43,
        rarity: "unique",
      },
    ],
    time: 64,
  },
  {
    name: "Run 5",
    loot: [],
    time: 68,
  },
  {
    name: "Run 6",
    loot: [],
    time: 64,
  },
  {
    name: "Run 7",
    loot: [],
    time: 77,
  },
  {
    name: "Run 8",
    loot: [
      {
        name: "Thul Rune",
        url: "thul_rune",
        set: "",
        type: "Thul rune",
        reqLvl: "",
        rarity: "rune",
      },
    ],
    time: 67,
  },
  {
    name: "Run 9",
    loot: [
      {
        name: "Milabrega's Rod",
        url: "milabregas_rod",
        set: "Milabrega's Regalia",
        type: "War Scepter",
        reqLvl: 17,
        rarity: "set",
      },
    ],
    time: 81,
  },
  {
    name: "Run 10",
    loot: [],
    time: 76,
  },
  {
    name: "Run 11",
    loot: [],
    time: 0,
  },
];
