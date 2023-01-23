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

const contracts = sdk.sdkUtils.contracts.bsc.testnet;
const labels = sdk.sdkUtils.labels;
// const nativeIconToken = contracts[labels.sicx].address;
const nativeIconCoin = contracts[labels.icx].address;
// ********************************************//
// Test 1: calls 'transferNativeCoin' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("Test 1: E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'transferNativeCoin(targetAddress, targetChain, from, pk, amount, gas)'", () => {
  it("Transfers native coin from BSC to another chain.", async () => {
    // sleep for 5 seconds
    await sdk.sdkUtils.sleep(10000);

    const query = await sdk.bsc.methods.transferNativeCoin(
      wallets.icon.pubK,
      "icon",
      wallets.bsc.pubK,
      wallets.bsc.privK,
      "0.01"
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("jsonrpc"));
  }).timeout(40000);
});

// ********************************************//
// Test 2: calls 'addOwner' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
// describe("E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'addOwner(from, pk, _owner, gas)'", () => {
//   it("adds a wallet as an owner to the bts contract.", async () => {
//     // sleep for 5 seconds
//     await sdk.sdkUtils.sleep(10000);

//     const query = await sdk.bsc.methods.addOwner(
//       wallets.bsc.pubK,
//       wallets.bsc.privK,
//       wallets.bsc.pubK
//     );

//     console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
//     assert.ok(
//       Object.keys(query).includes("jsonrpc") ||
//         Object.keys(query).includes("error")
//     );
//   }).timeout(40000);
// });

// ********************************************//
// Test 3: calls 'reclaim' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("Test 2: E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'reclaim(from, pk, _coinName, _value, gas)'", () => {
  it("Reclaims token from contract.", async () => {
    // sleep for 5 seconds
    await sdk.sdkUtils.sleep(10000);

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
  }).timeout(40000);
});

// ********************************************//
// Test 4: calls 'register' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("Test 3: E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'register(from, pk, _name, _symbol, _decimals, _feeNumerator, _fixedFee, _addr, gas)'", () => {
  it("Reclaims token from contract.", async () => {
    // sleep for 5 seconds
    await sdk.sdkUtils.sleep(10000);

    const query = await sdk.bsc.methods.register(
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
    assert.ok(
      Object.keys(query).includes("jsonrpc") ||
        Object.keys(query).includes("error")
    );
  }).timeout(40000);
});

// ********************************************//
// Test 5: calls 'removeOwner' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
// describe("E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'removeOwner(from, pk, _owner, gas)'", () => {
//   it("Removes owner of BTS contract.", async () => {
//     // sleep for 5 seconds
//     await sdk.sdkUtils.sleep(10000);

//     const query = await sdk.bsc.methods.removeOwner(
//       wallets.bsc.pubK,
//       wallets.bsc.privK,
//       wallets.bsc.pubK
//     );

//     console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
//     assert.ok(
//       Object.keys(query).includes("jsonrpc") ||
//         Object.keys(query).includes("error")
//     );
//   }).timeout(40000);
// });

// ********************************************//
// Test 6: calls 'setFeeRatio' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("Test 4: E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'setFeeRatio(from, pk, _name, _feeNumerator, _fixedFee, gas)'", () => {
  it("Sets fee ratio.", async () => {
    // sleep for 5 seconds
    await sdk.sdkUtils.sleep(10000);

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
  }).timeout(40000);
});

// ********************************************//
// Test 7: calls 'updateBTSPeriphery' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("Test 5: E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'updateBTSPeriphery(from, pk, _btsPeriphery, gas)'", () => {
  it("Updates BTSPeriphery contract.", async () => {
    // sleep for 5 seconds
    await sdk.sdkUtils.sleep(10000);

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
  }).timeout(40000);
});

// ********************************************//
// Test 9: calls 'transfer' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("Test 6: E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'transfer(from, pk, _coinName, _value, gas)'", () => {
  it("Transfers a coin crosschain.", async () => {
    // sleep for 5 seconds
    await sdk.sdkUtils.sleep(10000);

    const preQuery = await sdk.bsc.methods.approveTransfer(
      wallets.bsc.pubK,
      wallets.bsc.privK,
      "20",
      nativeIconCoin
    );

    let query = {};
    if (preQuery.result != null) {
      await sdk.sdkUtils.sleep(10000);
      query = await sdk.bsc.methods.transfer(
        wallets.icon.pubK,
        "icon",
        wallets.bsc.pubK,
        wallets.bsc.privK,
        "20",
        "btp-0x2.icon-ICX"
      );
    }

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(
      Object.keys(query).includes("jsonrpc") ||
        Object.keys(query).includes("error")
    );
  }).timeout(40000);
});

// ********************************************//
// Test 10: calls 'approveAndTransfer' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("Test 7: E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'approveAndTransfer(targetAddress, targetChain, from, pk, _coinName, _value, tokenContractAddress, tokenContractAbi, gas)'", () => {
  it("Approves and Transfers a coin crosschain.", async () => {
    // sleep for X seconds
    await sdk.sdkUtils.sleep(10000);

    const query = await sdk.bsc.methods.approveAndTransfer(
      wallets.icon.pubK,
      "icon",
      wallets.bsc.pubK,
      wallets.bsc.privK,
      "20",
      "btp-0x2.icon-ICX",
      nativeIconCoin
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(
      Object.keys(query).includes("jsonrpc") ||
        Object.keys(query).includes("error")
    );
  }).timeout(40000);
});

// ********************************************//
// Test 11: calls 'transferBatch' method originating on the BSC chain.
// It should returns and object with a predefined set of keys.
describe("Test 8: E2E testing Icon Bridge SDK. Chain: 'bsc', Method 'transferBatch(targetAddress, targetChain, from, pk, _coinNames, _values, gas)'", () => {
  it("Transfers batch of coins crosschain.", async () => {
    // sleep for 5 seconds
    await sdk.sdkUtils.sleep(10000);

    const preQuery = await sdk.bsc.methods.approveTransfer(
      wallets.bsc.pubK,
      wallets.bsc.privK,
      "20",
      nativeIconCoin
    );

    let query = {};
    if (preQuery.result != null) {
      await sdk.sdkUtils.sleep(10000);
      query = await sdk.bsc.methods.transferBatch(
        wallets.icon.pubK,
        "icon",
        wallets.bsc.pubK,
        wallets.bsc.privK,
        ["50"],
        ["btp-0x2.icon-ICX"]
      );
    }

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(
      Object.keys(query).includes("jsonrpc") ||
        Object.keys(query).includes("error")
    );
  }).timeout(40000);
});
