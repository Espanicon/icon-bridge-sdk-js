// utils/utils.ts
//
import { contracts, labels, GenericContractAddress } from "./contracts";
import networks from "./networks";
import lib from "./lib";

// variables
const abiDataPath = lib.abiDataPath;

const defaultSDKParams: {
  useMainnet: null | boolean;
  iconProvider?: any;
  bscProvider?: any;
} = {
  useMainnet: null,
  iconProvider: {
    hostname: networks.mainnet.icon.provider.hostname,
    nid: null
  },
  bscProvider: { hostname: networks.mainnet.bsc.provider.hostname, nid: null }
};

//function getAbiOf(
//  contractLabel: string,
//  chain: string,
//  isMainnet: boolean = true
//) {
//  //
//  return lib.getAbiOf(contractLabel, chain, isMainnet);
//}

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

function getSDKParams(inputParams: any, defaultParams = defaultSDKParams) {
  //
  const result = { ...defaultParams, ...inputParams };

  if (result.useMainnet == null || result.useMainnet === true) {
    // useMainnet default value = null, use default providers or the
    // ones submitted by the user
    //
    // use predifined icon and bsc providers for mainnet
    result.useMainnet = true;
    result.iconProvider = {
      hostname: networks.mainnet.icon.provider.hostname,
      nid: networks.mainnet.icon.provider.nid
    };
    result.bscProvider = {
      hostname: networks.mainnet.bsc.provider.hostname,
      nid: networks.mainnet.bsc.provider.nid
    };
  } else if (result.useMainnet === false) {
    // use predifined icon and bsc providers for testnet
    result.iconProvider = {
      hostname: networks.testnet.icon.provider.hostname,
      nid: networks.testnet.icon.provider.nid
    };
    result.bscProvider = {
      hostname: networks.testnet.bsc.provider.hostname,
      nid: networks.testnet.bsc.provider.nid
    };
  } else {
    // should never happen, default to using mainnet
    result.useMainnet = true;
    result.iconProvider = {
      hostname: networks.mainnet.icon.provider.hostname,
      nid: networks.mainnet.icon.provider.nid
    };
    result.bscProvider = {
      hostname: networks.mainnet.bsc.provider.hostname,
      nid: networks.mainnet.bsc.provider.nid
    };
  }

  return result;
}

function getFormattedHostname(hostname: string): string {
  // for the 'queryMethod' method in the Espanicon library to work properly
  // the 'hostname' param must not have the url protocol in the string
  // i.e: must be 'api.espanicon.team' instead of 'https://api.espanicon.team'
  let temp: string = hostname;

  if (temp[temp.length - 1] === "/") {
    temp = temp.slice(0, temp.length - 2);
  }

  const tempArray = temp.split("/");
  return tempArray[tempArray.length - 1];
}

function getContractOfLabelFromLocalData(
  label: string,
  chain: string,
  isMainnet: boolean,
  getLogicContract: boolean = false
) {
  return lib.getContractOfLabelFromLocalData(
    label,
    chain,
    isMainnet,
    getLogicContract
  );
}

function getAbiOfLabelFromLocalData(
  label: string,
  chain: string,
  isMainnet: boolean,
  getLogicContract: boolean = false
) {
  return lib.getAbiOfLabelFromLocalData(
    label,
    chain,
    isMainnet,
    getLogicContract
  );
}

// exports
const utils = {
  networks,
  contracts,
  getBTPAddress,
  abiDataPath,
  labels,
  // getAbiOf,
  getContractOf,
  removeZerosFromAddress,
  GenericContractAddress,
  defaultSDKParams,
  getSDKParams,
  getFormattedHostname,
  getContractOfLabelFromLocalData,
  getAbiOfLabelFromLocalData
};

export = utils;
