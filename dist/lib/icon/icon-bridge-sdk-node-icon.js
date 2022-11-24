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
var _IconBridgeSDKNodeIcon_params, _IconBridgeSDKNodeIcon_sdkUtils, _IconBridgeSDKNodeIcon_localMethods, _IconBridgeSDKNodeIcon_makeTxRequest;
const Exception = require("../../utils/exception");
const baseICONSDK = require("./icon-bridge-sdk-icon");
const IconService = require("icon-sdk-js");
const { IconBuilder, IconAmount, IconConverter, IconWallet, SignedTransaction, } = IconService.default;
const { CallTransactionBuilder } = IconBuilder;
class IconBridgeSDKNodeIcon extends baseICONSDK {
    constructor(params, sdkUtils, CustomSDK) {
        super(params, sdkUtils, CustomSDK);
        _IconBridgeSDKNodeIcon_params.set(this, void 0);
        _IconBridgeSDKNodeIcon_sdkUtils.set(this, void 0);
        _IconBridgeSDKNodeIcon_localMethods.set(this, {
            transferNativeCoin: (targetAddress, targetChain, from, pk, amount, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet;
                    const btpAddress = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getBTPAddress(targetAddress, targetChain, isMainnet);
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_makeTxRequest, "f").call(this, from, btsContract, pk, "transferNativeCoin", { _to: btpAddress }, amount, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferNativeCoin(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\namount: ${amount}\nstepLimit: ${stepLimit}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            reclaim: (_coinName, _value, from, pk, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_makeTxRequest, "f").call(this, from, btsContract, pk, "transferNativeCoin", { _coinName: _coinName, _value: _value }, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running reclaim(). Params:\n_coinName: ${_coinName}\n_value: ${_value}\nfrom: ${from}\npk: ${pk}`);
                    return { error: errorResult.toString() };
                }
            }),
            transfer: (_coinName, _value, _to, from, pk, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const foo = [_coinName, _value, _to, from, pk, stepLimit];
                    console.log(foo);
                    return null;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transfer(). Params:\n_coinName: ${_coinName}\n_value: ${_value}\n_to: ${_to}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            transferBatch: (_coinNames, _values, _to, from, pk, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const foo = [_coinNames, _values, _to, from, pk, stepLimit];
                    console.log(foo);
                    return null;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferBatch(). Params:\n_coinNames: ${_coinNames}\n_values: ${_values}\n_to: ${_to}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            addOwner: (_addr, from, pk, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_makeTxRequest, "f").call(this, from, btsContract, pk, "addOwner", { _addr: _addr }, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running addOwner(). Params:\n_addr: ${_addr}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            removeOwner: (_addr, from, pk, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_makeTxRequest, "f").call(this, from, btsContract, pk, "removeOwner", { _addr: _addr }, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running removeOwner(). Params:\n_addr: ${_addr}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            register: (_name, _symbol, _decimals, _feeNumerator, _fixedFee, _addr, from, pk, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_makeTxRequest, "f").call(this, from, btsContract, pk, "register", {
                        _name: _name,
                        _symbol: _symbol,
                        _decimals: _decimals,
                        _feeNumerator: _feeNumerator,
                        _fixedFee: _fixedFee,
                        _addr: _addr
                    }, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running register(). Params:\n_name: ${_name}\n_symbol: ${_symbol}\n_decimals: ${_decimals}\n_feeNumerator: ${_feeNumerator}\n_fixedFee: ${_fixedFee}\n_addr: ${_addr}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            setFeeRatio: (_name, _feeNumerator, _fixedFee, from, pk, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_makeTxRequest, "f").call(this, from, btsContract, pk, "setFeeRatio", { _name: _name, _feeNumerator: _feeNumerator, _fixedFee: _fixedFee }, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running setFeeRatio(). Params:\n_name: ${_name}\n_feeNumerator: ${_feeNumerator}\n_fixedFee: ${_fixedFee}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            removeBlacklistAddress: (_net, _addresses, from, pk, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_makeTxRequest, "f").call(this, from, btsContract, pk, "removeBlacklistAddress", { _net: _net, _addresses: _addresses }, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running removeBlacklistAddress(). Params:\n_net: ${_net}\n_addresses: ${_addresses}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            setTokenLimit: (_coinNames, _tokenLimits, from, pk, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_makeTxRequest, "f").call(this, from, btsContract, pk, "setTokenLimit", { _coinNames: _coinNames, _tokenLimits: _tokenLimits }, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running setTokenLimit(). Params:\n_coinNames: ${_coinNames}\n_tokenLimits: ${_tokenLimits}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            addBlacklistAddress: (_net, _addresses, from, pk, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_makeTxRequest, "f").call(this, from, btsContract, pk, "addBlacklistAddress", { _net: _net, _addresses: _addresses }, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running addBlacklistAddress(). Params:\n_net: ${_net}\n_addresses: ${_addresses}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            addRestriction: (from, pk, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_makeTxRequest, "f").call(this, from, btsContract, pk, "addRestriction", null, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running addRestrictions(). Params:\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            disableRestrictions: (from, pk, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_makeTxRequest, "f").call(this, from, btsContract, pk, "disableRestrictions", null, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running disableRestrictions(). Params:\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            })
        });
        _IconBridgeSDKNodeIcon_makeTxRequest.set(this, (from, to, pk, method, params = null, value = 0, stepLimit = null, nid = __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").iconProvider.nid) => __awaiter(this, void 0, void 0, function* () {
            try {
                const useStepLimit = stepLimit == null ? "8000000" : stepLimit;
                const txObj = new CallTransactionBuilder()
                    .from(from)
                    .to(to)
                    .stepLimit(IconConverter.toBigNumber(useStepLimit))
                    .nid(IconConverter.toBigNumber(nid))
                    .nonce(IconConverter.toBigNumber(__classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").getRandNonce()))
                    .version(IconConverter.toBigNumber("3"))
                    .timestamp(new Date().getTime() * 1000)
                    .method(method);
                if (params != null) {
                    txObj.params(params);
                }
                if (value !== 0) {
                    txObj.value(IconAmount.of(value, IconAmount.Unit.ICX).toLoop());
                }
                const txObj2 = txObj.build();
                const wallet = IconWallet.loadPrivateKey(pk);
                const signedTx = new SignedTransaction(txObj2, wallet);
                const jsonRPCObj = this.espaniconLib.makeJSONRPCRequestObj("icx_sendTransaction");
                jsonRPCObj["params"] = signedTx.getProperties();
                const stringJsonObj = JSON.stringify(jsonRPCObj);
                const query = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_sdkUtils, "f").makeJsonRpcCall(__classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_params, "f").iconProvider.hostname, stringJsonObj, this.queryMethod);
                return query;
            }
            catch (err) {
                console.log("error running #makeTxRequest");
                console.log(err);
            }
        }));
        __classPrivateFieldSet(this, _IconBridgeSDKNodeIcon_params, params, "f");
        __classPrivateFieldSet(this, _IconBridgeSDKNodeIcon_sdkUtils, sdkUtils, "f");
        this.methods = Object.assign(Object.assign({}, this.superMethods), __classPrivateFieldGet(this, _IconBridgeSDKNodeIcon_localMethods, "f"));
    }
}
_IconBridgeSDKNodeIcon_params = new WeakMap(), _IconBridgeSDKNodeIcon_sdkUtils = new WeakMap(), _IconBridgeSDKNodeIcon_localMethods = new WeakMap(), _IconBridgeSDKNodeIcon_makeTxRequest = new WeakMap();
module.exports = IconBridgeSDKNodeIcon;
//# sourceMappingURL=icon-bridge-sdk-node-icon.js.map