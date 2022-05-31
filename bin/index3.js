#! /usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";

console.log(
  chalk.yellow(
    figlet.textSync('Index3', { horizontalLayout: 'full' })
  )
);

import fetch from "node-fetch";

const getNames = async() => {
  try {
    const names = await fetch('https://github.com/dyte-submissions/dyte-vit-2022-kanitmann/blob/main/package.json');
    const textData = await names.text();
    return textData;
  } catch (err) {
    console.log('fetch error', err);
  }
};

(async () => {
  const getText = await getNames();
  console.log(getText)
})();