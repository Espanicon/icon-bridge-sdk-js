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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _IconBridgeSDK_bscWeb3Private;
const utils_1 = __importDefault(require("../utils/utils"));
const web3_1 = __importDefault(require("web3"));
const defaultParams = {
    useMainnet: true
};
class IconBridgeSDK {
    constructor(inputParams = defaultParams) {
        this.sdkUtils = utils_1.default;
        this.params = utils_1.default.defaultSDKParams;
        _IconBridgeSDK_bscWeb3Private.set(this, void 0);
        this.lib = {
            BTSReadonlyQuery: (methodName, chain, web3Wrapper, queryMethod = null, ...rest) => __awaiter(this, void 0, void 0, function* () {
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
                let contractMethodCallResponse = null;
                if (queryMethod == null) {
                    contractMethodCallResponse = yield web3Wrapper.eth.call({
                        to: BTSProxyContractAddress,
                        data: encodedData
                    });
                }
                else {
                    const contractMethodCallResponseRaw = yield this.sdkUtils.makeEthJsonRpcReadonlyQuery(this.params.bscProvider.hostname, BTSProxyContractAddress, encodedData, queryMethod);
                    if (contractMethodCallResponseRaw.error != null) {
                        throw new Error(JSON.stringify(contractMethodCallResponseRaw));
                    }
                    contractMethodCallResponse = contractMethodCallResponseRaw.result;
                }
                return contractMethodCallResponse;
            }),
            signBTSCoreTx: (useWeb = false, from, pk, methodName, amount = null, chain, web3Wrapper, gas = null, queryMethod = null, nonce = null, ...rest) => __awaiter(this, void 0, void 0, function* () {
                const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                const BTSProxyContractAddress = this.lib.getBTSCoreProxyContractAddress(chain, isMainnet);
                const contractObject = this.lib.getBTSCoreLogicContractObject(chain, web3Wrapper);
                if (rest.length === 0) {
                    return yield this.signTx(useWeb, from, pk, methodName, BTSProxyContractAddress, contractObject, web3Wrapper, amount, gas, queryMethod, nonce);
                }
                else {
                    return yield this.signTx(useWeb, from, pk, methodName, BTSProxyContractAddress, contractObject, web3Wrapper, amount, gas, queryMethod, nonce, ...rest);
                }
            }),
            approveTransfer: (useWeb = false, from, pk, spender, rawAmount, tokenContractAddress, tokenContractAbi, web3Wrapper, gas = null, queryMethod = null) => __awaiter(this, void 0, void 0, function* () {
                const valueInWei = web3Wrapper.utils.toWei(rawAmount, "ether");
                const contractObject = this.lib.getContractObject(tokenContractAbi, tokenContractAddress, web3Wrapper);
                return yield this.signTx(useWeb, from, pk, "approve", tokenContractAddress, contractObject, web3Wrapper, null, gas, queryMethod, null, spender, valueInWei);
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
                    throw new Error(`Error running getContractObjectByLabel(). Params:\nlabel: ${label}\nchain: ${chain}\nweb3Wrapper: ${web3Wrapper}\ngetLogicContract: ${getLogicContract}.\n${err}`);
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
                    throw new Error(`Error running getLogicContractAddressOnChain(). Params:\naddress: ${address}\nmemSlot: ${memSlot}\n.\n${err}`);
                }
            }),
            getContractObject: (abi, contractAddress, web3Wrapper) => {
                try {
                    const contract = new web3Wrapper.eth.Contract(abi, contractAddress);
                    return contract;
                }
                catch (err) {
                    throw new Error(`Error running getContractObject(). Params:\nabi: ${abi}\ncontractAddress: ${contractAddress}\nweb3Wrapper: ${web3Wrapper}.\n${err}`);
                }
            },
            getBTSCoreProxyContractObject: (chain, web3Wrapper) => {
                return this.lib.getContractObjectByLabel("BTSCore", chain, web3Wrapper, false);
            },
            getBTSCoreLogicContractObject: (chain, web3Wrapper) => {
                return this.lib.getContractObjectByLabel("BTSCore", chain, web3Wrapper, true);
            }
        };
        this.signTx = (useWeb = false, from, pk, methodName, contractAddress, contractObject, web3Wrapper, amount = null, gas = null, queryMethod = null, nonce = null, ...rest) => __awaiter(this, void 0, void 0, function* () {
            let encodedData = null;
            const contractMethod = contractObject.methods[methodName];
            if (rest.length === 0) {
                encodedData = contractMethod().encodeABI();
            }
            else {
                encodedData = contractMethod(...rest).encodeABI();
            }
            const parsedGas = gas === null ? 2000000 : gas;
            const tx = {
                from: from,
                to: contractAddress,
                gas: this.sdkUtils.decimalToHex(parsedGas),
                data: encodedData
            };
            if (nonce > 1) {
                tx["nonce"] = nonce;
            }
            if (amount != null) {
                tx["value"] = this.sdkUtils.decimalToHex(Number(web3Wrapper.utils.toWei(amount, "ether")));
            }
            if (useWeb === true) {
                return tx;
            }
            const signedTx = yield web3Wrapper.eth.accounts.signTransaction(tx, pk);
            let contractMethodCallResponse = null;
            if (queryMethod == null) {
                contractMethodCallResponse = yield web3Wrapper.eth
                    .sendSignedTransaction(signedTx.rawTransaction);
            }
            else {
                const contractMethodCallResponseRaw = yield this.sdkUtils
                    .makeEthSendRawTransactionQuery(this.params.bscProvider.hostname, signedTx.rawTransaction, queryMethod);
                if (contractMethodCallResponseRaw.error != null) {
                    throw new Error(JSON.stringify(contractMethodCallResponseRaw));
                }
                contractMethodCallResponse = contractMethodCallResponseRaw;
            }
            return contractMethodCallResponse;
        });
        this.params = this.sdkUtils.getSDKParams(inputParams);
        __classPrivateFieldSet(this, _IconBridgeSDK_bscWeb3Private, new web3_1.default(this.params.bscProvider.hostname), "f");
        this.bscWeb3 = {
            eth: {
                Contract: __classPrivateFieldGet(this, _IconBridgeSDK_bscWeb3Private, "f").eth.Contract,
                accounts: __classPrivateFieldGet(this, _IconBridgeSDK_bscWeb3Private, "f").eth.accounts,
                abi: __classPrivateFieldGet(this, _IconBridgeSDK_bscWeb3Private, "f").eth.abi,
                getBalance: __classPrivateFieldGet(this, _IconBridgeSDK_bscWeb3Private, "f").eth.getBalance,
                getTransaction: __classPrivateFieldGet(this, _IconBridgeSDK_bscWeb3Private, "f").eth.getTransaction,
                sendSignedTransaction: __classPrivateFieldGet(this, _IconBridgeSDK_bscWeb3Private, "f").eth.sendSignedTransaction,
                signTransaction: __classPrivateFieldGet(this, _IconBridgeSDK_bscWeb3Private, "f").eth.signTransaction,
                sendTransaction: __classPrivateFieldGet(this, _IconBridgeSDK_bscWeb3Private, "f").eth.sendTransaction,
                sign: __classPrivateFieldGet(this, _IconBridgeSDK_bscWeb3Private, "f").eth.sign,
                call: __classPrivateFieldGet(this, _IconBridgeSDK_bscWeb3Private, "f").eth.call,
                getTransactionCount: __classPrivateFieldGet(this, _IconBridgeSDK_bscWeb3Private, "f").eth.getTransactionCount
            },
            utils: {
                fromWei: __classPrivateFieldGet(this, _IconBridgeSDK_bscWeb3Private, "f").utils.fromWei,
                toWei: __classPrivateFieldGet(this, _IconBridgeSDK_bscWeb3Private, "f").utils.toWei
            }
        };
    }
}
_IconBridgeSDK_bscWeb3Private = new WeakMap();
module.exports = IconBridgeSDK;
//# sourceMappingURL=icon-bridge-sdk.js.map