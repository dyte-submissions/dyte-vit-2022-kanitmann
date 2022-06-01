#! /usr/bin/env node
// https://docs.github.com/en/rest/pulls/pulls#create-a-pull-request

import chalk from "chalk";
import figlet from "figlet";

console.log(
  chalk.yellow(
    figlet.textSync('Index3', { horizontalLayout: 'full' })
  )
);

import getPackageJsonFromGithub from 'get-package-json-from-github';

getPackageJsonFromGithub('git+https://github.com/kanitmann/Muses-Mini-backend.git')
  .then(packageJson => {
    console.log('packageJson', packageJson.dependencies);
  });