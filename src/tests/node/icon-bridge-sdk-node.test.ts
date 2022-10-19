import IconBridgeSDKNode from "../../icon-bridge-sdk-node.js";

const lib = new IconBridgeSDKNode({ useMainnet: false });
async function iconBridgeSDKNodeTests() {
  console.log("IconBridgeSDKNode");
  console.log(lib);
}

export = iconBridgeSDKNodeTests;
