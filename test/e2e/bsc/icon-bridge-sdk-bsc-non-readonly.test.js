// E2E Tests.
require("dotenv").config();
const IconBridgeSDK = require("../../../dist/icon-bridge-sdk-node");
const utils = require("../../../dist/utils/utils");
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
  it("Returns BTP balance of an BSC wallet.", async () => {
    const query = await sdk.bsc.methods.transferNativeCoin(
      wallets.icon.pubK,
      "icon",
      wallets.bsc.pubK,
      wallets.bsc.privK,
      "0.01"
    );

    console.log(`\n  > Result: ${JSON.stringify(query)}\n`);
    assert.ok(Object.keys(query).includes("result"));
  }).timeout(5000);
});
