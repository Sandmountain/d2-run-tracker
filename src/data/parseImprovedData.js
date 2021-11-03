const FileSystem = require("fs");

const old = require("./database.json");
const newest = require("./improvedData.json");

// console.log(old[0]);
// console.log(newest[0]);

// @ts-ignore
const struct = {
  category: "",
  level: "",
  type: "",
  stats: [],
  image: "",
};

// Checking if the datas are synced
//const notFound = [];
// newest.forEach((item, index) => {
//   const res = old.find((oldItem) => oldItem.name === item.name);
//   if (!res) {
//     notFound.push(item.name);
//     //console.log(item);
//   }
// });

// old.forEach((item) => {
//   const res = newest.find((newItem) => newItem.name.toLowerCase() === item.name.toLowerCase());
//   if (!res) {
//     notFound.push(item.name);
//   }
// });

const newData = [];

// @ts-ignore
newest.forEach((item, index) => {
  if (true) {
    // Retrive the old item from the old database
    const struct = {
      classSpecificSet: "",
      category: "",
      level: 0,
      type: "",
      rarity: "",
      requirements: [],
      stats: [],
      setName: "",
      image: "",
    };

    const requirements = [];
    const regex = /\<([^>]+)>/gi;

    if (item.category !== "runes") {
      // @ts-ignore
      struct.stats = item.stats.reduce((res, stat, idx) => {
        if (stat.charAt(0) !== "<" && stat.charAt(0) !== "(") {
          if (stat.includes("Required Level")) {
            struct.level = parseInt(stat.split(":")[1]);
          } else {
            stat = stat.replace(regex, "");
            stat = stat.replaceAll("(varies)", "").trim();
            requirements.push(stat);
          }
        } else if (stat.charAt(0) !== "(") {
          const newDetail = { detail: stat, varies: false };

          newDetail.detail = newDetail.detail.replace(regex, "");

          if (newDetail.detail.includes("varies")) {
            newDetail.detail = newDetail.detail.replaceAll("(varies)", "").trim();
            newDetail.varies = true;
          }
          res.push(newDetail);
        }
        return res;
      }, []);
    } else {
      // @ts-ignore
      struct.stats = item.stats.reduce((res, stat, index) => {
        if (index === item.stats.length - 1) {
          if (stat.charAt(0) === "-") {
            struct.level = 0;
          } else {
            struct.level = parseInt(stat.match(/\d+/)[0]);
          }
        } else if (index < item.stats.length - 1) {
          const newDetail = { detail: stat, varies: false };
          const regex = /\<([^>]+)>/gi;
          newDetail.detail = newDetail.detail.replace(regex, "");
          res.push(newDetail);
        }
        return res;
      }, []);
    }

    struct.requirements = requirements;

    const res = old.find((oldItem) => oldItem.name.toLowerCase() === item.name.toLowerCase());

    struct.image = "/image/" + res.url + ".png";
    struct.rarity = res.rarity;
    struct.setName = item.setName ?? "";
    struct.category = item.category ?? "";
    struct.classSpecificSet = item.classSpecificSet ?? "";
    struct.type = item.type ?? "";

    newData.push(struct);
  }
});

FileSystem.writeFile("data.json", JSON.stringify(newData), (error) => {
  if (error) throw error;
});
