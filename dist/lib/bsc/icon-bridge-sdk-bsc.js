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
var _IconBridgeSDKBSC_params, _IconBridgeSDKBSC_bscWeb3, _IconBridgeSDKBSC_callbackLib, _IconBridgeSDKBSC_sdkUtils;
const Exception = require("../../utils/exception");
class IconBridgeSDKBSC {
    constructor(params, bscWeb3, callbackLib, sdkUtils, queryMethod) {
        _IconBridgeSDKBSC_params.set(this, void 0);
        _IconBridgeSDKBSC_bscWeb3.set(this, void 0);
        _IconBridgeSDKBSC_callbackLib.set(this, void 0);
        _IconBridgeSDKBSC_sdkUtils.set(this, void 0);
        this.superMethods = {
            balanceOf: (_owner, _coinName, useNativeQueryMethod = true) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKBSC_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKBSC_params, "f").useMainnet;
                    const methodName = "balanceOf";
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    const response = yield __classPrivateFieldGet(this, _IconBridgeSDKBSC_callbackLib, "f").BTSReadonlyQuery(methodName, "bsc", __classPrivateFieldGet(this, _IconBridgeSDKBSC_bscWeb3, "f"), queryMethod, _owner, _coinName);
                    const BTSLogicContractABI = __classPrivateFieldGet(this, _IconBridgeSDKBSC_callbackLib, "f").getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const methodAbi = __classPrivateFieldGet(this, _IconBridgeSDKBSC_sdkUtils, "f").getAbiFromMethodLabel(methodName, BTSLogicContractABI);
                    const parsedResponse = __classPrivateFieldGet(this, _IconBridgeSDKBSC_bscWeb3, "f").eth.abi.decodeParameters(methodAbi.outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running balanceOf(). Params:\n_owner: ${_owner}\n_coinName: ${_coinName}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            balanceOfBatch: (_owner, _coinNames, useNativeQueryMethod = true) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKBSC_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKBSC_params, "f").useMainnet;
                    const methodName = "balanceOfBatch";
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    const response = yield __classPrivateFieldGet(this, _IconBridgeSDKBSC_callbackLib, "f").BTSReadonlyQuery(methodName, "bsc", __classPrivateFieldGet(this, _IconBridgeSDKBSC_bscWeb3, "f"), queryMethod, _owner, _coinNames);
                    const BTSLogicContractABI = __classPrivateFieldGet(this, _IconBridgeSDKBSC_callbackLib, "f").getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const methodAbi = __classPrivateFieldGet(this, _IconBridgeSDKBSC_sdkUtils, "f").getAbiFromMethodLabel(methodName, BTSLogicContractABI);
                    const parsedResponse = __classPrivateFieldGet(this, _IconBridgeSDKBSC_bscWeb3, "f").eth.abi.decodeParameters(methodAbi.outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running balanceOfBatch(). Params:\n_owner: ${_owner}\n_coinNames: ${_coinNames}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            coinId: (_coinName, useNativeQueryMethod = true) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKBSC_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKBSC_params, "f").useMainnet;
                    const methodName = "coinId";
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    const response = yield __classPrivateFieldGet(this, _IconBridgeSDKBSC_callbackLib, "f").BTSReadonlyQuery(methodName, "bsc", __classPrivateFieldGet(this, _IconBridgeSDKBSC_bscWeb3, "f"), queryMethod, _coinName);
                    const BTSLogicContractABI = __classPrivateFieldGet(this, _IconBridgeSDKBSC_callbackLib, "f").getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const methodAbi = __classPrivateFieldGet(this, _IconBridgeSDKBSC_sdkUtils, "f").getAbiFromMethodLabel(methodName, BTSLogicContractABI);
                    const parsedResponse = __classPrivateFieldGet(this, _IconBridgeSDKBSC_bscWeb3, "f").eth.abi.decodeParameters(methodAbi.outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running coinId(). Params:\n_coinName: ${_coinName}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            coinNames: (useNativeQueryMethod = true) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKBSC_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKBSC_params, "f").useMainnet;
                    const methodName = "coinNames";
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    const response = yield __classPrivateFieldGet(this, _IconBridgeSDKBSC_callbackLib, "f").BTSReadonlyQuery(methodName, "bsc", __classPrivateFieldGet(this, _IconBridgeSDKBSC_bscWeb3, "f"), queryMethod);
                    const BTSLogicContractABI = __classPrivateFieldGet(this, _IconBridgeSDKBSC_callbackLib, "f").getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const methodAbi = __classPrivateFieldGet(this, _IconBridgeSDKBSC_sdkUtils, "f").getAbiFromMethodLabel(methodName, BTSLogicContractABI);
                    const parsedResponse = __classPrivateFieldGet(this, _IconBridgeSDKBSC_bscWeb3, "f").eth.abi.decodeParameters(methodAbi.outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running coinNames(). Params:\n ** NO PARAMS**\n`);
                    return { error: errorResult.toString() };
                }
            }),
            feeRatio: (_coinName, useNativeQueryMethod = true) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKBSC_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKBSC_params, "f").useMainnet;
                    const methodName = "feeRatio";
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    const response = yield __classPrivateFieldGet(this, _IconBridgeSDKBSC_callbackLib, "f").BTSReadonlyQuery(methodName, "bsc", __classPrivateFieldGet(this, _IconBridgeSDKBSC_bscWeb3, "f"), queryMethod, _coinName);
                    const BTSLogicContractABI = __classPrivateFieldGet(this, _IconBridgeSDKBSC_callbackLib, "f").getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const methodAbi = __classPrivateFieldGet(this, _IconBridgeSDKBSC_sdkUtils, "f").getAbiFromMethodLabel(methodName, BTSLogicContractABI);
                    const parsedResponse = __classPrivateFieldGet(this, _IconBridgeSDKBSC_bscWeb3, "f").eth.abi.decodeParameters(methodAbi.outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running feeRatio(). Params:\n_coinName: ${_coinName}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            getAccumulatedFees: (useNativeQueryMethod = true) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKBSC_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKBSC_params, "f").useMainnet;
                    const methodName = "getAccumulatedFees";
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    const response = yield __classPrivateFieldGet(this, _IconBridgeSDKBSC_callbackLib, "f").BTSReadonlyQuery(methodName, "bsc", __classPrivateFieldGet(this, _IconBridgeSDKBSC_bscWeb3, "f"), queryMethod);
                    const BTSLogicContractABI = __classPrivateFieldGet(this, _IconBridgeSDKBSC_callbackLib, "f").getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const methodAbi = __classPrivateFieldGet(this, _IconBridgeSDKBSC_sdkUtils, "f").getAbiFromMethodLabel(methodName, BTSLogicContractABI);
                    const parsedResponse = __classPrivateFieldGet(this, _IconBridgeSDKBSC_bscWeb3, "f").eth.abi.decodeParameters(methodAbi.outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running getAccumulatedFees(). Params:\n ** NO PARAMS **\n`);
                    return { error: errorResult.toString() };
                }
            }),
            getNativeCoinName: (useNativeQueryMethod = true) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKBSC_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKBSC_params, "f").useMainnet;
                    const methodName = "getNativeCoinName";
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    const response = yield __classPrivateFieldGet(this, _IconBridgeSDKBSC_callbackLib, "f").BTSReadonlyQuery(methodName, "bsc", __classPrivateFieldGet(this, _IconBridgeSDKBSC_bscWeb3, "f"), queryMethod);
                    const BTSLogicContractABI = __classPrivateFieldGet(this, _IconBridgeSDKBSC_callbackLib, "f").getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const methodAbi = __classPrivateFieldGet(this, _IconBridgeSDKBSC_sdkUtils, "f").getAbiFromMethodLabel(methodName, BTSLogicContractABI);
                    const parsedResponse = __classPrivateFieldGet(this, _IconBridgeSDKBSC_bscWeb3, "f").eth.abi.decodeParameters(methodAbi.outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running getNativeCoinName(). Params:\n ** NO PARAMS**\n`);
                    return { error: errorResult.toString() };
                }
            }),
            isValidCoin: (_coinName, useNativeQueryMethod = true) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKBSC_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKBSC_params, "f").useMainnet;
                    const methodName = "isValidCoin";
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    const response = yield __classPrivateFieldGet(this, _IconBridgeSDKBSC_callbackLib, "f").BTSReadonlyQuery(methodName, "bsc", __classPrivateFieldGet(this, _IconBridgeSDKBSC_bscWeb3, "f"), queryMethod, _coinName);
                    const BTSLogicContractABI = __classPrivateFieldGet(this, _IconBridgeSDKBSC_callbackLib, "f").getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const methodAbi = __classPrivateFieldGet(this, _IconBridgeSDKBSC_sdkUtils, "f").getAbiFromMethodLabel(methodName, BTSLogicContractABI);
                    const parsedResponse = __classPrivateFieldGet(this, _IconBridgeSDKBSC_bscWeb3, "f").eth.abi.decodeParameters(methodAbi.outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running isValidCoin(). Params:\n_coinName: ${_coinName}\n`);
                    return { error: errorResult.toString() };
                }
            })
        };
        __classPrivateFieldSet(this, _IconBridgeSDKBSC_params, params, "f");
        __classPrivateFieldSet(this, _IconBridgeSDKBSC_bscWeb3, bscWeb3, "f");
        __classPrivateFieldSet(this, _IconBridgeSDKBSC_callbackLib, callbackLib, "f");
        this.queryMethod = queryMethod;
        __classPrivateFieldSet(this, _IconBridgeSDKBSC_sdkUtils, sdkUtils, "f");
    }
}
_IconBridgeSDKBSC_params = new WeakMap(), _IconBridgeSDKBSC_bscWeb3 = new WeakMap(), _IconBridgeSDKBSC_callbackLib = new WeakMap(), _IconBridgeSDKBSC_sdkUtils = new WeakMap();
module.exports = IconBridgeSDKBSC;
//# sourceMappingURL=icon-bridge-sdk-bsc.js.map