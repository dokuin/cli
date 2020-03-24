'use strict';

const fs = require('fs');

const readline = require('../src/readline');

function checkFileExistsSync(path) {
  let status = true;
  try {
    fs.accessSync(path, fs.F_OK);
  } catch (err) {
    status = false;
  }
  return status;
}

function checkEligible() {
  const configPath = `${process.cwd()}/dokuin.config.json`;
  const endpointsPath = `${process.cwd()}/dokuin.endpoints.json`;

  if (!checkFileExistsSync(configPath)) {
    console.log(
      `Unable to find config file, make sure you have dokuin.config.json, maybe you can run 'dokuin init' command to create configuration.`
    );
    readline.close();
    return false;
  } else if (!checkFileExistsSync(endpointsPath)) {
    console.log(
      `Unable to find endpoints file, make sure you have dokuin.endpoints.json, maybe you can run 'dokuin create' command instead to generates endpoints.`
    );
    readline.close();
    return false;
  }

  return true;
}

function checkVersion(){
  const data = fs.readFileSync('package.json', 'utf-8');
  return `v${JSON.parse(data)['version']}`
}

module.exports = {
  checkFileExistsSync,
  checkEligible,
  checkVersion
};
