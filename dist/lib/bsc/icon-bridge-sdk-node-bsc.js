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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _IconBridgeSDKNodeBSC_localMethods, _IconBridgeSDKNodeBSC_signBTSCoreTx;
const baseBSCSDK = require("./icon-bridge-sdk-bsc");
const Exception = require("../../utils/exception");
class IconBridgeSDKNodeBSC extends baseBSCSDK {
    constructor(params, bscWeb3, sdkUtils, callbackLib) {
        super(params, bscWeb3, sdkUtils, callbackLib);
        _IconBridgeSDKNodeBSC_localMethods.set(this, {
            addOwner: (_owner) => __awaiter(this, void 0, void 0, function* () {
                console.log(_owner);
            }),
            initialize: (_nativeCoinName, _feeNumerator, _fixedFee) => __awaiter(this, void 0, void 0, function* () {
                console.log([_nativeCoinName, _feeNumerator, _fixedFee]);
            }),
            reclaim: (_coinName, _value) => __awaiter(this, void 0, void 0, function* () {
                console.log(_coinName, _value);
            }),
            register: (_name, _symbol, _decimals, _feeNumerator, _fixedFee, _addr) => __awaiter(this, void 0, void 0, function* () {
                console.log([_name, _symbol, _decimals, _feeNumerator, _fixedFee, _addr]);
            }),
            removeOwner: (_owner) => __awaiter(this, void 0, void 0, function* () {
                console.log(_owner);
            }),
            setFeeRatio: (_name, _feeNumerator, _fixedFee) => __awaiter(this, void 0, void 0, function* () {
                console.log([_name, _feeNumerator, _fixedFee]);
            }),
            transfer: (_coinName, _value, _to) => __awaiter(this, void 0, void 0, function* () {
                console.log([_coinName, _value, _to]);
            }),
            transferBatch: (_coinNames, _values, _to) => __awaiter(this, void 0, void 0, function* () {
                console.log([_coinNames, _values, _to]);
            }),
            transferNativeCoin: (targetAddress, targetChain = 'icon', from, pk, amount, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const btpAddress = this.sdkUtils.getBTPAddress(targetAddress, targetChain, isMainnet);
                    return yield __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_signBTSCoreTx, "f").call(this, from, pk, "transferNativeCoin", amount, gas, btpAddress);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferNativeCoin(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\namount: ${amount}\ngas: ${gas}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            updateBTSPeriphery: (_btsPeriphery) => __awaiter(this, void 0, void 0, function* () {
                console.log(_btsPeriphery);
            }),
        });
        _IconBridgeSDKNodeBSC_signBTSCoreTx.set(this, (from, pk, methodName, amount = null, gas = null, ...rest) => __awaiter(this, void 0, void 0, function* () {
            if (rest.length === 0) {
                return yield this.callbackLib.signBTSCoreTx(from, pk, methodName, amount, "bsc", this.bscWeb3, gas);
            }
            else {
                return yield this.callbackLib.signBTSCoreTx(from, pk, methodName, amount, "bsc", this.bscWeb3, gas, ...rest);
            }
        }));
        this.params = params;
        this.bscWeb3 = bscWeb3;
        this.sdkUtils = sdkUtils;
        this.callbackLib = callbackLib;
        this.methods = Object.assign(Object.assign({}, this.superMethods), __classPrivateFieldGet(this, _IconBridgeSDKNodeBSC_localMethods, "f"));
    }
}
_IconBridgeSDKNodeBSC_localMethods = new WeakMap(), _IconBridgeSDKNodeBSC_signBTSCoreTx = new WeakMap();
module.exports = IconBridgeSDKNodeBSC;
//# sourceMappingURL=icon-bridge-sdk-node-bsc.js.map