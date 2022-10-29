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
