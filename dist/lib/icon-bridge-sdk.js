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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const utils_1 = __importDefault(require("../utils/utils"));
const web3_1 = __importDefault(require("web3"));
const defaultParams = {
    useMainnet: true
};
class IconBridgeSDK {
    constructor(inputParams = defaultParams) {
        this.sdkUtils = utils_1.default;
        this.params = utils_1.default.defaultSDKParams;
        this.lib = {
            BTSReadonlyQuery: (methodName, chain, web3Wrapper, ...rest) => __awaiter(this, void 0, void 0, function* () {
                const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                const BTSProxyContractAddress = this.lib.getBTSCoreProxyContractAddress(chain, isMainnet);
                const contractObject = this.lib.getBTSCoreLogicContractObject(chain, web3Wrapper);
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
            }),
            signBTSCoreTx: (from, pk, methodName, amount = null, chain, web3Wrapper, gas = null, ...rest) => __awaiter(this, void 0, void 0, function* () {
                const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                const BTSProxyContractAddress = this.lib.getBTSCoreProxyContractAddress(chain, isMainnet);
                const contractObject = this.lib.getBTSCoreLogicContractObject(chain, web3Wrapper);
                let encodedData = null;
                const contractMethod = contractObject.methods[methodName];
                if (rest.length === 0) {
                    encodedData = contractMethod().encodeABI();
                }
                else {
                    encodedData = contractMethod(...rest).encodeABI();
                }
                const tx = {
                    from: from,
                    to: BTSProxyContractAddress,
                    gas: gas == null ? 2000000 : gas,
                    data: encodedData
                };
                if (amount != null) {
                    tx["value"] = web3Wrapper.utils.toWei(amount, "ether");
                }
                const signedTx = yield web3Wrapper.eth.accounts.signTransaction(tx, pk);
                const receipt = yield web3Wrapper.eth.sendSignedTransaction(signedTx.rawTransaction);
                return receipt.transactionHash;
            }),
            getAbiOf: (contractLabel, chain, isMainnet, getLogicContract = true) => {
                return this.sdkUtils.getAbiOfLabelFromLocalData(contractLabel, chain, isMainnet, getLogicContract);
            },
            getBTSAbi: (chain, isMainnet, getLogicContract = true) => {
                return this.lib.getAbiOf("BTSCore", chain, isMainnet, getLogicContract);
            },
            getContractObjectByLabel: (label, chain, web3Wrapper, getLogicContract = false) => {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const contractAddress = this.lib.getContractAddressLocally(label, chain, isMainnet, getLogicContract);
                    const abi = this.lib.getAbiOf(label, chain, isMainnet, getLogicContract);
                    return this.lib.getContractObject(abi, contractAddress, web3Wrapper);
                }
                catch (err) {
                    throw new Error(`Error running #getContractObjectByLabel(). Params:\nlabel: ${label}\nchain: ${chain}\nweb3Wrapper: ${web3Wrapper}\ngetLogicContract: ${getLogicContract}.\n${err}`);
                }
            },
            getContractAddressLocally: (label, chain, isMainnet, getLogicContract = false) => {
                return this.sdkUtils.getContractOfLabelFromLocalData(label, chain, isMainnet, getLogicContract);
            },
            getBTSCoreLogicContractAddress: (chain, isMainnet) => {
                return this.lib.getContractAddressLocally("BTSCore", chain, isMainnet, true);
            },
            getBTSCoreProxyContractAddress: (chain, isMainnet) => {
                return this.lib.getContractAddressLocally("BTSCore", chain, isMainnet);
            },
            getLogicContractAddressOnChain: (address, memSlot, web3Wrapper) => __awaiter(this, void 0, void 0, function* () {
                let result = null;
                try {
                    const memData = yield web3Wrapper.eth.getStorageAt(address, memSlot);
                    result = this.sdkUtils.removeZerosFromAddress(memData);
                    return result;
                }
                catch (err) {
                    throw new Error(`Error running #getLogicContractAddressOnChain(). Params:\naddress: ${address}\nmemSlot: ${memSlot}\n.\n${err}`);
                }
            }),
            getContractObject: (abi, contractAddress, web3Wrapper) => {
                try {
                    const contract = new web3Wrapper.eth.Contract(abi, contractAddress);
                    return contract;
                }
                catch (err) {
                    throw new Error(`Error running #getContractObject(). Params:\nabi: ${abi}\ncontractAddress: ${contractAddress}\nweb3Wrapper: ${web3Wrapper}.\n${err}`);
                }
            },
            getBTSCoreProxyContractObject: (chain, web3Wrapper) => {
                return this.lib.getContractObjectByLabel("BTSCore", chain, web3Wrapper, false);
            },
            getBTSCoreLogicContractObject: (chain, web3Wrapper) => {
                return this.lib.getContractObjectByLabel("BTSCore", chain, web3Wrapper, true);
            }
        };
        this.params = this.sdkUtils.getSDKParams(inputParams);
        this.bscWeb3 = new web3_1.default(this.params.bscProvider.hostname);
    }
}
module.exports = IconBridgeSDK;
//# sourceMappingURL=icon-bridge-sdk.js.map