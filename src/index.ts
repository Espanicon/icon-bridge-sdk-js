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
const iconLib = new EspaniconSDKNode(
  utils.networks.mainnet.icon.provider.hostname,
  utils.networks.mainnet.icon.provider.nid
);
const bscLib = new web3(utils.networks.mainnet.bsc.provider.hostname);
const bscLibTestnet = new web3(utils.networks.testnet.bsc.provider.hostname);

async function runAsync() {
  let bscQuery: any = null;
  let iconQuery: any = null;

  try {
    //
    const ethAbi = utils.getAbiOf("BTSCore", "bsc", false);
    console.log("abi");
    console.log(ethAbi);

    const bscContract1 = utils.getContractOf("BTSCore", "bsc", false);
    console.log("contract testnet");
    console.log(bscContract1);

    const bscContract2 = utils.getContractOf("BTSCore", "bsc");
    console.log("contract mainnet");
    console.log(bscContract2);

    const iconContract1 = utils.getContractOf("ETH", "icon");
    console.log("contract icon");
    console.log(iconContract1);

    if (bscContract1 != null && bscContract2 != null) {
      // const contract = new bscLib.eth.Contract(ethAbi, bscContract1);
      // console.log("full contract");
      // console.log(contract);

      const implSlot = await bscLib.eth.getStorageAt(
        bscContract2,
        "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
      );
      console.log("implSlot mainnet");
      console.log(implSlot);

      const implSlotTestnet = await bscLibTestnet.eth.getStorageAt(
        bscContract1,
        "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
      );

      console.log("implSlot testnet");
      console.log(implSlotTestnet);
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
