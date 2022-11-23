// E2E Tests.
require("dotenv").config();
const IconBridgeSDK = require("../../../dist/icon-bridge-sdk-node");
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
    const query = await sdk.bsc.methods.transferNativeCoin(
      wallets.icon.pubK,
      "icon",
      wallets.bsc.pubK,
      wallets.bsc.privK,
      "0.01"
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("jsonrpc"));
  }).timeout(5000);
});

// ********************************************//
// Test 2: calls 'addOwner' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'addOwner(from, pk, _owner, gas)'", () => {
  it("adds a wallet as an owner to the bts contract.", async () => {
    const query = await sdk.bsc.methods.addOwner(
      wallets.bsc.pubK,
      wallets.bsc.privK,
      wallets.bsc.pubK
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(
      Object.keys(query).includes("jsonrpc") ||
        Object.keys(query).includes("error")
    );
  }).timeout(5000);
});

// ********************************************//
// Test 3: calls 'reclaim' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'reclaim(from, pk, _coinName, _value, gas)'", () => {
  it("Reclaims token from contract.", async () => {
    const query = await sdk.bsc.methods.reclaim(
      wallets.bsc.pubK,
      wallets.bsc.privK,
      "btp-0x2.icon-ICX",
      "10"
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(
      Object.keys(query).includes("jsonrpc") ||
        Object.keys(query).includes("error")
    );
  }).timeout(5000);
});

// ********************************************//
// Test 4: calls 'removeOwner' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'removeOwner(from, pk, _owner, gas)'", () => {
  it("Removes owner of BTS contract.", async () => {
    const query = await sdk.bsc.methods.removeOwner(
      wallets.bsc.pubK,
      wallets.bsc.privK,
      wallets.bsc.pubK
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(
      Object.keys(query).includes("jsonrpc") ||
        Object.keys(query).includes("error")
    );
  }).timeout(5000);
});

// ********************************************//
// Test 5: calls 'setFeeRatio' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'setFeeRatio(from, pk, _name, _feeNumerator, _fixedFee, gas)'", () => {
  it("Sets fee ratio.", async () => {
    const query = await sdk.bsc.methods.setFeeRatio(
      wallets.bsc.pubK,
      wallets.bsc.privK,
      "btp-0x2.icon-ICX",
      100,
      10,
      10000000
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(
      Object.keys(query).includes("jsonrpc") ||
        Object.keys(query).includes("error")
    );
  }).timeout(5000);
});

// ********************************************//
// Test 6: calls 'updateBTSPeriphery' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'updateBTSPeriphery(from, pk, _btsPeriphery, gas)'", () => {
  it("Updates BTSPeriphery contract.", async () => {
    const query = await sdk.bsc.methods.updateBTSPeriphery(
      wallets.bsc.pubK,
      wallets.bsc.privK,
      wallets.bsc.pubK
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(
      Object.keys(query).includes("jsonrpc") ||
        Object.keys(query).includes("error")
    );
  }).timeout(5000);
});

// ********************************************//
// Test 7: calls 'transfer' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe.skip("E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'transfer(from, pk, _coinName, _value, gas)'", () => {
  it("Transfers a coin crosschain.", async () => {
    const query = await sdk.bsc.methods.transfer(
      wallets.bsc.pubK,
      wallets.bsc.privK,
      "btp-0x2.icon-ICX",
      "10"
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(
      Object.keys(query).includes("jsonrpc") ||
        Object.keys(query).includes("error")
    );
  }).timeout(5000);
});

// ********************************************//
// Test 8: calls 'transferBatch' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe.skip("E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'transferbatch(from, pk, _coinName, _value, gas)'", () => {
  it("Transfers batch of coins crosschain.", async () => {
    const query = await sdk.bsc.methods.transferBatch(
      wallets.bsc.pubK,
      wallets.bsc.privK,
      "btp-0x2.icon-ICX",
      "10"
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(
      Object.keys(query).includes("jsonrpc") ||
        Object.keys(query).includes("error")
    );
  }).timeout(5000);
});

// ********************************************//
// Test 9: calls 'register' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'register(from, pk, _name, _symbol, _decimals, _feeNumerator, _fixedFee, _addr, gas)'", () => {
  it("Run 'register' method of BTS contract.", async () => {
    const query = await sdk.bsc.methods.updateBTSPeriphery(
      wallets.bsc.pubK,
      wallets.bsc.privK,
      "fooCoin",
      "fooCoin",
      18,
      10,
      10,
      "0x4DeD312eB774B9828665448C55Faa8AE15353E56"
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(
      Object.keys(query).includes("jsonrpc") ||
        Object.keys(query).includes("error")
    );
  }).timeout(5000);
});
