const IconBridgeSDK = require("../../dist/icon-bridge-sdk-node");

const sdkMainnet = new IconBridgeSDK();
const sdkTestnet = new IconBridgeSDK({ useMainnet: false });

async function runAsync() {
  // Test 1: fetch logic contract of a proxy contract (BTSCore) on the
  // BSC Mainnet
  const a = sdkMainnet.utils.contracts.bsc.mainnet.BTSCore.address;
  const b = await sdkMainnet.bsc.getLogicContract(a);
  console.log("testing mainnet");
  console.log("proxy contract");
  console.log(a);
  console.log("logic contract");
  console.log(b);

  // Test 1: fetch logic contract of a proxy contract (BTSCore) on the
  // BSC Testnet
  const a1 = sdkTestnet.utils.contracts.bsc.testnet.BTSCore.address;
  const b1 = await sdkTestnet.bsc.getLogicContract(a1);
  console.log("testing testnet");
  console.log("proxy contract");
  console.log(a1);
  console.log("logic contract");
  console.log(b1);
}

runAsync();
