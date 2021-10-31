export const formatTime = (timer) => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);

  return `${getMinutes}:${getSeconds}`;
};

export const getColor = (rarity) => {
  switch (rarity) {
    case "set":
      return "green";
    case "unique":
      return "#A59263";
    case "magic":
      return "#4169E1";
    case "rune":
      return "#FFA500";
    case "crafting":
      return "#FFA500";
    default:
      break;
  }
};
