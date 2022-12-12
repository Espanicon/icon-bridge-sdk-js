// E2E Tests.
require("dotenv").config();
const IconBridgeSDK = require("../../../../dist/icon-bridge-sdk-node");
const assert = require("assert");

// Icon Bridge SDK
const sdk = new IconBridgeSDK({
  useMainnet: false
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
// Test 1: calls 'transferNativeCoin' method originating on the ICON chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'transferNativeCoin(targetAddress, targetChain, from, pk, amount, stepLimit)'", () => {
  it("Transfers native coin from ICON to another chain.", async () => {
    const query = await sdk.icon.web.transferNativeCoin(
      wallets.bsc.pubK,
      "bsc",
      wallets.icon.pubK,
      wallets.icon.privK,
      "50"
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("from"));
  }).timeout(5000);
});

// ********************************************//
// Test 2: calls 'transferToBTSContract' method originating on the ICON chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'transferToBTSContract(_value, tokenContract, from, pk, stepLimit)'", () => {
  it("Transfers native coin from ICON to another chain.", async () => {
    const query = await sdk.icon.web.transferToBTSContract(
      "50",
      "cxcadcaf77d8e46089fd3d98fcf71eabee1700f148",
      wallets.icon.pubK,
      wallets.icon.privK
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("from"));
  }).timeout(5000);
});

// ********************************************//
// Test 3: calls 'transfer' method originating on the ICON chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'transfer(_coinName, _value, _to, from, pk, stepLimit)'", () => {
  it("Transfers native coin from ICON to another chain.", async () => {
    const query = await sdk.icon.web.transfer(
      "btp-0x2.icon-bnUSD",
      "50",
      `btp://0x61.bsc/${wallets.bsc.pubK}`,
      wallets.icon.pubK,
      wallets.icon.privK
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("from"));
  }).timeout(5000);
});

// ********************************************//
// Test 4: calls 'transferBatch' method originating on the ICON chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'transferBatch(_coinNames, _values, _to, from, pk, stepLimit)'", () => {
  it("Transfers native coin from ICON to another chain.", async () => {
    const query = await sdk.icon.web.transfer(
      ["btp-0x2.icon-bnUSD"],
      ["50"],
      `btp://0x61.bsc/${wallets.bsc.pubK}`,
      wallets.icon.pubK,
      wallets.icon.privK
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("from"));
  }).timeout(5000);
});

// ********************************************//
// Test 5: calls 'approveBTSContract' method originating on the ICON chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'approveBTSContract(amount, tokenContract, from, pk, stepLimit)'", () => {
  it("Approves transfers of coin from ICON to another chain.", async () => {
    const query = await sdk.icon.web.approveBTSContract(
      "0.1",
      "cx55b835590d43af7bf6f5be3c3d50982264d24e5d",
      wallets.icon.pubK,
      wallets.icon.privK
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("from"));
  }).timeout(5000);
});

// ********************************************//
// Test 6: calls 'reclaim' method originating on the ICON chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'reclaim(_coinName, _value, from, pk, stepLimit)'", () => {
  it("Makes call on 'reclaim' method.", async () => {
    const query = await sdk.icon.web.reclaim(
      "btp-0x61.bsc-BNB",
      "0.1",
      wallets.icon.pubK,
      wallets.icon.privK
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("from"));
  }).timeout(5000);
});

// ********************************************//
// Test 7: calls 'addOwner' method originating on the ICON chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'addOwner(_addr, from, pk, stepLimit)'", () => {
  it("Makes call on 'addOwner' method.", async () => {
    const query = await sdk.icon.web.addOwner(
      wallets.icon.pubK,
      wallets.icon.pubK,
      wallets.icon.privK
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("from"));
  }).timeout(5000);
});

// ********************************************//
// Test 8: calls 'removeOwner' method originating on the ICON chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'removeOwner(_addr, from, pk, stepLimit)'", () => {
  it("Makes call on 'removeOwner' method.", async () => {
    const query = await sdk.icon.web.removeOwner(
      wallets.icon.pubK,
      wallets.icon.pubK,
      wallets.icon.privK
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("from"));
  }).timeout(5000);
});

// ********************************************//
// Test 9: calls 'register' method originating on the ICON chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'register(_name,_symbol, _decimals, _feeNumerator, _fixedFee,  from, pk, stepLimit)'", () => {
  it("Makes call on 'register' method.", async () => {
    const query = await sdk.icon.web.register(
      "btp-0x61.bsc-WBNB",
      "BNB",
      "0x12",
      "0x0",
      "0x2aa1efb94e000",
      wallets.icon.pubK,
      wallets.icon.privK
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("from"));
  }).timeout(5000);
});

// ********************************************//
// Test 10: calls 'setFeeRatio' method originating on the ICON chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'setFeeRatio(_name, _feeNumerator, _fixedFee,  from, pk, stepLimit)'", () => {
  it("Makes call on 'setFeeRatio' method.", async () => {
    const query = await sdk.icon.web.setFeeRatio(
      "btp-0x61.bsc-WBNB",
      "0x0",
      "0x2aa1efb94e000",
      wallets.icon.pubK,
      wallets.icon.privK
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("from"));
  }).timeout(5000);
});

// ********************************************//
// Test 11: calls 'removeBlacklistAddress' method originating on
// the ICON chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'removeBlacklistAddress(_net, _addresses, from, pk, stepLimit)'", () => {
  it("Makes call on 'removeBlacklistAddress' method.", async () => {
    const query = await sdk.icon.web.removeBlacklistAddress(
      "0x61.bsc",
      [wallets.icon.pubK],
      wallets.icon.pubK,
      wallets.icon.privK
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("from"));
  }).timeout(5000);
});

// ********************************************//
// Test 12: calls 'setTokenLimit' method originating on
// the ICON chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'setTokenLimit(_coinNames, _tokenLimits, from, pk, stepLimit)'", () => {
  it("Makes call on 'setTokenLimit' method.", async () => {
    const query = await sdk.icon.web.setTokenLimit(
      ["btp-0x61.bsc-WBNB"],
      ["0x0"],
      wallets.icon.pubK,
      wallets.icon.privK
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("from"));
  }).timeout(5000);
});

// ********************************************//
// Test 13: calls 'addBlacklistAddress' method originating on
// the ICON chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'addBlacklistAddress(_net, _addresses, from, pk, stepLimit)'", () => {
  it("Makes call on 'addBlacklistAddress' method.", async () => {
    const query = await sdk.icon.web.addBlacklistAddress(
      "0x61.bsc",
      [wallets.bsc.pubK],
      wallets.icon.pubK,
      wallets.icon.privK
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("from"));
  }).timeout(5000);
});

// ********************************************//
// Test 14: calls 'addRestriction' method originating on
// the ICON chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'addRestriction(from, pk, stepLimit)'", () => {
  it("Makes call on 'addRestriction' method.", async () => {
    const query = await sdk.icon.web.addRestriction(
      wallets.icon.pubK,
      wallets.icon.privK
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("from"));
  }).timeout(5000);
});

// ********************************************//
// Test 15: calls 'disableRestriction' method originating on
// the ICON chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'disableRestrictions(from, pk, stepLimit)'", () => {
  it("Makes call on 'disableRestrictions' method.", async () => {
    const query = await sdk.icon.web.disableRestrictions(
      wallets.icon.pubK,
      wallets.icon.privK
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("from"));
  }).timeout(5000);
});
