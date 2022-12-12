// utils/utils.ts
const utils = require("../dist/utils/utils");

const {
  networks,
  contracts,
  abiDataPath,
  labels,
  tokenLabels,
  removeZerosFromAddress,
  getFormattedHostname,
  sleep
} = utils;

// exports
const utilsSlim = {
  networks, //
  contracts, //
  abiDataPath, //
  labels, //
  tokenLabels, //
  removeZerosFromAddress, //
  getFormattedHostname, //
  sleep //
};

export = utilsSlim;
