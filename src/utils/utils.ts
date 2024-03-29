// utils/utils.ts
//
import {
  contracts,
  labels,
  GenericContractAddress,
  tokenLabels,
  genericAbi,
  tokenNames
} from "./contracts";
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

type Protocol = "https" | "http";

type Url = {
  protocol: Protocol;
  hostname: string | null;
  path: string | null;
  port: string | null;
};

type EthMethods =
  | "eth_call"
  | "eth_sendRawTransaction"
  | "eth_getTransactionCount";

type EthJsonRpc = {
  jsonrpc: "2.0";
  method: EthMethods;
  id: number;
  params: any[];
};

// variables
const abiDataPath = lib.abiDataPath;
const urlRegex = /^((https|http):\/\/)?(([a-zA-Z0-9-]{1,}\.){1,}([a-zA-Z0-9]{1,63}))(:[0-9]{2,5})?(\/.*)?$/;

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
  const result = { ...defaultParams };
  result.useMainnet = true;
  result.iconProvider = {
    hostname: networks.mainnet.icon.provider.hostname,
    nid: networks.mainnet.icon.provider.nid
  };
  result.bscProvider = {
    hostname: networks.mainnet.bsc.provider.hostname,
    nid: networks.mainnet.bsc.provider.nid
  };

  if (inputParams != null && typeof inputParams === "object") {
    // if user has input data for 'useMainnet' param
    if (inputParams.useMainnet != null) {
      // validating user input data
      if (inputParams.useMainnet === false) {
        result.useMainnet = false;
        result.iconProvider = {
          hostname: networks.testnet.icon.provider.hostname,
          nid: networks.testnet.icon.provider.nid
        };
        result.bscProvider = {
          hostname: networks.testnet.bsc.provider.hostname,
          nid: networks.testnet.bsc.provider.nid
        };
      }
    }

    // if user has input data for 'iconProvider' param
    if (
      inputParams.iconProvider != null &&
      typeof inputParams.iconProvider === "object"
    ) {
      // validating user input data
      if (typeof inputParams.iconProvider.hostname === "string") {
        const parsedUrl = getFormattedHostname(
          inputParams.iconProvider.hostname
        );

        if (parsedUrl != null) {
          result.iconProvider.hostname = inputParams.iconProvider.hostname;
        } else {
          throw new Error(`Format error on provided Url. URL = ${parsedUrl}`);
        }
      }
      if (inputParams.iconProvider.nid != null) {
        result.iconProvider.nid = inputParams.iconProvider.nid;
      }
    }

    // if user has input data for 'bscProvider' param
    if (
      inputParams.bscProvider != null &&
      typeof inputParams.bscProvider === "object"
    ) {
      // validating user input data
      if (typeof inputParams.bscProvider.hostname === "string") {
        result.bscProvider.hostname = inputParams.bscProvider.hostname;
      }
      if (inputParams.bscProvider.nid != null) {
        result.bscProvider.nid = inputParams.iconProvider.nid;
      }
    }
  }
  return result;
}
/*
 * for the 'queryMethod' method in the Espanicon library to work properly
 * the 'hostname' param must not have the url protocol in the string
 * i.e: must be 'api.espanicon.team' instead of 'https://api.espanicon.team'
 * @param hostname - url to parse
 */
function getFormattedHostname(hostname: string): string | null {
  const inputInLowercase: string = hostname;
  const regexResult = inputInLowercase.match(urlRegex);
  if (regexResult != null) {
    if (regexResult[3] != null) {
      return regexResult[3];
    }
  }
  return null;
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

function getTokenLabelFromTokenName(tokenName: string) {
  // let tokenLabel = null;

  // switch (tokenName) {

  // }
  // return tokenLabel;
  return tokenName;
}

/*
 * Returns a random number between 1 and 1000
 */
function getRandNonce() {
  const result = Math.ceil(Math.random() * 1000);

  if (result === 0) {
    return 1;
  }

  return result;
}

/*
 *
 */
async function makeEthJsonRpcReadonlyQuery(
  url: string,
  to: string,
  data: any,
  queryMethod: any
) {
  //
  const jsonRpcObj = makeEthCallJsonRpcObj(to, data);
  const urlObj = parseEthRPCUrl(url);
  const query = await queryMethod(
    urlObj.path,
    jsonRpcObj,
    urlObj.hostname,
    urlObj.protocol === "http" ? false : true,
    urlObj.port === "" ? false : urlObj.port
  );

  return query;
}

/*
 *
 */
async function makeEthSendRawTransactionQuery(
  url: string,
  data: any,
  queryMethod: any
) {
  //
  const jsonRpcObj = makeEthSendRawTransactionJsonRpcObj(data);
  const urlObj = parseEthRPCUrl(url);
  const query = await queryMethod(
    urlObj.path,
    jsonRpcObj,
    urlObj.hostname,
    urlObj.protocol === "http" ? false : true,
    urlObj.port === "" ? false : urlObj.port
  );

  return query;
}

async function makeEthGetTransactionCountQuery(
  url: string,
  address: string,
  queryMethod: any
) {
  //
  const jsonRpcObj = makeEthGetTransactionCountJsonRpcObj(address);
  const urlObj = parseEthRPCUrl(url);
  const query = await queryMethod(
    urlObj.path,
    jsonRpcObj,
    urlObj.hostname,
    urlObj.protocol === "http" ? false : true,
    urlObj.port === "" ? false : urlObj.port
  );

  return query;
}

async function makeJsonRpcCall(url: string, data: any, queryMethod: any) {
  const urlObj = parseEthRPCUrl(url);
  const query = await queryMethod(
    urlObj.path,
    data,
    urlObj.hostname,
    urlObj.protocol == "http" ? false : true,
    urlObj.port === "" ? false : urlObj.port
  );
  return query;
}
/*
 *
 */
function makeEthJsonRpcObj(
  to: string | null = null,
  data: string,
  callType: EthMethods = "eth_call",
  useLatestBlock: boolean = true
) {
  //
  let params: any[];
  if (to == null) {
    params = [data];
  } else {
    params = [{ to: to, data: data }];
  }
  if (useLatestBlock) {
    params.push("latest");
  }
  const result: EthJsonRpc = {
    jsonrpc: "2.0",
    method: callType,
    id: Math.ceil(Math.random() * 100),
    params: params
  };

  return JSON.stringify(result);
}

/*
 *
 */
function makeEthCallJsonRpcObj(
  to: string,
  data: string,
  useLatestBlock: boolean = true
) {
  //
  return makeEthJsonRpcObj(to, data, "eth_call", useLatestBlock);
}

/*
 *
 */
function makeEthGetTransactionCountJsonRpcObj(
  address: string,
  useLatestBlock: boolean = true
) {
  //
  return makeEthJsonRpcObj(
    null,
    address,
    "eth_getTransactionCount",
    useLatestBlock
  );
}

/*
 *
 */
function makeEthSendRawTransactionJsonRpcObj(data: string) {
  //
  return makeEthJsonRpcObj(null, data, "eth_sendRawTransaction", false);
}

/*
 *
 */
function parseEthRPCUrl(rpcNode: string) {
  //
  const inputInLowercase = rpcNode.toLowerCase();
  const parsedUrl: Url = {
    protocol: "https",
    path: "/",
    hostname: null,
    port: "443"
  };

  const regexResult = inputInLowercase.match(urlRegex);

  if (regexResult != null) {
    parsedUrl.protocol =
      regexResult[2] == null ? "https" : (regexResult[2] as Protocol);
    parsedUrl.path = regexResult[7] == null ? "/" : regexResult[7];
    parsedUrl.hostname = regexResult[3];
    parsedUrl.port = regexResult[6] == null ? "" : regexResult[6].slice(1);
  }

  return parsedUrl;
}

function isValidUrl(urlString: string) {
  return urlRegex.test(urlString);
}

function isValidTxString(tx: string) {
  const regex = /([0][xX][a-fA-F0-9]{40})$/;
  return regex.test(tx);
}

function isValidContractAddress(tx: string) {
  const regex = /([cC][xX][a-fA-F0-9]{40})$/;
  return regex.test(tx);
}

function sleep(time: number = 2000): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, time));
}

function decimalToHex(number: number) {
  return "0x" + number.toString(16);
}

function hexToDecimal(hex: string) {
  return parseInt(hex, 16);
}

function getAbiFromMethodLabel(method: string, abi: any) {
  let result: any = null;
  for (const each of abi) {
    if (each.name === method) {
      result = each;
    }
  }

  return result;
}

// exports
const utils = {
  networks,
  chains,
  contracts,
  getBTPAddress,
  abiDataPath,
  genericAbi,
  labels,
  tokenLabels,
  tokenNames,
  getContractOf,
  removeZerosFromAddress,
  GenericContractAddress,
  defaultSDKParams,
  getSDKParams,
  getFormattedHostname,
  getContractOfLabelFromLocalData,
  getAbiOfLabelFromLocalData,
  getTokenLabelFromTokenName,
  getRandNonce,
  makeEthJsonRpcReadonlyQuery,
  isValidUrl,
  parseEthRPCUrl,
  makeJsonRpcCall,
  makeEthSendRawTransactionQuery,
  makeEthGetTransactionCountQuery,
  isValidTxString,
  sleep,
  isValidContractAddress,
  decimalToHex,
  hexToDecimal,
  getAbiFromMethodLabel
};

export = utils;
