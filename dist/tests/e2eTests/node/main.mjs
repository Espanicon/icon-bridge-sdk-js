var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import sdkReadonlyTests from "./icon-bridge-sdk-readonly.test.js";
import sdkNonReadonlyTests from "./icon-bridge-sdk-non-readonly.test.js";
import iconBridgeSDKWebTests from "./icon-bridge-sdk-web.test.mjs";
function runTests() {
    return __awaiter(this, void 0, void 0, function* () {
        const foo = [sdkReadonlyTests, iconBridgeSDKWebTests, sdkNonReadonlyTests];
        console.log('#disregard this log', foo.length);
        console.log('Test Module: Running tests on readonly methods.');
        yield sdkReadonlyTests();
        console.log('Test Module: Running tests on non-readonly methods.');
        yield sdkNonReadonlyTests();
    });
}
runTests();
//# sourceMappingURL=main.mjs.map