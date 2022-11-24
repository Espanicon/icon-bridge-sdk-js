import sdkNonReadonlyTests from "./icon-bridge-sdk-non-readonly.test.js";
import iconBridgeSDKWebTests from "./icon-bridge-sdk-web.test.mjs";

async function runTests() {
  // next block code is to silence typescript error of no unused var
  const foo = [iconBridgeSDKWebTests, sdkNonReadonlyTests ];
  console.log('#disregard this log', foo.length)
  //


  // Test for non-readonly methods on BSC side of SDK
  console.log('Test Module: Running tests on non-readonly methods.')
  await sdkNonReadonlyTests();

  // Test for iconBridgeSDKWebTests
  // console.log('Test on iconBridgeSDKWebTests')
  // await iconBridgeSDKWebTests();

  // Test for iconBridgeSDKNodeTests
  // console.log('Test on iconBridgeSDKNodeTests')
  // await iconBridgeSDKNodeTests()
}

runTests();
