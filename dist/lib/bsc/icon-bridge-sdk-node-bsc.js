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
var _IconBridgeSDKNodeBSC_params, _IconBridgeSDKNodeBSC_bscWeb3, _IconBridgeSDKNodeBSC_sdkUtils, _IconBridgeSDKNodeBSC_callbackLib, _IconBridgeSDKNodeBSC_localMethods, _IconBridgeSDKNodeBSC_approveBTSCoreForTransfer, _IconBridgeSDKNodeBSC_signBTSCoreTx, _IconBridgeSDKNodeBSC_transferToken, _IconBridgeSDKNodeBSC_approveAndTransfer;
const baseBSCSDK = require("./icon-bridge-sdk-bsc");
const Exception = require("../../utils/exception");
class IconBridgeSDKNodeBSC extends baseBSCSDK {
    constructor(params, bscWeb3, sdkUtils, callbackLib, queryMethod) {
        super(params, bscWeb3, callbackLib, queryMethod);
        _IconBridgeSDKNodeBSC_params.set(this, void 0);
        _IconBridgeSDKNodeBSC_bscWeb3.set(this, void 0);
        _IconBridgeSDKNodeBSC_sdkUtils.set(this, void 0);
        _IconBridgeSDKNodeBSC_callbackLib.set(this, void 0);
        _IconBridgeSDKNodeBSC_localMethods.set(this, {
            transfer: (targetAddress, targetChain = "icon", from, pk, _value, _coinName, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f").useMainnet;
                    const btpAddress = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_sdkUtils, "f").getBTPAddress(targetAddress, targetChain, isMainnet);
                    const valueInWei = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_bscWeb3, "f").utils.toWei(_value, "ether");
                    const response = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_signBTSCoreTx, "f").call(this, from, pk, "transfer", null, gas, _coinName, valueInWei, btpAddress);
                    return response;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transfer(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n_value: ${_value}\n_coinName: ${_coinName}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            transferBUSD: (targetAddress, targetChain = "icon", from, pk, _value, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const tokenLabel = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_sdkUtils, "f").labels.busd;
                    return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_transferToken, "f").call(this, targetAddress, targetChain, from, pk, _value, tokenLabel, gas);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferBUSD(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n_value: ${_value}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            transferUSDT: (targetAddress, targetChain = "icon", from, pk, _value, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const tokenLabel = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_sdkUtils, "f").labels.usdt;
                    return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_transferToken, "f").call(this, targetAddress, targetChain, from, pk, _value, tokenLabel, gas);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferUSDT(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n_value: ${_value}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            transferUSDC: (targetAddress, targetChain = "icon", from, pk, _value, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const tokenLabel = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_sdkUtils, "f").labels.usdc;
                    return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_transferToken, "f").call(this, targetAddress, targetChain, from, pk, _value, tokenLabel, gas);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferUSDC(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n_value: ${_value}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            transferBTCB: (targetAddress, targetChain = "icon", from, pk, _value, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const tokenLabel = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_sdkUtils, "f").labels.btcb;
                    return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_transferToken, "f").call(this, targetAddress, targetChain, from, pk, _value, tokenLabel, gas);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferBTCB(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n_value: ${_value}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            transferETH: (targetAddress, targetChain = "icon", from, pk, _value, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const tokenLabel = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_sdkUtils, "f").labels.eth;
                    return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_transferToken, "f").call(this, targetAddress, targetChain, from, pk, _value, tokenLabel, gas);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferETH(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n_value: ${_value}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            transferICX: (targetAddress, targetChain = "icon", from, pk, _value, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const tokenLabel = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_sdkUtils, "f").labels.icx;
                    return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_transferToken, "f").call(this, targetAddress, targetChain, from, pk, _value, tokenLabel, gas);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferICX(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n_value: ${_value}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            transferSICX: (targetAddress, targetChain = "icon", from, pk, _value, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const tokenLabel = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_sdkUtils, "f").labels.sicx;
                    return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_transferToken, "f").call(this, targetAddress, targetChain, from, pk, _value, tokenLabel, gas);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferSICX(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n_value: ${_value}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            transferBnUSD: (targetAddress, targetChain = "icon", from, pk, _value, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const tokenLabel = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_sdkUtils, "f").labels.bnusd;
                    return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_transferToken, "f").call(this, targetAddress, targetChain, from, pk, _value, tokenLabel, gas);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferBnUSD(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n_value: ${_value}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            approveAndTransfer: (targetAddress, targetChain = "icon", from, pk, _coinName, _value, tokenContractAddress, tokenContractAbi, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_approveAndTransfer, "f").call(this, targetAddress, targetChain, from, pk, _coinName, _value, tokenContractAddress, tokenContractAbi, gas);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running #approveAndTransfer(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n_coinName: ${_coinName}\n_value: ${_value}\ntokenContractAddress: ${tokenContractAddress}\ntokenContractAbi: ${tokenContractAbi}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            transferBatch: (_coinNames, _values, _to) => __awaiter(this, void 0, void 0, function* () {
                console.log([_coinNames, _values, _to]);
            }),
            transferNativeCoin: (targetAddress, targetChain = "icon", from, pk, amount, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f").useMainnet;
                    const btpAddress = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_sdkUtils, "f").getBTPAddress(targetAddress, targetChain, isMainnet);
                    return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_signBTSCoreTx, "f").call(this, from, pk, "transferNativeCoin", amount, gas, btpAddress);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferNativeCoin(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\namount: ${amount}\ngas: ${gas}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            addOwner: (from, pk, _owner, gas = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_signBTSCoreTx, "f").call(this, from, pk, "addOwner", null, gas, _owner);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running addOwner(). Params:\nfrom: ${from}\npk: ${pk}\n_owner: ${_owner}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            reclaim: (from, pk, _coinName, _value, gas = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_signBTSCoreTx, "f").call(this, from, pk, "reclaim", null, gas, _coinName, _value);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running reclaim(). Params:\nfrom: ${from}\npk: ${pk}\n_coinName: ${_coinName}\n_value: ${_value}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            register: (from, pk, _name, _symbol, _decimals, _feeNumerator, _fixedFee, _addr, gas = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_signBTSCoreTx, "f").call(this, from, pk, "register", null, gas, _name, _symbol, _decimals, _feeNumerator, _fixedFee, _addr);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running register(). Params:\nfrom: ${from}\npk: ${pk}\n_name: ${_name}\n_symbol: ${_symbol}\n_decimals: ${_decimals}\n_feeNumerator: ${_feeNumerator}\n_fixedFee: ${_fixedFee}\n_addr: ${_addr}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            removeOwner: (from, pk, _owner, gas = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_signBTSCoreTx, "f").call(this, from, pk, "removeOwner", null, gas, _owner);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running removeOwner(). Params:\nfrom: ${from}\npk: ${pk}\n_owner: ${_owner}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            setFeeRatio: (from, pk, _name, _feeNumerator, _fixedFee, gas = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_signBTSCoreTx, "f").call(this, from, pk, "setFeeRatio", null, gas, _name, _feeNumerator, _fixedFee);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running setFeeRatio(). Params:\nfrom: ${from}\npk: ${pk}\n_name: ${_name}\n_feeNumerator: ${_feeNumerator}\n_fixedFee: ${_fixedFee}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            updateBTSPeriphery: (from, pk, _btsPeriphery, gas = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_signBTSCoreTx, "f").call(this, from, pk, "updateBTSPeriphery", null, gas, _btsPeriphery);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running updateBTSPeriphery(). Params:\nfrom: ${from}\npk: ${pk}\n_btsPeriphery: ${_btsPeriphery}\n`);
                    return { error: errorResult.toString() };
                }
            })
        });
        _IconBridgeSDKNodeBSC_approveBTSCoreForTransfer.set(this, (from, pk, amount, tokenContractAddress, tokenContractAbi, gas = null) => __awaiter(this, void 0, void 0, function* () {
            const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f").useMainnet;
            const btsCoreAddress = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_callbackLib, "f").getBTSCoreProxyContractAddress("bsc", isMainnet);
            return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_callbackLib, "f").approveTransfer(from, pk, btsCoreAddress, amount, tokenContractAddress, tokenContractAbi, "bsc", __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_bscWeb3, "f"), gas);
        }));
        _IconBridgeSDKNodeBSC_signBTSCoreTx.set(this, (from, pk, methodName, amount = null, gas = null, ...rest) => __awaiter(this, void 0, void 0, function* () {
            if (rest.length === 0) {
                return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_callbackLib, "f").signBTSCoreTx(from, pk, methodName, amount, "bsc", __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_bscWeb3, "f"), gas);
            }
            else {
                return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_callbackLib, "f").signBTSCoreTx(from, pk, methodName, amount, "bsc", __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_bscWeb3, "f"), gas, ...rest);
            }
        }));
        _IconBridgeSDKNodeBSC_transferToken.set(this, (targetAddress, targetChain = "icon", from, pk, _value, tokenLabel, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
            let isMainnet = null;
            let coinName = null;
            if (__classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f").useMainnet === false) {
                isMainnet = false;
                coinName = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_sdkUtils, "f").tokenNames.bsc.testnet[tokenLabel];
            }
            else if (__classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f").useMainnet === true ||
                __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f").useMainnet == null) {
                isMainnet = true;
                coinName = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_sdkUtils, "f").tokenNames.bsc.mainnet[tokenLabel];
            }
            const abi = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_sdkUtils, "f").genericAbi;
            const tokenContractAddress = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_callbackLib, "f").getContractAddressLocally(tokenLabel, "bsc", isMainnet, false);
            const request = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_approveAndTransfer, "f").call(this, targetAddress, targetChain, from, pk, coinName, _value, tokenContractAddress, abi, gas);
            return request;
        }));
        _IconBridgeSDKNodeBSC_approveAndTransfer.set(this, (targetAddress, targetChain = "icon", from, pk, _coinName, _value, tokenContractAddress, tokenContractAbi, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
            const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f").useMainnet;
            const response = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_approveBTSCoreForTransfer, "f").call(this, from, pk, _value, tokenContractAddress, tokenContractAbi, gas);
            const btpAddress = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_sdkUtils, "f").getBTPAddress(targetAddress, targetChain, isMainnet);
            const valueInWei = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_bscWeb3, "f").utils.toWei(_value, "ether");
            const response2 = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_signBTSCoreTx, "f").call(this, from, pk, "transfer", null, gas, _coinName, valueInWei, btpAddress);
            return {
                approvalTx: response,
                tokenTx: response2
            };
        }));
        __classPrivateFieldSet(this, _IconBridgeSDKNodeBSC_params, params, "f");
        __classPrivateFieldSet(this, _IconBridgeSDKNodeBSC_bscWeb3, bscWeb3, "f");
        __classPrivateFieldSet(this, _IconBridgeSDKNodeBSC_sdkUtils, sdkUtils, "f");
        __classPrivateFieldSet(this, _IconBridgeSDKNodeBSC_callbackLib, callbackLib, "f");
        this.methods = Object.assign(Object.assign({}, this.superMethods), __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_localMethods, "f"));
    }
}
_IconBridgeSDKNodeBSC_params = new WeakMap(), _IconBridgeSDKNodeBSC_bscWeb3 = new WeakMap(), _IconBridgeSDKNodeBSC_sdkUtils = new WeakMap(), _IconBridgeSDKNodeBSC_callbackLib = new WeakMap(), _IconBridgeSDKNodeBSC_localMethods = new WeakMap(), _IconBridgeSDKNodeBSC_approveBTSCoreForTransfer = new WeakMap(), _IconBridgeSDKNodeBSC_signBTSCoreTx = new WeakMap(), _IconBridgeSDKNodeBSC_transferToken = new WeakMap(), _IconBridgeSDKNodeBSC_approveAndTransfer = new WeakMap();
module.exports = IconBridgeSDKNodeBSC;
//# sourceMappingURL=icon-bridge-sdk-node-bsc.js.map