var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const IconBridgeSDK = require("../../dist/icon-bridge-sdk-node");
const sdkMainnet = new IconBridgeSDK();
const sdkTestnet = new IconBridgeSDK({ useMainnet: false });
function runAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        // Test 1: fetch logic contract of a proxy contract (BTSCore) on the
        // BSC Mainnet
        const a = sdkMainnet.utils.contracts.bsc.mainnet.BTSCore.address;
        const b = yield sdkMainnet.bsc.getLogicContract(a);
        console.log("testing mainnet");
        console.log("proxy contract");
        console.log(a);
        console.log("logic contract");
        console.log(b);
        // Test 1: fetch logic contract of a proxy contract (BTSCore) on the
        // BSC Testnet
        const a1 = sdkTestnet.utils.contracts.bsc.testnet.BTSCore.address;
        const b1 = yield sdkTestnet.bsc.getLogicContract(a1);
        console.log("testing testnet");
        console.log("proxy contract");
        console.log(a1);
        console.log("logic contract");
        console.log(b1);
    });
}
runAsync();
