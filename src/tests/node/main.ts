import iconBridgeSDKTests from "./icon-bridge-sdk.test";
import iconBridgeSDKWebTests from "./icon-bridge-sdk-web.test";
// import iconBridgeSDKNodeTests from "./icon-bridge-sdk-node.test";

async function runTests() {
  // Test for iconBridgeSDKTests module
  await iconBridgeSDKTests();

  // Test for iconBridgeSDKWebTests
  await iconBridgeSDKWebTests();

  // Test for iconBridgeSDKNodeTests
  // await iconBridgeSDKNodeTests()
}

runTests();
