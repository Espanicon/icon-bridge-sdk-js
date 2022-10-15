require("dotenv").config();
const EspaniconSDKNode = require("@espanicon/espanicon-sdk");
const utils = require("./utils");
const customPath = require("./customPath");
const fs = require("fs");

// variables
const apiKey = process.env.BSC_API_KEY;
const dataPath = utils.abiDataPath;
const lib = new EspaniconSDKNode(utils.iconNode.node, utils.iconNode.nid);

// types
interface Query {
  status: "0" | "1";
  message: string;
  result: string;
}

class GenericContractAddress {
  /**
   * Generic Contract address class
   * */
  private address: string;

  constructor(address: string) {
    this.address = this.validated(address);
  }

  public getAddress(): string {
    return this.address;
  }

  public setAddress(address: string): void {
    this.address = this.validated(address);
  }

  private validated(address: string): string {
    const regex = new RegExp("^0x([a-fA-F0-9]{40,40}$)");

    if (!regex.test(address)) {
      throw new TypeError(`${address} is not a valid contract address.`);
    }

    return address;
  }
}

interface Batch {
  [key: string]: { address: GenericContractAddress };
}

interface Result {
  [key: string]: { abi: any } | undefined;
}

// functions
function sleep(time: number = 6000): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function getAbi(
  contract: GenericContractAddress,
  isMainnet: boolean = true
): Promise<Query | null> {
  //
  let route: string | null = null;
  let hostname: string | null = null;

  if (isMainnet === true) {
    route = `${utils.routes.bsc.trackerMainnet.route.getContractAbi}${contract}&apikey=${apiKey}`;
    hostname = `${utils.routes.bsc.trackerMainnet.hostname}`;
  } else {
    route = `${utils.routes.bsc.trackerTestnet.route.getContractAbi}${contract}&apikey=${apiKey}`;
    hostname = `${utils.routes.bsc.trackerTestnet.hostname}`;
  }

  try {
    console.log("\nBeginning time pause..");
    await sleep();
    console.log("making query");
    console.log(`url: ${hostname}${route}`);
    const query = await lib.queryMethod(route, false, hostname);
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
  const result: Result = {};

  for (const eachKey of objKeys) {
    const abi = await getAbi(batch[eachKey].address, isMainnet);
    const parsedAbi = parseAbiResponse(abi);

    if (abi !== null) {
      result[eachKey] = { abi: parsedAbi };
    }
  }

  return result;
}

async function getMainnetAndTestnetAbi(): Promise<string | null> {
  const mainnetAbi = await getAbiBatch(utils.contracts.bsc.mainnet);
  const testnetAbi = await getAbiBatch(utils.contracts.bsc.testnet, false);

  try {
    const result = JSON.stringify({ mainnet: mainnetAbi, testnet: testnetAbi });
    return result;
  } catch (err) {
    console.log("error fetching contracts abi");
    console.log(err);
    return null;
  }
}

async function runAsync(filePath: string): Promise<void> {
  // build abi data json
  try {
    const abiData = await getMainnetAndTestnetAbi();

    if (fs.existsSync(filePath)) {
      console.log(`file "${filePath}" already exists. it will be updated`);
      fs.unlinkSync(filePath);
    }

    const fileData = abiData;
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
export = getMainnetAndTestnetAbi;
