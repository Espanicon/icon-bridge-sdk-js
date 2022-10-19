import IconBridgeSDKNode from "../../icon-bridge-sdk-node.js";

const lib = new IconBridgeSDKNode({ useMainnet: false });
async function iconBridgeSDKNodeTests() {
  console.log("IconBridgeSDKNode");
  console.log(lib);
  console.log("BTSCore contract");
  console.log(lib.bsc.getBTSCoreLogicContract());
  console.log("BTSCore contract");
  console.log(lib.bsc.getBTSCoreLogicContractAbi());
  console.log("BTSCore contract");
  console.log(lib.bsc.getBTSCoreLogicContractObject());
}

export = iconBridgeSDKNodeTests;
