const utils = require("../../dist/utils/utils");
const assert = require("assert");

const input = {
  address: "0x910bbe2fbf861128fd3d47f06fbda75ddf38cb9f",
  chain: "bsc",
  isMainnet: false
};
const result = "btp://0x61.bsc/0x910bbe2fbf861128fd3d47f06fbda75ddf38cb9f";

describe("Testing function utils.getBTPAddress(address, chain, isMainnet)", () => {
  it("Gets BTP formatted address.", () => {
    assert.deepEqual(
      utils.getBTPAddress(input.address, input.chain, input.isMainnet),
      result
    );
  });
});
