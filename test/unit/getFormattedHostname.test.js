const utils = require("../../dist/utils/utils");
const assert = require("assert");

const input = [
  ["https://api.espanicon.team", "api.espanicon.team"],
  ["api.espanicon.team", "api.espanicon.team"],
  ["http://api.espanicon.team", "api.espanicon.team"]
];

describe("Testing function utils.getFormattedHostname(url)", () => {
  input.forEach(test => {
    it("Returns a correctly formatted url to use with SDK.", () => {
      console.log(`${test[0]} => ${test[1]}`);
      assert.deepEqual(utils.getFormattedHostname(test[0]), test[1]);
    });
  });
});
