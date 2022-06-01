#! /usr/bin/env node
import chalk from "chalk";
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import pretty from "pretty";
import figlet from "figlet";
import inquirer from "inquirer";
import {parse} from "csv-parse";
import fs from "fs";
import CliFrames from 'cli-frames';


// import reads from "./read.js"
console.log(
  chalk.yellow(
    figlet.textSync('Index', { horizontalLayout: 'full' })
  )
);

console.log(chalk.bgRed("Welcome to Destro"));

let pathName = "";
let distName = "";

function animation1()
{
  const frames = [
    "╔════╤╤╤╤════╗\n" +
    "║    │││ \\   ║\n" +
    "║    │││  O  ║\n" +
    "║    OOO     ║",

    "╔════╤╤╤╤════╗\n" +
    "║    ││││    ║\n" +
    "║    ││││    ║\n" +
    "║    OOOO    ║",

    "╔════╤╤╤╤════╗\n" +
    "║   / │││    ║\n" +
    "║  O  │││    ║\n" +
    "║     OOO    ║",

    "╔════╤╤╤╤════╗\n" +
    "║    ││││    ║\n" +
    "║    ││││    ║\n" +
    "║    OOOO    ║"
];


new CliFrames({
    frames: ["3", "2", "1"]
  , autostart: {
        delay: 1000
      , end: function (err, data) {
            // Create another animation
            var animation = new CliFrames();
            animation.load(frames);
            animation.start({
                repeat: true
              , delay: 250
            });
        }
    }
});
}


// sample cases

let findstr = "cors";
let depVer = "";
let checkVer = "";

// Repo JSON Fetch Code
import getPackageJsonFromGithub from 'get-package-json-from-github';

getPackageJsonFromGithub('git+https://github.com/kanitmann/Muses-Mini-backend.git')
  .then(packageJson => {
    depVer = packageJson.dependencies[findstr];
    console.log(depVersion);
    // console.log('packageJson', packageJson.dependencies);
  });



// Read CSV Code
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


// CLI Commands Code

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

y.command({
  command: '-animation',
  describe: 'Side fun animation in CLI\n',
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
    distName = argv[3];
  }
  else
  {
    pathName = argv[1];
    distName = argv[2];
  }
  // await takeCSV();
  await readCSV();
}
else if(argv[0] == "-animation")
{
  animation1();
}

y.parse(process.argv.slice(2))