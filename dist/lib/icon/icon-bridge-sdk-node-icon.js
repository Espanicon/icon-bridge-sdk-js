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
const baseICONSDK = require("./icon-bridge-sdk-icon");
const IconService = require("icon-sdk-js");
const { IconBuilder, IconAmount, IconConverter, IconWallet, SignedTransaction, HttpProvider } = IconService.default;
const { CallTransactionBuilder } = IconBuilder;
class IconBridgeSDKNodeIcon extends baseICONSDK {
    constructor(params, sdkUtils) {
        super(params, sdkUtils);
        this.localMethods = {
            transferNativeCoin: (targetAddress, targetChain, from, pk, amount, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const btpAddress = this.sdkUtils.getBTPAddress(targetAddress, targetChain, isMainnet);
                    const btsContract = this.sdkUtils.getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield this.makeTxRequest(from, btsContract, pk, "transferNativeCoin", { _to: btpAddress }, amount, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferNativeCoin(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\namount: ${amount}\nstepLimit: ${stepLimit}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            reclaim: (_coinName, _value, from, pk, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const btsContract = this.sdkUtils.getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield this.makeTxRequest(from, btsContract, pk, "transferNativeCoin", { _coinName: _coinName, _value: _value }, 0, stepLimit);
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
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const btsContract = this.sdkUtils.getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield this.makeTxRequest(from, btsContract, pk, "addOwner", { _addr: _addr }, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running addOwner(). Params:\n_addr: ${_addr}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            removeOwner: (_addr, from, pk, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const btsContract = this.sdkUtils.getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield this.makeTxRequest(from, btsContract, pk, "removeOwner", { _addr: _addr }, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running removeOwner(). Params:\n_addr: ${_addr}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            register: (_name, _symbol, _decimals, _feeNumerator, _fixedFee, _addr, from, pk, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const btsContract = this.sdkUtils.getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield this.makeTxRequest(from, btsContract, pk, "register", {
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
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const btsContract = this.sdkUtils.getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield this.makeTxRequest(from, btsContract, pk, "setFeeRatio", { _name: _name, _feeNumerator: _feeNumerator, _fixedFee: _fixedFee }, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running setFeeRatio(). Params:\n_name: ${_name}\n_feeNumerator: ${_feeNumerator}\n_fixedFee: ${_fixedFee}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            removeBlacklistAddress: (_net, _addresses, from, pk, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const btsContract = this.sdkUtils.getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield this.makeTxRequest(from, btsContract, pk, "removeBlacklistAddress", { _net: _net, _addresses: _addresses }, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running removeBlacklistAddress(). Params:\n_net: ${_net}\n_addresses: ${_addresses}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            setTokenLimit: (_coinNames, _tokenLimits, from, pk, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const btsContract = this.sdkUtils.getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield this.makeTxRequest(from, btsContract, pk, "setTokenLimit", { _coinNames: _coinNames, _tokenLimits: _tokenLimits }, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running setTokenLimit(). Params:\n_coinNames: ${_coinNames}\n_tokenLimits: ${_tokenLimits}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            addBlacklistAddress: (_net, _addresses, from, pk, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const btsContract = this.sdkUtils.getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield this.makeTxRequest(from, btsContract, pk, "addBlacklistAddress", { _net: _net, _addresses: _addresses }, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running addBlacklistAddress(). Params:\n_net: ${_net}\n_addresses: ${_addresses}\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            addRestriction: (from, pk, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const btsContract = this.sdkUtils.getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield this.makeTxRequest(from, btsContract, pk, "addRestriction", null, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running addRestrictions(). Params:\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            disableRestrictions: (from, pk, stepLimit = null) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const btsContract = this.sdkUtils.getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield this.makeTxRequest(from, btsContract, pk, "disableRestrictions", null, 0, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running disableRestrictions(). Params:\nfrom: ${from}\npk: ${pk}\n`);
                    return { error: errorResult.toString() };
                }
            })
        };
        this.makeTxRequest = (from, to, pk, method, params = null, value = 0, stepLimit = null, nid = this.params.iconProvider.nid) => __awaiter(this, void 0, void 0, function* () {
            try {
                const useStepLimit = stepLimit == null ? "8000000" : stepLimit;
                const txObj = new CallTransactionBuilder()
                    .from(from)
                    .to(to)
                    .stepLimit(IconConverter.toBigNumber(useStepLimit))
                    .nid(IconConverter.toBigNumber(nid))
                    .nonce(IconConverter.toBigNumber(this.sdkUtils.getRandNonce()))
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
                const txHash = yield this.iconService.sendTransaction(signedTx).execute();
                return txHash;
            }
            catch (err) {
                console.log("error running makeTxRequest");
                console.log(err);
            }
        });
        this.params = params;
        this.sdkUtils = sdkUtils;
        this.iconHttpProvider = new HttpProvider("https://" + this.params.iconProvider.hostname + "/api/v3");
        this.iconService = new IconService.default(this.iconHttpProvider);
        this.methods = Object.assign(Object.assign({}, this.superMethods), this.localMethods);
    }
}
module.exports = IconBridgeSDKNodeIcon;
//# sourceMappingURL=icon-bridge-sdk-node-icon.js.map