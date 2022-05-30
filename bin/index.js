#! /usr/bin/env node

import chalk from 'chalk';
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import {parse} from "csv-parse";
import fs from "fs";
import yargs from "yargs";

let pathName = "";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function takeCSV() {
    const ans = await inquirer.prompt({
        name: 'csv',
        type: 'input',
        message: 'Enter the CSV filename',
    })
    pathName = ans.csv;
}

async function readCSV() {
    fs.createReadStream("./bin/" + pathName + ".csv")
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
await takeCSV();
console.log(pathName);
await readCSV();