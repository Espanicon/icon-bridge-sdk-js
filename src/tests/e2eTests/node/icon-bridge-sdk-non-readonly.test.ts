require("dotenv").config();
const sdk = require("../../../icon-bridge-sdk-node");
const testUtils = require("../testUtils");

const lib = new sdk({
  useMainnet: false,
  bscProvider: { hostname: "https://data-seed-prebsc-2-s3.binance.org:8545/" }
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
    "0.3"
  );

  // Test 2: iconBridgeSDK.bsc.methods.approveAndTransfer(targetAddress, targetChain, from, pk, _coinName, _value, gas)
  console.log(
    "Test 2: iconBridgeSDK.bsc.methods.approveAndTransfer(targetAddress, targetChain, from, pk, _coinName, _value, gas)"
  );
  await testUtils.runTestOnMethod(
    lib.bsc.methods.approveAndTransfer,
    true,
    wallets.icon.a.pubK,
    "icon",
    wallets.bsc.a.pubK,
    wallets.bsc.a.privK,
    "btp-0x2.icon-ICX",
    "100",
    "0x7d8c52A23FD7e3ca1342797baE7caF6d7b8036BA",
    lib.sdkUtils.genericAbi,
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
    "100",
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
    "1000",
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
    "0.05",
    10000000
  );

  // Test 6.1: iconBridgeSDK.bsc.methods.approveAndTransfer(targetAddress, targetChain, from, pk, _coinName, _value, gas)
  console.log(
    "Test 6.1: iconBridgeSDK.bsc.methods.approveAndTransfer(targetAddress, targetChain, from, pk, _coinName, _value, gas)"
  );
  await testUtils.runTestOnMethod(
    lib.bsc.methods.approveAndTransfer,
    true,
    wallets.icon.a.pubK,
    "icon",
    wallets.bsc.a.pubK,
    wallets.bsc.a.privK,
    "btp-0x61.bsc-ETH",
    "0.04",
    "0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378",
    lib.sdkUtils.genericAbi,
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
    "0.05",
    10000000
  );

  // Test 7.1: iconBridgeSDK.bsc.methods.approveAndTransfer(targetAddress, targetChain, from, pk, _coinName, _value, gas)
  console.log(
    "Test 7.1: iconBridgeSDK.bsc.methods.approveAndTransfer(targetAddress, targetChain, from, pk, _coinName, _value, gas)"
  );
  await testUtils.runTestOnMethod(
    lib.bsc.methods.approveAndTransfer,
    true,
    wallets.icon.a.pubK,
    "icon",
    wallets.bsc.a.pubK,
    wallets.bsc.a.privK,
    "btp-0x61.bsc-BTCB",
    "0.04",
    "0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8",
    lib.sdkUtils.genericAbi,
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
    "9",
    10000000
  );
}

export = iconBridgeSDKNodeTests;
