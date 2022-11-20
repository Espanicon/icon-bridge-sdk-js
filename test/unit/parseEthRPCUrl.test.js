const utils = require("../../dist/utils/utils");
const assert = require("assert");

const tests = [
  [
    "https://api.icon.community:50000",
    {
      protocol: "https",
      path: "/",
      hostname: "api.icon.community",
      port: "50000"
    }
  ],
  [
    "https://api.icon.community:500",
    {
      protocol: "https",
      path: "/",
      hostname: "api.icon.community",
      port: "500"
    }
  ],
  [
    "https://tracker.lisbon.icon.community:500",
    {
      protocol: "https",
      path: "/",
      hostname: "tracker.lisbon.icon.community",
      port: "500"
    }
  ],
  [
    "https://data-seed-prebsc-1-s1.binance.org:8545",
    {
      protocol: "https",
      path: "/",
      hostname: "data-seed-prebsc-1-s1.binance.org",
      port: "8545"
    }
  ],
  [
    "https://data-seed-prebsc-2-s1.binance.org:8545",
    {
      protocol: "https",
      path: "/",
      hostname: "data-seed-prebsc-2-s1.binance.org",
      port: "8545"
    }
  ],
  [
    "https://data-seed-prebsc-1-s2.binance.org:8545",
    {
      protocol: "https",
      path: "/",
      hostname: "data-seed-prebsc-1-s2.binance.org",
      port: "8545"
    }
  ],
  [
    "https://data-seed-prebsc-2-s2.binance.org:8545",
    {
      protocol: "https",
      path: "/",
      hostname: "data-seed-prebsc-2-s2.binance.org",
      port: "8545"
    }
  ],
  [
    "https://data-seed-prebsc-1-s3.binance.org:8545",
    {
      protocol: "https",
      path: "/",
      hostname: "data-seed-prebsc-1-s3.binance.org",
      port: "8545"
    }
  ],
  [
    "https://data-seed-prebsc-2-s3.binance.org:8545",
    {
      protocol: "https",
      path: "/",
      hostname: "data-seed-prebsc-2-s3.binance.org",
      port: "8545"
    }
  ],
  [
    "http://api.icon.community:50000",
    {
      protocol: "http",
      path: "/",
      hostname: "api.icon.community",
      port: "50000"
    }
  ],
  [
    "http://api.icon.community:500",
    {
      protocol: "http",
      path: "/",
      hostname: "api.icon.community",
      port: "500"
    }
  ],
  [
    "http://data-seed-prebsc-1-s1.binance.org",
    {
      protocol: "http",
      path: "/",
      hostname: "data-seed-prebsc-1-s1.binance.org",
      port: ""
    }
  ],
  [
    "https://data-seed-prebsc-2-s1.binance.org",
    {
      protocol: "https",
      path: "/",
      hostname: "data-seed-prebsc-2-s1.binance.org",
      port: ""
    }
  ],
  [
    "data-seed-prebsc-1-s2.binance.org:8545",
    {
      protocol: "https",
      path: "/",
      hostname: "data-seed-prebsc-1-s2.binance.org",
      port: "8545"
    }
  ],
  [
    "data-seed-prebsc-1-s2.binance.org",
    {
      protocol: "https",
      path: "/",
      hostname: "data-seed-prebsc-1-s2.binance.org",
      port: ""
    }
  ],
  [
    "https://data-seed-prebsc-2-s2.binance.org",
    {
      protocol: "https",
      path: "/",
      hostname: "data-seed-prebsc-2-s2.binance.org",
      port: ""
    }
  ],
  [
    "data-seed-prebsc-1-s2.binance.org/api",
    {
      protocol: "https",
      path: "/api",
      hostname: "data-seed-prebsc-1-s2.binance.org",
      port: ""
    }
  ],
  [
    "https://data-seed-prebsc-2-s2.binance.org/api/path",
    {
      protocol: "https",
      path: "/api/path",
      hostname: "data-seed-prebsc-2-s2.binance.org",
      port: ""
    }
  ],
  [
    "http://data-seed-prebsc-2-s2.binance.org/api/path",
    {
      protocol: "http",
      path: "/api/path",
      hostname: "data-seed-prebsc-2-s2.binance.org",
      port: ""
    }
  ],
  [
    "data-seed-prebsc-1-s2.binance.org:3000/api",
    {
      protocol: "https",
      path: "/api",
      hostname: "data-seed-prebsc-1-s2.binance.org",
      port: "3000"
    }
  ],
  [
    "https://data-seed-prebsc-2-s2.binance.org:3000/api/path",
    {
      protocol: "https",
      path: "/api/path",
      hostname: "data-seed-prebsc-2-s2.binance.org",
      port: "3000"
    }
  ],
  [
    "http://data-seed-prebsc-2-s2.binance.org:300/api/path",
    {
      protocol: "http",
      path: "/api/path",
      hostname: "data-seed-prebsc-2-s2.binance.org",
      port: "300"
    }
  ]
];

describe("Testing function utils.parseEthRPCUrl(url)", () => {
  tests.forEach(test => {
    it("parses a url extracting protocol, hostname, path and port.", () => {
      assert.deepEqual(utils.parseEthRPCUrl(test[0]), test[1]);
    });
  });
});
