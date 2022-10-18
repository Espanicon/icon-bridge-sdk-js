"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contracts_1 = require("./contracts");
const networks_1 = __importDefault(require("./networks"));
const lib_1 = __importDefault(require("./lib"));
const abiDataPath = "data/abiData.json";
const defaultSDKParams = {
    useMainnet: null,
    iconProvider: networks_1.default.mainnet.icon.provider.hostname,
    bscProvider: networks_1.default.mainnet.bsc.provider.hostname
};
function getAbiOf(contractLabel, chain, isMainnet = true) {
    return lib_1.default.getAbiOf(abiDataPath, contractLabel, chain, isMainnet);
}
function getBTPAddress(network, account) {
    return lib_1.default.getBTPAddress(network, account);
}
function getContractOf(token, chain, isMainnet = true) {
    return lib_1.default.getContractOf(token, chain, contracts_1.contracts, isMainnet);
}
function removeZerosFromAddress(address) {
    return "0x" + address.slice(address.length - 40, address.length);
}
function getSDKParams(inputParams, defaultParams = defaultSDKParams) {
    const result = Object.assign(Object.assign({}, defaultParams), inputParams);
    if (result.useMainnet == null || result.useMainnet === true) {
        result.useMainnet = true;
        result.iconProvider = networks_1.default.mainnet.icon.provider.hostname;
        result.bscProvider = networks_1.default.mainnet.bsc.provider.hostname;
    }
    else if (result.useMainnet === false) {
        result.iconProvider = networks_1.default.testnet.icon.provider.hostname;
        result.bscProvider = networks_1.default.testnet.bsc.provider.hostname;
    }
    else {
        result.useMainnet = true;
        result.iconProvider = networks_1.default.mainnet.icon.provider.hostname;
        result.bscProvider = networks_1.default.mainnet.bsc.provider.hostname;
    }
    return result;
}
function getFormattedHostname(hostname) {
    let temp = hostname;
    if (temp[temp.length - 1] === "/") {
        temp = temp.slice(0, temp.length - 2);
    }
    const tempArray = temp.split("/");
    return tempArray[tempArray.length - 1];
}
const utils = {
    networks: networks_1.default,
    contracts: contracts_1.contracts,
    getBTPAddress,
    abiDataPath,
    labels: contracts_1.labels,
    getAbiOf,
    getContractOf,
    removeZerosFromAddress,
    GenericContractAddress: contracts_1.GenericContractAddress,
    defaultSDKParams,
    getSDKParams,
    getFormattedHostname
};
exports.default = utils;
//# sourceMappingURL=utils.js.map