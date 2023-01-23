// E2E Tests.
require("dotenv").config();
const IconBridgeSDK = require("../../../dist/icon-bridge-sdk-node");
const assert = require("assert");

// Icon Bridge SDK
const sdk = new IconBridgeSDK({
  useMainnet: false,
  bscProvider: { hostname: "https://data-seed-prebsc-1-s3.binance.org:8545" }
});

// test wallets
const wallets = {
  bsc: process.env.WALLET_BSC_ADDRESS
};

// ********************************************//
// Test 1: calls 'balanceOf' method originating on the BSC chain. It should
// returns and object with a predefined set of keys.
describe("Test 1: E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'balanceOf(_owner, _coinName)'", () => {
  it("Returns BTP balance of an BSC wallet.", async () => {
    const query = await sdk.bsc.methods.balanceOf(
      wallets.bsc,
      "btp-0x2.icon-bnUSD"
    );
    // check if the result query has the valid keys
    const resultKeys = Object.keys(query);

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(resultKeys.includes("__length__"));
  }).timeout(5000);
});

// ********************************************//
// Test 2: calls 'balanceOfBatch' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("Test 2: E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'balanceOfBatch(_owner, _coinNames)'", () => {
  it("Returns BTP balance of a BSC wallet for a set of coins.", async () => {
    const query = await sdk.bsc.methods.balanceOfBatch(wallets.bsc, [
      "btp-0x2.icon-bnUSD"
    ]);
    // check if the result query has the valid keys
    const resultKeys = Object.keys(query);

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(resultKeys.includes("__length__"));
  }).timeout(5000);
});

// ********************************************//
// Test 3: calls 'coinNames' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("Test 3: E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'coinNames()'", () => {
  it("Returns list of coin names.", async () => {
    const query = await sdk.bsc.methods.coinNames();
    // check if the result query has the valid keys
    const resultKeys = Object.keys(query);

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(resultKeys.includes("__length__"));
  }).timeout(5000);
});

// ********************************************//
// Test 4: calls 'feeRatio' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("Test 4: E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'feeRatio(_coinName)'", () => {
  it("Returns fee ratio for a coin.", async () => {
    const query = await sdk.bsc.methods.feeRatio("btp-0x2.icon-ICX");
    // check if the result query has the valid keys
    const resultKeys = Object.keys(query);

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(resultKeys.includes("__length__"));
  }).timeout(5000);
});

// ********************************************//
// Test 5: calls 'getAccumulatedFees' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("Test 5: E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'getAccumulatedFees()'", () => {
  it("Returns accumulated fees.", async () => {
    const query = await sdk.bsc.methods.getAccumulatedFees();
    // check if the result query has the valid keys
    const resultKeys = Object.keys(query);

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(resultKeys.includes("__length__"));
  }).timeout(5000);
});

// ********************************************//
// Test 6: calls 'coinId' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("Test 6: E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'coinId(_coinName)'", () => {
  it("Returns fee ratio for a coin.", async () => {
    const query = await sdk.bsc.methods.coinId("btp-0x2.icon-ICX");
    // check if the result query has the valid keys
    const resultKeys = Object.keys(query);

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(resultKeys.includes("__length__"));
  }).timeout(5000);
});

// ********************************************//
// Test 7: calls 'getNativeCoinName' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("Test 7: E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'getNativeCoinName()'", () => {
  it("Returns native coin name on the defined chain.", async () => {
    const query = await sdk.bsc.methods.getNativeCoinName();
    // check if the result query has the valid keys
    const resultKeys = Object.keys(query);

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(resultKeys.includes("__length__"));
  }).timeout(5000);
});

// ********************************************//
// Test 8: calls 'getOwners' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
// describe("Test 8: E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'getOwners()'", () => {
//   it("Returns contract owners of BTS contract.", async () => {
//     const query = await sdk.bsc.methods.getOwners();
//     // check if the result query has the valid keys
//     const resultKeys = Object.keys(query);

//     console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
//     assert.ok(resultKeys.includes("__length__"));
//   }).timeout(5000);
// });

// ********************************************//
// Test 9: calls 'isOwner' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
// describe("Test 9: E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'isOwner(_owner)'", () => {
//   it("Returns contract owners of BTS contract.", async () => {
//     const query = await sdk.bsc.methods.isOwner(
//       "0xd5f24a22a9e4029deecbf4dd38ab6be4657fc5b7"
//     );
//     // check if the result query has the valid keys
//     const resultKeys = Object.keys(query);

//     console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
//     assert.ok(resultKeys.includes("__length__"));
//   }).timeout(5000);
// });

// ********************************************//
// Test 10: calls 'isValidCoin' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("Test 10: E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'isValidCoin(_coinName)'", () => {
  it("Returns if coinName is a valid coin.", async () => {
    const query = await sdk.bsc.methods.isValidCoin("btp-0x2.icon-ICX");
    // check if the result query has the valid keys
    const resultKeys = Object.keys(query);

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(resultKeys.includes("__length__"));
  }).timeout(5000);
});
