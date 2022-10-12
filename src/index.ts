require("dotenv").config();
import web3 from "web3";
const EspaniconSDKNode = require("@espanicon/espanicon-sdk");
const utils = require("./utils/utils");

// types
interface Wallet {
  address: string | undefined;
  pk: string | undefined;
}
//
const iconNode = {
  node: "lisbon.net.solidwallet.io",
  nid: 2
};
const bscNode = {
  node: utils.networks.testnet.bsc.uri,
  nid: utils.networks.testnet.bsc.network_id
};

const walletsRaw: { icon: Wallet; bsc: Wallet } = {
  icon: {
    address: process.env.WALLET_ICON_ADDRESS,
    pk: process.env.WALLET_ICON_PK
  },
  bsc: {
    address: process.env.WALLET_BSC_ADDRESS,
    pk: process.env.WALLET_BSC_PK
  }
};

const iconLib = new EspaniconSDKNode(iconNode.node, iconNode.nid);
const bscLib = new web3(bscNode.node);

async function runAsync() {
  let bscQuery: any = null;
  let iconQuery: any = null;

  try {
    iconQuery = await iconLib.getIcxBalance(walletsRaw.icon.address);
    if (typeof walletsRaw.bsc.address === "string") {
      bscQuery = await bscLib.eth.getBalance(
        walletsRaw.bsc.address,
        (err, wei) => {
          if (err) {
            console.log("error inside");
            console.log(err);
          }
          const balance = web3.utils.fromWei(wei, "ether");
          console.log("balance inside callback");
          console.log(balance);
          return balance;
        }
      );
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log("error running queries");
      console.log(err.message);
    }
    console.log("unexpected error", err);
  }
  console.log("bscQuery", bscQuery);
  console.log("iconQuery", iconQuery);
}

runAsync();
