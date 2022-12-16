import React, { useState, useEffect } from "react";
import IconBridgeSDK from "@espanicon/icon-bridge-sdk-js";

const sdk = new IconBridgeSDK({
  useMainnet: false
});

// Wallet address on the ICON Chain
const walletAddress = "PLACE_WALLET_ADDRESS_HERE";

export default function App() {
  const [balance, setBalance] = useState(null);
  useEffect(() => {
    async function runAsync() {
      const response = await sdk.icon.methods.balanceOf(
        walletAddress,
        "btp-0x2.icon-bnUSD"
      );
      setBalance(JSON.stringify(response));
    }
    runAsync();
  }, []);
  return (
    <div>
      <h1>
        Calling readonly method 'balanceOf' originating on the ICON side of the
        ICON Bridge.
      </h1>
      <p>Response: {balance}</p>
    </div>
  );
}
