const old = require("./database.json");
const newest = require("./improvedData.json");

// console.log(old[0]);
// console.log(newest[0]);

const struct = {
  category: "",
  level: "",
  type: "",
  stats: [],
  image: "",
};

const notFound = [];

// Checking if the datas are synced
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

console.log(notFound);
