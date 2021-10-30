const json = require('./data.json');
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'image');
const images = [];
const missingFiles = [];
const missingItem = [];

fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  //listing all files using forEach
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    images.push(file);
  });

  images.forEach((image) => {
    const result = json.find((item) => fixName(item.name) === image);

    if (result) {
      missingFiles.push(image);
    }
  });

  json.forEach((item) => {
    const res = images.find((img) => img === fixName(item.name));
    if (res) {
      missingItem.push(item);
    }
  });

  console.log(missingFiles);
  console.log(missingItem);
});

const fixName = (name) => {
  return name.replaceAll(' ', '_').replace("'", '').replace('.png', '').toLowerCase();
};
