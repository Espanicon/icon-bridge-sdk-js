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
console.log(IconBridgeSDK);
const sdk = new IconBridgeSDK({ isMainnet: false });
function runAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        // Test 1: fetch logic contract of a proxy contract (BTSCore) on the
        // BSC Testnet
        const BTSCoreProxyContract = sdk.utils.contracts.bsc.testnet.BTSCore.address;
        const logicContract = yield sdk.bsc.getLogicContract(BTSCoreProxyContract);
        console.log("proxy contract");
        console.log(BTSCoreProxyContract);
        console.log("logic contract");
        console.log(logicContract);
    });
}
runAsync();
