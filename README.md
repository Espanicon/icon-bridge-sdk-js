# IconBridge SDK for Javascript

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

### IconBridge

### IconBridge[CHAIN]

#### IconBridge[CHAIN].bts

Methods for interacting with the BTS (BTP Token Service) contract available on all chains.

* balanceOf
* balanceOfBatch
* coinId
* coinNames
* feeRatio
* getAccumulatedFees
* getNativeCoinName
* getOwners
* isOwner
* isValidCoin
* addOwner
* handleResponseService
* initialize
* mint
* reclaim
* refund
* register
* removeOwner
* setFeeRatio
* transfer
* transferBatch
* transferFees
* transferNativeCoin

##### iconBridge['icon'].bts

Methods for interacting with the BTS (BTP Token Service) contract available on the ICON chain.

* setTokenLimit
* getTokenLimit
* getTokenLimitTxn
* getSn
* addBlacklistAddress
* removeBlacklistAddress
* isUserBlackListed
* getBlackListedUsers
* blackListedUsersCount
* getRegisteredTokensCount
* tokenLimitStatus
* tokenFallback
* getTransaction
* handleBTPMessage
* handleBTPError
* handleFeeGathering
* addRestrictions
* disableRestrictions
* isRestrictionEnabled

##### iconBridge['bsc'].bts

Methods for interacting with the BTS (BTP Token Service) contract available on the BSC chain.

* updateBTSPeriphery

#### IconBridge[CHAIN].bmc

Methods for interacting with the BMC (BTP Message Center) contract.

### IconBridge.sdkUtils

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
```
const SDK = new IconBridgeSDK({
  useMainnet: false,
  bscProvider: { hostname: "https://data-seed-prebsc-2-s1.binance.org:8545" }
});
```
