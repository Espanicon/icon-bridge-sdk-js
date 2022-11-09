require("dotenv").config();
const sdk = require("../../icon-bridge-sdk-node");
const testUtils = require("../testUtils");

const lib = new sdk({ useMainnet: false });
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
  console.log(testUtils.lineBreak.a);
  console.log(
    "Testing iconBridge methods for the BSC network. Non readonly Methods."
  );
  console.log(testUtils.lineBreak.b);

  // Test 1: iconBridgeSDK.bsc.methods.transferNativeCoin(targetAddress, targetChain, from, pk, amount, gas)
  console.log(
    "Test 1: iconBridgeSDK.bsc.methods.transferNativeCoin(targetAddress, targetChain, from, pk, amount, gas)"
  );
  await testUtils.runTestOnMethod(
    lib.bsc.methods.transferNativeCoin,
    false,
    wallets.icon.a.pubK,
    "icon",
    wallets.bsc.a.pubK,
    wallets.bsc.a.privK,
    "0.01"
  );

  // Test 2: iconBridgeSDK.bsc.methods.transfer(targetAddress, targetChain, from, pk, _coinName, _value, gas)
  console.log(
    "Test 1: iconBridgeSDK.bsc.methods.transfer(targetAddress, targetChain, from, pk, _coinName, _value, gas)"
  );
  await testUtils.runTestOnMethod(
    lib.bsc.methods.transfer,
    true,
    wallets.icon.a.pubK,
    "icon",
    wallets.bsc.a.pubK,
    wallets.bsc.a.privK,
    "btp-0x2.icon-ICX",
    "10",
    10000000
  );
  // console.log("IconBridgeSDKNode");
  // console.log(lib.bsc);

  // console.log("BTSCore contract");
  // console.log(lib.bsc.getBTSCoreLogicContract());

  // console.log("BTSCore contract");
  // console.log(lib.bsc.getBTSCoreLogicContractAbi());

  // console.log("BTSCore contract");
  // console.log(lib.bsc.getBTSCoreLogicContractObject());

  // console.log("getBTPAddress test");
  // console.log(lib.sdkUtils.getBTPAddress("0x334332e43a", "bsc", true));
  // console.log(lib.sdkUtils.getBTPAddress("0x334332e43a", "bsc", false));
  // console.log(lib.sdkUtils.getBTPAddress("hx334332e43a", "icon", true));
  // console.log(lib.sdkUtils.getBTPAddress("hx334332e43a", "icon", false));

  // console.log("transferNativeCoin test");
  // const a = await lib.bsc.methods.transferNativeCoin(
  //   "1",
  //   wallets.bsc.a.pubK,
  //   wallets.icon.a.pubK,
  //   wallets.bsc.a.privK,
  //   "icon"
  // );
  // console.log(a);
}

export = iconBridgeSDKNodeTests;
