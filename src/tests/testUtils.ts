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

const testUtils = { lineBreak, methodsName };
export = testUtils;
