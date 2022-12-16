import React, { useState, useEffect } from "react";
import IconBridgeSDK from "@espanicon/icon-bridge-sdk-js";

const sdk = new IconBridgeSDK({
  useMainnet: false
});

// Wallet address on the BSC chain
const walletAddress = "PLACE_WALLET_ADDRESS_HERE";

export default function App() {
  const [balance, setBalance] = useState(null);
  useEffect(() => {
    async function runAsync() {
      const response = await sdk.bsc.methods.balanceOf(
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
        Calling readonly method 'balanceOf' originating on the BSC side of the
        ICON Bridge.
      </h1>
      <p>Response: {balance}</p>
    </div>
  );
}
