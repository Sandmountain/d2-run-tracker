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

export const sortItems = (a, b) => {
  if (a.category === "" || b.category === "") return 0;

  if (a.category < b.category) {
    return -1;
  }

  if (a.category < b.category) {
    return 1;
  }

  if (a.category === b.category) {
    return 0;
  }
};

// Because the changes of the custom values are done on the loaded data itself,
// they need to be reseted after they are submitted.
export const resetCustomValue = (item) => {
  // If it's not a custom item
  if (item.image) {
    item.requirements.forEach((req) => {
      if (req.varies) {
        req.customValue = 0;
      }
    });

    item.stats.forEach((stat) => {
      if (stat.varies) {
        stat.customValue = 0;
      }
    });
  }
};

export const compareCustomValues = (holyGrailItem, foundItem) => {
  let item1Values = [];
  let item2Values = [];

  item1Values = holyGrailItem.requirements.reduce((prev, it) => {
    if (it.varies) {
      return [...prev, it.customValue];
    }
    return prev;
  }, []);

  item1Values = holyGrailItem.stats.reduce((prev, it) => {
    if (it.varies) {
      return [...prev, it.customValue];
    }
    return prev;
  }, []);

  item2Values = foundItem.requirements.reduce((prev, it) => {
    if (it.varies) {
      return [...prev, it.customValue];
    }
    return prev;
  }, []);

  item2Values = foundItem.stats.reduce((prev, it) => {
    if (it.varies) {
      return [...prev, it.customValue];
    }
    return prev;
  }, []);

  // Using counter to know if it's certanly better than the other item.
  let counter = 0;
  item2Values.forEach((value, index) => {
    if (value >= item1Values[index]) {
      counter++;
    }
  });

  let isCertainlyBetter = false;
  if (counter === item2Values.length) {
    isCertainlyBetter = true;
  }

  // If counter is 0, all values were worse
  let isCertainlyWorse = false;
  if (!counter) {
    isCertainlyWorse = true;
  }

  return { isCertainlyBetter, isCertainlyWorse };
};
