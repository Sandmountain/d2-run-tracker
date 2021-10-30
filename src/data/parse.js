const json = require('./data.json');
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

const fixName = (name) => {
  return name.replaceAll(' ', '_').replace("'", '').replace('.png', '').toLowerCase();
};

const getRarity = (set, type) => {
  console.log(set, type);
  if (set !== '') return 'set';

  if (type.includes('rune')) {
    return 'rune';
  } else if (type.includes('charm')) {
    return 'magic';
  } else {
    return 'unique';
  }
};

const arrayOfObj = Object.entries(json).map((e) => ({
  name: e[1].name,
  url: fixName(e[1].name),
  set: e[1].set,
  type: e[1].type,
  reqLvl: e[1].reqLvl,
  rarity: getRarity(e[1].set, e[1].type),
}));

FileSystem.writeFile('database.json', JSON.stringify(arrayOfObj), (error) => {
  if (error) throw error;
});
