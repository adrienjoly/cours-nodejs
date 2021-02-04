#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const Mocha = require('mocha');
const fetch = require("node-fetch");

const USAGE = `$ npx github:adrienjoly/cours-nodejs <command> <parameter>`;

const download = async (destFile, url) => {
  const destPath = path.dirname(destFile);
  await fs.promises.mkdir(destPath, { recursive: true });
  await fs.promises.writeFile(destFile, await (await fetch(url)).text(), "utf8");
}

const COMMANDS = {
  // Run automated tests of an exercise from a tech-io repo, on a .js file
  // Usage: $ npx github:adrienjoly/cours-nodejs test 3-1 minuscules.js
  "test": async (exercise, jsFile) => {
    const testFile = `test-${exercise}.js`;
    const partUrl = `https://raw.githubusercontent.com/adrienjoly/cours-nodejs-techio-3/master`; // TODO: determine file name based on `exercise`
    await download('common/techio.js', `${partUrl}/nodejs-project/common/techio.js`);
    await download(testFile, `${partUrl}/nodejs-project/1-fs-base.spec.js`); // TODO: determine file name based on `exercise`
    const mocha = new Mocha({ bail: true });
    mocha.addFile(testFile);
    process.env.HIDE_TECHIO_MESSAGES = 1;
    process.env.CODE_FILE = jsFile;
    const failures = await new Promise((resolve) => mocha.run(resolve));
    if (failures > 0) throw new Error("Certains tests ne sont pas passés.");
  },
};

const [ command, ...parameters ] = process.argv.slice(2);
const method = COMMANDS[command];

if (typeof method !== "function") {
  console.error(`Usage: ${USAGE}`);
  console.error(`Commands: ${Object.keys(COMMANDS).join(", ")}`);
  process.exit(1);
} else {
  method(...parameters).catch(err => {
    console.error(`❌ ${err.message}`);
    process.exit(2);
  });
}
