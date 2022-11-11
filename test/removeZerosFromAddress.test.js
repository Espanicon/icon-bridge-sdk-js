const utils = require("../dist/utils/utils");
const assert = require("assert");

const input =
  "0x000000000000000000000000910bbe2fbf861128fd3d47f06fbda75ddf38cb9f";
const result = "0x910bbe2fbf861128fd3d47f06fbda75ddf38cb9f";

describe("Testing function utils.removeZerosFromAddress(address)", () => {
  it("Removes unnecessary zeroes from address", () => {
    assert.deepEqual(utils.removeZerosFromAddress(input), result);
  });
});
