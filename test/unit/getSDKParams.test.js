const utils = require("../../dist/utils/utils");
const assert = require("assert");

const input = {
  useMainnet: false,
  bscProvider: { hostname: "https://data-seed-prebsc-2-s1.binance.org:8545" }
};
const result = {
  useMainnet: false,
  bscProvider: {
    hostname: "https://data-seed-prebsc-2-s1.binance.org:8545",
    nid: 97
  },
  iconProvider: {
    hostname: "https://lisbon.net.solidwallet.io/api/v3/icon_dex",
    nid: 2
  }
};

describe("Testing function utils.getSDKParams(newParams)", () => {
  it("Returns a correctly formatted params object for the initialization of the SDK class object.", () => {
    assert.deepEqual(utils.getSDKParams(input), result);
  });
});
