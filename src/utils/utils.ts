// utils/utils.ts
//
import { contracts, tokenLabels } from "./contracts";
import networks from "./networks";
import lib from "./lib";
import { TokenValues } from "./contracts";

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

function getAbiOf(token: TokenValues, isMainnet: boolean = true) {
  //
  return lib.getAbiOf(abiDataPath, token, isMainnet);
}

function getBTPAddress(network: string, account: string): string | null {
  return lib.getBTPAddress(network, account);
}

function getContractOf(
  token: string,
  chain: string,
  isMainnet: boolean = true
) {
  return lib.getContractOf(token, chain, contracts, isMainnet);
}

// exports
const utils = {
  networks,
  contracts,
  iconNode,
  bscNode,
  routes,
  getBTPAddress,
  abiDataPath,
  tokenLabels,
  getAbiOf,
  getContractOf
};

export default utils;
