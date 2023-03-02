const fs = require("fs");
const lib = require("../../dist/utils/lib");
const assert = require("assert");

describe("Testing service dbService", () => {
  const ABI_DATA = JSON.parse(fs.readFileSync("./data/abiData.json", "utf-8"));
  it("Should validate abi data on write()", async () => {
    let validData = ABI_DATA;
    assert.doesNotThrow(() => {
      lib.dbService.write(validData);
    });

    let invalidData = {};
    assert.throws(() => {
      lib.dbService.write(invalidData);
    }, /Invalid external abi data/);
  });

  it("Should read data correctly", async () => {
    let expectedData = ABI_DATA;
    assert.deepEqual(lib.dbService.read(), expectedData);
  });
});
