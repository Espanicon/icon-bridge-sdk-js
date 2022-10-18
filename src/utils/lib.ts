// utils/lib.ts
//
import fs from "fs";
import customPath from "./customPath";

// variables

// types

// functions
function getBTPAddress(network: string, account: string): string | null {
  let result = null;

  if (typeof network === "string" && typeof account === "string") {
    result = `btp://${network}/${account}`;
  }

  return result;
}

function readDb(path: string): any {
  try {
    if (fs.existsSync(customPath(path))) {
      const dbBuffer = fs.readFileSync(customPath(path), "utf-8");
      const db = JSON.parse(dbBuffer);

      return db;
    } else {
      console.log(`error accesing db file "${path}"`);
      return null;
    }
  } catch (err) {
    console.log(`error reading database at ${path}`);
    console.log(err);
    return null;
  }
}

type Network = {
  [key: string]: { address: string };
};

function getContractOf(
  token: string,
  chain: string,
  contractData: any,
  isMainnet: boolean = true
): string | null {
  //
  let result: string | null = null;
  let mainnetData: Network | null = null;
  let testnetData: Network | null = null;

  switch (chain) {
    case "icon":
      mainnetData = contractData.icon.mainnet;
      testnetData = contractData.icon.testnet;
      break;
    case "bsc":
      mainnetData = contractData.bsc.mainnet;
      testnetData = contractData.bsc.testnet;
      break;
    default:
      break;
  }

  if (mainnetData !== null && testnetData !== null) {
    const mainnetKeys = Object.keys(mainnetData);
    const testnetKeys = Object.keys(testnetData);
    if (isMainnet === true) {
      if (mainnetKeys.includes(token)) {
        result = mainnetData[token].address;
      }
    } else {
      if (testnetKeys.includes(token)) {
        result = testnetData[token].address;
      }
    }
  }

  return result;
}

function getAbiOf(
  dataPath: string,
  contractLabel: string,
  chain: string,
  isMainnet: boolean = true
): any {
  let result: any = null;

  const abiData = readDb(dataPath);

  const allChains = Object.keys(abiData);

  if (allChains.includes(chain)) {
    const chainData = abiData[chain];
    const testnetKeys = (Object.keys(chainData.testnet) as unknown) as string;
    const mainnetKeys = (Object.keys(chainData.mainnet) as unknown) as string;

    if (isMainnet === true) {
      if (mainnetKeys.includes(contractLabel)) {
        const abi = chainData.mainnet[contractLabel];
        if (abi.abi !== null) result = abi.abi;
      }
    } else {
      if (testnetKeys.includes(contractLabel)) {
        const abi = chainData.testnet[contractLabel];
        if (abi.abi !== null) result = abi.abi;
      }
    }
  }

  return result;
}

const lib = {
  getAbiOf,
  getBTPAddress,
  getContractOf,
  readDb
};

export default lib;
