const IconBridgeSDK = require("@espanicon/icon-bridge-sdk-js");

const sdk = new IconBridgeSDK({
  useMainnet: false
});

// TODO: place here a valid ICON wallet address
const iconWalletAddress = "PLACE_WALLET_ADDRESS_HERE";
//

async function runAsync() {
  // test making a 'balanceOf' query into the icon testnet
  const query0 = await sdk.icon.methods.balanceOf(
    iconWalletAddress,
    "btp-0x2.icon-bnUSD"
  );
  console.log(
    `Result for query of 'balanceOf' method on the ICON testnet:\n${JSON.stringify(
      query0
    )}`
  );
}

// run async app
runAsync();
