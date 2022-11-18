import IconBridgeSDKWeb from "../../../icon-bridge-sdk-web.mjs";

const lib = new IconBridgeSDKWeb({useMainnet: false});
export default async function iconBridgeSDKWebTests() {
  console.log('iconBridgeSDKWeb')
  console.log(lib);
}
