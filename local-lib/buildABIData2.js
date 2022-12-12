var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
require("dotenv").config();
var web3 = require("web3");
var EspaniconSDKNode = require("@espanicon/espanicon-sdk");
var utils = require("./utils");
var customPath = require("./customPath");
var fs = require("fs");
// variables
var apiKey = process.env.BSC_API_KEY;
var dataPath = "local-lib/foo.js";
var lib = new EspaniconSDKNode(utils.networks.mainnet.icon.provider.hostname, utils.networks.mainnet.icon.provider.nid);
var bscLib = new web3(utils.networks.mainnet.bsc.provider.hostname);
var bscLibTestnet = new web3(utils.networks.testnet.bsc.provider.hostname);
var count = 0;
var preData = "const data =";
var postData = ";module.exports = data;";
function getAbi(contract, isMainnet) {
    if (isMainnet === void 0) { isMainnet = true; }
    return __awaiter(this, void 0, void 0, function () {
        var route, hostname, parsedHostname, query, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    route = null;
                    hostname = null;
                    if (isMainnet === true) {
                        route = "".concat(utils.networks.mainnet.bsc.tracker.routes.getContractAbi).concat(contract, "&apikey=").concat(apiKey);
                        hostname = "".concat(utils.networks.mainnet.bsc.tracker.hostname);
                    }
                    else {
                        route = "".concat(utils.networks.testnet.bsc.tracker.routes.getContractAbi).concat(contract, "&apikey=").concat(apiKey);
                        hostname = "".concat(utils.networks.testnet.bsc.tracker.hostname);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    if (!(count < 4)) return [3 /*break*/, 2];
                    console.log("\nBypassing time pause.");
                    count += 1;
                    return [3 /*break*/, 4];
                case 2:
                    count = 0;
                    console.log("\nBeginning time pause.");
                    return [4 /*yield*/, utils.sleep()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    parsedHostname = utils.getFormattedHostname(hostname);
                    console.log("making query");
                    console.log("url: ".concat(parsedHostname).concat(route));
                    return [4 /*yield*/, lib.queryMethod(route, false, parsedHostname)];
                case 5:
                    query = _a.sent();
                    console.log("query result: success");
                    return [2 /*return*/, query];
                case 6:
                    err_1 = _a.sent();
                    console.log("query result: error");
                    console.log(err_1);
                    return [2 /*return*/, null];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function parseAbiResponse(abi) {
    var result = null;
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
function getAbiBatch(batch, isMainnet) {
    if (isMainnet === void 0) { isMainnet = true; }
    return __awaiter(this, void 0, void 0, function () {
        var objKeys, result, _i, objKeys_1, eachKey, abi, parsedAbi, implementation, address, implSlot, parsedImpl, implAbi, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    objKeys = Object.keys(batch);
                    objKeys.push("genericToken");
                    result = {};
                    _i = 0, objKeys_1 = objKeys;
                    _a.label = 1;
                case 1:
                    if (!(_i < objKeys_1.length)) return [3 /*break*/, 12];
                    eachKey = objKeys_1[_i];
                    if (eachKey === "genericToken") {
                        // utils.networks.tokenLabels
                        return [3 /*break*/, 11];
                    }
                    return [4 /*yield*/, getAbi(batch[eachKey].address, isMainnet)];
                case 2:
                    abi = _a.sent();
                    parsedAbi = parseAbiResponse(abi);
                    implementation = {
                        address: null,
                        abi: null
                    };
                    address = batch[eachKey].address;
                    if (!(batch[eachKey].isProxy != null && batch[eachKey].isProxy === true)) return [3 /*break*/, 10];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 9, , 10]);
                    implSlot = null;
                    if (!(isMainnet === true)) return [3 /*break*/, 5];
                    return [4 /*yield*/, bscLib.eth.getStorageAt(address, utils.labels.memSlot)];
                case 4:
                    implSlot = _a.sent();
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, bscLibTestnet.eth.getStorageAt(address, utils.labels.memSlot)];
                case 6:
                    implSlot = _a.sent();
                    _a.label = 7;
                case 7:
                    parsedImpl = utils.removeZerosFromAddress(implSlot);
                    implementation.address = parsedImpl;
                    return [4 /*yield*/, getAbi(parsedImpl, isMainnet)];
                case 8:
                    implAbi = _a.sent();
                    implementation.abi = parseAbiResponse(implAbi);
                    return [3 /*break*/, 10];
                case 9:
                    err_2 = _a.sent();
                    console.log("error fetching implementation address of contract \"".concat(address, "\""));
                    console.log(err_2);
                    return [3 /*break*/, 10];
                case 10:
                    if (abi !== null) {
                        result[eachKey] = {
                            abi: parsedAbi,
                            address: address,
                            implementation: implementation
                        };
                        if (result["genericToken"] == null &&
                            utils.tokenLabels.includes(eachKey)) {
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
                    _a.label = 11;
                case 11:
                    _i++;
                    return [3 /*break*/, 1];
                case 12: return [2 /*return*/, result];
            }
        });
    });
}
function getAbiDataOfAllChains() {
    return __awaiter(this, void 0, void 0, function () {
        var result, _a, stringResult;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = { bsc: null, icon: null };
                    _a = result;
                    return [4 /*yield*/, getMainnetAndTestnetAbiForBSC()];
                case 1:
                    _a.bsc = _b.sent();
                    result.icon = getMainnetAndTestnetDataForICON();
                    try {
                        stringResult = JSON.stringify(result);
                        return [2 /*return*/, stringResult];
                    }
                    catch (err) {
                        console.log("error running getAbiDataOfAllChains()");
                        console.log(err);
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getMainnetAndTestnetDataForICON() {
    return utils.contracts.icon;
}
function getMainnetAndTestnetAbiForBSC() {
    return __awaiter(this, void 0, void 0, function () {
        var mainnetAbi, testnetAbi, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAbiBatch(utils.contracts.bsc.mainnet)];
                case 1:
                    mainnetAbi = _a.sent();
                    return [4 /*yield*/, getAbiBatch(utils.contracts.bsc.testnet, false)];
                case 2:
                    testnetAbi = _a.sent();
                    try {
                        result = { mainnet: mainnetAbi, testnet: testnetAbi };
                        return [2 /*return*/, result];
                    }
                    catch (err) {
                        console.log("error fetching contracts abi");
                        console.log(err);
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function runAsync(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var abiData, fileData, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getAbiDataOfAllChains()];
                case 1:
                    abiData = _a.sent();
                    if (fs.existsSync(filePath)) {
                        console.log("file \"".concat(filePath, "\" already exists. it will be updated"));
                        fs.unlinkSync(filePath);
                    }
                    fileData = preData + abiData + postData;
                    fs.writeFileSync(filePath, fileData);
                    console.log("file \"".concat(filePath, "\" created"));
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    console.log("unexpected error trying to create \"".concat(filePath, "\" file"));
                    console.log(err_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
if (require.main === module) {
    runAsync(customPath(dataPath));
}
