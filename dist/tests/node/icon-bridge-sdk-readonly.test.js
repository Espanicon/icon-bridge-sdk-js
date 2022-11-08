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
const icon_bridge_sdk_node_1 = __importDefault(require("../../icon-bridge-sdk-node"));
const testUtils_1 = __importDefault(require("../testUtils"));
const sdkTestnet = new icon_bridge_sdk_node_1.default({ useMainnet: false });
const testSummary = {
    bsc: {
        [testUtils_1.default.methodsName.general[0]]: "done",
        [testUtils_1.default.methodsName.general[1]]: "done",
        [testUtils_1.default.methodsName.general[2]]: "done",
        [testUtils_1.default.methodsName.general[3]]: "done",
        [testUtils_1.default.methodsName.general[4]]: "done",
        [testUtils_1.default.methodsName.general[5]]: "done",
        [testUtils_1.default.methodsName.general[6]]: "done",
        [testUtils_1.default.methodsName.general[7]]: "done",
        [testUtils_1.default.methodsName.general[8]]: "done",
        [testUtils_1.default.methodsName.general[9]]: "done"
    }
};
function iconBridgeSDKTests() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(testUtils_1.default.lineBreak.a);
        console.log("Testing iconBridge methods for the BSC network. Readonly Methods.");
        console.log(testUtils_1.default.lineBreak.b);
        console.log(`Test 1: iconBridgeSDK.bsc.methods.balanceOf(_owner: string, _coinName: string)`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.bsc.methods.balanceOf, true, "0x4DeD312eB774B9828665448C55Faa8AE15353E56", "btp-0x2.icon-ICX");
        console.log(`Test 2: iconBridgeSDK.bsc.methods.balanceOfBatch(_owner: string, _coinNames: string[])`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.bsc.methods.balanceOfBatch, true, "0x4DeD312eB774B9828665448C55Faa8AE15353E56", ["btp-0x2.icon-ICX"]);
        console.log(`Test 3: iconBridgeSDK.bsc.methods.coinId(_coinName: string)`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.bsc.methods.coinId, true, "btp-0x2.icon-ICX");
        console.log(`Test 4: iconBridgeSDK.bsc.methods.coinNames()`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.bsc.methods.coinNames, true);
        console.log(`Test 5: iconBridgeSDK.bsc.methods.feeRatio(_coinName: string)`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.bsc.methods.feeRatio, true, "btp-0x2.icon-ICX");
        console.log(`Test 6: iconBridgeSDK.bsc.methods.getAccumulatedFees()`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.bsc.methods.getAccumulatedFees, true);
        console.log(`Test 7: iconBridgeSDK.bsc.methods.getNativeCoinName()`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.bsc.methods.getNativeCoinName, true);
        console.log(`Test 8: iconBridgeSDK.bsc.methods.getOwners()`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.bsc.methods.getOwners, true);
        console.log(`Test 9: iconBridgeSDK.bsc.methods.isOwner(_isOwner: string)`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.bsc.methods.isOwner, true, "0x4DeD312eB774B9828665448C55Faa8AE15353E56");
        console.log(`Test 10: iconBridgeSDK.bsc.methods.isValidCoin(_coinName: string)`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.bsc.methods.isValidCoin, true, "btp-0x2.icon-ICX");
        console.log("Test summary:");
        console.log(testSummary);
        console.log(testUtils_1.default.lineBreak.a);
    });
}
module.exports = iconBridgeSDKTests;
//# sourceMappingURL=icon-bridge-sdk-readonly.test.js.map