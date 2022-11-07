import IconBridgeSDK from "../../icon-bridge-sdk-node";
import testUtils from "../testUtils";

// const sdkMainnet = new IconBridgeSDK();
const sdkTestnet = new IconBridgeSDK({ useMainnet: false });
console.log(sdkTestnet);

const testSummary = {
  bsc: {
    // balanceOf
    [testUtils.methodsName.general[0]]: "done",
    // balanceOfBatch
    [testUtils.methodsName.general[1]]: "done",
    // coinNames
    [testUtils.methodsName.general[2]]: "done",
    // coinNames
    [testUtils.methodsName.general[3]]: "done",
    // feeRatio
    [testUtils.methodsName.general[4]]: "done",
    // getAccumulatedFees
    [testUtils.methodsName.general[5]]: "done",
    // getNativeCoinName
    [testUtils.methodsName.general[6]]: "done",
    // getOwners
    [testUtils.methodsName.general[7]]: "done",
    // isOwner
    [testUtils.methodsName.general[8]]: "done",
    // isValidCoin
    [testUtils.methodsName.general[9]]: "done"
    // addOwner: not readonly
    // [testUtils.methodsName.general[10]]: "done",
    // handleResponseService: can only be called by BTSPeriphery
    // [testUtils.methodsName.general[11]]: "missed",
    // initialize: not readonly
    // [testUtils.methodsName.general[12]]: "missed",
    // mint: can only be called by BTSPeriphery
    // [testUtils.methodsName.general[13]]: "missed",
    // reclaim: not readonly
    // [testUtils.methodsName.general[14]]: "missed",
    // refund: can only be called by BTSCore
    // [testUtils.methodsName.general[15]]: "missed",
    // register: can only be called by contract owner
    // [testUtils.methodsName.general[16]]: "missed",
    // removeOwner: can only be called by contract owner
    // [testUtils.methodsName.general[17]]: "missed",
    // setFeeRatio: can only be called by contract owner
    // [testUtils.methodsName.general[18]]: "missed",
    // transfer: not readonly
    // [testUtils.methodsName.general[19]]: "missed",
    // transferBatch: not readonly
    // [testUtils.methodsName.general[20]]: "missed",
    // transferFees: can only be called by BTSPeriphery
    // [testUtils.methodsName.general[21]]: "missed",
    // transferNativeCoin: not readonly
    // [testUtils.methodsName.general[22]]: "missed"
  }
};

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
    "btp-0x2.icon-ICX"
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

  //
  console.log("Test summary:");
  console.log(testSummary);
  console.log(testUtils.lineBreak.a);
}

export = iconBridgeSDKTests;
