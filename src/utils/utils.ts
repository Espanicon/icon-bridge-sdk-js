// utils/utils.ts
//
const contracts = require("./contracts");
const networks = require("./networks");

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
const utils = {
  networks,
  contracts,
  iconNode,
  bscNode,
  routes
};

export = utils;
