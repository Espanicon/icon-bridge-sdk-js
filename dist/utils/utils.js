"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const contracts_1 = require("./contracts");
const networks_1 = require("./networks");
const lib_1 = __importDefault(require("./lib"));
const abiDataPath = lib_1.default.abiDataPath;
const defaultSDKParams = {
    useMainnet: null,
    iconProvider: {
        hostname: networks_1.networks.mainnet.icon.provider.hostname,
        nid: null
    },
    bscProvider: { hostname: networks_1.networks.mainnet.bsc.provider.hostname, nid: null }
};
function getBTPAddress(address, chain, isMainnet = true) {
    let result = null;
    let nid = null;
    const chainsLabels = Object.keys(networks_1.chains);
    const networkLabel = isMainnet === true ? "mainnet" : "testnet";
    if (chainsLabels.includes(chain)) {
        for (const chainLabel of chainsLabels) {
            if (chainLabel === chain) {
                nid = networks_1.networks[networkLabel][chain]["btp_network_id"];
                break;
            }
        }
    }
    else {
        console.log(`error fetching BTP address.\nProvided value for param "chain": ${chain}, is not a valid value`);
    }
    if (nid != null) {
        result = `btp://${nid}/${address}`;
    }
    return result;
}
function getContractOf(token, chain, isMainnet = true) {
    return lib_1.default.getContractOf(token, chain, contracts_1.contracts, isMainnet);
}
function removeZerosFromAddress(address) {
    return "0x" + address.slice(address.length - 40, address.length);
}
function getSDKParams(inputParams, defaultParams = defaultSDKParams) {
    const result = Object.assign({}, defaultParams);
    result.useMainnet = true;
    result.iconProvider = {
        hostname: networks_1.networks.mainnet.icon.provider.hostname,
        nid: networks_1.networks.mainnet.icon.provider.nid
    };
    result.bscProvider = {
        hostname: networks_1.networks.mainnet.bsc.provider.hostname,
        nid: networks_1.networks.mainnet.bsc.provider.nid
    };
    if (inputParams != null && typeof inputParams === "object") {
        if (inputParams.useMainnet != null) {
            if (inputParams.useMainnet === false) {
                result.useMainnet = false;
                result.iconProvider = {
                    hostname: networks_1.networks.testnet.icon.provider.hostname,
                    nid: networks_1.networks.testnet.icon.provider.nid
                };
                result.bscProvider = {
                    hostname: networks_1.networks.testnet.bsc.provider.hostname,
                    nid: networks_1.networks.testnet.bsc.provider.nid
                };
            }
        }
        if (inputParams.iconProvider != null &&
            typeof inputParams.iconProvider === "object") {
            if (typeof inputParams.iconProvider.hostname === "string") {
                result.iconProvider.hostname = inputParams.iconProvider.hostname;
            }
            if (inputParams.iconProvider.nid != null) {
                result.iconProvider.nid = inputParams.iconProvider.nid;
            }
        }
        if (inputParams.bscProvider != null &&
            typeof inputParams.bscProvider === "object") {
            if (typeof inputParams.bscProvider.hostname === "string") {
                result.bscProvider.hostname = inputParams.bscProvider.hostname;
            }
            if (inputParams.bscProvider.nid != null) {
                result.bscProvider.nid = inputParams.iconProvider.nid;
            }
        }
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
function getContractOfLabelFromLocalData(label, chain, isMainnet, getLogicContract = false) {
    return lib_1.default.getContractOfLabelFromLocalData(label, chain, isMainnet, getLogicContract);
}
function getAbiOfLabelFromLocalData(label, chain, isMainnet, getLogicContract = false) {
    return lib_1.default.getAbiOfLabelFromLocalData(label, chain, isMainnet, getLogicContract);
}
function getTokenLabelFromTokenName(tokenName) {
    return tokenName;
}
const utils = {
    networks: networks_1.networks,
    contracts: contracts_1.contracts,
    getBTPAddress,
    abiDataPath,
    genericAbi: contracts_1.genericAbi,
    labels: contracts_1.labels,
    tokenLabels: contracts_1.tokenLabels,
    tokenNames: contracts_1.tokenNames,
    getContractOf,
    removeZerosFromAddress,
    GenericContractAddress: contracts_1.GenericContractAddress,
    defaultSDKParams,
    getSDKParams,
    getFormattedHostname,
    getContractOfLabelFromLocalData,
    getAbiOfLabelFromLocalData,
    getTokenLabelFromTokenName
};
module.exports = utils;
//# sourceMappingURL=utils.js.map