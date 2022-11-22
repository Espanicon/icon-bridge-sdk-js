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
  icon: {
    pubK: process.env.WALLET_ICON_ADDRESS,
    privK: process.env.WALLET_ICON_PK
  },
  bsc: {
    pubK: process.env.WALLET_BSC_ADDRESS,
    privK: process.env.WALLET_BSC_PK
  }
};

// Keys that should appear in any response from a readonly call
// originating from the ICON chain.
const genericResultKeys = ["id", "jsonrpc", "result"];

// ********************************************//
// Test 1: calls 'transferNativeCoin' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'transferNativeCoin(targetAddress, targetChain, from, pk, amount)'", () => {
  it("Returns BTP balance of an ICON wallet.", async () => {
    const query = await sdk.icon.methods.transferNativeCoin(
      wallets.bsc.pubK,
      "bsc",
      wallets.icon.pubK,
      wallets.icon.privK,
      "100"
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
