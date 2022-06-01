#! /usr/bin/env node
import chalk from "chalk";
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import pretty from "pretty";
import figlet from "figlet";
import inquirer from "inquirer";
import {parse} from "csv-parse";
import fs from "fs";

// import reads from "./read.js"
console.log(
  chalk.yellow(
    figlet.textSync('Index2', { horizontalLayout: 'full' })
  )
);

console.log(chalk.bgRed("Welcome to ") + chalk.black(chalk.bgBlue("Destro")));

let pathName = "";

async function readCSV() {
  fs.createReadStream("./bin/" + pathName)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row) {
          console.log(row);
      })
      .on("end", function () {
          console.log("Finished reading csv");
      })
      .on("error", function (error) {
          console.log(error.message);
      });
}

const y = yargs()
y.version('v1.0.1')

const argv = process.argv.slice(2);

y.command({
  usage: 'Usage: destro <command> [options]',
  command: '-i <filename> <distribution>',
  describe: 'tells if the version is greater than or equal to the version specified or not. \n',
  builder: {
    title: {
      describe: ' ',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: ' ',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body)
  }
})

y.command({
  command: '-update',
  describe: 'creates a PR updating the version.\n',
  builder: {
    title: {
      describe: '   ',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) { 
    notes.removeNote(argv.title)
  } 
})

if(argv[0] == "-i")
{
  if(argv[1] == "-update")
  {
    console.log("Update Working");
    pathName = argv[2];
  }
  else
  {
    pathName = argv[1];
  }
  // await takeCSV();
  await readCSV();
}

y.parse(process.argv.slice(2))

console.log(chalk.bgGreen("Hello World"));