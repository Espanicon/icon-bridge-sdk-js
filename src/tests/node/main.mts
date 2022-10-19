import iconBridgeSDKTests from "./icon-bridge-sdk.test.js";
import iconBridgeSDKWebTests from "./icon-bridge-sdk-web.test.mjs";
import iconBridgeSDKNodeTests from "./icon-bridge-sdk-node.test.js";

async function runTests() {
  // next block code is to silence typescript error of no unused var
  const foo = [iconBridgeSDKTests, iconBridgeSDKWebTests, iconBridgeSDKNodeTests];
  console.log('#disregard this log', foo.length)
  //

  // Test for iconBridgeSDKTests module
  console.log('Test on iconBridgeSDKTests')
  await iconBridgeSDKTests();

  // Test for iconBridgeSDKWebTests
  console.log('Test on iconBridgeSDKWebTests')
  await iconBridgeSDKWebTests();

  // Test for iconBridgeSDKNodeTests
  console.log('Test on iconBridgeSDKNodeTests')
  await iconBridgeSDKNodeTests()
}

runTests();
