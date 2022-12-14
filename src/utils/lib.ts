// utils/lib.ts
//
// import fs from "fs";
// import customPath from "./customPath";
const ABI_DATA = require("../../data/abiData.js");

// variables
const abiDataPath = "data/abiData.json";
// types

// functions

function readDb(path: string, flag: boolean = true): any {
  try {
    if (flag === true) {
      //
      return ABI_DATA;
    } else {
      // if (fs.existsSync(customPath(path))) {
      //   const dbBuffer = fs.readFileSync(customPath(path), "utf-8");
      //   const db = JSON.parse(dbBuffer);
      //   return db;
      // } else {
      //   console.log(`error accesing db file "${path}"`);
      //   return null;
      // }
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

function getDataFromLocalData(
  label: string,
  chain: string,
  isMainnet: boolean,
  getAbi: boolean,
  getLogicContract: boolean = false
) {
  //
  const localData = readDb(abiDataPath);
  let result: any = null;
  const allChains = Object.keys(localData);

  if (allChains.includes(chain)) {
    const chainData = localData[chain];
    const testnetKeys = (Object.keys(chainData.testnet) as unknown) as string;
    const mainnetKeys = (Object.keys(chainData.mainnet) as unknown) as string;
    let contractData = null;

    if (isMainnet === true && mainnetKeys.includes(label)) {
      contractData = chainData.mainnet[label];
    } else if (isMainnet === false && testnetKeys.includes(label)) {
      contractData = chainData.testnet[label];
    } else {
      //
    }

    if (contractData != null) {
      if (getAbi === true) {
        if (getLogicContract === true) {
          if (contractData.implementation.address != null) {
            result = contractData.implementation.abi;
          }
        } else {
          result = contractData.abi;
        }
      } else {
        if (getLogicContract === true) {
          if (contractData.implementation.address != null) {
            result = contractData.implementation.address;
          }
        } else {
          result = contractData.address;
        }
      }
    }
  } else {
    throw new Error(
      `Error while getting local data. Chain "${chain}" is not included in [${allChains}]`
    );
  }

  return result;
}

function getContractOfLabelFromLocalData(
  label: string,
  chain: string,
  isMainnet: boolean,
  getLogicContract: boolean = false
) {
  return getDataFromLocalData(label, chain, isMainnet, false, getLogicContract);
}

function getAbiOfLabelFromLocalData(
  label: string,
  chain: string,
  isMainnet: boolean,
  getLogicContract: boolean = false
) {
  return getDataFromLocalData(label, chain, isMainnet, true, getLogicContract);
}

const lib = {
  getContractOf,
  readDb,
  abiDataPath,
  getContractOfLabelFromLocalData,
  getAbiOfLabelFromLocalData
};

export = lib;
