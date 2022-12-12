"use strict";
const ABI_DATA = require("../../data/abiData.js");
const abiDataPath = "data/abiData.json";
function readDb(path, flag = true) {
    try {
        if (flag === true) {
            return ABI_DATA;
        }
        else {
        }
    }
    catch (err) {
        console.log(`error reading database at ${path}`);
        console.log(err);
        return null;
    }
}
function getContractOf(token, chain, contractData, isMainnet = true) {
    let result = null;
    let mainnetData = null;
    let testnetData = null;
    switch (chain) {
        case "icon":
            mainnetData = contractData.icon.mainnet;
            testnetData = contractData.icon.testnet;
            break;
        case "bsc":
            mainnetData = contractData.bsc.mainnet;
            testnetData = contractData.bsc.testnet;
            break;
        default:
            break;
    }
    if (mainnetData !== null && testnetData !== null) {
        const mainnetKeys = Object.keys(mainnetData);
        const testnetKeys = Object.keys(testnetData);
        if (isMainnet === true) {
            if (mainnetKeys.includes(token)) {
                result = mainnetData[token].address;
            }
        }
        else {
            if (testnetKeys.includes(token)) {
                result = testnetData[token].address;
            }
        }
    }
    return result;
}
function getDataFromLocalData(label, chain, isMainnet, getAbi, getLogicContract = false) {
    const localData = readDb(abiDataPath);
    let result = null;
    const allChains = Object.keys(localData);
    if (allChains.includes(chain)) {
        const chainData = localData[chain];
        const testnetKeys = Object.keys(chainData.testnet);
        const mainnetKeys = Object.keys(chainData.mainnet);
        let contractData = null;
        if (isMainnet === true && mainnetKeys.includes(label)) {
            contractData = chainData.mainnet[label];
        }
        else if (isMainnet === false && testnetKeys.includes(label)) {
            contractData = chainData.testnet[label];
        }
        else {
        }
        if (contractData != null) {
            if (getAbi === true) {
                if (getLogicContract === true) {
                    if (contractData.implementation.address != null) {
                        result = contractData.implementation.abi;
                    }
                }
                else {
                    result = contractData.abi;
                }
            }
            else {
                if (getLogicContract === true) {
                    if (contractData.implementation.address != null) {
                        result = contractData.implementation.address;
                    }
                }
                else {
                    result = contractData.address;
                }
            }
        }
    }
    else {
        throw new Error(`Error while getting local data. Chain "${chain}" is not included in [${allChains}]`);
    }
    return result;
}
function getContractOfLabelFromLocalData(label, chain, isMainnet, getLogicContract = false) {
    return getDataFromLocalData(label, chain, isMainnet, false, getLogicContract);
}
function getAbiOfLabelFromLocalData(label, chain, isMainnet, getLogicContract = false) {
    return getDataFromLocalData(label, chain, isMainnet, true, getLogicContract);
}
const lib = {
    getContractOf,
    readDb,
    abiDataPath,
    getContractOfLabelFromLocalData,
    getAbiOfLabelFromLocalData
};
module.exports = lib;
//# sourceMappingURL=lib.js.map