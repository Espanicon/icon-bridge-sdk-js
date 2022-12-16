import React, { useState, useEffect } from "react";
import IconBridgeSDK from "@espanicon/icon-bridge-sdk-js";

const sdk = new IconBridgeSDK({
  useMainnet: false
});

// Wallet address on the ICON and BSC Chains
const bscWalletAddress = "PLACE_WALLET_ADDRESS_HERE";
const iconWalletAddress = "PLACE_WALLET_ADDRESS_HERE";

export default function App() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    async function runAsync() {
      const query = await sdk.icon.web.transferNativeCoin(
        bscWalletAddress,
        "bsc",
        iconWalletAddress,
        "50"
      );
      setResponse(JSON.stringify(query));
    }
    runAsync();
  }, []);
  return (
    <div>
      <h1>
        Calling pre tx web method 'transferNativeCoin' originating on the ICON
        side of the ICON Bridge.
      </h1>
      <p>Response: {response}</p>
    </div>
  );
}
