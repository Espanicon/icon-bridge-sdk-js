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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _IconBridgeSDK_getAbiOf, _IconBridgeSDK_getBTSAbi, _IconBridgeSDK_getContractAddressLocally, _IconBridgeSDK_getBTSCoreLogicContractAddress, _IconBridgeSDK_getLogicContractAddressOnChain, _IconBridgeSDK_getContractObject;
const utils_1 = __importDefault(require("./utils/utils"));
const web3_1 = __importDefault(require("web3"));
const defaultParams = {
    useMainnet: true
};
class IconBridgeSDK {
    constructor(inputParams = defaultParams) {
        this.sdkUtils = utils_1.default;
        this.params = utils_1.default.defaultSDKParams;
        this.bsc = {
            getLogicContractAddressOnChain: (address, memSlot = this.sdkUtils.labels.memSlot) => __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield __classPrivateFieldGet(this, _IconBridgeSDK_getLogicContractAddressOnChain, "f").call(this, address, memSlot, this.bscWeb3);
                }
                catch (err) {
                    throw new Error(`Error running 'getLogicContractAddressOnChain' method.\n${err}`);
                }
            }),
            getContractObject: (abi, contractAddress) => {
                return __classPrivateFieldGet(this, _IconBridgeSDK_getContractObject, "f").call(this, abi, contractAddress, this.bscWeb3);
            },
            getAbiOf: (contractLabel, getLogicContract = false) => {
                const isMainnet = this.params.useMainnet == null
                    ? true
                    : this.params.useMainnet;
                return __classPrivateFieldGet(this, _IconBridgeSDK_getAbiOf, "f").call(this, contractLabel, "bsc", isMainnet, getLogicContract);
            },
            getBTSAbi: () => {
                const isMainnet = this.params.useMainnet == null
                    ? true
                    : this.params.useMainnet;
                return __classPrivateFieldGet(this, _IconBridgeSDK_getBTSAbi, "f").call(this, "bsc", isMainnet);
            },
            getBTSCoreLogicContractAddress: () => {
                const isMainnet = this.params.useMainnet == null
                    ? true
                    : this.params.useMainnet;
                return __classPrivateFieldGet(this, _IconBridgeSDK_getBTSCoreLogicContractAddress, "f").call(this, 'bsc', isMainnet);
            },
            getBTSCoreProxyContractObject: () => {
                return this.getBTSCoreProxyContractObject('bsc', this.bscWeb3);
            },
            getBTSCoreLogicContractAbi: () => {
                const isMainnet = this.params.useMainnet == null
                    ? true
                    : this.params.useMainnet;
                return __classPrivateFieldGet(this, _IconBridgeSDK_getAbiOf, "f").call(this, "BTSCore", "bsc", isMainnet, true);
            },
            getBTSCoreLogicContractObject: () => {
                return this.getBTSCoreLogicContractObject("bsc", this.bscWeb3);
            },
            balanceOf: (_owner, _coinName) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null
                        ? true
                        : this.params.useMainnet;
                    const response = yield this.BTSReadonlyQuery('balanceOf', 'bsc', this.bscWeb3, _owner, _coinName);
                    const BTSLogicContractABI = __classPrivateFieldGet(this, _IconBridgeSDK_getAbiOf, "f").call(this, 'BTSCore', 'bsc', isMainnet, true);
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
                    const isMainnet = this.params.useMainnet == null
                        ? true
                        : this.params.useMainnet;
                    const response = yield this.BTSReadonlyQuery('coinNames', 'bsc', this.bscWeb3);
                    const BTSLogicContractABI = __classPrivateFieldGet(this, _IconBridgeSDK_getAbiOf, "f").call(this, 'BTSCore', 'bsc', isMainnet, true);
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
                    const isMainnet = this.params.useMainnet == null
                        ? true
                        : this.params.useMainnet;
                    const response = yield this.BTSReadonlyQuery('balanceOfBatch', 'bsc', this.bscWeb3, _owner, _coinNames);
                    const BTSLogicContractABI = __classPrivateFieldGet(this, _IconBridgeSDK_getAbiOf, "f").call(this, 'BTSCore', 'bsc', isMainnet, true);
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
                    const isMainnet = this.params.useMainnet == null
                        ? true
                        : this.params.useMainnet;
                    const response = yield this.BTSReadonlyQuery('coinId', 'bsc', this.bscWeb3, _coinName);
                    const BTSLogicContractABI = __classPrivateFieldGet(this, _IconBridgeSDK_getAbiOf, "f").call(this, 'BTSCore', 'bsc', isMainnet, true);
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
                    const isMainnet = this.params.useMainnet == null
                        ? true
                        : this.params.useMainnet;
                    const response = yield this.BTSReadonlyQuery('feeRatio', 'bsc', this.bscWeb3, _coinName);
                    const BTSLogicContractABI = __classPrivateFieldGet(this, _IconBridgeSDK_getAbiOf, "f").call(this, 'BTSCore', 'bsc', isMainnet, true);
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
                    const isMainnet = this.params.useMainnet == null
                        ? true
                        : this.params.useMainnet;
                    const response = yield this.BTSReadonlyQuery('getAccumulatedFees', 'bsc', this.bscWeb3);
                    const BTSLogicContractABI = __classPrivateFieldGet(this, _IconBridgeSDK_getAbiOf, "f").call(this, 'BTSCore', 'bsc', isMainnet, true);
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
            }),
        };
        this.BTSReadonlyQuery = (methodName, chain, web3Wrapper, ...rest) => __awaiter(this, void 0, void 0, function* () {
            const isMainnet = this.params.useMainnet == null
                ? true
                : this.params.useMainnet;
            try {
                const BTSProxyContractAddress = this.getBTSCoreProxyContractAddress(chain, isMainnet);
                const contractObject = this.getBTSCoreLogicContractObject(chain, web3Wrapper);
                let encodedData = null;
                const contractMethod = contractObject.methods[methodName];
                if (rest.length === 0) {
                    encodedData = contractMethod().encodeABI();
                }
                else {
                    encodedData = contractMethod(...rest).encodeABI();
                }
                const contractMethodCallResponse = yield web3Wrapper.eth.call({
                    to: BTSProxyContractAddress,
                    data: encodedData
                });
                return contractMethodCallResponse;
            }
            catch (err) {
                console.log(err);
                throw new Error(`Error running ${methodName}(). Params:\n ** NO PARAMS**\n`);
            }
        });
        _IconBridgeSDK_getAbiOf.set(this, (contractLabel, chain, isMainnet, getLogicContract = true) => {
            return this.sdkUtils.getAbiOfLabelFromLocalData(contractLabel, chain, isMainnet, getLogicContract);
        });
        _IconBridgeSDK_getBTSAbi.set(this, (chain, isMainnet, getLogicContract = true) => {
            return __classPrivateFieldGet(this, _IconBridgeSDK_getAbiOf, "f").call(this, "BTSCore", chain, isMainnet, getLogicContract);
        });
        this.getContractObjectByLabel = (label, chain, web3Wrapper, getLogicContract = false) => {
            try {
                const isMainnet = this.params.useMainnet == null
                    ? true
                    : this.params.useMainnet;
                const contractAddress = __classPrivateFieldGet(this, _IconBridgeSDK_getContractAddressLocally, "f").call(this, label, chain, isMainnet, getLogicContract);
                const abi = __classPrivateFieldGet(this, _IconBridgeSDK_getAbiOf, "f").call(this, label, chain, isMainnet, getLogicContract);
                return __classPrivateFieldGet(this, _IconBridgeSDK_getContractObject, "f").call(this, abi, contractAddress, web3Wrapper);
            }
            catch (err) {
                throw new Error(`Error running #getContractObjectByLabel(). Params:\nlabel: ${label}\nchain: ${chain}\nweb3Wrapper: ${web3Wrapper}\ngetLogicContract: ${getLogicContract}.\n${err}`);
            }
        };
        _IconBridgeSDK_getContractAddressLocally.set(this, (label, chain, isMainnet, getLogicContract = false) => {
            return this.sdkUtils.getContractOfLabelFromLocalData(label, chain, isMainnet, getLogicContract);
        });
        _IconBridgeSDK_getBTSCoreLogicContractAddress.set(this, (chain, isMainnet) => {
            return __classPrivateFieldGet(this, _IconBridgeSDK_getContractAddressLocally, "f").call(this, "BTSCore", chain, isMainnet, true);
        });
        this.getBTSCoreProxyContractAddress = (chain, isMainnet) => {
            return __classPrivateFieldGet(this, _IconBridgeSDK_getContractAddressLocally, "f").call(this, "BTSCore", chain, isMainnet);
        };
        _IconBridgeSDK_getLogicContractAddressOnChain.set(this, (address, memSlot, web3Wrapper) => __awaiter(this, void 0, void 0, function* () {
            let result = null;
            try {
                const memData = yield web3Wrapper.eth.getStorageAt(address, memSlot);
                result = this.sdkUtils.removeZerosFromAddress(memData);
                return result;
            }
            catch (err) {
                throw new Error(`Error running #getLogicContractAddressOnChain(). Params:\naddress: ${address}\nmemSlot: ${memSlot}\n.\n${err}`);
            }
        }));
        _IconBridgeSDK_getContractObject.set(this, (abi, contractAddress, web3Wrapper) => {
            try {
                const contract = new web3Wrapper.eth.Contract(abi, contractAddress);
                return contract;
            }
            catch (err) {
                throw new Error(`Error running #getContractObject(). Params:\nabi: ${abi}\ncontractAddress: ${contractAddress}\nweb3Wrapper: ${web3Wrapper}.\n${err}`);
            }
        });
        this.getBTSCoreProxyContractObject = (chain, web3Wrapper) => {
            return this.getContractObjectByLabel("BTSCore", chain, web3Wrapper, false);
        };
        this.getBTSCoreLogicContractObject = (chain, web3Wrapper) => {
            return this.getContractObjectByLabel("BTSCore", chain, web3Wrapper, true);
        };
        this.params = this.sdkUtils.getSDKParams(inputParams);
        this.bscWeb3 = new web3_1.default(this.params.bscProvider.hostname);
    }
}
_IconBridgeSDK_getAbiOf = new WeakMap(), _IconBridgeSDK_getBTSAbi = new WeakMap(), _IconBridgeSDK_getContractAddressLocally = new WeakMap(), _IconBridgeSDK_getBTSCoreLogicContractAddress = new WeakMap(), _IconBridgeSDK_getLogicContractAddressOnChain = new WeakMap(), _IconBridgeSDK_getContractObject = new WeakMap();
module.exports = IconBridgeSDK;
//# sourceMappingURL=icon-bridge-sdk.js.map