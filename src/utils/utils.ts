// utils/utils.ts
//
import {
  contracts,
  labels,
  TokenValues,
  GenericContractAddress
} from "./contracts";
import networks from "./networks";
import lib from "./lib";

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

const bscNodeTestnet = {
  node: networks.testnet.bsc.uri,
  nid: networks.testnet.bsc.network_id
};
const bscNode = {
  node: networks.mainnet.bsc.uri,
  nid: networks.mainnet.bsc.network_id
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

function removeZerosFromAddress(address: string): string {
  return "0x" + address.slice(address.length - 40, address.length);
}

// exports
const utils = {
  networks,
  contracts,
  iconNode,
  bscNode,
  bscNodeTestnet,
  routes,
  getBTPAddress,
  abiDataPath,
  labels,
  getAbiOf,
  getContractOf,
  removeZerosFromAddress,
  GenericContractAddress
};

export default utils;
