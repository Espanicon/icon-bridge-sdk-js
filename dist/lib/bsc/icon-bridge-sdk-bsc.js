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
class IconBridgeSDKBSC {
    constructor(params, bscWeb3, sdkUtils, callbackLib) {
        this.superMethods = {
            balanceOf: (_owner, _coinName) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const response = yield this.callbackLib.BTSReadonlyQuery("balanceOf", "bsc", this.bscWeb3, _owner, _coinName);
                    const BTSLogicContractABI = this.callbackLib.getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(BTSLogicContractABI[4].outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    console.log(err);
                    throw new Error(`Error running balanceOf(). Params:\n_owner: ${_owner}\n_coinName: ${_coinName}\n`);
                }
            }),
            balanceOfBatch: (_owner, _coinNames) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const response = yield this.callbackLib.BTSReadonlyQuery("balanceOfBatch", "bsc", this.bscWeb3, _owner, _coinNames);
                    const BTSLogicContractABI = this.callbackLib.getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(BTSLogicContractABI[5].outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    console.log(err);
                    throw new Error(`Error running balanceOfBatch(). Params:\n_owner: ${_owner}\n_coinNames: ${_coinNames}\n`);
                }
            }),
            coinId: (_coinName) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const response = yield this.callbackLib.BTSReadonlyQuery("coinId", "bsc", this.bscWeb3, _coinName);
                    const BTSLogicContractABI = this.callbackLib.getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(BTSLogicContractABI[6].outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    console.log(err);
                    throw new Error(`Error running coinId(). Params:\n_coinName: ${_coinName}\n`);
                }
            }),
            coinNames: () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const response = yield this.callbackLib.BTSReadonlyQuery("coinNames", "bsc", this.bscWeb3);
                    const BTSLogicContractABI = this.callbackLib.getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(BTSLogicContractABI[7].outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    console.log(err);
                    throw new Error(`Error running coinNames(). Params:\n ** NO PARAMS**\n`);
                }
            }),
            feeRatio: (_coinName) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const response = yield this.callbackLib.BTSReadonlyQuery("feeRatio", "bsc", this.bscWeb3, _coinName);
                    const BTSLogicContractABI = this.callbackLib.getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(BTSLogicContractABI[8].outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    console.log(err);
                    throw new Error(`Error running feeRatio(). Params:\n_coinName: ${_coinName}\n`);
                }
            }),
            getAccumulatedFees: () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const response = yield this.callbackLib.BTSReadonlyQuery("getAccumulatedFees", "bsc", this.bscWeb3);
                    const BTSLogicContractABI = this.callbackLib.getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(BTSLogicContractABI[9].outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    console.log(err);
                    throw new Error(`Error running getAccumulatedFees(). Params:\n ** NO PARAMS **\n`);
                }
            }),
            getNativeCoinName: () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const response = yield this.callbackLib.BTSReadonlyQuery("getNativeCoinName", "bsc", this.bscWeb3);
                    const BTSLogicContractABI = this.callbackLib.getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(BTSLogicContractABI[10].outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    console.log(err);
                    throw new Error(`Error running getNativeCoinName(). Params:\n ** NO PARAMS**\n`);
                }
            }),
            getOwners: () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const response = yield this.callbackLib.BTSReadonlyQuery("getOwners", "bsc", this.bscWeb3);
                    const BTSLogicContractABI = this.callbackLib.getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(BTSLogicContractABI[11].outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    console.log(err);
                    throw new Error(`Error running getOwners(). Params:\n ** NO PARAMS**\n`);
                }
            }),
            handleResponseService: (_requester, _coinName, _value, _fee, _rspCode) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const response = yield this.callbackLib.BTSReadonlyQuery("handleResponseService", "bsc", this.bscWeb3, _requester, _coinName, _value, _fee, _rspCode);
                    const BTSLogicContractABI = this.callbackLib.getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(BTSLogicContractABI[12].outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    console.log(err);
                    throw new Error(`Error running handleResponseService(). Params:\n_requester: ${_requester}\n_coinName: ${_coinName}\n_value: ${_value}\n_fee: ${_fee}\n_rspCode: ${_rspCode}\n`);
                }
            }),
            isOwner: (_owner) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const response = yield this.callbackLib.BTSReadonlyQuery("isOwner", "bsc", this.bscWeb3, _owner);
                    const BTSLogicContractABI = this.callbackLib.getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(BTSLogicContractABI[14].outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    console.log(err);
                    throw new Error(`Error running isOwner(). Params:\n_owner: ${_owner}\n`);
                }
            }),
            isValidCoin: (_coinName) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const response = yield this.callbackLib.BTSReadonlyQuery("isValidCoin", "bsc", this.bscWeb3, _coinName);
                    const BTSLogicContractABI = this.callbackLib.getAbiOf("BTSCore", "bsc", isMainnet, true);
                    const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(BTSLogicContractABI[15].outputs, response);
                    return parsedResponse;
                }
                catch (err) {
                    console.log(err);
                    throw new Error(`Error running isValidCoin(). Params:\n_coinName: ${_coinName}\n`);
                }
            }),
            reclaim: (_coinName, _value) => __awaiter(this, void 0, void 0, function* () {
                console.log(_coinName, _value);
            }),
            refund: (_to, _coinName, _value) => __awaiter(this, void 0, void 0, function* () {
                console.log([_to, _coinName, _value]);
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
            transferFees: (_fa) => __awaiter(this, void 0, void 0, function* () {
                console.log(_fa);
            }),
            transferNativeCoin: (_to) => __awaiter(this, void 0, void 0, function* () {
                console.log(_to);
            }),
            updateBTSPeriphery: (_btsPeriphery) => __awaiter(this, void 0, void 0, function* () {
                console.log(_btsPeriphery);
            })
        };
        this.params = params;
        this.bscWeb3 = bscWeb3;
        this.sdkUtils = sdkUtils;
        this.callbackLib = callbackLib;
    }
}
module.exports = IconBridgeSDKBSC;
//# sourceMappingURL=icon-bridge-sdk-bsc.js.map