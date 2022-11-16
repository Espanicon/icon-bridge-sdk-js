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
                    const txRequest = yield this.makeTxRequest("transferNativeCoin", { _to: btpAddress }, from, btsContract, pk, amount, stepLimit);
                    return txRequest;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferNativeCoin(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\namount: ${amount}\nstepLimit: ${stepLimit}\n`);
                    return { error: errorResult.toString() };
                }
            })
        };
        this.makeTxRequest = (method, params, from, to, pk, value = 0, stepLimit = null, nid = this.params.iconProvider.nid) => __awaiter(this, void 0, void 0, function* () {
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
                    .method(method)
                    .params(params);
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