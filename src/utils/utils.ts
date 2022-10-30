// utils/utils.ts
//
import { contracts, labels, GenericContractAddress } from "./contracts";
import { networks, chains } from "./networks";
import lib from "./lib";

// types
type Provider = {
  hostname: string;
  nid: null | number;
};
type InputParams = {
  useMainnet: null | boolean;
  iconProvider: Provider;
  bscProvider: Provider;
};
// variables
const abiDataPath = lib.abiDataPath;

const defaultSDKParams: InputParams = {
  useMainnet: null,
  iconProvider: {
    hostname: networks.mainnet.icon.provider.hostname,
    nid: null
  },
  bscProvider: { hostname: networks.mainnet.bsc.provider.hostname, nid: null }
};

// functions
function getBTPAddress(
  address: string,
  chain: string,
  isMainnet: boolean = true
): string | null {
  let result: string | null = null;
  let nid: string | null = null;
  const chainsLabels = Object.keys(chains);
  const networkLabel = isMainnet === true ? "mainnet" : "testnet";

  if (chainsLabels.includes(chain)) {
    for (const chainLabel of chainsLabels) {
      if (chainLabel === chain) {
        nid = networks[networkLabel][chain]["btp_network_id"];
        break;
      }
    }
  } else {
    console.log(
      `error fetching BTP address.\nProvided value for param "chain": ${chain}, is not a valid value`
    );
  }

  if (nid != null) {
    result = `btp://${nid}/${address}`;
  }

  return result;
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

function getSDKParams(
  inputParams: any,
  defaultParams: InputParams = defaultSDKParams
): InputParams {
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
