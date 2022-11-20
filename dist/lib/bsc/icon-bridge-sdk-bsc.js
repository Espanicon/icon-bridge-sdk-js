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
const Exception = require("../../utils/exception");
class IconBridgeSDKBSC {
    constructor(params, bscWeb3, sdkUtils, callbackLib, queryMethod) {
        this.superMethods = {
            balanceOf: (_owner, _coinName, useNativeQueryMethod = true) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    const response = yield this.callbackLib.BTSReadonlyQuery("balanceOf", "bsc", this.bscWeb3, queryMethod, _owner, _coinName);
                    const BTSLogicContractABI = this.callbackLib.getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(BTSLogicContractABI[4].outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running balanceOf(). Params:\n_owner: ${_owner}\n_coinName: ${_coinName}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            balanceOfBatch: (_owner, _coinNames, useNativeQueryMethod = true) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    const response = yield this.callbackLib.BTSReadonlyQuery("balanceOfBatch", "bsc", this.bscWeb3, queryMethod, _owner, _coinNames);
                    const BTSLogicContractABI = this.callbackLib.getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(BTSLogicContractABI[5].outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running balanceOfBatch(). Params:\n_owner: ${_owner}\n_coinNames: ${_coinNames}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            coinId: (_coinName, useNativeQueryMethod = true) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    const response = yield this.callbackLib.BTSReadonlyQuery("coinId", "bsc", this.bscWeb3, queryMethod, _coinName);
                    const BTSLogicContractABI = this.callbackLib.getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(BTSLogicContractABI[6].outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running coinId(). Params:\n_coinName: ${_coinName}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            coinNames: (useNativeQueryMethod = true) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    const response = yield this.callbackLib.BTSReadonlyQuery("coinNames", "bsc", this.bscWeb3, queryMethod);
                    const BTSLogicContractABI = this.callbackLib.getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(BTSLogicContractABI[7].outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running coinNames(). Params:\n ** NO PARAMS**\n`);
                    return { error: errorResult.toString() };
                }
            }),
            feeRatio: (_coinName, useNativeQueryMethod = true) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    const response = yield this.callbackLib.BTSReadonlyQuery("feeRatio", "bsc", this.bscWeb3, queryMethod, _coinName);
                    const BTSLogicContractABI = this.callbackLib.getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(BTSLogicContractABI[8].outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running feeRatio(). Params:\n_coinName: ${_coinName}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            getAccumulatedFees: (useNativeQueryMethod = true) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    const response = yield this.callbackLib.BTSReadonlyQuery("getAccumulatedFees", "bsc", this.bscWeb3, queryMethod);
                    const BTSLogicContractABI = this.callbackLib.getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(BTSLogicContractABI[9].outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running getAccumulatedFees(). Params:\n ** NO PARAMS **\n`);
                    return { error: errorResult.toString() };
                }
            }),
            getNativeCoinName: (useNativeQueryMethod = true) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    const response = yield this.callbackLib.BTSReadonlyQuery("getNativeCoinName", "bsc", this.bscWeb3, queryMethod);
                    const BTSLogicContractABI = this.callbackLib.getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(BTSLogicContractABI[10].outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running getNativeCoinName(). Params:\n ** NO PARAMS**\n`);
                    return { error: errorResult.toString() };
                }
            }),
            getOwners: (useNativeQueryMethod = true) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    const response = yield this.callbackLib.BTSReadonlyQuery("getOwners", "bsc", this.bscWeb3, queryMethod);
                    const BTSLogicContractABI = this.callbackLib.getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(BTSLogicContractABI[11].outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running getOwners(). Params:\n ** NO PARAMS**\n`);
                    return { error: errorResult.toString() };
                }
            }),
            isOwner: (_owner, useNativeQueryMethod = true) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    const response = yield this.callbackLib.BTSReadonlyQuery("isOwner", "bsc", this.bscWeb3, queryMethod, _owner);
                    const BTSLogicContractABI = this.callbackLib.getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(BTSLogicContractABI[14].outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running isOwner(). Params:\n_owner: ${_owner}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            isValidCoin: (_coinName, useNativeQueryMethod = true) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    const response = yield this.callbackLib.BTSReadonlyQuery("isValidCoin", "bsc", this.bscWeb3, queryMethod, _coinName);
                    const BTSLogicContractABI = this.callbackLib.getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(BTSLogicContractABI[15].outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running isValidCoin(). Params:\n_coinName: ${_coinName}\n`);
                    return { error: errorResult.toString() };
                }
            })
        };
        this.params = params;
        this.bscWeb3 = bscWeb3;
        this.sdkUtils = sdkUtils;
        this.callbackLib = callbackLib;
        this.queryMethod = queryMethod;
    }
}
module.exports = IconBridgeSDKBSC;
//# sourceMappingURL=icon-bridge-sdk-bsc.js.map