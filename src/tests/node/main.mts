import iconBridgeSDKTests from "./icon-bridge-sdk.test.js";
import iconBridgeSDKWebTests from "./icon-bridge-sdk-web.test.mjs";
// import iconBridgeSDKNodeTests from "./icon-bridge-sdk-node.test.js";

async function runTests() {
  // next block code is to silence typescript error of no unused var
  // const foo = [iconBridgeSDKTests, iconBridgeSDKWebTests, iconBridgeSDKNodeTests];
  const foo = [iconBridgeSDKTests, iconBridgeSDKWebTests];
  console.log('#disregard this log', foo.length)
  // Test for iconBridgeSDKTests module
  // await iconBridgeSDKTests();

  // Test for iconBridgeSDKWebTests
  // await iconBridgeSDKWebTests();

  // Test for iconBridgeSDKNodeTests
  // await iconBridgeSDKNodeTests()
}

runTests();
