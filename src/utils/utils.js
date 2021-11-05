const formatShortTime = (timer) => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);

  return `${getMinutes}:${getSeconds}`;
};

const formatLongTime = (timer) => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};

export const formatTime = (time) => {
  if (time > 3600) {
    return formatLongTime(time);
  } else {
    return formatShortTime(time);
  }
};

export const getColor = (option) => {
  switch (option?.rarity) {
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
      return "#FFF";
  }
};