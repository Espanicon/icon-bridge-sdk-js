require("dotenv").config();
const web3 = require("web3");
const EspaniconSDKNode = require("@espanicon/espanicon-sdk");
const utils = require("./utils");
const customPath = require("./customPath");
const fs = require("fs");

// variables
const apiKey = process.env.BSC_API_KEY;
const dataPath = "data/abiData.js";
const lib = new EspaniconSDKNode(
  utils.networks.mainnet.icon.provider.hostname,
  utils.networks.mainnet.icon.provider.nid
);
const bscLib = new web3(utils.networks.mainnet.bsc.provider.hostname);
const bscLibTestnet = new web3(utils.networks.testnet.bsc.provider.hostname);
let count = 0;

const preData = "const data =";
const postData = ";module.exports = data;";
// types
interface Query {
  status: "0" | "1";
  message: string;
  result: string;
}

interface Batch {
  [key: string]: {
    address: any;
    isProxy?: boolean;
    implementation?: any;
  };
}

interface Result {
  [key: string]:
    | {
        abi: any;
        address: string | null;
        implementation: {
          abi: any;
          address: any;
        };
      }
    | undefined;
}

async function getAbi(
  contract: any,
  isMainnet: boolean = true
): Promise<Query | null> {
  //
  let route: string | null = null;
  let hostname: string | null = null;

  if (isMainnet === true) {
    route = `${utils.networks.mainnet.bsc.tracker.routes.getContractAbi}${contract}&apikey=${apiKey}`;
    hostname = `${utils.networks.mainnet.bsc.tracker.hostname}`;
  } else {
    route = `${utils.networks.testnet.bsc.tracker.routes.getContractAbi}${contract}&apikey=${apiKey}`;
    hostname = `${utils.networks.testnet.bsc.tracker.hostname}`;
  }

  try {
    if (count < 4) {
      console.log("\nBypassing time pause.");
      count += 1;
    } else {
      count = 0;
      console.log("\nBeginning time pause.");
      await utils.sleep();
    }
    const parsedHostname = utils.getFormattedHostname(hostname);
    console.log("making query");
    console.log(`url: ${parsedHostname}${route}`);
    const query = await lib.queryMethod(route, false, parsedHostname);
    console.log("query result: success");
    return query;
  } catch (err) {
    console.log("query result: error");
    console.log(err);
    return null;
  }
}

function parseAbiResponse(abi: Query | null) {
  let result: string | null = null;
  if (abi !== null) {
    try {
      result = JSON.parse(abi.result);
    } catch (err) {
      console.log("error on query");
      console.log(abi);
    }
  }
  return result;
}

async function getAbiBatch(
  batch: Batch,
  isMainnet: boolean = true
): Promise<Result> {
  const objKeys = Object.keys(batch);
  objKeys.push("genericToken");
  const result: Result = {};

  for (const eachKey of objKeys) {
    if (eachKey === "genericToken") {
      // utils.networks.tokenLabels
      continue;
    }
    const abi = await getAbi(batch[eachKey].address, isMainnet);
    const parsedAbi = parseAbiResponse(abi);
    const implementation: {
      address: string | null | any;
      abi: any;
    } = {
      address: null,
      abi: null
    };
    const address = (batch[eachKey].address as unknown) as string;

    if (batch[eachKey].isProxy != null && batch[eachKey].isProxy === true) {
      try {
        let implSlot: any = null;

        if (isMainnet === true) {
          implSlot = await bscLib.eth.getStorageAt(
            address,
            utils.labels.memSlot
          );
        } else {
          implSlot = await bscLibTestnet.eth.getStorageAt(
            address,
            utils.labels.memSlot
          );
        }
        const parsedImpl = (utils.removeZerosFromAddress(
          implSlot
        ) as unknown) as any;
        implementation.address = parsedImpl;
        const implAbi = await getAbi(parsedImpl, isMainnet);
        implementation.abi = parseAbiResponse(implAbi);
      } catch (err) {
        console.log(
          `error fetching implementation address of contract "${address}"`
        );
        console.log(err);
      }
    }
    if (abi !== null) {
      result[eachKey] = {
        abi: parsedAbi,
        address: address,
        implementation: implementation
      };

      if (
        result["genericToken"] == null &&
        utils.tokenLabels.includes(eachKey)
      ) {
        result["genericToken"] = {
          abi: parsedAbi,
          address: null,
          implementation: {
            abi: null,
            address: null
          }
        };
      }
    }
  }

  return result;
}

async function getAbiDataOfAllChains(): Promise<string | null> {
  const result: { bsc: any; icon: any } = { bsc: null, icon: null };

  result.bsc = await getMainnetAndTestnetAbiForBSC();
  result.icon = getMainnetAndTestnetDataForICON();

  try {
    const stringResult = JSON.stringify(result);
    return stringResult;
  } catch (err) {
    console.log("error running getAbiDataOfAllChains()");
    console.log(err);
    return null;
  }
}

function getMainnetAndTestnetDataForICON() {
  return utils.contracts.icon;
}

async function getMainnetAndTestnetAbiForBSC(): Promise<any> {
  const mainnetAbi = await getAbiBatch(utils.contracts.bsc.mainnet);
  const testnetAbi = await getAbiBatch(utils.contracts.bsc.testnet, false);

  try {
    const result = { mainnet: mainnetAbi, testnet: testnetAbi };
    return result;
  } catch (err) {
    console.log("error fetching contracts abi");
    console.log(err);
    return null;
  }
}

async function runAsync(filePath: string): Promise<void> {
  // build abi data json
  console.log("|--Beging fetching Data");
  try {
    const abiData = await getAbiDataOfAllChains();

    if (fs.existsSync(filePath)) {
      console.log(`file "${filePath}" already exists. it will be updated`);
      fs.unlinkSync(filePath);
    }

    // const fileData = abiData;
    const fileData = preData + abiData + postData;
    fs.writeFileSync(filePath, fileData);
    console.log(`file "${filePath}" created`);
  } catch (err) {
    console.log(`unexpected error trying to create "${filePath}" file`);
    console.log(err);
  }
}

if (require.main === module) {
  runAsync(customPath(dataPath));
}
