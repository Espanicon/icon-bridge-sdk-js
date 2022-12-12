const IconBridgeSDK = require("icon-bridge-sdk-js");

const sdk = new IconBridgeSDK({
  useMainnet: false,
  bscProvider: { hostname: "https://data-seed-prebsc-1-s3.binance.org:8545" }
});

// TODO: place here a valid BSC wallet address
const bscWalletAddress = "PLACE_WALLET_ADDRESS_HERE";
//

async function runAsync() {
  // test making a 'balanceOf' query into the bsc testnet
  const query0 = await sdk.bsc.methods.balanceOf(
    bscWalletAddress,
    "btp-0x2.icon-bnUSD"
  );
  console.log(
    `Result for query of 'balanceOf' method on the BSC testnet:\n${JSON.stringify(
      query0
    )}`
  );
}

// run async app
runAsync();
