// utils/utils.ts
//
import { contracts, labels, GenericContractAddress } from "./contracts";
import networks from "./networks";
import lib from "./lib";

// variables
const abiDataPath = "data/abiData.json";

const defaultSDKParams = {
  useMainnet: null,
  iconProvider: networks.mainnet.icon.provider.hostname,
  bscProvider: networks.mainnet.bsc.provider.hostname
};

function getAbiOf(
  contractLabel: string,
  chain: string,
  isMainnet: boolean = true
) {
  //
  return lib.getAbiOf(abiDataPath, contractLabel, chain, isMainnet);
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

function getSDKParams(inputParams: any, defaultParams = defaultSDKParams) {
  //
  const result = { ...defaultParams, ...inputParams };

  if (result.useMainnet == null || result.useMainnet === true) {
    // useMainnet default value = null, use default providers or the
    // ones submitted by the user
    //
    // use predifined icon and bsc providers for mainnet
    result.useMainnet = true;
    result.iconProvider = networks.mainnet.icon.provider.hostname;
    result.bscProvider = networks.mainnet.bsc.provider.hostname;
  } else if (result.useMainnet === false) {
    // use predifined icon and bsc providers for testnet
    result.iconProvider = networks.testnet.icon.provider.hostname;
    result.bscProvider = networks.testnet.bsc.provider.hostname;
  } else {
    // should never happen, default to using mainnet
    result.useMainnet = true;
    result.iconProvider = networks.mainnet.icon.provider.hostname;
    result.bscProvider = networks.mainnet.bsc.provider.hostname;
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
// exports
const utils = {
  networks,
  contracts,
  getBTPAddress,
  abiDataPath,
  labels,
  getAbiOf,
  getContractOf,
  removeZerosFromAddress,
  GenericContractAddress,
  defaultSDKParams,
  getSDKParams,
  getFormattedHostname
};

export default utils;
