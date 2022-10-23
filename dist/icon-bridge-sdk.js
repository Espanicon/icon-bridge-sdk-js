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
var _IconBridgeSDK_getContractLocally, _IconBridgeSDK_getBTSCoreLogicContract, _IconBridgeSDK_getLogicContract, _IconBridgeSDK_getContractObject, _IconBridgeSDK_getAbiOf, _IconBridgeSDK_getBTSAbi;
const utils_1 = __importDefault(require("./utils/utils"));
const web3_1 = __importDefault(require("web3"));
class IconBridgeSDK {
    constructor(inputParams = utils_1.default.defaultSDKParams) {
        this.sdkUtils = utils_1.default;
        this.params = utils_1.default.defaultSDKParams;
        this.bsc = {
            getLogicContract: (address, memSlot = this.sdkUtils.labels.memSlot, web3Wrapper = this.bscWeb3) => __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield __classPrivateFieldGet(this, _IconBridgeSDK_getLogicContract, "f").call(this, address, memSlot, web3Wrapper);
                }
                catch (err) {
                    throw new Error(`Error running 'getLogicContract' method.\n${err}`);
                }
            }),
            getContract: (abi, contractAddress) => {
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
            getBTSCoreLogicContract: () => {
                const isMainnet = this.params.useMainnet == null
                    ? true
                    : this.params.useMainnet;
                return __classPrivateFieldGet(this, _IconBridgeSDK_getBTSCoreLogicContract, "f").call(this, 'bsc', isMainnet);
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
            }
        };
        _IconBridgeSDK_getContractLocally.set(this, (label, chain, isMainnet, getLogicContract = false) => {
            return this.sdkUtils.getContractOfLabelFromLocalData(label, chain, isMainnet, getLogicContract);
        });
        _IconBridgeSDK_getBTSCoreLogicContract.set(this, (chain, isMainnet) => {
            return __classPrivateFieldGet(this, _IconBridgeSDK_getContractLocally, "f").call(this, "BTSCore", chain, isMainnet, true);
        });
        this.getBTSCoreProxyContractAddress = (chain, isMainnet) => {
            return __classPrivateFieldGet(this, _IconBridgeSDK_getContractLocally, "f").call(this, "BTSCore", chain, isMainnet);
        };
        _IconBridgeSDK_getLogicContract.set(this, (address, memSlot, web3Wrapper) => __awaiter(this, void 0, void 0, function* () {
            let result = null;
            try {
                const memData = yield web3Wrapper.eth.getStorageAt(address, memSlot);
                result = this.sdkUtils.removeZerosFromAddress(memData);
                return result;
            }
            catch (err) {
                throw new Error(`Error running #getLogicContract(). Params:\naddress: ${address}\nmemSlot: ${memSlot}\n.\n${err}`);
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
        _IconBridgeSDK_getAbiOf.set(this, (contractLabel, chain, isMainnet, getLogicContract = false) => {
            return this.sdkUtils.getAbiOfLabelFromLocalData(contractLabel, chain, isMainnet, getLogicContract);
        });
        _IconBridgeSDK_getBTSAbi.set(this, (chain, isMainnet) => {
            return __classPrivateFieldGet(this, _IconBridgeSDK_getAbiOf, "f").call(this, "BTSCore", chain, isMainnet);
        });
        this.getContractObjectByLabel = (label, chain, web3Wrapper, getLogicContract = false) => {
            try {
                const isMainnet = this.params.useMainnet == null
                    ? true
                    : this.params.useMainnet;
                const contractAddress = __classPrivateFieldGet(this, _IconBridgeSDK_getContractLocally, "f").call(this, label, chain, isMainnet, getLogicContract);
                const abi = __classPrivateFieldGet(this, _IconBridgeSDK_getAbiOf, "f").call(this, label, chain, isMainnet, getLogicContract);
                return __classPrivateFieldGet(this, _IconBridgeSDK_getContractObject, "f").call(this, abi, contractAddress, web3Wrapper);
            }
            catch (err) {
                throw new Error(`Error running #getContractObjectByLabel(). Params:\nlabel: ${label}\nchain: ${chain}\nweb3Wrapper: ${web3Wrapper}\ngetLogicContract: ${getLogicContract}.\n${err}`);
            }
        };
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
_IconBridgeSDK_getContractLocally = new WeakMap(), _IconBridgeSDK_getBTSCoreLogicContract = new WeakMap(), _IconBridgeSDK_getLogicContract = new WeakMap(), _IconBridgeSDK_getContractObject = new WeakMap(), _IconBridgeSDK_getAbiOf = new WeakMap(), _IconBridgeSDK_getBTSAbi = new WeakMap();
module.exports = IconBridgeSDK;
//# sourceMappingURL=icon-bridge-sdk.js.map