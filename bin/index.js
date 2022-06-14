#! /usr/bin/env node

import chalk from 'chalk';
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import { parse } from "csv-parse";
import fs from "fs";
import pretty from "pretty";
import yargs from "yargs";

console.log(
    chalk.yellow(
        figlet.textSync('Index1', { horizontalLayout: 'full' })
    )
);

let pathName = "";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

// async function takeCSV() {
//     const ans = await inquirer.prompt({
//         name: 'csv',
//         type: 'input',
//         message: 'Enter the CSV filename',
//     })
//     pathName = ans.csv;
// }
let row = "";
async function readCSV() {
    fs.createReadStream("./bin/task.csv")
        .pipe(parse({
            delimiter: ",", 
            // relax_column_count: true,
            from_line: 2,
        }))
        .on("data", function (row) {
            // console.log(row.length);
            for (let i = 0; i < row.length; i++) {
                // getPackageJsonFromGithub('git+' + row[i] + '.git')
                //     .then(packageJson => {
                //         var pos = packageJson.dependencies[findstr];
                //         console.log(pos);
                //         console.log('packageJson', packageJson.dependencies);
                //     });
                console.log(row[i]);
            }
        })
        .on("end", function () {
            console.log("Finished reading csv");
        })
        .on("error", function (error) {
            console.log(error.message);
        });
}
// await takeCSV();
console.log(pathName);
await readCSV();
console.log(row);
