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
require("dotenv").config();
const web3_1 = __importDefault(require("web3"));
const utils_1 = __importDefault(require("./utils"));
const customPath_1 = __importDefault(require("./customPath"));
const EspaniconSDKNode = require("@espanicon/espanicon-sdk");
const fs = require("fs");
const apiKey = process.env.BSC_API_KEY;
const dataPath = utils_1.default.abiDataPath;
const lib = new EspaniconSDKNode(utils_1.default.networks.mainnet.icon.provider.hostname, utils_1.default.networks.mainnet.icon.provider.nid);
const bscLib = new web3_1.default(utils_1.default.networks.mainnet.bsc.provider.hostname);
const bscLibTestnet = new web3_1.default(utils_1.default.networks.testnet.bsc.provider.hostname);
function sleep(time = 6000) {
    return new Promise(resolve => setTimeout(resolve, time));
}
function getAbi(contract, isMainnet = true) {
    return __awaiter(this, void 0, void 0, function* () {
        let route = null;
        let hostname = null;
        if (isMainnet === true) {
            route = `${utils_1.default.networks.mainnet.bsc.tracker.routes.getContractAbi}${contract}&apikey=${apiKey}`;
            hostname = `${utils_1.default.networks.mainnet.bsc.tracker.hostname}`;
        }
        else {
            route = `${utils_1.default.networks.testnet.bsc.tracker.routes.getContractAbi}${contract}&apikey=${apiKey}`;
            hostname = `${utils_1.default.networks.testnet.bsc.tracker.hostname}`;
        }
        try {
            console.log("\nBeginning time pause..");
            yield sleep();
            const parsedHostname = utils_1.default.getFormattedHostname(hostname);
            console.log("making query");
            console.log(`url: ${parsedHostname}${route}`);
            const query = yield lib.queryMethod(route, false, parsedHostname);
            console.log("query result: success");
            return query;
        }
        catch (err) {
            console.log("query result: error");
            console.log(err);
            return null;
        }
    });
}
function parseAbiResponse(abi) {
    let result = null;
    if (abi !== null) {
        try {
            result = JSON.parse(abi.result);
        }
        catch (err) {
            console.log("error on query");
            console.log(abi);
        }
    }
    return result;
}
function getAbiBatch(batch, isMainnet = true) {
    return __awaiter(this, void 0, void 0, function* () {
        const objKeys = Object.keys(batch);
        objKeys.push("genericToken");
        const result = {};
        for (const eachKey of objKeys) {
            if (eachKey === "genericToken") {
                continue;
            }
            const abi = yield getAbi(batch[eachKey].address, isMainnet);
            const parsedAbi = parseAbiResponse(abi);
            const implementation = {
                address: null,
                abi: null
            };
            const address = batch[eachKey].address;
            if (batch[eachKey].isProxy != null && batch[eachKey].isProxy === true) {
                try {
                    let implSlot = null;
                    if (isMainnet === true) {
                        implSlot = yield bscLib.eth.getStorageAt(address, utils_1.default.labels.memSlot);
                    }
                    else {
                        implSlot = yield bscLibTestnet.eth.getStorageAt(address, utils_1.default.labels.memSlot);
                    }
                    const parsedImpl = utils_1.default.removeZerosFromAddress(implSlot);
                    implementation.address = parsedImpl;
                    const implAbi = yield getAbi(parsedImpl, isMainnet);
                    implementation.abi = parseAbiResponse(implAbi);
                }
                catch (err) {
                    console.log(`error fetching implementation address of contract "${address}"`);
                    console.log(err);
                }
            }
            if (abi !== null) {
                result[eachKey] = {
                    abi: parsedAbi,
                    address: address,
                    implementation: implementation
                };
                if (result["genericToken"] == null &&
                    utils_1.default.tokenLabels.includes(eachKey)) {
                    result["genericToken"] = {
                        abi: parsedAbi,
                        address: null,
                        implementation: {
                            abi: null,
                            address: null
                        }
                    };
                }
            }
        }
        return result;
    });
}
function getAbiDataOfAllChains() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = { bsc: null };
        result.bsc = yield getMainnetAndTestnetAbi();
        try {
            const stringResult = JSON.stringify(result);
            return stringResult;
        }
        catch (err) {
            console.log("error running getAbiDataOfAllChains()");
            console.log(err);
            return null;
        }
    });
}
function getMainnetAndTestnetAbi() {
    return __awaiter(this, void 0, void 0, function* () {
        const mainnetAbi = yield getAbiBatch(utils_1.default.contracts.bsc.mainnet);
        const testnetAbi = yield getAbiBatch(utils_1.default.contracts.bsc.testnet, false);
        try {
            const result = { mainnet: mainnetAbi, testnet: testnetAbi };
            return result;
        }
        catch (err) {
            console.log("error fetching contracts abi");
            console.log(err);
            return null;
        }
    });
}
function runAsync(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const abiData = yield getAbiDataOfAllChains();
            if (fs.existsSync(filePath)) {
                console.log(`file "${filePath}" already exists. it will be updated`);
                fs.unlinkSync(filePath);
            }
            const fileData = abiData;
            fs.writeFileSync(filePath, fileData);
            console.log(`file "${filePath}" created`);
        }
        catch (err) {
            console.log(`unexpected error trying to create "${filePath}" file`);
            console.log(err);
        }
    });
}
if (require.main === module) {
    runAsync((0, customPath_1.default)(dataPath));
}
module.exports = getMainnetAndTestnetAbi;
//# sourceMappingURL=buildABIData.js.map