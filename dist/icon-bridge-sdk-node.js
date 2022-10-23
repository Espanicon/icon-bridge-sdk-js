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
var _IconBridgeSDKNode_transferNativeCoin;
const IconBridgeSDK = require("./icon-bridge-sdk");
const EspaniconSDKNode = require("@espanicon/espanicon-sdk");
const utils_1 = __importDefault(require("./utils/utils"));
class IconBridgeSDKNode extends IconBridgeSDK {
    constructor(inputParams = utils_1.default.defaultSDKParams) {
        super(inputParams);
        _IconBridgeSDKNode_transferNativeCoin.set(this, (amount, from, to, privateKey, toChain, fromChain, web3Wrapper) => __awaiter(this, void 0, void 0, function* () {
            try {
                const isMainnet = this.params.useMainnet == null
                    ? true
                    : this.params.useMainnet;
                const contract = this.getBTSCoreLogicContractObject(fromChain, web3Wrapper);
                const btpAddress = this.sdkUtils.getBTPAddress(to, toChain, isMainnet);
                const proxyAddress = this.getBTSCoreProxyContractAddress("bsc", isMainnet);
                const query = contract.methods.transferNativeCoin(btpAddress);
                const tx = {
                    from: from,
                    to: proxyAddress,
                    gas: 2000000,
                    data: query.encodeABI(),
                    value: web3Wrapper.utils.toWei(amount, "ether")
                };
                const signedTx = yield web3Wrapper.eth.accounts.signTransaction(tx, privateKey);
                const receipt = yield web3Wrapper.eth.sendSignedTransaction(signedTx.rawTransaction);
                return receipt.transactionHash;
            }
            catch (err) {
                throw new Error(`Error running #transferNativeCoin.\n${err}`);
            }
        }));
        this.iconWeb3 = new EspaniconSDKNode(this.params.iconProvider.hostname, this.params.iconProvider.nid);
        this.bsc = Object.assign(Object.assign({}, this.bsc), { transferNativeCoin: (amount, from, to, privateKey, toChain) => __awaiter(this, void 0, void 0, function* () {
                return yield __classPrivateFieldGet(this, _IconBridgeSDKNode_transferNativeCoin, "f").call(this, amount, from, to, privateKey, toChain, "bsc", this.bscWeb3);
            }) });
    }
}
_IconBridgeSDKNode_transferNativeCoin = new WeakMap();
module.exports = IconBridgeSDKNode;
//# sourceMappingURL=icon-bridge-sdk-node.js.map