// utils/utils.ts
//
const { contracts, tokenLabels } = require("./contracts");
const networks = require("./networks");
const lib = require("./lib");

// variables
const abiDataPath = "data/abiData.json";

const iconNode = {
  node: "lisbon.net.solidwallet.io",
  nid: 2
};

const routes = {
  bsc: {
    trackerMainnet: {
      hostname: "api.bscscan.com",
      route: {
        getContractAbi: "/api?module=contract&action=getabi&address="
      }
    },
    trackerTestnet: {
      hostname: "api-testnet.bscscan.com",
      route: {
        getContractAbi: `/api?module=contract&action=getabi&address=`
      }
    }
  }
};

const bscNode = {
  node: networks.testnet.bsc.uri,
  nid: networks.testnet.bsc.network_id
};

// exports
const utils = {
  networks,
  contracts,
  iconNode,
  bscNode,
  routes,
  lib,
  abiDataPath,
  tokenLabels
};

export = utils;
