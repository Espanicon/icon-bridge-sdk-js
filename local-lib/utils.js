"use strict";
// utils/utils.ts
var utils = require("../dist/utils/utils");
console.log(utils);
var networks = utils.networks, contracts = utils.contracts, abiDataPath = utils.abiDataPath, labels = utils.labels, tokenLabels = utils.tokenLabels, removeZerosFromAddress = utils.removeZerosFromAddress, getFormattedHostname = utils.getFormattedHostname, sleep = utils.sleep;
// exports
var utilsSlim = {
    networks: networks,
    contracts: contracts,
    abiDataPath: abiDataPath,
    labels: labels,
    tokenLabels: tokenLabels,
    removeZerosFromAddress: removeZerosFromAddress,
    getFormattedHostname: getFormattedHostname,
    sleep: sleep //
};
module.exports = utilsSlim;
