const EspaniconSDKNode = require("@espanicon/espanicon-sdk");
const utils = require("./utils/utils");
console.log(utils);

const apiNode = "lisbon.net.solidwallet.io";
const nid = 2;
const lib = new EspaniconSDKNode(apiNode, nid);
const { getScoreApi } = lib;

async function runAsync() {
  const query = await getScoreApi(utils.networks.testnet.icon.contracts.bts);
  console.log("query");
  console.log(JSON.stringify(query));
}

runAsync();
