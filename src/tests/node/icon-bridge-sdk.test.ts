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
  const a = sdkMainnet.sdkUtils.contracts.bsc.mainnet.BTSCore.address + "d";
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
}

export = iconBridgeSDKTests;
