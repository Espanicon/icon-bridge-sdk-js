const IconBridgeSDK = require("../../dist/icon-bridge-sdk-node");

console.log(IconBridgeSDK);

const sdk = new IconBridgeSDK({ isMainnet: false });

async function runAsync() {
  // Test 1: fetch logic contract of a proxy contract (BTSCore) on the
  // BSC Testnet
  const BTSCoreProxyContract = sdk.utils.contracts.bsc.testnet.BTSCore.address;
  const logicContract = await sdk.bsc.getLogicContract(BTSCoreProxyContract);
  console.log("proxy contract");
  console.log(BTSCoreProxyContract);
  console.log("logic contract");
  console.log(logicContract);
}

runAsync();
