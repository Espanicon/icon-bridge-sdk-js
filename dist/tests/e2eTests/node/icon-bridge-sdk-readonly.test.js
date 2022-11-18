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
const icon_bridge_sdk_node_1 = __importDefault(require("../../../icon-bridge-sdk-node"));
const testUtils_1 = __importDefault(require("../testUtils"));
const sdkTestnet = new icon_bridge_sdk_node_1.default({
    useMainnet: false,
    bscProvider: { hostname: "https://data-seed-prebsc-2-s1.binance.org:8545" }
});
function iconBridgeSDKTests() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(testUtils_1.default.lineBreak.a);
        console.log("Testing iconBridge methods for the BSC network. Readonly Methods.");
        console.log(testUtils_1.default.lineBreak.b);
        console.log(`Test 1: iconBridgeSDK.bsc.methods.balanceOf(_owner: string, _coinName: string)`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.bsc.methods.balanceOf, true, "0x4DeD312eB774B9828665448C55Faa8AE15353E56", "btp-0x2.icon-bnUSD");
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
        console.log(`Test 11: iconBridgeSDK.icon.methods.balanceOf(_coinName: string)`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.icon.methods.balanceOf, true, "hx0169e03001a3fa4012092ad4a4ddf2d07681f063", "btp-0x2.icon-bnUSD");
        console.log(`Test 12: iconBridgeSDK.icon.methods.name()`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.icon.methods.name, true);
        console.log(`Test 13: iconBridgeSDK.icon.methods.feeRatio(_name)`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.icon.methods.feeRatio, true, "btp-0x2.icon-bnUSD");
        console.log(`Test 14: iconBridgeSDK.icon.methods.getTokenLimit(_name)`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.icon.methods.getTokenLimit, true, "btp-0x2.icon-bnUSD");
        console.log(`Test 15: iconBridgeSDK.icon.methods.getTokenLimitTxn(_sn)`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.icon.methods.getTokenLimitTxn, true, "0x63");
        console.log(`Test 16: iconBridgeSDK.icon.methods.getSn()`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.icon.methods.getSn, true);
        console.log(`Test 17: iconBridgeSDK.icon.methods.isUserBlackListed(_net, _address)`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.icon.methods.isUserBlackListed, true, "icon", "hx0169e03001a3fa4012092ad4a4ddf2d07681f063");
        console.log(`Test 18: iconBridgeSDK.icon.methods.getBlackListedUsers(_net, _start, _end)`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.icon.methods.getBlackListedUsers, true, "icon", "0x0", "0x1");
        console.log(`Test 19: iconBridgeSDK.icon.methods.getRegisteredTokensCount()`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.icon.methods.getRegisteredTokensCount, true);
        console.log(`Test 20: iconBridgeSDK.icon.methods.tokenLimitStatus(_net, _coinName)`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.icon.methods.tokenLimitStatus, true, "icon", "btp-0x2.icon-bnUSD");
        console.log(`Test 21: iconBridgeSDK.icon.methods.coinNames()`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.icon.methods.coinNames, true);
        console.log(`Test 22: iconBridgeSDK.icon.methods.coinId(_coinName)`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.icon.methods.coinId, true, "btp-0x2.icon-bnUSD");
        console.log(`Test 23: iconBridgeSDK.icon.methods.balanceOfBatch(_owner, _coinNames)`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.icon.methods.balanceOfBatch, true, "hx0169e03001a3fa4012092ad4a4ddf2d07681f063", ["btp-0x2.icon-bnUSD"]);
        console.log(`Test 24: iconBridgeSDK.icon.methods.getAccumulatedFees()`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.icon.methods.getAccumulatedFees, true);
        console.log(`Test 25: iconBridgeSDK.icon.methods.getTransaction(_sn)`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.icon.methods.getTransaction, true, "0x63");
        console.log(`Test 26: iconBridgeSDK.icon.methods.getOwners()`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.icon.methods.getOwners, true);
        console.log(`Test 27: iconBridgeSDK.icon.methods.isOwner(_addr)`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.icon.methods.isOwner, true, "hx0169e03001a3fa4012092ad4a4ddf2d07681f063");
        console.log(`Test 28: iconBridgeSDK.icon.methods.isRestrictionEnabled()`);
        yield testUtils_1.default.runTestOnMethod(sdkTestnet.icon.methods.isRestrictionEnabled, true);
    });
}
module.exports = iconBridgeSDKTests;
//# sourceMappingURL=icon-bridge-sdk-readonly.test.js.map