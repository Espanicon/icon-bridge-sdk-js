"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const customPath_1 = __importDefault(require("./customPath"));
function getBTPAddress(network, account) {
    let result = null;
    if (typeof network === "string" && typeof account === "string") {
        result = `btp://${network}/${account}`;
    }
    return result;
}
function readDb(path) {
    try {
        if (fs_1.default.existsSync((0, customPath_1.default)(path))) {
            const dbBuffer = fs_1.default.readFileSync((0, customPath_1.default)(path), "utf-8");
            const db = JSON.parse(dbBuffer);
            return db;
        }
        else {
            console.log(`error accesing db file "${path}"`);
            return null;
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
function getAbiOf(dataPath, contractLabel, chain, isMainnet = true) {
    let result = null;
    const abiData = readDb(dataPath);
    const allChains = Object.keys(abiData);
    if (allChains.includes(chain)) {
        const chainData = abiData[chain];
        const testnetKeys = Object.keys(chainData.testnet);
        const mainnetKeys = Object.keys(chainData.mainnet);
        if (isMainnet === true) {
            if (mainnetKeys.includes(contractLabel)) {
                const abi = chainData.mainnet[contractLabel];
                if (abi.abi !== null)
                    result = abi.abi;
            }
        }
        else {
            if (testnetKeys.includes(contractLabel)) {
                const abi = chainData.testnet[contractLabel];
                if (abi.abi !== null)
                    result = abi.abi;
            }
        }
    }
    return result;
}
const lib = {
    getAbiOf,
    getBTPAddress,
    getContractOf,
    readDb
};
exports.default = lib;
//# sourceMappingURL=lib.js.map