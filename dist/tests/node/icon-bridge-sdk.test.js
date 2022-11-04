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
        console.log("Running test on sdk.bsc.methods.getLogicContractAddressOnChain()");
        console.log(secondaryBreak);
        const a = sdkMainnet.sdkUtils.contracts.bsc.mainnet.BTSCore.address;
        const b = yield sdkMainnet.bsc.methods.getLogicContractAddressOnChain(a);
        console.log("testing mainnet");
        console.log("proxy contract");
        console.log(a);
        console.log("logic contract");
        console.log(b);
        console.log(secondaryBreak);
        console.log(mainBreak);
        console.log("Running test on sdk.bsc.methods.coinNames()");
        console.log(secondaryBreak);
        const b9 = yield sdkTestnet.bsc.methods.coinNames();
        console.log("testing testnet");
        console.log("BTSCore.coinNames()");
        console.log(b9);
        console.log(secondaryBreak);
        console.log(mainBreak);
        console.log("Running test on sdk.bsc.methods.balanceOf()");
        console.log(secondaryBreak);
        const b10 = yield sdkTestnet.bsc.methods.balanceOf("0x4DeD312eB774B9828665448C55Faa8AE15353E56", "btp-0x2.icon-ICX");
        console.log("testing testnet");
        console.log("BTSCore.balanceOf(_owner, _coinName)");
        console.log(b10);
        console.log(secondaryBreak);
        const b11 = sdkTestnet.bsc.methods.getBTSAbi();
        console.log("testing Testnet");
        console.log("fetched abi:");
        b11.forEach((each, index) => {
            if (each.type === "function") {
                console.log(`index: ${index}`);
                console.log(`name: ${each.name}`);
                console.log(`inputs: ${JSON.stringify(each.inputs)}`);
                console.log("##########");
            }
        });
        console.log(secondaryBreak);
    });
}
module.exports = iconBridgeSDKTests;
//# sourceMappingURL=icon-bridge-sdk.test.js.map