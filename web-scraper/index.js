const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const fs = require('fs');
const fetch = require('node-fetch');

const app = express();

const url = 'https://diablo2.io/misc/#filter=Rune';

axios(url).then((response) => {
  const html = response.data;
  const $ = cheerio.load(html);

  const articles = [];

  $('.element-item', html).each(function () {
    const imageElement = $(this).find('a')[0].firstChild;
    let link = '';
    try {
      link = imageElement['attribs']['data-background-image'];
    } catch (error) {
      return;
    }
    const itemName = $(this).find('h3').text() + ' Rune';

    // const image = $(this).find('a').attr('data-background-image');
    // const name = $(this).find('z-uniques-title').text();
    articles.push({ link, itemName });
  });

  articles.forEach(async (item) => {
    await download(`https://diablo2.io/${item.link}`, `./image/${solveName(item.itemName)}`);
  });
  console.log(articles.length);
});

const solveName = (name) => {
  return name.replaceAll(' ', '_').replaceAll("'", '').toLowerCase();
};

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

async function download(url, path) {
  const response = await fetch(url);
  const buffer = await response.buffer();
  fs.writeFile(`${path}.png`, buffer, () => {});
}
