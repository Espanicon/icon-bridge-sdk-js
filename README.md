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
|IconBridge[CHAIN] | Methods for interacting with the ICON Bridge on each supported chain |
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
#### Parameter
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
    hostname: 'lisbon.net.solidwallet.io'
  },
  bscProvider: {
    hostname: 'https://data-seed-prebsc-1-s1.binance.org:8545'
  }
})
```
### IconBridge.icon

Methods for interacting with the ICON Bridge originating from the ICON Chain.

#### IconBridge.icon.methods

* `balanceOf`
* `name`
* `feeRatio`
* `getTokenLimit`
* `getTokenLimitTxn`
* `getSn`
* `isUserBlackListed`
* `getBlackListedUsers`
* `getRegisteredTokensCount`
* `tokenLimitStatus`
* `coinId`
* `coinNames`
* `balanceOfBatch`
* `getAccumulatedFees`
* `blackListedUsersCount`
* `getTransaction`
* `getOwners`
* `isOwner`
* `isRestrictionEnabled`
* `transferNativeCoinName`
* `reclaim`
* `transfer`
* `transferBatch`
* `addOwner`
* `removeOwner`
* `register`
* `setFeeRatio`
* `removeBlacklistAddress`
* `setTokenLimit`
* `addBlacklistAddress`
* `addRestriction`
* `disableRestrictions`

### IconBridge.bsc

Methods for interacting with the ICON Bridge originating from the BSC Chain.

#### IconBridge.bsc.methods
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
