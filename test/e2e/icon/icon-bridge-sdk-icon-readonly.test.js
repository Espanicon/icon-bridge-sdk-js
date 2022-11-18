// E2E Tests.
require("dotenv").config();
const IconBridgeSDK = require("../../../dist/icon-bridge-sdk-node");
const assert = require("assert");

// Icon Bridge SDK
const sdk = new IconBridgeSDK({
  useMainnet: false
});

// test wallets
const wallets = {
  icon: process.env.WALLET_ICON_ADDRESS
};

// Keys that should appear in any response from a readonly call
// originating from the ICON chain.
const genericResultKeys = ["id", "jsonrpc", "result"];

// ********************************************//
// Test 1: calls 'balanceOf' method originating on the Icon chain. It should
// returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'balanceOf(_owner, _coinName)'", () => {
  it("Returns BTP balance of an ICON wallet.", async () => {
    const query = await sdk.icon.methods.balanceOf(
      wallets.icon,
      "btp-0x2.icon-bnUSD"
    );
    // check if the result query has the valid keys
    const result = Object.keys(query).map(key => {
      if (genericResultKeys.includes(key)) {
        return true;
      }
      return false;
    });

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(!result.includes(false));
  }).timeout(5000);
});

// ********************************************//
// Test 2: calls 'balanceOfBatch' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'balanceOfBatch(_owner, _coinNames)'", () => {
  it("Returns BTP balance of an ICON wallet for a set of coins.", async () => {
    const query = await sdk.icon.methods.balanceOfBatch(wallets.icon, [
      "btp-0x2.icon-bnUSD"
    ]);
    // check if the result query has the valid keys
    const result = Object.keys(query).map(key => {
      if (genericResultKeys.includes(key)) {
        return true;
      }
      return false;
    });

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(!result.includes(false));
  }).timeout(5000);
});

// ********************************************//
// Test 3: calls 'coinNames' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.

// ********************************************//
// Test 4: calls 'feeRatio' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.

// ********************************************//
// Test 5: calls 'getAccumulatedFees' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.

// ********************************************//
// Test 6: calls 'getOwners' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.

// ********************************************//
// Test 7: calls 'isOwner' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.

// ********************************************//
// Test 8: calls 'name' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.

// ********************************************//
// Test 9: calls 'getTokenLimit' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.

// ********************************************//
// Test 10: calls 'getTokenLimitTxn' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.

// ********************************************//
// Test 11: calls 'getSn' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.

// ********************************************//
// Test 12: calls 'isUserBlackListed' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.

// ********************************************//
// Test 13: calls 'getBlackListedUsers' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.

// ********************************************//
// Test 14: calls 'getRegisteredTokensCount' method originating on the
// Icon chain.
// It should returns and object with a predefined set of keys.

// ********************************************//
// Test 15: calls 'tokenLimitStatus' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.

// ********************************************//
// Test 16: calls 'blackListedUsersCount' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.

// ********************************************//
// Test 17: calls 'getTransaction' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.

// ********************************************//
// Test 18: calls 'isRestrictionEnabled' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.

// ********************************************//
// Test 19: calls 'coinId' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.

// ********************************************//
// Test 20: calls 'balanceOf' method originating on the Icon chain. with a
// wrongly formatted wallet address, It should returns and object with
// one key named 'error'
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'balanceOf(_owner, _coinName)' with a wrongly formatted wallet address.", () => {
  it("Returns an error object.", async () => {
    const query = await sdk.icon.methods.balanceOf(
      wallets.icon + "a",
      "btp-0x2.icon-bnUSD"
    );
    const result = Object.keys(query);

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(result.includes("error"));
  }).timeout(5000);
});
