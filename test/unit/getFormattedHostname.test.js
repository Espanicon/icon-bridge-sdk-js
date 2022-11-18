const utils = require("../../dist/utils/utils");
const assert = require("assert");

const input = "https:/api.espanicon.team";
const result = "api.espanicon.team";

describe("Testing function utils.getFormattedHostname(url)", () => {
  it("Returns a correctly formatted url to use with SDK.", () => {
    assert.deepEqual(utils.getFormattedHostname(input), result);
  });
});
