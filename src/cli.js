#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const Mocha = require('mocha');
const fetch = require("node-fetch");

const USAGE = `$ npx github:adrienjoly/cours-nodejs <command> <parameter>`;

const getBody = async (url) => await (await fetch(url + `?_t=${Date.now()}`)).text();

const download = async (destFile, url) => {
  const destPath = path.dirname(destFile);
  await fs.promises.mkdir(destPath, { recursive: true });
  await fs.promises.writeFile(destFile, await getBody(url), "utf8");
}

const findTestName = (exo, statements) => {
  const regex = new RegExp(`statement\\:[^\\/]+\\/(${exo}-.*)\\.md`)
  return (statements.match(regex) || [])[1];
};

const COMMANDS = {
  // Run automated tests of an exercise from a tech-io repo, on a .js file
  // Usage: $ npx github:adrienjoly/cours-nodejs test 3-1 minuscules.js
  "test": async (exercise, jsFile) => {
    const tmpDir = `robot`;
    await fs.promises.mkdir(tmpDir, { recursive: true });
    try {
      const [ partie, exo ] = exercise.split('-');
      const partUrl = `https://raw.githubusercontent.com/adrienjoly/cours-nodejs-techio-${partie}/master`;
      await download(`${tmpDir}/common/techio.js`, `${partUrl}/nodejs-project/common/techio.js`);
      await download(`${tmpDir}/common/expected-response.js`, `${partUrl}/nodejs-project/common/expected-response.js`); // pour exercices de la partie 2
      const testName = findTestName(exo, await getBody(`${partUrl}/techio.yml`));
      const mocha = new Mocha({ bail: true });
      const testFile = `${tmpDir}/test-${exercise}.js`;
      await download(testFile, `${partUrl}/nodejs-project/${testName}.spec.js`);
      mocha.addFile(testFile);
      process.env.HIDE_TECHIO_MESSAGES = 1;
      process.env.CODE_FILE = jsFile;
      const failures = await new Promise((resolve) => mocha.run(resolve));
      if (failures > 0) throw new Error("Certains tests ne sont pas passés.");
    } finally {
      await fs.promises.rmdir(tmpDir, { recursive: true });
    }
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
