#! /usr/bin/env node

import chalk from "chalk";
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'
// import reads from "./read.js"

console.log(chalk.bgRed("Welcome to ") + chalk.black(chalk.bgBlue("Destro")));


const y = yargs()
y.version('v1.0.1')

y.command({
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

y.parse(process.argv.slice(2))

console.log(chalk.bgGreen("Hello World"));