require("dotenv").config();
const sdk = require("../../icon-bridge-sdk-node");
const testUtils = require("../testUtils");

const lib = new sdk({
  useMainnet: false,
  bscProvider: { hostname: "https://data-seed-prebsc-2-s1.binance.org:8545" }
});
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
    true,
    wallets.icon.a.pubK,
    "icon",
    wallets.bsc.a.pubK,
    wallets.bsc.a.privK,
    "0.01"
  );

  // Test 2: iconBridgeSDK.bsc.methods.transfer(targetAddress, targetChain, from, pk, _coinName, _value, gas)
  console.log(
    "Test 2: iconBridgeSDK.bsc.methods.transfer(targetAddress, targetChain, from, pk, _coinName, _value, gas)"
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

  // Test 3: iconBridgeSDK.bsc.methods.transferICX(targetAddress, targetChain, from, pk, _coinName, _value, gas)
  console.log(
    "Test 3: iconBridgeSDK.bsc.methods.transferICX(targetAddress, targetChain, from, pk, _coinName, _value, gas)"
  );
  await testUtils.runTestOnMethod(
    lib.bsc.methods.transferICX,
    true,
    wallets.icon.a.pubK,
    "icon",
    wallets.bsc.a.pubK,
    wallets.bsc.a.privK,
    "10",
    10000000
  );

  // Test 4: iconBridgeSDK.bsc.methods.transferBnUSD(targetAddress, targetChain, from, pk, _coinName, _value, gas)
  console.log(
    "Test 4: iconBridgeSDK.bsc.methods.transferBnUSD(targetAddress, targetChain, from, pk, _coinName, _value, gas)"
  );
  await testUtils.runTestOnMethod(
    lib.bsc.methods.transferBnUSD,
    true,
    wallets.icon.a.pubK,
    "icon",
    wallets.bsc.a.pubK,
    wallets.bsc.a.privK,
    "10",
    10000000
  );

  // Test 5: iconBridgeSDK.bsc.methods.transferSICX(targetAddress, targetChain, from, pk, _coinName, _value, gas)
  console.log(
    "Test 5: iconBridgeSDK.bsc.methods.transferSICX(targetAddress, targetChain, from, pk, _coinName, _value, gas)"
  );
  await testUtils.runTestOnMethod(
    lib.bsc.methods.transferSICX,
    true,
    wallets.icon.a.pubK,
    "icon",
    wallets.bsc.a.pubK,
    wallets.bsc.a.privK,
    "10",
    10000000
  );

  // Test 6: iconBridgeSDK.bsc.methods.transferETH(targetAddress, targetChain, from, pk, _coinName, _value, gas)
  console.log(
    "Test 6: iconBridgeSDK.bsc.methods.transferETH(targetAddress, targetChain, from, pk, _coinName, _value, gas)"
  );
  await testUtils.runTestOnMethod(
    lib.bsc.methods.transferETH,
    true,
    wallets.icon.a.pubK,
    "icon",
    wallets.bsc.a.pubK,
    wallets.bsc.a.privK,
    "10",
    10000000
  );

  // Test 7: iconBridgeSDK.bsc.methods.transferBTCB(targetAddress, targetChain, from, pk, _coinName, _value, gas)
  console.log(
    "Test 7: iconBridgeSDK.bsc.methods.transferBTCB(targetAddress, targetChain, from, pk, _coinName, _value, gas)"
  );
  await testUtils.runTestOnMethod(
    lib.bsc.methods.transferBTCB,
    true,
    wallets.icon.a.pubK,
    "icon",
    wallets.bsc.a.pubK,
    wallets.bsc.a.privK,
    "10",
    10000000
  );

  // Test 8: iconBridgeSDK.bsc.methods.transferUSDC(targetAddress, targetChain, from, pk, _coinName, _value, gas)
  console.log(
    "Test 8: iconBridgeSDK.bsc.methods.transferUSDC(targetAddress, targetChain, from, pk, _coinName, _value, gas)"
  );
  await testUtils.runTestOnMethod(
    lib.bsc.methods.transferUSDC,
    true,
    wallets.icon.a.pubK,
    "icon",
    wallets.bsc.a.pubK,
    wallets.bsc.a.privK,
    "10",
    10000000
  );

  // Test 9: iconBridgeSDK.bsc.methods.transferUSDT(targetAddress, targetChain, from, pk, _coinName, _value, gas)
  console.log(
    "Test 9: iconBridgeSDK.bsc.methods.transferUSDT(targetAddress, targetChain, from, pk, _coinName, _value, gas)"
  );
  await testUtils.runTestOnMethod(
    lib.bsc.methods.transferUSDT,
    true,
    wallets.icon.a.pubK,
    "icon",
    wallets.bsc.a.pubK,
    wallets.bsc.a.privK,
    "10",
    10000000
  );

  // Test 10: iconBridgeSDK.bsc.methods.transferBUSD(targetAddress, targetChain, from, pk, _coinName, _value, gas)
  console.log(
    "Test 10: iconBridgeSDK.bsc.methods.transferBUSD(targetAddress, targetChain, from, pk, _coinName, _value, gas)"
  );
  await testUtils.runTestOnMethod(
    lib.bsc.methods.transferBUSD,
    true,
    wallets.icon.a.pubK,
    "icon",
    wallets.bsc.a.pubK,
    wallets.bsc.a.privK,
    "10",
    10000000
  );

  // Test 11: iconBridgeSDK.bsc.methods.addOwner(from, pk, _owner, gas)
  console.log(
    "Test 11: iconBridgeSDK.bsc.methods.addOwner(from, pk, _owner, gas)"
  );
  await testUtils.runTestOnMethod(
    lib.bsc.methods.addOwner,
    false,
    wallets.bsc.a.pubK,
    wallets.bsc.a.privK,
    wallets.bsc.a.pubK,
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
