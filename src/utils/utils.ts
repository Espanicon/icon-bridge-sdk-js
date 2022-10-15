// utils/utils.ts
//
import type {LabelValues } from './lib'
import { contracts, tokenLabels } from "./contracts"
import networks from "./networks"
import lib from "./lib"

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

function getAbiOf(token: LabelValues, isMainnet: boolean = true) {
  //
  return lib.getAbiOf(abiDataPath, token, isMainnet)
}

// exports
const utils = {
  networks,
  contracts,
  iconNode,
  bscNode,
  routes,
  lib,
  abiDataPath,
  tokenLabels,
  getAbiOf
};

export default utils;
