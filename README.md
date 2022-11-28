# IconBridge SDK for Javascript
 ** UNDER DEVELOPMENT **

WRITE INTRODUCTION AND HIGH LEVEL DESCRIPTION OF THE SDK

## Table of Contents

## Installation

DESCRIBE INSTALLATION PROCESS

## HOW TO USE

DESCRIBE HOW TO USE

## API Specification

|Module | Description|
|-------|------------|
|IconBridge | Class object that provides the API to use the ICON Bridge |
|IconBridge.[CHAIN] | Methods for interacting with the ICON Bridge on each supported chain |
|IconBridge.sdkUtils | Utility functions for the SDK |

### IconBridgeSDK
IconBridgeSDK is a class that provides the methods to communicate with the [Icon Bridge](https://github.com/icon-project/icon-bridge).

#### Constructor
Creates an instance of the SDK.
```js
new IconBridgeSDK({
  useMainnet: boolean,
  iconProvider: {
    hostname: string,
    nid: number
  },
  bscProvider: {
    hostname: string,
    nid: number | null
  }
})
```
#### Parameters
| Parameter | Type | Description|
|--------------|------|----------|
| useMainnet|boolean|Use on mainnet or testnet for all chains in the bridge|
|iconProvider.hostname|string|URL of the ICON RPC Node|
|iconProvider.nid|number OR null| Network identifier of the ICON RPC Node|
bscProvider.hostname|string|URL of the BSC RPC Node|
bscProvider.nid|number OR null|Network indentifier of the BSC RPC Node|

#### Example
```js
// It can be instanciated without params and default values will be used. These values default to mainnet.
const SDK = new IconBridgeSDK()

// Params can be defined to use default params for mainnet and testnet
const SDK = new IconBridgeSDK({
  useMainnet: true
})
const SDK = new IconBridgeSDK({
  useMainnet: false
})

// you can define the RPC Nodes to use
const SDK = new IconBridgeSDK({
  iconProvider: {
  hostname: 'https://lisbon.net.solidwallet.io/api/v3/icon_dex'
  },
  bscProvider: {
    hostname: 'https://data-seed-prebsc-1-s1.binance.org:8545'
  }
})
```
### IconBridge.icon

Methods for interacting with the ICON Bridge originating from the ICON Chain.

### IconBridge.icon.methods

------------------
#### `balanceOf(_owner, _coinName)`
Gets the balance of a defined coin (`_coinName`) for a defined wallet (`_owner`).
##### Parameters
| Parameter | Type | Description|
|--------------|------|----------|
|_owner|address|Wallet address to check|
|_coinName|string|Name of coin to check|

##### Returns
```js
{
  jsonrpc: '2.0',
  result: {
    locked: '0x0',
    refundable: '0x0',
    usable: '0x0',
    userBalance: '0x130ee8e7179044400000'
  },
  id: 470
}
```
##### Example
```js
const balance = await SDK.icon.methods.balanceOf("hx0000000000000000000000000000000000000000", "btp-0x2.icon-ICX")
```
------------------
#### `balanceOfBatch(_owner, _coinNames)`
##### Parameters
| Parameter | Type | Description|
|--------------|------|----------|
|_owner|address|Wallet address to check|
|_coinNames|string[]|List of coin names|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result":[
    {"locked":"0x0",
    "refundable":"0x0",
    "usable": "0x0",
    "userBalance":"0x128cce36434efac00000"
    }
  ],
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.balanceOfBatch("hx0000000000000000000000000000000000000000", ["btp-0x2.icon-ICX"])
```
------------------
#### `coinNames()`
##### Parameters
** NO PARAMS **

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result":[
    "btp-0x2.icon-ICX",
    "btp-0x2.icon-sICX",
    "btp-0x2.icon-bnUSD",
    "btp-0x61.bsc-BNB",
    "btp-0x61.bsc-BUSD",
    "btp-0x61.bsc-USDT",
    "btp-0x61.bsc-USDC",
    "btp-0x61.bsc-BTCB",
    "btp-0x61.bsc-ETH",
    "btp-0x228.snow-ICZ"
    ]
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.coinNames()
```
------------------
#### `feeRatio(_coinName)`
##### Parameters
| Parameter | Type | Description|
|--------------|------|----------|
|_coinName|string|Name of coin to check|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result":{
    "feeNumerator":"0x64",
    "fixedFee":"0x3bacab37b62e0000"
    }
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.feeRatio("btp-0x2.icon-ICX")
```
------------------
#### `getAccumulatedFees()`
##### Parameters
** NO PARAMS **

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result":{
    "btp-0x2.icon-ICX":"0x16baa26c2d2280000",
    "btp-0x2.icon-bnUSD":"0x0",
    "btp-0x2.icon-sICX":"0x0",
    "btp-0x228.snow-ICZ":"0x0",
    "btp-0x61.bsc-BNB":"0x0",
    "btp-0x61.bsc-BTCB":"0x0",
    "btp-0x61.bsc-BUSD":"0x0",
    "btp-0x61.bsc-ETH":"0x0",
    "btp-0x61.bsc-USDC":"0x0",
    "btp-0x61.bsc-USDT":"0x0"
  },
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.getAccumulatedFees()
```
------------------
#### `getOwners()`
##### Parameters
** NO PARAMS **

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result":[
    "hx172ddb77bc9d9b000fac0f25505ce367bfbe96ad",
    "hx81da0f9f2203741bfee0883cc1b757bc2389f93f"
  ],
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.getOwners()
```
------------------
#### `getOwners()`
##### Parameters
** NO PARAMS **

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result":[
    "hx172ddb77bc9d9b000fac0f25505ce367bfbe96ad",
    "hx81da0f9f2203741bfee0883cc1b757bc2389f93f"
  ],
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.getOwners()
```
#### `getTokenLimit`
#### `getTokenLimitTxn`
#### `getSn`
#### `isUserBlackListed`
#### `getBlackListedUsers`
#### `getRegisteredTokensCount`
#### `tokenLimitStatus`
#### `coinId`
#### `coinNames`
#### `balanceOfBatch`
#### `getAccumulatedFees`
#### `blackListedUsersCount`
#### `getTransaction`
#### `getOwners`
#### `isOwner`
#### `isRestrictionEnabled`
#### `transferNativeCoinName`
#### `reclaim`
#### `transfer`
#### `transferBatch`
#### `addOwner`
#### `removeOwner`
#### `register`
#### `setFeeRatio`
#### `removeBlacklistAddress`
#### `setTokenLimit`
#### `addBlacklistAddress`
#### `addRestriction`
#### `disableRestrictions`

### IconBridge.bsc

Methods for interacting with the ICON Bridge originating from the BSC Chain.

### IconBridge.bsc.methods
* `balanceOf`
* `balanceOfBatch`
* `coinId`
* `coinNames`
* `feeRatio`
* `getAccumulatedFees`
* `getNativeCoinName`
* `getOwners`
* `isOwner`
* `isValidCoin`
* `transfer`
* `approve`
* `approveAndTransfer`
* `transferBatch`
* `transferNativeCoin`
* `addOwner`
* `reclaim`
* `removeOwner`
* `setFeeRatio`
* `updateBTSPeriphery`

### IconBridge.sdkUtils
Miscellaneous utilities for the IconBridge SDK.
* `networks`
* `contracts`
* `getBTPAddress`
* `genericAbi`

## Troubleshooting
### When calling methods on the BSC chain I get an error with `Invalid JSON RPC response: {"size": 0, "timeout": 0}`

Error example:
```
Result:
{
  error: 'Error running addOwner(). Params:\n' + 'from: {ADDRESS}\n' + 'pk: {PRIVATE_KEY}\n' + '_owner: {ADDRESS}\n' + '.\n' + 'Invalid JSON RPC response: {"size":0,"timeout":0}'
}
```
The SDK by default uses the following RPC endpoints for testnet and mainnet on BSC chains:
* Mainnet: https://bsc-dataseed.binance.org
* Testnet: https://data-seed-prebsc-1-s1.binance.org:8545

If you are getting this error the RPC endpoint is most likely down, you can change the endpoint you want to use like in the following example:
```js
const SDK = new IconBridgeSDK({
  useMainnet: false,
  bscProvider: { hostname: "https://data-seed-prebsc-2-s1.binance.org:8545" }
});
```

### Making a token transfer originating from BSC chain returns the following error: `Returned error: insufficient funds for gas * price + value`

Error example:
```
Result:
{
  error: 'Error running approveAndTransfer(). Params:\n' + 'targetAddress: {ADDRESS} \n' + 'targetChain: icon\n' + 'from: {ADDRESS}\n' + 'pk: {PRIVATE_KEY}\n' + '_value: 0.05\n' + '.\n' + 'Returned error: insufficient funds for gas * price + value'
}
```
This error occurs when you don't have enough balance (native coin, in this case BNB) to pay for the transaction fee.


### Making a token transfer originating from BSC chain returns one of the following errors: `Returned error: replacement transaction underpriced` or `Returned error: already known`

Error example:

```
{
 error: 'Error running addOwner(). Params:\n' + 'from: {ADDRES}\n' + 'pk: {PRIVATE_KEY}\n' + '_owner: {ADDRESS}\n' + '.\n' + '{"jsonrpc":"2.0","id":77,"error":{"code":-32000,"message":"already known"}}'
}

```
Currently the SDK doesnt support sending multiple concurrent transactions to be processed on the same block, because of this if you send for example 2 transactions one after the other without waiting around 5 to 10 seconds depending on the types of transaction that you are sending the chain will reply back thinking you are either sending the same tx twice or you are trying to replace an already existing tx in the mempool.

To fix this currently the only solution is to wait at least 5 to 10 seconds between sending each transaction.
