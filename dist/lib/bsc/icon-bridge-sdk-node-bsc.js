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
var _IconBridgeSDKNodeBSC_params, _IconBridgeSDKNodeBSC_bscWeb3, _IconBridgeSDKNodeBSC_sdkUtils, _IconBridgeSDKNodeBSC_callbackLib, _IconBridgeSDKNodeBSC_localMethods, _IconBridgeSDKNodeBSC_web, _IconBridgeSDKNodeBSC_approveBTSCoreForTransfer, _IconBridgeSDKNodeBSC_signBTSCoreTx, _IconBridgeSDKNodeBSC_approveAndTransfer;
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
            transfer: (targetAddress, targetChain = "icon", from, pk, _value, _coinName, gas = 2000000, useNativeQueryMethod = true, useWeb = false) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f").useMainnet;
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    const btpAddress = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_sdkUtils, "f").getBTPAddress(targetAddress, targetChain, isMainnet);
                    const valueInWei = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_bscWeb3, "f").utils.toWei(_value, "ether");
                    const response = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_signBTSCoreTx, "f").call(this, useWeb, from, pk, "transfer", null, gas, queryMethod, _coinName, valueInWei, btpAddress);
                    return response;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transfer(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n_value: ${_value}\n_coinName: ${_coinName}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            transferBatch: (targetAddress, targetChain = "icon", from, pk, _values, _coinNames, gas = 2000000, useNativeQueryMethod = true, useWeb = false) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f").useMainnet;
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    const btpAddress = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_sdkUtils, "f").getBTPAddress(targetAddress, targetChain, isMainnet);
                    const valuesInWei = _values.map(_value => {
                        return __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_bscWeb3, "f").utils.toWei(_value, "ether");
                    });
                    const response = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_signBTSCoreTx, "f").call(this, useWeb, from, pk, "transferBatch", null, gas, queryMethod, _coinNames, valuesInWei, btpAddress);
                    return response;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferBatch(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n_values: ${_values}\n_coinNames: ${_coinNames}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            transferNativeCoin: (targetAddress, targetChain = "icon", from, pk, amount, gas = 2000000, useNativeQueryMethod = true, useWeb = false) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f").useMainnet;
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    const btpAddress = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_sdkUtils, "f").getBTPAddress(targetAddress, targetChain, isMainnet);
                    return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_signBTSCoreTx, "f").call(this, useWeb, from, pk, "transferNativeCoin", amount, gas, queryMethod, btpAddress);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferNativeCoin(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\namount: ${amount}\ngas: ${gas}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            approveAndTransfer: (targetAddress, targetChain = "icon", from, pk, _value, _coinName, tokenContractAddress, tokenContractAbi = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_sdkUtils, "f").genericAbi, gas = 2000000, useNativeQueryMethod = true) => __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_approveAndTransfer, "f").call(this, targetAddress, targetChain, from, pk, _coinName, _value, tokenContractAddress, tokenContractAbi, gas, useNativeQueryMethod);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running #approveAndTransfer(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n_coinName: ${_coinName}\n_value: ${_value}\ntokenContractAddress: ${tokenContractAddress}\ntokenContractAbi: ${tokenContractAbi}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            approveTransfer: (from, pk, amount, tokenContractAddress, tokenContractAbi = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_sdkUtils, "f").genericAbi, gas = null, useNativeQueryMethod = true, useWeb = false) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    const response = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_approveBTSCoreForTransfer, "f").call(this, useWeb, from, pk, amount, tokenContractAddress, tokenContractAbi, gas, queryMethod);
                    return response;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running approveTransfer(). Params:\nfrom: ${from}\npk: ${pk}\namount: ${amount}\ntokenContractAddress: ${tokenContractAddress}\ntokenContractAbi: ${tokenContractAbi}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            addOwner: (from, pk, _owner, gas = null, useNativeQueryMethod = true, useWeb = false) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_signBTSCoreTx, "f").call(this, useWeb, from, pk, "addOwner", null, gas, queryMethod, _owner);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running addOwner(). Params:\nfrom: ${from}\npk: ${pk}\n_owner: ${_owner}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            reclaim: (from, pk, _coinName, _value, gas = null, useNativeQueryMethod = true, useWeb = false) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    const valueInWei = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_bscWeb3, "f").utils.toWei(_value, "ether");
                    return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_signBTSCoreTx, "f").call(this, useWeb, from, pk, "reclaim", null, gas, queryMethod, _coinName, valueInWei);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running reclaim(). Params:\nfrom: ${from}\npk: ${pk}\n_coinName: ${_coinName}\n_value: ${_value}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            register: (from, pk, _name, _symbol, _decimals, _feeNumerator, _fixedFee, _addr, gas = null, useNativeQueryMethod = true, useWeb = false) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_signBTSCoreTx, "f").call(this, useWeb, from, pk, "register", null, gas, queryMethod, _name, _symbol, _decimals, _feeNumerator, _fixedFee, _addr);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running register(). Params:\nfrom: ${from}\npk: ${pk}\n_name: ${_name}\n_symbol: ${_symbol}\n_decimals: ${_decimals}\n_feeNumerator: ${_feeNumerator}\n_fixedFee: ${_fixedFee}\n_addr: ${_addr}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            removeOwner: (from, pk, _owner, gas = null, useNativeQueryMethod = true, useWeb = false) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_signBTSCoreTx, "f").call(this, useWeb, from, pk, "removeOwner", null, gas, queryMethod, _owner);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running removeOwner(). Params:\nfrom: ${from}\npk: ${pk}\n_owner: ${_owner}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            setFeeRatio: (from, pk, _name, _feeNumerator, _fixedFee, gas = null, useNativeQueryMethod = true, useWeb = false) => __awaiter(this, void 0, void 0, function* () {
                const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                try {
                    return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_signBTSCoreTx, "f").call(this, useWeb, from, pk, "setFeeRatio", null, gas, queryMethod, _name, _feeNumerator, _fixedFee);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running setFeeRatio(). Params:\nfrom: ${from}\npk: ${pk}\n_name: ${_name}\n_feeNumerator: ${_feeNumerator}\n_fixedFee: ${_fixedFee}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            updateBTSPeriphery: (from, pk, _btsPeriphery, gas = null, useNativeQueryMethod = true, useWeb = false) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
                    return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_signBTSCoreTx, "f").call(this, useWeb, from, pk, "updateBTSPeriphery", null, gas, queryMethod, _btsPeriphery);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running updateBTSPeriphery(). Params:\nfrom: ${from}\npk: ${pk}\n_btsPeriphery: ${_btsPeriphery}\n`);
                    return { error: errorResult.toString() };
                }
            })
        });
        _IconBridgeSDKNodeBSC_web.set(this, {
            transfer: (targetAddress, targetChain = "icon", from, pk, _value, _coinName, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
                return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_localMethods, "f").transfer(targetAddress, targetChain, from, pk, _value, _coinName, gas, true, true);
            }),
            transferBatch: (targetAddress, targetChain = "icon", from, pk, _values, _coinNames, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
                return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_localMethods, "f").transferBatch(targetAddress, targetChain, from, pk, _values, _coinNames, gas, true, true);
            }),
            transferNativeCoin: (targetAddress, targetChain = "icon", from, pk, amount, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
                return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_localMethods, "f").transferNativeCoin(targetAddress, targetChain, from, pk, amount, gas, true, true);
            }),
            approveTransfer: (from, pk, amount, tokenContractAddress, tokenContractAbi = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_sdkUtils, "f").genericAbi, gas = null) => __awaiter(this, void 0, void 0, function* () {
                return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_localMethods, "f").approveTransfer(from, pk, amount, tokenContractAddress, tokenContractAbi, gas, true, true);
            }),
            addOwner: (from, pk, _owner, gas = null) => __awaiter(this, void 0, void 0, function* () {
                return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_localMethods, "f").addOwner(from, pk, _owner, gas, true, true);
            }),
            reclaim: (from, pk, _coinName, _value, gas = null) => __awaiter(this, void 0, void 0, function* () {
                return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_localMethods, "f").reclaim(from, pk, _coinName, _value, gas, true, true);
            }),
            register: (from, pk, _name, _symbol, _decimals, _feeNumerator, _fixedFee, _addr, gas = null) => __awaiter(this, void 0, void 0, function* () {
                return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_localMethods, "f").register(from, pk, _name, _symbol, _decimals, _feeNumerator, _fixedFee, _addr, gas, true, true);
            }),
            removeOwner: (from, pk, _owner, gas = null) => __awaiter(this, void 0, void 0, function* () {
                return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_localMethods, "f").removeOwner(from, pk, _owner, gas, true, true);
            }),
            setFeeRatio: (from, pk, _name, _feeNumerator, _fixedFee, gas = null) => __awaiter(this, void 0, void 0, function* () {
                return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_localMethods, "f").setFeeRatio(from, pk, _name, _feeNumerator, _fixedFee, gas, true, true);
            }),
            updateBTSPeriphery: (from, pk, _btsPeriphery, gas = null) => __awaiter(this, void 0, void 0, function* () {
                return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_localMethods, "f").updateBTSPeriphery(from, pk, _btsPeriphery, gas, true, true);
            })
        });
        _IconBridgeSDKNodeBSC_approveBTSCoreForTransfer.set(this, (useWeb = false, from, pk, amount, tokenContractAddress, tokenContractAbi, gas = null, queryMethod = null) => __awaiter(this, void 0, void 0, function* () {
            const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f").useMainnet;
            const btsCoreAddress = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_callbackLib, "f").getBTSCoreProxyContractAddress("bsc", isMainnet);
            return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_callbackLib, "f").approveTransfer(useWeb, from, pk, btsCoreAddress, amount, tokenContractAddress, tokenContractAbi, __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_bscWeb3, "f"), gas, queryMethod);
        }));
        _IconBridgeSDKNodeBSC_signBTSCoreTx.set(this, (useWeb = false, from, pk, methodName, amount = null, gas = null, queryMethod = null, ...rest) => __awaiter(this, void 0, void 0, function* () {
            let nonceOnChain = null;
            try {
                const bypass = true;
                if (!bypass) {
                    if (queryMethod == null) {
                        nonceOnChain = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_bscWeb3, "f").eth.getTransactionCount(from);
                    }
                    else {
                        const nonceQuery = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_sdkUtils, "f").makeEthGetTransactionCountQuery(__classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f").bscProvider.hostname, from, queryMethod);
                        if (nonceQuery.result != null) {
                            nonceOnChain = parseInt(nonceQuery.result, 16);
                        }
                    }
                    __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f")["nonce"] = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f")["nonce"] > nonceOnChain
                        ? __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f")["nonce"] + 1
                        : nonceOnChain + 1;
                }
            }
            catch (err) {
                __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f")["nonce"] = 0;
            }
            if (rest.length === 0) {
                return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_callbackLib, "f").signBTSCoreTx(useWeb, from, pk, methodName, amount, "bsc", __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_bscWeb3, "f"), gas, queryMethod, __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f").nonce);
            }
            else {
                return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_callbackLib, "f").signBTSCoreTx(useWeb, from, pk, methodName, amount, "bsc", __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_bscWeb3, "f"), gas, queryMethod, __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f").nonce, ...rest);
            }
        }));
        _IconBridgeSDKNodeBSC_approveAndTransfer.set(this, (targetAddress, targetChain = "icon", from, pk, _coinName, _value, tokenContractAddress, tokenContractAbi, gas = 2000000, useNativeQueryMethod = true) => __awaiter(this, void 0, void 0, function* () {
            const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_params, "f").useMainnet;
            const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
            const preTxRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_approveBTSCoreForTransfer, "f").call(this, false, from, pk, _value, tokenContractAddress, tokenContractAbi, gas, queryMethod);
            if (preTxRequest.result != null) {
                yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_sdkUtils, "f").sleep(10000);
            }
            else {
                throw new Error(`pre approve tx returned error. Result: ${preTxRequest}`);
            }
            const btpAddress = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_sdkUtils, "f").getBTPAddress(targetAddress, targetChain, isMainnet);
            const valueInWei = __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_bscWeb3, "f").utils.toWei(_value, "ether");
            const txRequest = yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_signBTSCoreTx, "f").call(this, false, from, pk, "transfer", null, gas, queryMethod, _coinName, valueInWei, btpAddress);
            return txRequest;
        }));
        __classPrivateFieldSet(this, _IconBridgeSDKNodeBSC_params, Object.assign(Object.assign({}, params), { nonce: 0 }), "f");
        __classPrivateFieldSet(this, _IconBridgeSDKNodeBSC_bscWeb3, bscWeb3, "f");
        __classPrivateFieldSet(this, _IconBridgeSDKNodeBSC_sdkUtils, sdkUtils, "f");
        __classPrivateFieldSet(this, _IconBridgeSDKNodeBSC_callbackLib, callbackLib, "f");
        this.methods = Object.assign(Object.assign({}, this.superMethods), __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_localMethods, "f"));
        this.web = Object.assign({}, __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_web, "f"));
        this.queryMethod = queryMethod;
    }
}
_IconBridgeSDKNodeBSC_params = new WeakMap(), _IconBridgeSDKNodeBSC_bscWeb3 = new WeakMap(), _IconBridgeSDKNodeBSC_sdkUtils = new WeakMap(), _IconBridgeSDKNodeBSC_callbackLib = new WeakMap(), _IconBridgeSDKNodeBSC_localMethods = new WeakMap(), _IconBridgeSDKNodeBSC_web = new WeakMap(), _IconBridgeSDKNodeBSC_approveBTSCoreForTransfer = new WeakMap(), _IconBridgeSDKNodeBSC_signBTSCoreTx = new WeakMap(), _IconBridgeSDKNodeBSC_approveAndTransfer = new WeakMap();
module.exports = IconBridgeSDKNodeBSC;
//# sourceMappingURL=icon-bridge-sdk-node-bsc.js.map