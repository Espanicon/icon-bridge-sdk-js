const IconBridgeSDK = require("../../dist/icon-bridge-sdk-node");

console.log(IconBridgeSDK);

const sdk = new IconBridgeSDK();

async function runAsync() {
  // Test 1: fetch logic contract of a proxy contract (BTSCore) on the
  // BSC mainnet
  const BTSCoreProxyContract = sdk.utils.contracts.bsc.mainnet.BTSCore.address;
  const logicContract = await sdk.bsc.getLogicContract(BTSCoreProxyContract);
  console.log(logicContract);
}

runAsync();
