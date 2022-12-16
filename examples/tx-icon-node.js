const IconBridgeSDK = require("@espanicon/icon-bridge-sdk-js");

const sdk = new IconBridgeSDK({
  useMainnet: false
});

// TODO: place here valids ICON wallet address and private key, and a valid
// BSC wallet address.
const iconWalletAddress = "PLACE_ICON_WALLET_ADDRESS_HERE";
const bscWalletAddress = "PLACE_BSC_WALLET_ADDRESS_HERE";
//

async function runAsync() {
  // test making a 'transferNativeCoin' tx request
  const query0 = await sdk.icon.web.transferNativeCoin(
    bscWalletAddress,
    "icon",
    iconWalletAddress,
    "50"
  );
  console.log(
    `Result for 'transferNativeCoin' tx request originating from the ICON testnet:\n${JSON.stringify(
      query0
    )}`
  );
}

// run async app
runAsync();
