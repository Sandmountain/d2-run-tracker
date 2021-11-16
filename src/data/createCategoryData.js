const data = require("./testdata1.json");
const FileSystem = require("fs");

const newItemData = [];
data.forEach((item, index) => {
  // if (index > 100) {
  //   return;
  // }

  let tempItem = item;
  if (item.category !== "") {
    let tempCategory = item.category;

    if (item.category.includes("Normal")) {
      tempCategory = item.category.split("Normal")[1];
    } else if (item.category.includes("Exceptional")) {
      tempCategory = item.category.split("Exceptional")[1];
    } else if (item.category.includes("Elite")) {
      tempCategory = item.category.split("Elite")[1];
    } else if (
      item.category.includes("Amazon") ||
      item.category.includes("Assassin") ||
      item.category.includes("Necromancer") ||
      item.category.includes("Barbarian") ||
      item.category.includes("Sorceress") ||
      item.category.includes("Druid") ||
      item.category.includes("Paladin")
    ) {
      tempCategory = "Class Specific Uniques";
    }
    tempCategory = tempCategory.trim();
    if (item.category.includes("Circlets")) {
      tempCategory = "Helms";
    } else if (item.category.includes("Javelins") || item.category.includes("Throwing Weapons")) {
      tempCategory = "Javelins & Throwing Weapons";
    } else if (item.category.includes("Mace Classes: Maces and Mauls") || item.category.includes("Maces")) {
      tempCategory = "Maces and Mauls";
    }
    delete tempItem.classSpecificSet;
    tempItem.category = tempCategory;
    newItemData.push(tempItem);
    // const index = arrayOfOccurences.findIndex((it) => it.category === tempCategory);

    // if (index !== -1) {
    //   arrayOfOccurences[index].items = [...arrayOfOccurences[index].items, item];
    // } else {
    //   arrayOfOccurences.push({ category: tempCategory, items: [item] });
    // }
  } else if (item.classSpecificSet !== "") {
    let tempCategory = tempItem.classSpecificSet;
    delete tempItem.classSpecificSet;
    tempItem.category = tempCategory;
    newItemData.push(item);

    // const index = arrayOfOccurences.findIndex((it) => it.category === tempCategory);

    // if (index !== -1) {
    //   arrayOfOccurences[index].items = [...arrayOfOccurences[index].items, item];
    // } else {
    //   arrayOfOccurences.push({ category: tempCategory, items: [item] });
    // }
  } else {
    let tempCategory;
    if (item.level <= 20) {
      tempCategory = "Starting Sets";
    } else {
      tempCategory = "Sets";
    }
    delete tempItem.classSpecificSet;
    tempItem.category = tempCategory;

    newItemData.push(tempItem);
    // const index = arrayOfOccurences.findIndex((it) => it.category === tempCategory);

    // if (index !== -1) {
    //   arrayOfOccurences[index].items = [...arrayOfOccurences[index].items, item];
    // } else {
    //   arrayOfOccurences.push({ category: tempCategory, items: [item] });
    // }
  }
});

//console.log(newItemData);

FileSystem.writeFile("testdata.json", JSON.stringify(newItemData), (error) => {
  if (error) throw error;
});
