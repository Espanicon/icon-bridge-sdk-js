import IconBridgeSDK from "../../icon-bridge-sdk";
import testUtils from "../testUtils";

// const sdkMainnet = new IconBridgeSDK();
const sdkTestnet = new IconBridgeSDK({ useMainnet: false });
const testSummary = {
  bsc: {
    [testUtils.methodsName.general[0]]: "done", // balanceOf
    [testUtils.methodsName.general[1]]: "missed", // balanceOfBatch
    [testUtils.methodsName.general[2]]: "missed", // coinId
    [testUtils.methodsName.general[3]]: "missed", // coinNames
    [testUtils.methodsName.general[4]]: "missed", // feeRatio
    [testUtils.methodsName.general[5]]: "missed", // getAccumulatedFees
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

  // Test 1: iconBridgeSDK.bsc.methods.balanceOf()
  console.log(`Test 1: iconBridgeSDK.bsc.methods.balanceOf()`);

  //
  const a1 = await sdkTestnet.bsc.methods.balanceOf(
    "0x4DeD312eB774B9828665448C55Faa8AE15353E56",
    "btp-0x2.icon-ICX"
  );
  console.log("Result:");
  console.log(a1);
  console.log(testUtils.lineBreak.b);

  //
  console.log("Test summary:");
  console.log(testSummary);
  console.log(testUtils.lineBreak.a);
}

export = iconBridgeSDKTests;

// // Test 1: fetch logic contract of a proxy contract (BTSCore) on the
// // BSC Mainnet
// console.log(mainBreak);
// console.log(
//   "Running test on sdk.bsc.methods.getLogicContractAddressOnChain()"
// );
// console.log(secondaryBreak);
// const a = sdkMainnet.sdkUtils.contracts.bsc.mainnet.BTSCore.address;
// const b = await sdkMainnet.bsc.methods.getLogicContractAddressOnChain(a);
// console.log("testing mainnet");
// console.log("proxy contract");
// console.log(a);
// console.log("logic contract");
// console.log(b);
// console.log(secondaryBreak);

// // // Test 2: fetch logic contract of a proxy contract (BTSCore) on the
// // // BSC Testnet
// // const a1 = sdkTestnet.sdkUtils.contracts.bsc.testnet.BTSCore.address;
// // const b1 = await sdkTestnet.bsc.methods.getLogicContractAddressOnChain(a1);
// // console.log("testing testnet");
// // console.log("proxy contract");
// // console.log(a1);
// // console.log("logic contract");
// // console.log(b1);
// // console.log(secondaryBreak);

// // // Test 3: fetch abi of a contract
// // // BSC Mainnet
// // console.log(mainBreak)
// // console.log("Running test on sdk.bsc.methods.getAbiOf");
// // console.log(secondaryBreak)
// // const a2 = "BTSCore";
// // const b2 = sdkMainnet.bsc.methods.getAbiOf(a2);
// // console.log("testing mainnet");
// // console.log("contract label");
// // console.log(a2);
// // console.log("fetched abi:");
// // console.log(JSON.stringify(b2));
// // console.log(secondaryBreak)

// // // Test 4: fetch abi of a contract
// // // BSC Testnet
// // const a3 = "BTSCore";
// // const b3 = sdkTestnet.bsc.methods.getAbiOf(a3);
// // console.log("testing Testnet");
// // console.log("contract label");
// // console.log(a3);
// // console.log("fetched abi:");
// // console.log(JSON.stringify(b3));
// // console.log(secondaryBreak)

// // // Test 5: get BTS Core proxy contract web3js object
// // // BSC Mainnet
// // console.log(mainBreak);
// // console.log("Running test on sdk.bsc.methods.getBTSCoreProxyContractObject()");
// // console.log(secondaryBreak);
// // const b4 = await sdkMainnet.bsc.methods.getBTSCoreProxyContractObject();
// // console.log("testing mainnet");
// // console.log("BTSCore proxy contract");
// // console.log(b4);
// // console.log(secondaryBreak);

// // // Test 6: get BTS Core logic contract web3js object
// // // BSC Mainnet
// // // TODO: This test will fail because the BTS Core logic contract abi
// // // cannot be currently fetched from he bsc tracker
// // console.log(mainBreak);
// // console.log("Running test on sdk.bsc.methods.getBTSCoreLogicContractObject()");
// // console.log(secondaryBreak);
// // const b6 = await sdkMainnet.bsc.methods.getBTSCoreLogicContractObject();
// // console.log("testing mainnet");
// // console.log("BTSCore logic contract");
// // console.log(b6);
// // console.log(secondaryBreak);

// // // Test 7: get BTS Core proxy contract web3js object
// // // BSC testnet
// // console.log(mainBreak);
// // console.log("Running test on sdk.bsc.methods.getBTSCoreProxyContractObject()");
// // console.log(secondaryBreak);
// // const b7 = await sdkTestnet.bsc.methods.getBTSCoreProxyContractObject();
// // console.log("testing testnet");
// // console.log("BTSCore proxy contract");
// // console.log(b7);
// // console.log(secondaryBreak);

// // // Test 8: get BTS Core logic contract web3js object
// // // BSC Mainnet
// // console.log(mainBreak);
// // console.log("Running test on sdk.bsc.methods.getBTSCoreLogicContractObject()");
// // console.log(secondaryBreak);
// // const b8 = await sdkTestnet.bsc.methods.getBTSCoreLogicContractObject();
// // console.log("testing testnet");
// // console.log("BTSCore logic contract");
// // console.log(b8);
// // console.log(secondaryBreak);

// // Test 9: get BTSCore.coinNames()
// // BSC Mainnet
// console.log(mainBreak);
// console.log("Running test on sdk.bsc.methods.coinNames()");
// console.log(secondaryBreak);
// const b9 = await sdkTestnet.bsc.methods.coinNames();
// console.log("testing testnet");
// console.log("BTSCore.coinNames()");
// console.log(b9);
// console.log(secondaryBreak);

// // Test 11: fetch BTS ABI
// // BSC Testnet
// const b11 = sdkTestnet.bsc.methods.getBTSAbi();
// console.log("testing Testnet");
// console.log("fetched abi:");
// b11.forEach((each: any, index: number) => {
//   if (each.type === "function") {
//     console.log(`index: ${index}`);
//     console.log(`name: ${each.name}`);
//     console.log(`inputs: ${JSON.stringify(each.inputs)}`);
//     console.log("##########");
//   }
// });
// console.log(secondaryBreak);
