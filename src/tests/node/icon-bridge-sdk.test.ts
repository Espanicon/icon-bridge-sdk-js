import IconBridgeSDK from "../../icon-bridge-sdk";

const sdkMainnet = new IconBridgeSDK();
const sdkTestnet = new IconBridgeSDK({ useMainnet: false });

const mainBreak = "==================================";
const secondaryBreak = "######";

async function iconBridgeSDKTests() {
  // Test 1: fetch logic contract of a proxy contract (BTSCore) on the
  // BSC Mainnet
  console.log(mainBreak);
  console.log("Running test on sdk.bsc.getLogicContract()");
  console.log(secondaryBreak);
  const a = sdkMainnet.sdkUtils.contracts.bsc.mainnet.BTSCore.address;
  const b = await sdkMainnet.bsc.getLogicContract(a);
  console.log("testing mainnet");
  console.log("proxy contract");
  console.log(a);
  console.log("logic contract");
  console.log(b);
  console.log(secondaryBreak);

  // Test 2: fetch logic contract of a proxy contract (BTSCore) on the
  // BSC Testnet
  const a1 = sdkTestnet.sdkUtils.contracts.bsc.testnet.BTSCore.address;
  const b1 = await sdkTestnet.bsc.getLogicContract(a1);
  console.log("testing testnet");
  console.log("proxy contract");
  console.log(a1);
  console.log("logic contract");
  console.log(b1);
  console.log(secondaryBreak);

  // // Test 3: fetch abi of a contract
  // // BSC Mainnet
  // console.log(mainBreak)
  // console.log("Running test on sdk.bsc.getAbiOf");
  // console.log(secondaryBreak)
  // const a2 = "BTSCore";
  // const b2 = sdkMainnet.bsc.getAbiOf(a2);
  // console.log("testing mainnet");
  // console.log("contract label");
  // console.log(a2);
  // console.log("fetched abi:");
  // console.log(JSON.stringify(b2));
  // console.log(secondaryBreak)

  // // Test 4: fetch abi of a contract
  // // BSC Testnet
  // const a3 = "BTSCore";
  // const b3 = sdkTestnet.bsc.getAbiOf(a3);
  // console.log("testing Testnet");
  // console.log("contract label");
  // console.log(a3);
  // console.log("fetched abi:");
  // console.log(JSON.stringify(b3));
  // console.log(secondaryBreak)

  // Test 5: get BTS Core proxy contract web3js object
  // BSC Mainnet
  console.log(mainBreak);
  console.log("Running test on sdk.bsc.getBTSCoreProxyContractObject()");
  console.log(secondaryBreak);
  const b4 = await sdkMainnet.bsc.getBTSCoreProxyContractObject();
  console.log("testing mainnet");
  console.log("BTSCore proxy contract");
  console.log(b4);
  console.log(secondaryBreak);

  // // Test 6: get BTS Core logic contract web3js object
  // // BSC Mainnet
  // // TODO: This test will fail because the BTS Core logic contract abi
  // // cannot be currently fetched from he bsc tracker
  // console.log(mainBreak);
  // console.log("Running test on sdk.bsc.getBTSCoreLogicContractObject()");
  // console.log(secondaryBreak);
  // const b6 = await sdkMainnet.bsc.getBTSCoreLogicContractObject();
  // console.log("testing mainnet");
  // console.log("BTSCore logic contract");
  // console.log(b6);
  // console.log(secondaryBreak);

  // Test 7: get BTS Core proxy contract web3js object
  // BSC testnet
  console.log(mainBreak);
  console.log("Running test on sdk.bsc.getBTSCoreProxyContractObject()");
  console.log(secondaryBreak);
  const b7 = await sdkTestnet.bsc.getBTSCoreProxyContractObject();
  console.log("testing testnet");
  console.log("BTSCore proxy contract");
  console.log(b7);
  console.log(secondaryBreak);

  // Test 8: get BTS Core logic contract web3js object
  // BSC Mainnet
  console.log(mainBreak);
  console.log("Running test on sdk.bsc.getBTSCoreLogicContractObject()");
  console.log(secondaryBreak);
  const b8 = await sdkTestnet.bsc.getBTSCoreLogicContractObject();
  console.log("testing testnet");
  console.log("BTSCore logic contract");
  console.log(b8);
  console.log(secondaryBreak);
}

export = iconBridgeSDKTests;
