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

async function runTestOnMethod(
  methodCallback: any,
  bypass: boolean,
  ...rest: any[]
): Promise<void> {
  let testQuery = null;
  if (bypass === true) {
    testQuery = "Test bypassed";
  } else {
    if (rest.length === 0) {
      testQuery = await methodCallback();
    } else {
      testQuery = await methodCallback(...rest);
    }
  }

  console.log("Result:");
  console.log(testQuery);
  console.log(lineBreak.a);
}

const testUtils = { lineBreak, methodsName, runTestOnMethod };
export = testUtils;
