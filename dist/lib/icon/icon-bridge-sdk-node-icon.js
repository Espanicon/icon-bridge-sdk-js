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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _IconBridgeSDKNodeIcon_params, _IconBridgeSDKNodeIcon_sdkUtils, _IconBridgeSDKNodeIcon_iconWeb3, _IconBridgeSDKNodeIcon_localMethods, _IconBridgeSDKNodeIcon_web, _IconBridgeSDKNodeIcon_makeTxRequest, _IconBridgeSDKNodeIcon_transferToBTSContract, _IconBridgeSDKNodeIcon_transfer, _IconBridgeSDKNodeIcon_approveBTSContract;
const Exception = require("../../utils/exception");
const baseICONSDK = require("./icon-bridge-sdk-icon");
const localLib = require('./lib');
class IconBridgeSDKNodeIcon extends baseICONSDK {
    constructor(params, sdkUtils, CustomSDK) {
        super(params, sdkUtils, CustomSDK);
        _IconBridgeSDKNodeIcon_params.set(this, void 0);
        _IconBridgeSDKNodeIcon_sdkUtils.set(this, void 0);
        _IconBridgeSDKNodeIcon_iconWeb3.set(this, void 0);
        _IconBridgeSDKNodeIcon_localMethods.set(this, {
            transferNativeCoin: (targetAddress, targetChain, from, pk, amount, stepLimit = null, useWeb = false) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet;
                    const btpAddress = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getBTPAddress(targetAddress, targetChain, isMainnet);
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_makeTxRequest, "f").call(this, useWeb, from, btsContract, pk, "transferNativeCoin", { _to: btpAddress }, amount, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferNativeCoin(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\namount: ${amount}\nstepLimit: ${stepLimit}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            transferNativeToken: (tokenName, amount, targetAddress, targetChain, tokenContract, from, pk, stepLimit = "10000000", useWeb = false) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const chainLabels = Object.keys(__classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").chains);
                    if (!chainLabels.includes(targetChain) || targetChain === "icon") {
                        throw new Error(`Invalid target chain. targetChain: ${targetChain}`);
                    }
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet;
                    const btpAddress = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getBTPAddress(targetAddress, targetChain, isMainnet);
                    const preTxRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_transferToBTSContract, "f").call(this, amount, tokenContract, from, pk, stepLimit);
                    if (preTxRequest.result != null) {
                        yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").sleep(3000);
                    }
                    else {
                        throw new Error(`pre approve tx returned error. result: ${preTxRequest}`);
                    }
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_transfer, "f").call(this, useWeb, tokenName, amount, btpAddress, from, pk, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferNativeToken(). Params:\ntokenName: ${tokenName}\namount: ${amount}\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\ntokenContract: ${tokenContract}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            transferWrappedToken: (tokenName, amount, targetAddress, targetChain, tokenContract, from, pk, stepLimit = "10000000", useWeb = false) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const chainLabels = Object.keys(__classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").chains);
                    if (!chainLabels.includes(targetChain) || targetChain === "icon") {
                        throw new Error(`Invalid target chain. targetChain: ${targetChain}`);
                    }
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet;
                    const btpAddress = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getBTPAddress(targetAddress, targetChain, isMainnet);
                    const preTxRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_approveBTSContract, "f").call(this, amount, tokenContract, from, pk, stepLimit);
                    if (preTxRequest.result != null) {
                        yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").sleep(3000);
                    }
                    else {
                        throw new Error(`pre approve tx returned error. result: ${preTxRequest}`);
                    }
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_transfer, "f").call(this, useWeb, tokenName, amount, btpAddress, from, pk, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferWrappedToken(). Params:\ntokenName: ${tokenName}\namount: ${amount}\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\ntokenContract: ${tokenContract}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            transferToBTSContract: (_value, tokenContract = null, from, pk, stepLimit = "5000000", useWeb = false) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_transferToBTSContract, "f").call(this, _value, tokenContract, from, pk, stepLimit, useWeb);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferToBTSContract(). Params:\n_value: ${_value}\ntokenContract: ${tokenContract}\n\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            transfer: (_coinName, _value, from, targetChain, targetAddress, pk, stepLimit = "10000000", useWeb = false) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet;
                    const btpAddress = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getBTPAddress(targetAddress, targetChain, isMainnet);
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_transfer, "f").call(this, useWeb, _coinName, _value, btpAddress, from, pk, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transfer(). Params:\n_coinName: ${_coinName}\n_value: ${_value}\ntargetChain: ${targetChain}\ntargetAddress: ${targetAddress}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            transferBatch: (_coinNames, _values, targetChain, targetAddress, from, pk, stepLimit = null, useWeb = false) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet;
                    const btpAddress = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getBTPAddress(targetAddress, targetChain, isMainnet);
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const parsedValues = _values.map(_value => {
                        return this.espaniconLib.decimalToHex(Number(_value) * (10 ** 18));
                    });
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_makeTxRequest, "f").call(this, useWeb, from, btsContract, pk, "transferBatch", { _coinNames: _coinNames, _values: parsedValues, _to: btpAddress }, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferBatch(). Params:\n_coinNames: ${_coinNames}\n_values: ${_values}\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            approveBTSContract: (amount, tokenContract, from, pk, stepLimit = "5000000", useWeb = false) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_approveBTSContract, "f").call(this, amount, tokenContract, from, pk, stepLimit, useWeb);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running approveBTSContract(). Params:\namount: ${amount}\ntokenContract: ${tokenContract}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            reclaim: (_coinName, _value, from, pk, stepLimit = null, useWeb = false, useHexInput = true) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    let parsedValue = _value;
                    if (!useHexInput) {
                        parsedValue = this.espaniconLib.decimalToHex(Number(_value) * (10 ** 18));
                    }
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_makeTxRequest, "f").call(this, useWeb, from, btsContract, pk, "reclaim", { _coinName: _coinName, _value: parsedValue }, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running reclaim(). Params:\n_coinName: ${_coinName}\n_value: ${_value}\nfrom: ${from}\npk: ${pk}`);
                    return { error: errorResult.toString() };
                }
            }),
            addOwner: (_addr, from, pk, stepLimit = null, useWeb = false) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_makeTxRequest, "f").call(this, useWeb, from, btsContract, pk, "addOwner", { _addr: _addr }, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running addOwner(). Params:\n_addr: ${_addr}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            removeOwner: (_addr, from, pk, stepLimit = null, useWeb = false) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_makeTxRequest, "f").call(this, useWeb, from, btsContract, pk, "removeOwner", { _addr: _addr }, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running removeOwner(). Params:\n_addr: ${_addr}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            register: (_name, _symbol, _decimals, _feeNumerator, _fixedFee, from, pk, _addr = null, stepLimit = null, useWeb = false) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const queryParams = {
                        _name: _name,
                        _symbol: _symbol,
                        _decimals: _decimals,
                        _feeNumerator: _feeNumerator,
                        _fixedFee: _fixedFee,
                    };
                    if (_addr != null) {
                        queryParams["_addr"] = _addr;
                    }
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_makeTxRequest, "f").call(this, useWeb, from, btsContract, pk, "register", queryParams, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running register(). Params:\n_name: ${_name}\n_symbol: ${_symbol}\n_decimals: ${_decimals}\n_feeNumerator: ${_feeNumerator}\n_fixedFee: ${_fixedFee}\n_addr: ${_addr}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            setFeeRatio: (_name, _feeNumerator, _fixedFee, from, pk, stepLimit = null, useWeb = false) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_makeTxRequest, "f").call(this, useWeb, from, btsContract, pk, "setFeeRatio", { _name: _name, _feeNumerator: _feeNumerator, _fixedFee: _fixedFee }, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running setFeeRatio(). Params:\n_name: ${_name}\n_feeNumerator: ${_feeNumerator}\n_fixedFee: ${_fixedFee}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            removeBlacklistAddress: (_net, _addresses, from, pk, stepLimit = null, useWeb = false) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_makeTxRequest, "f").call(this, useWeb, from, btsContract, pk, "removeBlacklistAddress", { _net: _net, _addresses: _addresses }, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running removeBlacklistAddress(). Params:\n_net: ${_net}\n_addresses: ${_addresses}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            setTokenLimit: (_coinNames, _tokenLimits, from, pk, stepLimit = null, useWeb = false) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_makeTxRequest, "f").call(this, useWeb, from, btsContract, pk, "setTokenLimit", { _coinNames: _coinNames, _tokenLimits: _tokenLimits }, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running setTokenLimit(). Params:\n_coinNames: ${_coinNames}\n_tokenLimits: ${_tokenLimits}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            addBlacklistAddress: (_net, _addresses, from, pk, stepLimit = null, useWeb = false) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_makeTxRequest, "f").call(this, useWeb, from, btsContract, pk, "addBlacklistAddress", { _net: _net, _addresses: _addresses }, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running addBlacklistAddress(). Params:\n_net: ${_net}\n_addresses: ${_addresses}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            addRestriction: (from, pk, stepLimit = null, useWeb = false) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_makeTxRequest, "f").call(this, useWeb, from, btsContract, pk, "addRestriction", null, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running addRestrictions(). Params:\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            disableRestrictions: (from, pk, stepLimit = null, useWeb = false) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_makeTxRequest, "f").call(this, useWeb, from, btsContract, pk, "disableRestrictions", null, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running disableRestrictions(). Params:\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            })
        });
        _IconBridgeSDKNodeIcon_web.set(this, {
            transferNativeCoin: (targetAddress, targetChain, from, amount, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const txParams = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_localMethods, "f").transferNativeCoin(targetAddress, targetChain, from, null, amount, stepLimit, true);
                    const txObj = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_iconWeb3, "f").makeJSONRPCRequestObj("icx_sendTransaction");
                    txObj["params"] = Object.assign({}, txParams);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferNativeCoin(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\namount: ${amount}\nstepLimit: ${stepLimit}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            transferToBTSContract: (_value, tokenContract = null, from, stepLimit = "5000000") => __awaiter(this, void 0, void 0, function* () {
                try {
                    const txParams = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_localMethods, "f").transferToBTSContract(_value, tokenContract, from, null, stepLimit, true);
                    const txObj = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_iconWeb3, "f").makeJSONRPCRequestObj("icx_sendTransaction");
                    txObj["params"] = Object.assign({}, txParams);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferToBTSContract(). Params:\n_value: ${_value}\ntokenContract: ${tokenContract}\n\nfrom: ${from}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            transfer: (_coinName, _value, targetChain, targetAddress, from, stepLimit = "10000000") => __awaiter(this, void 0, void 0, function* () {
                try {
                    const txParams = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_localMethods, "f").transfer(_coinName, _value, from, targetChain, targetAddress, null, stepLimit, true);
                    const txObj = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_iconWeb3, "f").makeJSONRPCRequestObj("icx_sendTransaction");
                    txObj["params"] = Object.assign({}, txParams);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transfer(). Params:\n_coinName: ${_coinName}\n_value: ${_value}\ntargetChain: ${targetChain}\ntargetAddress: ${targetAddress}\nfrom: ${from}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            transferBatch: (_coinNames, _values, targetChain, targetAddress, from, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const txParams = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_localMethods, "f").transferBatch(_coinNames, _values, targetChain, targetAddress, from, null, stepLimit, true);
                    const txObj = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_iconWeb3, "f").makeJSONRPCRequestObj("icx_sendTransaction");
                    txObj["params"] = Object.assign({}, txParams);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferBatch(). Params:\n_coinNames: ${_coinNames}\n_values: ${_values}\ntargetChain: ${targetChain}\ntargeAddress: ${targetAddress}\nfrom: ${from}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            approveBTSContract: (amount, tokenContract, from, stepLimit = "5000000") => __awaiter(this, void 0, void 0, function* () {
                try {
                    const txParams = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_localMethods, "f").approveBTSContract(amount, tokenContract, from, null, stepLimit, true);
                    const txObj = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_iconWeb3, "f").makeJSONRPCRequestObj("icx_sendTransaction");
                    txObj["params"] = Object.assign({}, txParams);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running approveBTSContract(). Params:\namount: ${amount}\ntokenContract: ${tokenContract}\nfrom: ${from}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            reclaim: (_coinName, _value, from, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const txParams = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_localMethods, "f").reclaim(_coinName, _value, from, null, stepLimit, true);
                    const txObj = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_iconWeb3, "f").makeJSONRPCRequestObj("icx_sendTransaction");
                    txObj["params"] = Object.assign({}, txParams);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running reclaim(). Params:\n_coinName: ${_coinName}\n_value: ${_value}\nfrom: ${from}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            addOwner: (_addr, from, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const txParams = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_localMethods, "f").addOwner(_addr, from, null, stepLimit, true);
                    const txObj = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_iconWeb3, "f").makeJSONRPCRequestObj("icx_sendTransaction");
                    txObj["params"] = Object.assign({}, txParams);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running addOwner(). Params:\n_addr: ${_addr}\nfrom: ${from}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            removeOwner: (_addr, from, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const txParams = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_localMethods, "f").removeOwner(_addr, from, null, stepLimit, true);
                    const txObj = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_iconWeb3, "f").makeJSONRPCRequestObj("icx_sendTransaction");
                    txObj["params"] = Object.assign({}, txParams);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running removeOwner(). Params:\n_addr: ${_addr}\nfrom: ${from}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            register: (_name, _symbol, _decimals, _feeNumerator, _fixedFee, from, _addr = null, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const txParams = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_localMethods, "f").register(_name, _symbol, _decimals, _feeNumerator, _fixedFee, from, null, _addr, stepLimit, true);
                    const txObj = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_iconWeb3, "f").makeJSONRPCRequestObj("icx_sendTransaction");
                    txObj["params"] = Object.assign({}, txParams);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running register(). Params:\n_name: ${_name}\n_symbol: ${_symbol}\n_decimals: ${_decimals}\n_feeNumerator: ${_feeNumerator}\n_fixedFee: ${_fixedFee}\n_addr: ${_addr}\nfrom: ${from}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            setFeeRatio: (_name, _feeNumerator, _fixedFee, from, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const txParams = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_localMethods, "f").setFeeRatio(_name, _feeNumerator, _fixedFee, from, null, stepLimit, true);
                    const txObj = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_iconWeb3, "f").makeJSONRPCRequestObj("icx_sendTransaction");
                    txObj["params"] = Object.assign({}, txParams);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running setFeeRatio(). Params:\n_name: ${_name}\n_feeNumerator: ${_feeNumerator}\n_fixedFee: ${_fixedFee}\nfrom: ${from}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            removeBlacklistAddress: (_net, _addresses, from, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const txParams = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_localMethods, "f").removeBlacklistAddress(_net, _addresses, from, null, stepLimit, true);
                    const txObj = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_iconWeb3, "f").makeJSONRPCRequestObj("icx_sendTransaction");
                    txObj["params"] = Object.assign({}, txParams);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running removeBlacklistAddress(). Params:\n_net: ${_net}\n_addresses: ${_addresses}\nfrom: ${from}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            setTokenLimit: (_coinNames, _tokenLimits, from, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const txParams = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_localMethods, "f").setTokenLimit(_coinNames, _tokenLimits, from, null, stepLimit, true);
                    const txObj = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_iconWeb3, "f").makeJSONRPCRequestObj("icx_sendTransaction");
                    txObj["params"] = Object.assign({}, txParams);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running setTokenLimit(). Params:\n_coinNames: ${_coinNames}\n_tokenLimits: ${_tokenLimits}\nfrom: ${from}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            addBlacklistAddress: (_net, _addresses, from, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const txParams = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_localMethods, "f").addBlacklistAddress(_net, _addresses, from, null, stepLimit, true);
                    const txObj = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_iconWeb3, "f").makeJSONRPCRequestObj("icx_sendTransaction");
                    txObj["params"] = Object.assign({}, txParams);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running addBlacklistAddress(). Params:\n_net: ${_net}\n_addresses: ${_addresses}\nfrom: ${from}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            addRestriction: (from, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const txParams = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_localMethods, "f").addRestriction(from, null, stepLimit, true);
                    const txObj = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_iconWeb3, "f").makeJSONRPCRequestObj("icx_sendTransaction");
                    txObj["params"] = Object.assign({}, txParams);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running addRestrictions(). Params:\nfrom: ${from}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            disableRestrictions: (from, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const txParams = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_localMethods, "f").disableRestrictions(from, null, stepLimit, true);
                    const txObj = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_iconWeb3, "f").makeJSONRPCRequestObj("icx_sendTransaction");
                    txObj["params"] = Object.assign({}, txParams);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running disableRestrictions(). Params:\nfrom: ${from}\n`);
                    return { error: errorResult.toString() };
                }
            })
        });
        _IconBridgeSDKNodeIcon_makeTxRequest.set(this, (useWeb = false, from, to, pk, method, params = null, value = 0, stepLimit = null, nid = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").iconProvider.nid) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield localLib.makeTxRequest(__classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f"), this.espaniconLib, __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f"), this.queryMethod, useWeb, from, to, pk, method, params, value, stepLimit, nid);
            }
            catch (err) {
                console.log("error running #makeTxRequest");
                console.log(err);
            }
        }));
        _IconBridgeSDKNodeIcon_transferToBTSContract.set(this, (_value, tokenContract = null, from, pk, stepLimit = "5000000", useWeb = false) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield localLib.transferToBTSContract(__classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f"), this.espaniconLib, __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f"), this.queryMethod, _value, tokenContract, from, pk, stepLimit, useWeb);
            }
            catch (err) {
                const errorResult = new Exception(err, `Error running transferToBTSContract(). Params:\n_value: ${_value}\ntokenContract: ${tokenContract}\n\nfrom: ${from}\npk: ${pk}\n`);
                return { error: errorResult.toString() };
            }
        }));
        _IconBridgeSDKNodeIcon_transfer.set(this, (useWeb = false, _coinName, _value, _to, from, pk, stepLimit = "5000000") => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield localLib.transfer(__classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f"), this.espaniconLib, __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f"), this.queryMethod, useWeb, _coinName, _value, _to, from, pk, stepLimit);
            }
            catch (err) {
                const errorResult = new Exception(err, `Error running transfer(). Params:\n_coinName: ${_coinName}\n_value: ${_value}\n_to: ${_to}\nfrom: ${from}\npk: ${pk}\n`);
                return { error: errorResult.toString() };
            }
        }));
        _IconBridgeSDKNodeIcon_approveBTSContract.set(this, (amount, tokenContract, from, pk, stepLimit = "5000000", useWeb = false) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield localLib.approveBTSContract(__classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f"), this.espaniconLib, __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f"), this.queryMethod, amount, tokenContract, from, pk, stepLimit, useWeb);
            }
            catch (err) {
                const errorResult = new Exception(err, `Error running approveBTSContract(). Params:\namount: ${amount}\ntokenContract: ${tokenContract}\nfrom: ${from}\npk: ${pk}\n`);
                return { error: errorResult.toString() };
            }
        }));
        __classPrivateFieldSet(this, _IconBridgeSDKNodeIcon_params, params, "f");
        __classPrivateFieldSet(this, _IconBridgeSDKNodeIcon_sdkUtils, sdkUtils, "f");
        __classPrivateFieldSet(this, _IconBridgeSDKNodeIcon_iconWeb3, new CustomSDK(__classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").iconProvider.hostname, __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").iconProvider.nid), "f");
        this.methods = Object.assign(Object.assign({}, this.superMethods), __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_localMethods, "f"));
        this.web = Object.assign({}, __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_web, "f"));
    }
}
_IconBridgeSDKNodeIcon_params = new WeakMap(), _IconBridgeSDKNodeIcon_sdkUtils = new WeakMap(), _IconBridgeSDKNodeIcon_iconWeb3 = new WeakMap(), _IconBridgeSDKNodeIcon_localMethods = new WeakMap(), _IconBridgeSDKNodeIcon_web = new WeakMap(), _IconBridgeSDKNodeIcon_makeTxRequest = new WeakMap(), _IconBridgeSDKNodeIcon_transferToBTSContract = new WeakMap(), _IconBridgeSDKNodeIcon_transfer = new WeakMap(), _IconBridgeSDKNodeIcon_approveBTSContract = new WeakMap();
module.exports = IconBridgeSDKNodeIcon;
//# sourceMappingURL=icon-bridge-sdk-node-icon.js.map