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

const regex = /\<([^>]+)>/gi;

const regExpAvg = new RegExp(/\([^)]*Avg\)*/g);
const regExpBase = new RegExp(/\(Base[^)]*\)*/g);

const newData = [];
const rangeNumbers = /(\d+)-(\d+)/g;
const regexNumbers = /[\d]+/g;

const createVariedData = (text) => {
  const varyingValues = text.match(rangeNumbers);
  if (varyingValues?.length > 1) {
    console.log(text);
    return varyingValues.map((value, index) => {
      let description = text.split(":");
      if (description[0] !== "Defense") {
        description = text.replace(/[\d-]+/g, `{0}`);
      } else {
        description = `${description[0]}:`;
      }

      const single = value.match(regexNumbers);
      return { low: single[0], high: single[1], text: description };
    });
  } else if (varyingValues?.length > 0) {
    const single = varyingValues[0].match(regexNumbers);
    const val = text.replace(/[\d-]+/g, "{0}");
    return { low: single[0], high: single[1], text: val };
  }
};

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
      name: "",
    };

    const requirements = [];

    if (item.category !== "runes") {
      // @ts-ignore
      struct.stats = item.stats.reduce((res, stat, idx) => {
        if (stat.charAt(0) !== "<" && stat.charAt(0) !== "(") {
          const newReq = { requirement: stat, varies: false };

          if (stat.includes("Required Level")) {
            struct.level = parseInt(stat.split(":")[1]);
          } else {
            newReq.requirement = newReq.requirement.replace(regex, "");

            // if (regExpAvg.test(newReq.requirement)) {
            //   newReq.requirement = newReq.requirement.split(regExpAvg)[0].trim();
            // }

            // if (regExpBase.test(newReq.requirement)) {
            //   newReq.requirement = newReq.requirement.split(regExpBase)[0].trim();
            // }

            if (newReq.requirement.includes("(Base Defense")) {
              newReq.requirement = newReq.requirement.split(regExpBase)[0].trim();
            }

            if (newReq.requirement.includes("Avg)")) {
              newReq.requirement = newReq.requirement.split(regExpAvg)[0].trim();
            }

            if (newReq.requirement.includes("varies")) {
              newReq.requirement = newReq.requirement.replaceAll("(varies)", "").trim();
              newReq.requirement = createVariedData(newReq.requirement);
              newReq.varies = true;
            }

            requirements.push(newReq);
          }
        } else if (stat.charAt(0) !== "(") {
          const newDetail = { detail: stat, varies: false };

          newDetail.detail = newDetail.detail.replace(regex, "");

          if (newDetail.detail.includes("varies")) {
            newDetail.detail = newDetail.detail.replaceAll("(varies)", "").trim();
            newDetail.detail = createVariedData(newDetail.detail);
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

    struct.image = res.url;
    struct.rarity = res.rarity;
    struct.setName = item.setName ?? "";
    struct.category = item.category ?? "";
    struct.classSpecificSet = item.classSpecificSet ?? "";
    struct.type = item.type ?? "";
    struct.name = item.name;

    newData.push(struct);
  }
});

FileSystem.writeFile("testdata.json", JSON.stringify(newData), (error) => {
  if (error) throw error;
});
