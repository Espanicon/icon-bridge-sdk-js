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
const lineBreak = {
    a: "|---------------------------------------------|",
    b: "|=========================|"
};
const methodsName = {
    general: [
        "balanceOf",
        "balanceOfBatch",
        "coinId",
        "coinNames",
        "feeRatio",
        "getAccumulatedFees",
        "getNativeCoinName",
        "getOwners",
        "isOwner",
        "isValidCoin",
        "addOwner",
        "handleResponseService",
        "initialize",
        "mint",
        "reclaim",
        "refund",
        "register",
        "removeOwner",
        "setFeeRatio",
        "transfer",
        "transferBatch",
        "transferFees",
        "transferNativeCoin"
    ],
    bsc: ["updateBTSPeriphery"],
    icon: [
        "setTokenLimit",
        "getTokenLimit",
        "getTokenLimitTxn",
        "getSn",
        "addBlacklistAddress",
        "removeBlacklistAddress",
        "isUserBlackListed",
        "getBlackListedUsersCount",
        "blackListedUsersCount",
        "getRegisteredTokensCount",
        "tokenLimitStatus",
        "tokenFallback",
        "getTransaction",
        "handleBTPMessage",
        "handleBTPError",
        "handleFeeGathering",
        "addRestrictions",
        "disableRestrictions",
        "isRestrictionEnabled"
    ]
};
function runTestOnMethod(methodCallback, ...rest) {
    return __awaiter(this, void 0, void 0, function* () {
        let testQuery = null;
        if (rest.length === 0) {
            testQuery = yield methodCallback();
        }
        else {
            testQuery = yield methodCallback(...rest);
        }
        console.log("Result:");
        console.log(testQuery);
        console.log(lineBreak.a);
    });
}
const testUtils = { lineBreak, methodsName, runTestOnMethod };
module.exports = testUtils;
//# sourceMappingURL=testUtils.js.map