require("dotenv").config();
import IconBridgeSDKNode from "../../icon-bridge-sdk-node.js";

const lib = new IconBridgeSDKNode({ useMainnet: false });
const wallets = {
  icon: {
    a: {
      pubK: process.env.WALLET_ICON_ADDRESS,
      privK: process.env.WALLET_ICON_PK
    }
  },
  bsc: {
    a: {
      pubK: process.env.WALLET_BSC_ADDRESS,
      privK: process.env.WALLET_BSC_PK
    }
  }
};

async function iconBridgeSDKNodeTests() {
  console.log("IconBridgeSDKNode");
  console.log(lib.bsc);

  // console.log("BTSCore contract");
  // console.log(lib.bsc.getBTSCoreLogicContract());

  // console.log("BTSCore contract");
  // console.log(lib.bsc.getBTSCoreLogicContractAbi());

  // console.log("BTSCore contract");
  // console.log(lib.bsc.getBTSCoreLogicContractObject());

  console.log("getBTPAddress test");
  console.log(lib.utils.getBTPAddress("0x334332e43a", "bsc", true));
  console.log(lib.utils.getBTPAddress("0x334332e43a", "bsc", false));
  console.log(lib.utils.getBTPAddress("hx334332e43a", "icon", true));
  console.log(lib.utils.getBTPAddress("hx334332e43a", "icon", false));

  console.log("transferNativeCoin test");
  lib.bsc.transferNativeCoin(1, wallets.bsc.a.pubK, "to", wallets.bsc.a.privK);
}

export = iconBridgeSDKNodeTests;
