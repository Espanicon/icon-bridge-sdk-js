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
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'coinNames()'", () => {
  it("Returns list of coin names.", async () => {
    const query = await sdk.icon.methods.coinNames();
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
// Test 4: calls 'feeRatio' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'feeRatio(_coinName)'", () => {
  it("Returns fee ratio for a coin.", async () => {
    const query = await sdk.icon.methods.feeRatio("btp-0x2.icon-ICX");
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
// Test 5: calls 'getAccumulatedFees' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'getAccumulatedFees()'", () => {
  it("Returns accumulated fees.", async () => {
    const query = await sdk.icon.methods.getAccumulatedFees();
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
// Test 6: calls 'getOwners' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'getOwners()'", () => {
  it("Returns owners of BTS contract.", async () => {
    const query = await sdk.icon.methods.getOwners();
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
// Test 7: calls 'isOwner' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'isOwner(_addr)'", () => {
  it("Check is wallet address is owner of BTS contract.", async () => {
    const query = await sdk.icon.methods.isOwner(wallets.icon);
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
// Test 8: calls 'name' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'name()'", () => {
  it("Returns contract name.", async () => {
    const query = await sdk.icon.methods.name();
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
// Test 9: calls 'getTokenLimit' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'getTokenLimit(_name)'", () => {
  it("Returns token limit for the given token name.", async () => {
    const query = await sdk.icon.methods.getTokenLimit("btp-0x2.icon-bnUSD");
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
// Test 10: calls 'getTokenLimitTxn' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'getTokenLimitTxn(_Sn)'", () => {
  it("Returns TokenLimitTxn.", async () => {
    const query = await sdk.icon.methods.getTokenLimitTxn("0x63");
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
// Test 11: calls 'getSn' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'getSn(_Sn)'", () => {
  it("Returns Sn.", async () => {
    const query = await sdk.icon.methods.getSn("0x63");
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
// Test 12: calls 'isUserBlackListed' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'isUserBlackListed(_net, _address)'", () => {
  it("Returns if the wallet is blacklisted in the defined chain.", async () => {
    const query = await sdk.icon.methods.isUserBlackListed(
      "icon",
      wallets.icon
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
// Test 13: calls 'getBlackListedUsers' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'getBlackListedUsers(_net, _start, _end)'", () => {
  it("Returns list of blacklisted users in the defined chain.", async () => {
    const query = await sdk.icon.methods.getBlackListedUsers(
      "icon",
      "0x0",
      "0x1"
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
// Test 14: calls 'getRegisteredTokensCount' method originating on the
// Icon chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'getRegisteredTokensCount()'", () => {
  it("Returns count of registered tokens.", async () => {
    const query = await sdk.icon.methods.getRegisteredTokensCount();
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
// Test 15: calls 'tokenLimitStatus' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'tokenLimitStatus(_net, _coinName)'", () => {
  it("Returns token limit status for the given coin and chain.", async () => {
    const query = await sdk.icon.methods.tokenLimitStatus(
      "0x2.icon",
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
// Test 16: calls 'blackListedUsersCount' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'blackListedUsersCount(_net)'", () => {
  it("Returns blacklisted users count on defined chain.", async () => {
    const query = await sdk.icon.methods.blackListedUsersCount("icon");
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
// Test 17: calls 'getTransaction' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'getTransaction(_sn)'", () => {
  it("Returns transaction.", async () => {
    const query = await sdk.icon.methods.getTransaction("0x63");
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
// Test 18: calls 'isRestrictionEnabled' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'isRestrictionEnabled()'", () => {
  it("Returns transaction.", async () => {
    const query = await sdk.icon.methods.isRestrictionEnabled();
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
// Test 19: calls 'coinId' method originating on the Icon chain.
// It should returns and object with a predefined set of keys.
describe("E2E testing Icon Bridge SDK. Chain: 'icon', Method 'coinId(_coinName)'", () => {
  it("Returns coinId of specified coinName.", async () => {
    const query = await sdk.icon.methods.coinId("btp-0x2.icon-ICX");
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
