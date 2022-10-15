// utils/lib.ts
//
const fs = require("fs");
const customPath = require("./customPath");
const { tokenLabels } = require("./contracts");

// variables
const tk = { ...tokenLabels } as const;

// types
type LabelsKeys = keyof typeof tk;
export type LabelValues = typeof tk[LabelsKeys];

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
      return JSON.parse(fs.readFileSync(customPath(path)));
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

function getAbiOf(
  dataPath: string,
  token: LabelValues,
  isMainnet: boolean = true
): any {
  let result: any = null;

  const abiData = readDb(dataPath);
  console.log("abiData");
  console.log(abiData);
  const testnetKeys: LabelValues = Object.keys(abiData.testnet);
  const mainnetKeys: LabelValues = Object.keys(abiData.mainnet);

  if (isMainnet === true) {
    if (mainnetKeys.includes(token)) {
      const abi = abiData.mainnet[token];
      if (abi.abi !== null) result = abi.abi;
    }
  } else {
    if (testnetKeys.includes(token)) {
      const abi = abiData.testnet[token];
      if (abi.abi !== null) result = abi.abi;
    }
  }

  return result;
}

const lib = {
  getAbiOf,
  getBTPAddress,
  readDb
};

export default lib;
