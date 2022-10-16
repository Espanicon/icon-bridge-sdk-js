require("dotenv").config();
import web3 from "web3";
import utils from "./utils/utils";
const EspaniconSDKNode = require("@espanicon/espanicon-sdk");

// types
interface Wallet {
  address: string | undefined;
  pk: string | undefined;
}
//

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

// variables
const iconLib = new EspaniconSDKNode(utils.iconNode.node, utils.iconNode.nid);
const bscLib = new web3(utils.bscNode.node);

async function runAsync() {
  let bscQuery: any = null;
  let iconQuery: any = null;

  try {
    //
    const ethAbi = utils.getAbiOf("ETH");
    console.log("abi");
    console.log(ethAbi);

    const ethContract = utils.getContractOf("ETH", "bsc");
    console.log("contract");
    console.log(ethContract);

    const ethContract2 = utils.getContractOf("ETH", "icon");
    console.log("contract icon");
    console.log(ethContract2);

    if (ethContract !== null) {
      const contract = new bscLib.eth.Contract(ethAbi, ethContract);
      console.log("full contract");
      console.log(contract);
    }
    //
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
