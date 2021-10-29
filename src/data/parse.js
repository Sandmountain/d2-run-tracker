const json = require('./parsedItems.json');
const FileSystem = require('fs');
// const arrayOfElm = Object.values(json);
// console.log(arrayOfElm[0]);
// const obj = Object.fromEntries(
//   arrayOfElm.map((entry) => [
//     entry['index'],
//     {
//       set: '',
//       type: entry['*type'],
//       reqLvl: entry['lvl req'],
//     },
//   ])
// );

const arrayOfObj = Object.entries(json).map((e) => ({
  name: e[0],
  set: e[1].set,
  type: e[1].type,
  reqLvl: e[1].reqLvl,
}));

FileSystem.writeFile('data.json', JSON.stringify(arrayOfObj), (error) => {
  if (error) throw error;
});

console.log(arrayOfObj);
