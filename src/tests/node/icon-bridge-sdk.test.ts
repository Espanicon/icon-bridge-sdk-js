import IconBridgeSDK from "../../icon-bridge-sdk";
import testUtils from "../testUtils";

// const sdkMainnet = new IconBridgeSDK();
const sdkTestnet = new IconBridgeSDK({ useMainnet: false });
const testSummary = {
  bsc: {
    [testUtils.methodsName.general[0]]: "done", // balanceOf
    [testUtils.methodsName.general[1]]: "done", // balanceOfBatch
    [testUtils.methodsName.general[2]]: "done", // coinId
    [testUtils.methodsName.general[3]]: "done", // coinNames
    [testUtils.methodsName.general[4]]: "done", // feeRatio
    [testUtils.methodsName.general[5]]: "done", // getAccumulatedFees
    [testUtils.methodsName.general[6]]: "missed", // getNativeCoinName
    [testUtils.methodsName.general[7]]: "missed", // getOwners
    [testUtils.methodsName.general[8]]: "missed", // isOwner
    [testUtils.methodsName.general[9]]: "missed", // isValidCoin
    [testUtils.methodsName.general[10]]: "missed", // addOwner
    [testUtils.methodsName.general[11]]: "missed", // handleResponseService
    [testUtils.methodsName.general[12]]: "missed", // initialize
    [testUtils.methodsName.general[13]]: "missed", // mint
    [testUtils.methodsName.general[14]]: "missed", // reclaim
    [testUtils.methodsName.general[15]]: "missed", // refund
    [testUtils.methodsName.general[16]]: "missed", // register
    [testUtils.methodsName.general[17]]: "missed", // removeOwner
    [testUtils.methodsName.general[18]]: "missed", // setFeeRatio
    [testUtils.methodsName.general[19]]: "missed", // transfer
    [testUtils.methodsName.general[20]]: "missed", // transferBatch
    [testUtils.methodsName.general[21]]: "missed", // transferFees
    [testUtils.methodsName.general[22]]: "missed" // transferNativeCoin
  }
};

async function iconBridgeSDKTests() {
  console.log(testUtils.lineBreak.a);
  console.log("Testing iconBridge methods for the BSC network");
  console.log(testUtils.lineBreak.b);

  // Test 1: iconBridgeSDK.bsc.methods.balanceOf(_owner, _coinName)
  console.log(
    `Test 1: iconBridgeSDK.bsc.methods.balanceOf(_owner: string, _coinName: string)`
  );
  //
  await testUtils.runTestOnMethod(
    sdkTestnet.bsc.methods.balanceOf,
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
    "0x4DeD312eB774B9828665448C55Faa8AE15353E56",
    ["btp-0x2.icon-ICX"]
  );

  // Test 3: iconBridgeSDK.bsc.methods.coinId(_coinName)
  console.log(`Test 3: iconBridgeSDK.bsc.methods.coinId(_coinName: string)`);
  //
  await testUtils.runTestOnMethod(
    sdkTestnet.bsc.methods.coinId,
    "btp-0x2.icon-ICX"
  );

  // Test 4: iconBridgeSDK.bsc.methods.coinNames()
  console.log(`Test 4: iconBridgeSDK.bsc.methods.coinNames()`);
  //
  await testUtils.runTestOnMethod(sdkTestnet.bsc.methods.coinNames);

  // Test 5: iconBridgeSDK.bsc.methods.feeRatio(_coinName)
  console.log(`Test 5: iconBridgeSDK.bsc.methods.feeRatio(_coinName: string)`);
  //
  await testUtils.runTestOnMethod(
    sdkTestnet.bsc.methods.feeRatio,
    "btp-0x2.icon-ICX"
  );

  // Test 6: iconBridgeSDK.bsc.methods.getAccumulatedFees()
  console.log(`Test 6: iconBridgeSDK.bsc.methods.getAccumulatedFees()`);
  //
  await testUtils.runTestOnMethod(sdkTestnet.bsc.methods.getAccumulatedFees);

  //// Test 7: iconBridgeSDK.bsc.methods.getNativeCoinName()
  //console.log(`Test 7: iconBridgeSDK.bsc.methods.getNativeCoinName()`);
  ////
  //await testUtils.runTestOnMethod(sdkTestnet.bsc.methods.getNativeCoinName);

  //// Test 8: iconBridgeSDK.bsc.methods.getOwners()
  //console.log(`Test 8: iconBridgeSDK.bsc.methods.getOwners()`);
  ////
  //await testUtils.runTestOnMethod(sdkTestnet.bsc.methods.getOwners);

  //// Test 9: iconBridgeSDK.bsc.methods.isOwner(_owner)
  //console.log(`Test 9: iconBridgeSDK.bsc.methods.isOwner(_isOwner: string)`);
  ////
  //await testUtils.runTestOnMethod(
  //  sdkTestnet.bsc.methods.isOwner,
  //  "0x4DeD312eB774B9828665448C55Faa8AE15353E56"
  //);

  //// Test 10: iconBridgeSDK.bsc.methods.isValidCoin(_coinName)
  //console.log(
  //  `Test 10: iconBridgeSDK.bsc.methods.isValidCoin(_coinName: string)`
  //);
  ////
  //await testUtils.runTestOnMethod(
  //  sdkTestnet.bsc.methods.isValidCoin,
  //  "btp-0x2.icon-ICX"
  //);

  //// Test 11: iconBridgeSDK.bsc.methods.addOwner(_owner)
  //console.log(`Test 11: iconBridgeSDK.bsc.methods.addOwner(_owner: string)`);
  ////
  //await testUtils.runTestOnMethod(
  //  sdkTestnet.bsc.methods.addOwner,
  //  "0x4DeD312eB774B9828665448C55Faa8AE15353E56"
  //);

  //// Test 12: iconBridgeSDK.bsc.methods.handleResponseService(_requester, _coinName, _value, _fee, _rspCode)
  //console.log(
  //  `Test 12: iconBridgeSDK.bsc.methods.handleResponseService(_requester, _coinName, _value, _fee, _rspCode)`
  //);
  ////
  //await testUtils.runTestOnMethod(
  //  sdkTestnet.bsc.methods.handleResponseService,
  //  "0x4DeD312eB774B9828665448C55Faa8AE15353E56",
  //  "btp-0x2.icon-ICX",
  //  20000000000000,
  //  2000,
  //  232
  //);

  //// Test 13: iconBridgeSDK.bsc.methods.initialize(_nativeCoinName, _feeNumerator, _fixedFee)
  //console.log(
  //  `Test 13: iconBridgeSDK.bsc.methods.initialize(_nativeCoinName, _feeNumerator,  _fixedFee)`
  //);
  ////
  //await testUtils.runTestOnMethod(
  //  sdkTestnet.bsc.methods.initialize,
  //  "btp-0x2.icon-ICX",
  //  20000000000000,
  //  2000
  //);

  //// Test 14: iconBridgeSDK.bsc.methods.mint(_to, _coinName, _value)
  //console.log(
  //  `Test 14: iconBridgeSDK.bsc.methods.mint(_to, _coinName, _value)`
  //);
  ////
  //await testUtils.runTestOnMethod(
  //  sdkTestnet.bsc.methods.mint,
  //  "0x4DeD312eB774B9828665448C55Faa8AE15353E56",
  //  "btp-0x2.icon-ICX",
  //  20000000000
  //);

  //// Test 15: iconBridgeSDK.bsc.methods.reclaim(
  //console.log(
  //  `Test 15: iconBridgeSDK.bsc.methods.reclaim(`
  //);
  ////
  //await testUtils.runTestOnMethod(
  //  sdkTestnet.bsc.methods.reclaim,
  //  "0x4DeD312eB774B9828665448C55Faa8AE15353E56",
  //  "btp-0x2.icon-ICX",
  //  20000000000
  //);
  //// Test 16: iconBridgeSDK.bsc.methods.refund(
  //console.log(
  //  `Test 16: iconBridgeSDK.bsc.methods.refund(`
  //);
  ////
  //await testUtils.runTestOnMethod(
  //  sdkTestnet.bsc.methods.refund,
  //  "0x4DeD312eB774B9828665448C55Faa8AE15353E56",
  //  "btp-0x2.icon-ICX",
  //  20000000000
  //);
  //// Test 17: iconBridgeSDK.bsc.methods.register(
  //console.log(
  //  `Test 17: iconBridgeSDK.bsc.methods.register(`
  //);
  ////
  //await testUtils.runTestOnMethod(
  //  sdkTestnet.bsc.methods.register,
  //  "0x4DeD312eB774B9828665448C55Faa8AE15353E56",
  //  "btp-0x2.icon-ICX",
  //  20000000000
  //);
  //// Test 18: iconBridgeSDK.bsc.methods.removeOwner(
  //console.log(
  //  `Test 18: iconBridgeSDK.bsc.methods.removeOwner(`
  //);
  ////
  //await testUtils.runTestOnMethod(
  //  sdkTestnet.bsc.methods.removeOwner,
  //  "0x4DeD312eB774B9828665448C55Faa8AE15353E56",
  //  "btp-0x2.icon-ICX",
  //  20000000000
  //);
  //// Test 19: iconBridgeSDK.bsc.methods.setFeeRatio(
  //console.log(
  //  `Test 19: iconBridgeSDK.bsc.methods.setFeeRatio(`
  //);
  ////
  //await testUtils.runTestOnMethod(
  //  sdkTestnet.bsc.methods.setFeeRatio,
  //  "0x4DeD312eB774B9828665448C55Faa8AE15353E56",
  //  "btp-0x2.icon-ICX",
  //  20000000000
  //);
  //// Test 20: iconBridgeSDK.bsc.methods.transfer(
  //console.log(
  //  `Test 20: iconBridgeSDK.bsc.methods.transfer(`
  //);
  ////
  //await testUtils.runTestOnMethod(
  //  sdkTestnet.bsc.methods.transfer,
  //  "0x4DeD312eB774B9828665448C55Faa8AE15353E56",
  //  "btp-0x2.icon-ICX",
  //  20000000000
  //);
  //// Test 21: iconBridgeSDK.bsc.methods.transferBatch(
  //console.log(
  //  `Test 21: iconBridgeSDK.bsc.transferBatch(`
  //);
  ////
  //await testUtils.runTestOnMethod(
  //  sdkTestnet.bsc.methods.transferBatch,
  //  "0x4DeD312eB774B9828665448C55Faa8AE15353E56",
  //  "btp-0x2.icon-ICX",
  //  20000000000
  //);
  //// Test 22: iconBridgeSDK.bsc.methods.transferFees(
  //console.log(
  //  `Test 22: iconBridgeSDK.bsc.methods.transferFees(`
  //);
  ////
  //await testUtils.runTestOnMethod(
  //  sdkTestnet.bsc.methods.transferFees,
  //  "0x4DeD312eB774B9828665448C55Faa8AE15353E56",
  //  "btp-0x2.icon-ICX",
  //  20000000000
  //);
  //// Test 23: iconBridgeSDK.bsc.methods.transferNativeCoin(
  //console.log(
  //  `Test 23: iconBridgeSDK.bsc.methods.transferNativeCoin(`
  //);
  ////
  //await testUtils.runTestOnMethod(
  //  sdkTestnet.bsc.methods.trasnferNativeCoin,
  //  "0x4DeD312eB774B9828665448C55Faa8AE15353E56",
  //  "btp-0x2.icon-ICX",
  //  20000000000
  //);

  //
  console.log("Test summary:");
  console.log(testSummary);
  console.log(testUtils.lineBreak.a);
}

export = iconBridgeSDKTests;
