const IconBridgeSDK = require("../../dist/icon-bridge-sdk-node");

const sdkMainnet = new IconBridgeSDK();
const sdkTestnet = new IconBridgeSDK({ useMainnet: false });

export default async function iconBridgeSDKTests() {
  // Test 1: fetch logic contract of a proxy contract (BTSCore) on the
  // BSC Mainnet
  console.log("Running test on sdk.bsc.getLogicContract()");
  const a = sdkMainnet.utils.contracts.bsc.mainnet.BTSCore.address;
  const b = await sdkMainnet.bsc.getLogicContract(a);
  console.log("testing mainnet");
  console.log("proxy contract");
  console.log(a);
  console.log("logic contract");
  console.log(b);

  // Test 2: fetch logic contract of a proxy contract (BTSCore) on the
  // BSC Testnet
  const a1 = sdkTestnet.utils.contracts.bsc.testnet.BTSCore.address;
  const b1 = await sdkTestnet.bsc.getLogicContract(a1);
  console.log("testing testnet");
  console.log("proxy contract");
  console.log(a1);
  console.log("logic contract");
  console.log(b1);

  // Test 3: fetch abi of a contract
  // BSC Mainnet
  console.log("Running test on sdk.bsc.getAbiOf");
  const a2 = "BTSCore";
  const b2 = sdkMainnet.bsc.getAbiOf(a2);
  console.log("testing mainnet");
  console.log("contract label");
  console.log(a2);
  console.log("fetched abi:");
  console.log(JSON.stringify(b2));

  // Test 4: fetch abi of a contract
  // BSC Testnet
  const a3 = "BTSCore";
  const b3 = sdkTestnet.bsc.getAbiOf(a3);
  console.log("testing Testnet");
  console.log("contract label");
  console.log(a3);
  console.log("fetched abi:");
  console.log(JSON.stringify(b3));
}
