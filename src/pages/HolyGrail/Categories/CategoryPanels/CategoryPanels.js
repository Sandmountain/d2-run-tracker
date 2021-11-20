import React from "react";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import texture from "../../../../assets/graphic-assets/button-texture.png";

import { getColor } from "../../../../utils/utils.js";
import { Tooltip } from "@mui/material";

import ItemCard from "../../../../components/ItemCard/ItemCard";
import { useHolyGrail } from "../../../../Context/HolyGrailContext";

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `1px solid rgba(143, 107, 50, 0.3)`,

  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={props.hasitems === "true" && <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />} {...props} />
))(({ theme, randomize }) => ({
  //randomize comes from the props to get the tiles look random in the list
  background: `url(${texture}), rgba(0, 0, 0, .6)`,
  backgroundPositionX: randomize,
  backgroundPositionY: randomize,
  transform: `rotateX(${randomize})`,
  boxShadow: "inset 0px 0px 2px 1px rgba(0,0,0, .1)",
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
  borderTop: "1px solid rgba(143, 107, 50, .3)",
}));

export default function CategoryPanels(props) {
  const { category, index } = props;
  const hg = useHolyGrail();

  const [expanded, setExpanded] = React.useState(false);
  const [foundItems, setFoundItems] = React.useState([]);

  const generateLootText = (loot) => {
    const found = {
      unique: loot[0].rarity === "unique" ? loot.length : 0,
      set: loot[0].rarity === "set" ? loot.length : 0,
      rune: loot[0].rarity === "rune" ? loot.length : 0,
      crafting: loot[0].rarity === "crafting" ? loot.length : 0,
    };

    return (
      <span style={{ opacity: 0.6 }}>
        {found.set > 0 && (
          <>
            <span className="set"> {foundItems.length}</span> / {found.set} Found
          </>
        )}
        {found.unique > 0 && (
          <>
            <span className="unique"> {foundItems.length}</span> / {found.unique} Found
          </>
        )}
        {found.rune > 0 && (
          <>
            <span className="rune"> {foundItems.length}</span> / {found.rune} Found
          </>
        )}
        {found.crafting > 0 && (
          <>
            <span className="crafting"> {foundItems.length}</span> / {found.crafting} Found
          </>
        )}
      </span>
    );
  };

  const generateInfoLoot = (item, idx) => {
    const foundItem = foundItems.filter((it) => it.name === item.name);
    return (
      <Tooltip
        key={idx}
        placement={"top"}
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: "rgba(0,0,0,0)",
            },
          },
        }}
        title={<ItemCard customizable={false} item={foundItem.length > 0 ? foundItem[0] : item} />}>
        <div className={`lootItem-container ${foundItem.length > 0 ? "" : "item-notFound"}`}>
          {item.image && (
            <img
              loading="lazy"
              className="loot-image"
              height="60"
              src={require(`../../../../assets/item-art/${item.image}.png`).default}
              alt=""
            />
          )}
          <span className="lootItem-text" style={{ color: getColor(item) }}>
            {item.name}
          </span>
        </div>
      </Tooltip>
    );
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  React.useEffect(() => {
    if (hg.holyGrail[category.category]?.length > 0) {
      setFoundItems(hg.holyGrail[category.category]);
    }
  }, [hg, category]);

  return (
    <Accordion key={index} expanded={expanded === category.category} onChange={handleChange(category.category)}>
      <AccordionSummary randomize={index * 20} hasitems={true.toString()} aria-controls="panel1bh-content" id="panel1bh-header">
        <Typography
          className="diablo-text caps"
          sx={{ width: "60%", flexShrink: 0, fontWeight: "bold", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
          {category.category}
        </Typography>
        {category.items.length > 0 ? (
          <Typography sx={{ color: "text.secondary" }} style={{ textAlign: "end", width: "100%" }}>
            {generateLootText(category.items)}
          </Typography>
        ) : (
          <Typography sx={{ color: "text.secondary" }} style={{ textAlign: "end", width: "100%" }} className="diablo-text">
            {category.items.length}
          </Typography>
        )}
      </AccordionSummary>
      <AccordionDetails>
        <div className="accordation-details-container">
          <div>
            <div className="loot-container">{category.items.map((item, idx) => generateInfoLoot(item, idx))}</div>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
