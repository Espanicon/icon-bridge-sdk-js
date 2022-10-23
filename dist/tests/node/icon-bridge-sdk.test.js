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
const icon_bridge_sdk_1 = __importDefault(require("../../icon-bridge-sdk"));
const sdkMainnet = new icon_bridge_sdk_1.default();
const sdkTestnet = new icon_bridge_sdk_1.default({ useMainnet: false });
const mainBreak = "==================================";
const secondaryBreak = "######";
function iconBridgeSDKTests() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(mainBreak);
        console.log("Running test on sdk.bsc.getLogicContract()");
        console.log(secondaryBreak);
        const a = sdkMainnet.sdkUtils.contracts.bsc.mainnet.BTSCore.address;
        const b = yield sdkMainnet.bsc.getLogicContract(a);
        console.log("testing mainnet");
        console.log("proxy contract");
        console.log(a);
        console.log("logic contract");
        console.log(b);
        console.log(secondaryBreak);
        const a1 = sdkTestnet.sdkUtils.contracts.bsc.testnet.BTSCore.address;
        const b1 = yield sdkTestnet.bsc.getLogicContract(a1);
        console.log("testing testnet");
        console.log("proxy contract");
        console.log(a1);
        console.log("logic contract");
        console.log(b1);
        console.log(secondaryBreak);
        console.log(mainBreak);
        console.log("Running test on sdk.bsc.getBTSCoreProxyContractObject()");
        console.log(secondaryBreak);
        const b4 = yield sdkMainnet.bsc.getBTSCoreProxyContractObject();
        console.log("testing mainnet");
        console.log("BTSCore proxy contract");
        console.log(b4);
        console.log(secondaryBreak);
        console.log(mainBreak);
        console.log("Running test on sdk.bsc.getBTSCoreProxyContractObject()");
        console.log(secondaryBreak);
        const b7 = yield sdkTestnet.bsc.getBTSCoreProxyContractObject();
        console.log("testing testnet");
        console.log("BTSCore proxy contract");
        console.log(b7);
        console.log(secondaryBreak);
        console.log(mainBreak);
        console.log("Running test on sdk.bsc.getBTSCoreLogicContractObject()");
        console.log(secondaryBreak);
        const b8 = yield sdkTestnet.bsc.getBTSCoreLogicContractObject();
        console.log("testing testnet");
        console.log("BTSCore logic contract");
        console.log(b8);
        console.log(secondaryBreak);
    });
}
module.exports = iconBridgeSDKTests;
//# sourceMappingURL=icon-bridge-sdk.test.js.map