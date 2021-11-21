const FileSystem = require("fs");

//const old = require("./database.json");
const data = require("./testdata.json");

const regex = /\<([^>]+)>/gi;

const regExpAvg = new RegExp(/\([^)]*Avg\)*/g);
const regExpBase = new RegExp(/\(Base[^)]*\)*/g);

const rangeNumbers = /(\d+)-(\d+)/g;
const regexNumbers = /[\d]+/g;
const regexDigits = new RegExp(/\d+/g);

const nonVariedDmg = new RegExp(/\d+ To \d+/g);

const newData = data.map((item, index) => {
  item.requirements.forEach((req) => {
    if (req.varies === true) {
      return;
    }

    if (req.requirement.includes(") To (")) {
      const nmbr = req.requirement.match(rangeNumbers);
      const lowNr = nmbr[0].match(regexDigits)[0];
      const highNr = nmbr[1].match(regexDigits)[1];
      req.requirement = `${req.requirement.match(/[^%]*:/)} ${lowNr}-${highNr}`;
    } else if (req.requirement.split(nonVariedDmg).length > 1) {
      const nmbr = req.requirement.match(nonVariedDmg);
      const lowNr = nmbr[0].match(regexDigits)[0];
      const highNr = nmbr[0].match(regexDigits)[1];
      req.requirement = `${req.requirement.match(/[^%]*:/)} ${lowNr}-${highNr}`;
    }
  });
  return item;
});

console.log(newData[457].requirements[0]);

FileSystem.writeFile("testdata-dmg1.json", JSON.stringify(newData), (error) => {
  if (error) throw error;
});
