// E2E Tests.
require("dotenv").config();
const IconBridgeSDK = require("../../../../dist/icon-bridge-sdk-node");
// const utils = require("../../../dist/utils/utils");
const assert = require("assert");

// Icon Bridge SDK
const sdk = new IconBridgeSDK({
  useMainnet: false,
  bscProvider: { hostname: "https://data-seed-prebsc-1-s3.binance.org:8545" }
});

// test wallets
const wallets = {
  bsc: {
    pubK: process.env.WALLET_BSC_ADDRESS,
    privK: process.env.WALLET_BSC_PK
  },
  icon: {
    pubK: process.env.WALLET_ICON_ADDRESS,
    privK: process.env.WALLET_ICON_PK
  }
};
// ********************************************//
// Test 1: calls 'transferNativeCoin' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'transferNativeCoin(targetAddress, targetChain, from, pk, amount, gas)'", () => {
  it("Transfers native coin from BSC to another chain.", async () => {
    const query = await sdk.bsc.web.transferNativeCoin(
      wallets.icon.pubK,
      "icon",
      wallets.bsc.pubK,
      wallets.bsc.privK,
      "0.01"
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("from"));
  }).timeout(5000);
});

// ********************************************//
// Test 2: calls 'addOwner' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'addOwner(from, pk, _owner, gas)'", () => {
  it("adds a wallet as an owner to the bts contract.", async () => {
    const query = await sdk.bsc.web.addOwner(
      wallets.bsc.pubK,
      wallets.bsc.privK,
      wallets.bsc.pubK
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("from"));
  }).timeout(5000);
});

// ********************************************//
// Test 3: calls 'reclaim' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'reclaim(from, pk, _coinName, _value, gas)'", () => {
  it("Reclaims token from contract.", async () => {
    const query = await sdk.bsc.web.reclaim(
      wallets.bsc.pubK,
      wallets.bsc.privK,
      "btp-0x2.icon-ICX",
      "10"
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("from"));
  }).timeout(5000);
});

// ********************************************//
// Test 4: calls 'register' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'register(from, pk, _name, _symbol, _decimals, _feeNumerator, _fixedFee, _addr, gas)'", () => {
  it("Reclaims token from contract.", async () => {
    const query = await sdk.bsc.web.register(
      wallets.bsc.pubK,
      wallets.bsc.privK,
      "btp-0x61.bsc-WBNB",
      "BNB",
      "0x12",
      "0x0",
      "0x2aa1efb94e000",
      "0x7d8c52A23FD7e3ca1342797baE7caF6d7b8036BA"
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("from"));
  }).timeout(5000);
});

// ********************************************//
// Test 5: calls 'removeOwner' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'removeOwner(from, pk, _owner, gas)'", () => {
  it("Removes owner of BTS contract.", async () => {
    const query = await sdk.bsc.web.removeOwner(
      wallets.bsc.pubK,
      wallets.bsc.privK,
      wallets.bsc.pubK
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("from"));
  }).timeout(5000);
});

// ********************************************//
// Test 6: calls 'setFeeRatio' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'setFeeRatio(from, pk, _name, _feeNumerator, _fixedFee, gas)'", () => {
  it("Sets fee ratio.", async () => {
    const query = await sdk.bsc.web.setFeeRatio(
      wallets.bsc.pubK,
      wallets.bsc.privK,
      "btp-0x2.icon-ICX",
      100,
      10,
      10000000
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("from"));
  }).timeout(5000);
});

// ********************************************//
// Test 7: calls 'updateBTSPeriphery' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'updateBTSPeriphery(from, pk, _btsPeriphery, gas)'", () => {
  it("Updates BTSPeriphery contract.", async () => {
    const query = await sdk.bsc.web.updateBTSPeriphery(
      wallets.bsc.pubK,
      wallets.bsc.privK,
      wallets.bsc.pubK
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("from"));
  }).timeout(5000);
});

// ********************************************//
// Test 11: calls 'transferBatch' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'transferBatch(targetAddress, targetChain, from, pk, _coinNames, _values, gas)'", () => {
  it("Transfers batch of coins crosschain.", async () => {
    const query = await sdk.bsc.web.transferBatch(
      wallets.icon.pubK,
      "icon",
      wallets.bsc.pubK,
      wallets.bsc.privK,
      ["50"],
      ["btp-0x2.icon-ICX"]
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("from"));
  }).timeout(5000);
});

// ********************************************//
// Test 11: calls 'transfer' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'transfer(targetAddress, targetChain, from, pk, _coinName, _value, gas)'", () => {
  it("Transfers batch of coins crosschain.", async () => {
    const query = await sdk.bsc.web.transfer(
      wallets.icon.pubK,
      "icon",
      wallets.bsc.pubK,
      wallets.bsc.privK,
      "50",
      "btp-0x2.icon-ICX"
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("from"));
  }).timeout(5000);
});
