const utils = require("../../dist/utils/utils");
const assert = require("assert");

const tests = [
  ["https://api.icon.community:50000", true],
  ["https://api.icon.community:500", true],
  ["https://tracker.lisbon.icon.community:500", true],
  ["https://data-seed-prebsc-1-s1.binance.org:8545", true],
  ["https://data-seed-prebsc-2-s1.binance.org:8545", true],
  ["https://data-seed-prebsc-1-s2.binance.org:8545", true],
  ["https://data-seed-prebsc-2-s2.binance.org:8545", true],
  ["https://data-seed-prebsc-1-s3.binance.org:8545", true],
  ["https://data-seed-prebsc-2-s3.binance.org:8545", true],
  ["http://api.icon.community:50000", true],
  ["http://api.icon.community:500", true],
  ["http://data-seed-prebsc-1-s1.binance.org", true],
  ["https://data-seed-prebsc-2-s1.binance.org", true],
  ["data-seed-prebsc-1-s2.binance.org:8545", true],
  ["data-seed-prebsc-1-s2.binance.org", true],
  ["https://data-seed-prebsc-2-s2.binance.org", true],
  ["data-seed-prebsc-1-s2.binance.org/api", true],
  ["https://data-seed-prebsc-2-s2.binance.org/api/path", true],
  ["http://data-seed-prebsc-2-s2.binance.org/api/path", true],
  ["data-seed-prebsc-1-s2.binance.org:3000/api", true],
  ["https://data-seed-prebsc-2-s2.binance.org:3000/api/path", true],
  ["http://data-seed-prebsc-2-s2.binance.org:300/api/path", true],
  ["https://data-seed-prebsc-1-s3.binance.org:", false],
  ["ftp://data-seed-prebsc-1-s3.binance.org", false],
  ["ws://data-seed-prebsc-1-s3.binance.org", false],
  ["https://data-seed-prebsc-1-s3.binance.org:s22", false],
  ["https://data-seed-prebsc-1-s3.binance#.org", false],
  ["https://data-seed-prebsc-1-s3.binance_.org:", false]
];

describe("Testing function utils.isValidUrl(url)", () => {
  it("Checks that the input value is a valid url.", () => {
    const resultArray = tests.map(test => {
      console.log(
        `${test[0]} should ${test[1]}. returns ${utils.isValidUrl(
          test[0]
        )}. -- ${utils.isValidUrl(test[0]) === test[1] ? "PASS" : "FAILED"}`
      );
      return utils.isValidUrl(test[0]) === test[1] ? "PASS" : "FAILED";
    });
    assert.ok(!resultArray.includes("FAILED"));
  });
});
