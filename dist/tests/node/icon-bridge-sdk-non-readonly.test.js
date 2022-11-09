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
require("dotenv").config();
const sdk = require("../../icon-bridge-sdk-node");
const testUtils = require("../testUtils");
const lib = new sdk({ useMainnet: false });
const wallets = {
    icon: {
        a: {
            pubK: process.env.WALLET_ICON_ADDRESS,
            privK: process.env.WALLET_ICON_PK
        }
    },
    bsc: {
        a: {
            pubK: process.env.WALLET_BSC_ADDRESS,
            privK: process.env.WALLET_BSC_PK
        }
    }
};
function iconBridgeSDKNodeTests() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(testUtils.lineBreak.a);
        console.log("Testing iconBridge methods for the BSC network. Non readonly Methods.");
        console.log(testUtils.lineBreak.b);
        console.log("Test 1: iconBridgeSDK.bsc.methods.transferNativeCoin(targetAddress, targetChain, from, pk, amount, gas)");
        yield testUtils.runTestOnMethod(lib.bsc.methods.transferNativeCoin, false, wallets.icon.a.pubK, "icon", wallets.bsc.a.pubK, wallets.bsc.a.privK, "0.01");
        console.log("Test 1: iconBridgeSDK.bsc.methods.transfer(targetAddress, targetChain, from, pk, _coinName, _value, gas)");
        yield testUtils.runTestOnMethod(lib.bsc.methods.transfer, true, wallets.icon.a.pubK, "icon", wallets.bsc.a.pubK, wallets.bsc.a.privK, "btp-0x2.icon-ICX", "10", 10000000);
    });
}
module.exports = iconBridgeSDKNodeTests;
//# sourceMappingURL=icon-bridge-sdk-non-readonly.test.js.map