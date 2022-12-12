const IconBridgeSDK = require("@espanicon/icon-bridge-sdk-js");

const sdk = new IconBridgeSDK({
  useMainnet: false,
  bscProvider: { hostname: "https://data-seed-prebsc-1-s3.binance.org:8545" }
});

// TODO: place here valids BSC wallet address and private key, and a valid
// ICON wallet address.
const bscWalletAddress = "PLACE_BSC_WALLET_ADDRESS_HERE";
const bscWalletPrivateKey = "PLACE_BSC_PRIVATE_KEY_HERE";
const iconWalletAddress = "PLACE_ICON_WALLET_ADDRESS_HERE";
//

async function runAsync() {
  // test making a 'transferNativeCoin' request
  const query0 = await sdk.bsc.methods.transferNativeCoin(
    iconWalletAddress,
    "icon",
    bscWalletAddress,
    bscWalletPrivateKey,
    "0.01"
  );
  console.log(
    `Result for 'transferNativeCoin' tx request originating from the BSC testnet:\n${JSON.stringify(
      query0
    )}`
  );
}

// run async app
runAsync();
