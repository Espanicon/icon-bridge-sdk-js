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
const baseBSCSDK = require("./icon-bridge-sdk-bsc");
const Exception = require("../../utils/exception");
class IconBridgeSDKNodeBSC extends baseBSCSDK {
    constructor(params, bscWeb3, sdkUtils, callbackLib) {
        super(params, bscWeb3, sdkUtils, callbackLib);
        this.localMethods = {
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
            transferBUSD: (targetAddress, targetChain = "icon", from, pk, _coinName, _value, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
                const foo = [
                    targetAddress,
                    targetChain,
                    from,
                    pk,
                    _coinName,
                    _value,
                    gas
                ];
                console.log(foo);
            }),
            transferUSDT: (targetAddress, targetChain = "icon", from, pk, _coinName, _value, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
                const foo = [
                    targetAddress,
                    targetChain,
                    from,
                    pk,
                    _coinName,
                    _value,
                    gas
                ];
                console.log(foo);
            }),
            transferUSDC: (targetAddress, targetChain = "icon", from, pk, _coinName, _value, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
                const foo = [
                    targetAddress,
                    targetChain,
                    from,
                    pk,
                    _coinName,
                    _value,
                    gas
                ];
                console.log(foo);
            }),
            transferBTCB: (targetAddress, targetChain = "icon", from, pk, _coinName, _value, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
                const foo = [
                    targetAddress,
                    targetChain,
                    from,
                    pk,
                    _coinName,
                    _value,
                    gas
                ];
                console.log(foo);
            }),
            transferETH: (targetAddress, targetChain = "icon", from, pk, _coinName, _value, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
                const foo = [
                    targetAddress,
                    targetChain,
                    from,
                    pk,
                    _coinName,
                    _value,
                    gas
                ];
                console.log(foo);
            }),
            transferICX: (targetAddress, targetChain = "icon", from, pk, _value, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let isMainnet = null;
                    let coinName = null;
                    if (this.params.useMainnet === false) {
                        isMainnet = false;
                        coinName = this.sdkUtils.tokenNames.bsc.testnet[this.sdkUtils.labels.icx];
                    }
                    else if (this.params.useMainnet === true ||
                        this.params.useMainnet == null) {
                        isMainnet = true;
                        coinName = this.sdkUtils.tokenNames.bsc.mainnet[this.sdkUtils.labels.icx];
                    }
                    const abi = this.sdkUtils.genericAbi;
                    const tokenContractAddress = this.callbackLib.getContractAddressLocally(this.sdkUtils.labels.icx, "bsc", isMainnet, false);
                    const request = yield this.transfer(targetAddress, targetChain, from, pk, coinName, _value, tokenContractAddress, abi, gas);
                    return request;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferICX(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n_value: ${_value}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            transferSICX: (targetAddress, targetChain = "icon", from, pk, _coinName, _value, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
                const foo = [
                    targetAddress,
                    targetChain,
                    from,
                    pk,
                    _coinName,
                    _value,
                    gas
                ];
                console.log(foo);
            }),
            transferbnUSD: (targetAddress, targetChain = "icon", from, pk, _coinName, _value, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
                const foo = [
                    targetAddress,
                    targetChain,
                    from,
                    pk,
                    _coinName,
                    _value,
                    gas
                ];
                console.log(foo);
            }),
            transfer: (targetAddress, targetChain = "icon", from, pk, _coinName, _value, tokenContractAddress, tokenContractAbi, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield this.transfer(targetAddress, targetChain, from, pk, _coinName, _value, tokenContractAddress, tokenContractAbi, gas);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transfer(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n_coinName: ${_coinName}\n_value: ${_value}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            transferBatch: (_coinNames, _values, _to) => __awaiter(this, void 0, void 0, function* () {
                console.log([_coinNames, _values, _to]);
            }),
            transferNativeCoin: (targetAddress, targetChain = "icon", from, pk, amount, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const btpAddress = this.sdkUtils.getBTPAddress(targetAddress, targetChain, isMainnet);
                    return yield this.signBTSCoreTx(from, pk, "transferNativeCoin", amount, gas, btpAddress);
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferNativeCoin(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\namount: ${amount}\ngas: ${gas}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            updateBTSPeriphery: (_btsPeriphery) => __awaiter(this, void 0, void 0, function* () {
                console.log(_btsPeriphery);
            })
        };
        this.approveBTSCoreForTransfer = (from, pk, amount, tokenContractAddress, tokenContractAbi, gas = null) => __awaiter(this, void 0, void 0, function* () {
            const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
            const btsCoreAddress = this.callbackLib.getBTSCoreProxyContractAddress("bsc", isMainnet);
            return yield this.callbackLib.approveTransfer(from, pk, btsCoreAddress, amount, tokenContractAddress, tokenContractAbi, "bsc", this.bscWeb3, gas);
        });
        this.signBTSCoreTx = (from, pk, methodName, amount = null, gas = null, ...rest) => __awaiter(this, void 0, void 0, function* () {
            if (rest.length === 0) {
                return yield this.callbackLib.signBTSCoreTx(from, pk, methodName, amount, "bsc", this.bscWeb3, gas);
            }
            else {
                return yield this.callbackLib.signBTSCoreTx(from, pk, methodName, amount, "bsc", this.bscWeb3, gas, ...rest);
            }
        });
        this.transfer = (targetAddress, targetChain = "icon", from, pk, _coinName, _value, tokenContractAddress, tokenContractAbi, gas = 2000000) => __awaiter(this, void 0, void 0, function* () {
            const bar = false;
            if (bar) {
                const foo = [tokenContractAddress, tokenContractAbi];
                console.log(foo);
            }
            const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
            const response = yield this.approveBTSCoreForTransfer(from, pk, _value, tokenContractAddress, tokenContractAbi, gas);
            const btpAddress = this.sdkUtils.getBTPAddress(targetAddress, targetChain, isMainnet);
            const valueInWei = this.bscWeb3.utils.toWei(_value, "ether");
            const response2 = yield this.signBTSCoreTx(from, pk, "transfer", null, gas, _coinName, valueInWei, btpAddress);
            return {
                approvalTx: response,
                tokenTx: response2
            };
        });
        this.params = params;
        this.bscWeb3 = bscWeb3;
        this.sdkUtils = sdkUtils;
        this.callbackLib = callbackLib;
        this.methods = Object.assign(Object.assign({}, this.superMethods), this.localMethods);
    }
}
module.exports = IconBridgeSDKNodeBSC;
//# sourceMappingURL=icon-bridge-sdk-node-bsc.js.map