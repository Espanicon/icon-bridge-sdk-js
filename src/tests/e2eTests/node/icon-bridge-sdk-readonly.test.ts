import IconBridgeSDK from "../../../icon-bridge-sdk-node";
import testUtils from "../testUtils";

// const sdkMainnet = new IconBridgeSDK();
const sdkTestnet = new IconBridgeSDK({
  useMainnet: false,
  bscProvider: { hostname: "https://data-seed-prebsc-2-s1.binance.org:8545" }
});

async function iconBridgeSDKTests() {
  console.log(testUtils.lineBreak.a);
  console.log(
    "Testing iconBridge methods for the BSC network. Readonly Methods."
  );
  console.log(testUtils.lineBreak.b);

  // Test 1: iconBridgeSDK.bsc.methods.balanceOf(_owner, _coinName)
  console.log(
    `Test 1: iconBridgeSDK.bsc.methods.balanceOf(_owner: string, _coinName: string)`
  );
  //
  await testUtils.runTestOnMethod(
    sdkTestnet.bsc.methods.balanceOf,
    false,
    "0x4DeD312eB774B9828665448C55Faa8AE15353E56",
    "btp-0x2.icon-bnUSD"
  );

  // Test 2: iconBridgeSDK.bsc.methods.balanceOfBatch(_owner, _coinNames)
  console.log(
    `Test 2: iconBridgeSDK.bsc.methods.balanceOfBatch(_owner: string, _coinNames: string[])`
  );
  //
  await testUtils.runTestOnMethod(
    sdkTestnet.bsc.methods.balanceOfBatch,
    false,
    "0x4DeD312eB774B9828665448C55Faa8AE15353E56",
    ["btp-0x2.icon-ICX"]
  );

  // Test 3: iconBridgeSDK.bsc.methods.coinId(_coinName)
  console.log(`Test 3: iconBridgeSDK.bsc.methods.coinId(_coinName: string)`);
  //
  await testUtils.runTestOnMethod(
    sdkTestnet.bsc.methods.coinId,
    false,
    "btp-0x2.icon-ICX"
  );

  // Test 4: iconBridgeSDK.bsc.methods.coinNames()
  console.log(`Test 4: iconBridgeSDK.bsc.methods.coinNames()`);
  //
  await testUtils.runTestOnMethod(sdkTestnet.bsc.methods.coinNames, false);

  // Test 5: iconBridgeSDK.bsc.methods.feeRatio(_coinName)
  console.log(`Test 5: iconBridgeSDK.bsc.methods.feeRatio(_coinName: string)`);
  //
  await testUtils.runTestOnMethod(
    sdkTestnet.bsc.methods.feeRatio,
    false,
    "btp-0x2.icon-ICX"
  );

  // Test 6: iconBridgeSDK.bsc.methods.getAccumulatedFees()
  console.log(`Test 6: iconBridgeSDK.bsc.methods.getAccumulatedFees()`);
  //
  await testUtils.runTestOnMethod(
    sdkTestnet.bsc.methods.getAccumulatedFees,
    false
  );

  // Test 7: iconBridgeSDK.bsc.methods.getNativeCoinName()
  console.log(`Test 7: iconBridgeSDK.bsc.methods.getNativeCoinName()`);
  //
  await testUtils.runTestOnMethod(
    sdkTestnet.bsc.methods.getNativeCoinName,
    false
  );

  // Test 8: iconBridgeSDK.bsc.methods.getOwners()
  console.log(`Test 8: iconBridgeSDK.bsc.methods.getOwners()`);
  //
  await testUtils.runTestOnMethod(sdkTestnet.bsc.methods.getOwners, false);

  // Test 9: iconBridgeSDK.bsc.methods.isOwner(_owner)
  console.log(`Test 9: iconBridgeSDK.bsc.methods.isOwner(_isOwner: string)`);
  //
  await testUtils.runTestOnMethod(
    sdkTestnet.bsc.methods.isOwner,
    false,
    "0x4DeD312eB774B9828665448C55Faa8AE15353E56"
  );

  // Test 10: iconBridgeSDK.bsc.methods.isValidCoin(_coinName)
  console.log(
    `Test 10: iconBridgeSDK.bsc.methods.isValidCoin(_coinName: string)`
  );
  //
  await testUtils.runTestOnMethod(
    sdkTestnet.bsc.methods.isValidCoin,
    false,
    "btp-0x2.icon-ICX"
  );
}

export = iconBridgeSDKTests;
