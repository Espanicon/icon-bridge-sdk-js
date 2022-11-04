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
        this.methods = {
            getLogicContractAddressOnChain: (address, memSlot = this.sdkUtils.labels.memSlot) => __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield this.callbackLib.getLogicContractAddressOnChain(address, memSlot, this.bscWeb3);
                }
                catch (err) {
                    throw new Error(`Error running 'getLogicContractAddressOnChain' method.\n${err}`);
                }
            }),
            getContractObject: (abi, contractAddress) => {
                return this.callbackLib.getContractObject(abi, contractAddress, this.bscWeb3);
            },
            getAbiOf: (contractLabel, getLogicContract = false) => {
                const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                return this.callbackLib.getAbiOf(contractLabel, "bsc", isMainnet, getLogicContract);
            },
            getBTSAbi: () => {
                const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                return this.callbackLib.getBTSAbi("bsc", isMainnet);
            },
            getBTSCoreLogicContractAddress: () => {
                const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                return this.callbackLib.getBTSCoreLogicContractAddress("bsc", isMainnet);
            },
            getBTSCoreProxyContractObject: () => {
                return this.callbackLib.getBTSCoreProxyContractObject("bsc", this.bscWeb3);
            },
            getBTSCoreLogicContractAbi: () => {
                const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                return this.callbackLib.getAbiOf("BTSCore", "bsc", isMainnet, true);
            },
            getBTSCoreLogicContractObject: () => {
                return this.callbackLib.getBTSCoreLogicContractObject("bsc", this.bscWeb3);
            },
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
            addOwner: (_owner) => __awaiter(this, void 0, void 0, function* () {
                console.log(_owner);
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
            }),
            getOwners: () => __awaiter(this, void 0, void 0, function* () {
            }),
            handleResponseService: (_requester, _coinName, _value, _fee, _rspCode) => __awaiter(this, void 0, void 0, function* () {
                console.log([_requester, _coinName, _value, _fee, _rspCode]);
            }),
            initialize: (_nativeCoinName, _feeNumerator, _fixedFee) => __awaiter(this, void 0, void 0, function* () {
                console.log([_nativeCoinName, _feeNumerator, _fixedFee]);
            }),
            isOwner: (_owner) => __awaiter(this, void 0, void 0, function* () {
                console.log(_owner);
            }),
            isValidCoin: (_coinName) => __awaiter(this, void 0, void 0, function* () {
                console.log(_coinName);
            }),
            mint: (_to, _coinName, _value) => __awaiter(this, void 0, void 0, function* () {
                console.log(_to, _coinName, _value);
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