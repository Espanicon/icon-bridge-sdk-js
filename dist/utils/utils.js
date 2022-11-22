"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const contracts_1 = require("./contracts");
const networks_1 = require("./networks");
const lib_1 = __importDefault(require("./lib"));
const abiDataPath = lib_1.default.abiDataPath;
const urlRegex = /^((https|http):\/\/)?(([a-zA-Z0-9-]{1,}\.){1,}([a-zA-Z0-9]{1,63}))(:[0-9]{2,5})?(\/.*)?$/;
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
                const parsedUrl = getFormattedHostname(inputParams.iconProvider.hostname);
                if (parsedUrl != null) {
                    result.iconProvider.hostname = inputParams.iconProvider.hostname;
                }
                else {
                    throw new Error(`Format error on provided Url. URL = ${parsedUrl}`);
                }
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
    const inputInLowercase = hostname;
    const regexResult = inputInLowercase.match(urlRegex);
    if (regexResult != null) {
        if (regexResult[3] != null) {
            return regexResult[3];
        }
    }
    return null;
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
function getRandNonce() {
    const result = Math.ceil(Math.random() * 1000);
    if (result === 0) {
        return 1;
    }
    return result;
}
function makeEthJsonRpcReadonlyQuery(url, to, data, queryMethod) {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonRpcObj = makeEthCallJsonRpcObj(to, data);
        const urlObj = parseEthRPCUrl(url);
        const query = yield queryMethod(urlObj.path, jsonRpcObj, urlObj.hostname, urlObj.protocol === "http" ? false : true, urlObj.port === "" ? false : urlObj.port);
        return query;
    });
}
function makeEthSendRawTransactionQuery(url, data, queryMethod) {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonRpcObj = makeEthSendRawTransactionJsonRpcObj(data);
        const urlObj = parseEthRPCUrl(url);
        const query = yield queryMethod(urlObj.path, jsonRpcObj, urlObj.hostname, urlObj.protocol === "http" ? false : true, urlObj.port === "" ? false : urlObj.port);
        return query;
    });
}
function makeJsonRpcCall(url, data, queryMethod) {
    return __awaiter(this, void 0, void 0, function* () {
        const urlObj = parseEthRPCUrl(url);
        const stringData = JSON.stringify(data);
        const query = yield queryMethod(urlObj.path, stringData, urlObj.hostname, urlObj.protocol == "http" ? false : true, urlObj.port === "" ? false : urlObj.port);
        return query;
    });
}
function makeEthJsonRpcObj(to = null, data, callType = "eth_call", useLatestBlock = true) {
    let params;
    if (to == null) {
        params = [data];
    }
    else {
        params = [{ to: to, data: data }];
    }
    if (useLatestBlock) {
        params.push("latest");
    }
    const result = {
        jsonrpc: "2.0",
        method: callType,
        id: Math.ceil(Math.random() * 100),
        params: params
    };
    return JSON.stringify(result);
}
function makeEthCallJsonRpcObj(to, data, useLatestBlock = true) {
    return makeEthJsonRpcObj(to, data, "eth_call", useLatestBlock);
}
function makeEthSendRawTransactionJsonRpcObj(data) {
    return makeEthJsonRpcObj(null, data, "eth_sendRawTransaction", false);
}
function parseEthRPCUrl(rpcNode) {
    const inputInLowercase = rpcNode.toLowerCase();
    const parsedUrl = {
        protocol: "https",
        path: "/",
        hostname: null,
        port: "443"
    };
    const regexResult = inputInLowercase.match(urlRegex);
    if (regexResult != null) {
        parsedUrl.protocol =
            regexResult[2] == null ? "https" : regexResult[2];
        parsedUrl.path = regexResult[7] == null ? "/" : regexResult[7];
        parsedUrl.hostname = regexResult[3];
        parsedUrl.port = regexResult[6] == null ? "" : regexResult[6].slice(1);
    }
    return parsedUrl;
}
function isValidUrl(urlString) {
    return urlRegex.test(urlString);
}
function isValidTxString(tx) {
    const regex = /([0][xX][a-fA-F0-9]{40})$/;
    return regex.test(tx);
}
function sleep(time = 2000) {
    return new Promise(resolve => setTimeout(resolve, time));
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
    getTokenLabelFromTokenName,
    getRandNonce,
    makeEthJsonRpcReadonlyQuery,
    isValidUrl,
    parseEthRPCUrl,
    makeJsonRpcCall,
    makeEthSendRawTransactionQuery,
    isValidTxString,
    sleep
};
module.exports = utils;
//# sourceMappingURL=utils.js.map