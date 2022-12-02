# IconBridge SDK for Javascript
 ** UNDER DEVELOPMENT **

WRITE INTRODUCTION AND HIGH LEVEL DESCRIPTION OF THE SDK

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
[id1]: ## "Optional param"

#### Parameters
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
| useMainnet [?][id1]|boolean|Use on mainnet or testnet for all chains in the bridge|
|iconProvider.hostname [?][id1]|string|URL of the ICON RPC Node|
|iconProvider.nid [?][id1]|number OR null| Network identifier of the ICON RPC Node|
bscProvider.hostname [?][id1]|string|URL of the BSC RPC Node|
bscProvider.nid [?][id1]|number OR null|Network indentifier of the BSC RPC Node|

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

`iconBridge.icon.methods` offers all the readonly and signed methods available on the ICON Bridge to be called directly with a valid set of params. The SDK will internally make the appropiate http/https request, handle the response and return the result in an asynchronous way.

------------------
#### `balanceOf(_owner, _coinName)`
Gets the balance of a defined coin (`_coinName`) for a defined wallet (`_owner`).
##### Parameters
| Parameter ([?][id1])| Type | Description|
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
| Parameter ([?][id1])| Type | Description|
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
| Parameter ([?][id1])| Type | Description|
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
#### `isOwners(_addr)`
##### Parameters
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_addr|address|Wallet address to check.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result":"0x0",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.isOwners("hx172ddb77bc9d9b000fac0f25505ce367bfbe96ad")
```
------------------
#### `name()`
##### Parameters
** NO PARAMS **

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result":"BTP Token Service",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.name()
```
------------------
#### `getTokenLimit(_name)`
##### Parameters
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_name|string|Name of token.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result":"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.getTokenLimit("btp-0x2.icon-sICX")
```
------------------
#### `getTokenLimitTxn(_Sn)`
##### Parameters
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_Sn|string|Tx number.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result":null,
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.getTokenLimitTxn("0x63")
```
------------------
#### `getSn(_Sn)`
##### Parameters
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_Sn|string|Tx number.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result": "0xaf",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.getSn("0x63")
```
------------------
#### `isUserBlackListed(_net, _address)`
##### Parameters
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_net|string|Network string identifier.|
|_address|address|Wallet address.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result": "0x0",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.isUserBlackListed("0x2.icon", "hx0169e03001a3fa4012092ad4a4ddf2d07681f063")
```
------------------
#### `getBlackListedUsers(_net, _start, _end)`
##### Parameters
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_net|string|Network string identifier.|
|_start|Number in Hexadecimal|Start index.|
|_end|Number in Hexadecimal|End index.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result": "0x0",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.getBlackListedUsers(
  "0x2.icon",
  "0x0",
  "0x1"
)
```
------------------
#### `getRegisteredTokensCount()`
##### Parameters
** NO PARAMS **

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result": "0x9",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.getRegisteredTokensCount()
```
------------------
#### `tokenLimitStatus(_net, _coinName)`
##### Parameters
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_net|string|Network string identifier.|
|_coinName|string|Name of coin to check|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result": "0x0",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.tokenLimitStatus("0x2.icon", "btp-0x2.icon-ICX")
```
------------------
#### `blackListedUsersCount(_net)`
##### Parameters
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_net|string|Network string identifier.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result": "0x0",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.blackListedUsersCount("0x2.icon")
```
------------------
#### `getTransaction(_sn)`
##### Parameters
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_Sn|string|Tx number.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result": "0x0",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.getTransaction("0x1")
```
------------------
#### `isRestrictionEnabled()`
##### Parameters
** NO PARAMS **

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result": "0x1",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.isRestrictionEnabled()
```
------------------
#### `coinId(_coinName)`
##### Parameters
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_coinName|string|Name of coin.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result": "cx55b835590d43af7bf6f5be3c3d50982264d24e5d",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.coinId("btp-0x2.icon-bnUSD")
```
------------------
#### `transferNativeCoin(targetAddress, targetChain, from, pk, amount, stepLimit)`
##### Parameters
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_targetAddress|string|Wallet address of receiver.|
|_targetChain|string|Receiver chain. Currently only "bsc" supported.|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|amount|Number|Amount of native coin to transfer.|
|stepLimit [?][id1]|Decimal number as string|Max 'steps', this determines the max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result": "0x9967f139261eecf348bb6ff1f2c7deb6e620d39b1536c6425d87d2e8a885fac0",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.transferNativeCoin("0x0123..", "bsc", "hx0123..", "1234...", "50")
```
------------------
#### `transferNativeToken(tokenName, amount, targetAddress, targetChain, tokenContract, from, pk, stepLimit)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|tokenName|string|Name of token to transfer.|
|amount|Decimal number as string|Amount of token to transfer.|
|targetAddress|string|Wallet address of receiver.|
|targetChain|string|Receiver chain. Currently only "bsc" supported.|
|tokenContract|string|Contract for the token to transfer.|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|stepLimit [?][id1]|Decimal number as string|Max 'steps', this determines the max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result": "0xa081c958daeaddcb43e64bd1490b4e3b5432614c9ded3f0f51a199cc18e139db",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.transferNativeCoin("btp-0x2.icon-bnUSD", "50", "0x0123..", "bsc", "cxcadcaf77d8e46089fd3d98fcf71eabee1700f148", "hx0123..", "1234...")
```
------------------
#### `transferWrappedToken(tokenName, amount, targetAddress, targetChain, tokenContract, from, pk, stepLimit)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|tokenName|string|Name of token to transfer.|
|amount|Decimal number as string|Amount of token to transfer.|
|targetAddress|string|Wallet address of receiver.|
|targetChain|string|Receiver chain. Currently only "bsc" supported.|
|tokenContract|string|Contract for the token to transfer.|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|stepLimit [?][id1]|Decimal number as string|Max 'steps', this determines the max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result": "0x901f1ed955ea3d3b489e832e865fdf96aed722847ecac9b088ea81ca89ba3452",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.transferWrappedCoin("btp-0x61.bsc-BNB", "0.1", "0x0123..", "bsc", "cx55b835590d43af7bf6f5be3c3d50982264d24e5d", "hx0123..", "1234...")
```
------------------
#### `transferToBTSContract(_value, tokenContract, from, pk, stepLimit)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_value|Decimal number as string|Amount to transfer.|
|tokenContract|string|Contract for the token to transfer.|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|stepLimit [?][id1]|Decimal number as string|Max 'steps', this determines the max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
 "result": "0xd04747f9bc316edc0ec09536457d8a0c0e2647626f98df324667381ac3c8a4a5",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.transferToBTSContract("100", "cxcadcaf77d8e46089fd3d98fcf71eabee1700f148", "hx0123..", "1234...")
```
------------------
#### `transfer(_coinName, _value, _to, from, pk, stepLimit)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_coinName|string|Name of Token to transfer.|
|_value|Decimal number as string|Amount to transfer.|
|_to|string|BTP formatted address of receiver.|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|stepLimit [?][id1]|Decimal number as string|Max 'steps', this determines the max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
 "result": "0xd78159eb5224e70c12d9a1a520f609d43f696b2abb079cf50decd47cb61a4dfd",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.transfer("btp-0x2.icon-bnUSD", "50", "btp://0x61.bsc/0x01234..", "hx0123..", "1234...")
```
------------------
#### `transferBatch(_coinNames, _values, _to, from, pk, stepLimit)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_coinNames|string[]|Array of Names of Tokens to transfer.|
|_value|Array\<Decimal number as string\>|Array of Amounts to transfer.|
|_to|string|BTP formatted address of receiver.|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|stepLimit [?][id1]|Decimal number as string|Max 'steps', this determines the max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
 "result": "0x3147aba0b2113cc842a1f33beceb2ef3347636325059fe1eca6e6480f80a7222",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.transferBatch(["btp-0x2.icon-bnUSD", "btp-0c61.bsc-BNB"], ["50", "0.1"], "btp://0x61.bsc/0x01234..", "hx0123..", "1234...")
```
------------------
#### `approveBTSContract(amount, tokenContract, from, pk, stepLimit)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|amount|Decimal number as string|Amount of token to transfer.|
|tokenContract|string|Contract for the token to transfer.|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|stepLimit [?][id1]|Decimal number as string|Max 'steps', this determines the max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
 "result": "0x6a41155cc1d26ee9127f88d84255a7950883a967b892703f4402dc60aa2f751d",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.approveBTSContract("0.1", "cx55b835590d43af7bf6f5be3c3d50982264d24e5d", "hx0123..", "1234...")
```
------------------
#### `reclaim(_coinName, _value, from, pk, stepLimit)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_coinName|string|Name of Token to transfer.|
|_value|Decimal number as string|Amount of re-claiming tokens.|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|stepLimit [?][id1]|Decimal number as string|Max 'steps', this determines the max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result": "0x3597537df11701fd8e544ef9e30e611c6f833d11668ab3ce6ab499ff2264e756",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.reclaim("btp-0x61.bsc-BNB", "0.1", "0x0123..", "hx0123..", "1234...")
```
------------------
#### `addOwner(_addr, from, pk, stepLimit)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_addr|string|Wallet to add as owner of contract.|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|stepLimit [?][id1]|Decimal number as string|Max 'steps', this determines the max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result": "0x585166881ee05963b3cc1f98660364e179b96d27a260a78e2434da50a44f1030",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.addOwner("hx123..", "hx0123..", "1234...")
```
------------------
#### `removeOwner(_addr, from, pk, stepLimit)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_addr|string|Wallet to remove as owner of contract.|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|stepLimit [?][id1]|Decimal number as string|Max 'steps', this determines the max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result": "0x713c0d06f8a6ffe7ec293a9b496fca0d89f4a6c48b8fd24a9024cad268780144",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.removeOwner("hx123..", "hx0123..", "1234...")
```
------------------
#### `register(_name, _symbol, _decimals, _feeNumerator, _fixedFee, from, pk, _addr, stepLimit)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_name|string|Name of token to register.|
|_symbol|string|Symbol name of wrapped coin.|
|_decimals|string|N/A|
|_feeNumerator|string|N/A|
|_fixedFee|string|N/A|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|_addr [?][id1]|string|N/A|
|stepLimit [?][id1]|Decimal number as string|Max 'steps', this determines the max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result": "0x6f11f9cbb172d7c0a665cddce6ba6aee0c4286629e6c1457a1398a7f981f1c9b",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.register("btp-0x61.bsc-WBNB", "BNB", "0x12", "0x0", "0x2aa1efb94e000", "hx0123..", "1234...")
```
------------------
#### `setFeeRatio(_name, _feeNumerator, _fixedFee, from, pk, stepLimit)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_name|string|Name of token to register.|
|_feeNumerator|string|N/A|
|_fixedFee|string|N/A|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|stepLimit [?][id1]|Decimal number as string|Max 'steps', this determines the max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result": "0x192e2a78456c4d32f01599d97987b7bddfe2e26c6ee0c0329e8bf7dcf8d37829",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.setFeeRatio("btp-0x61.bsc-WBNB", "0x0", "0x2aa1efb94e000", "hx0123..", "1234...")
```
------------------
#### `removeBlacklistAddress(_net, _addresses, from, pk, stepLimit)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_net|string|Chain network string identifier (btp formatted).|
|_addresses|string[]|Array of addresses.|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|stepLimit [?][id1]|Decimal number as string|Max 'steps', this determines the max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result": "0x924f4f3922d754cfca094301f226154bd432c58c5ebfe8a91dff866aba414769",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.removeBlacklistAddress("0x61.bsc", ["hx0123.."], "hx0123..", "1234...")
```
------------------
#### `setTokenLimit(_coinNames, _tokenLimits, from, pk, stepLimit)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_coinNames|string[]|Array of coin names.|
|_tokenLimits|string[]|Array of token limits.|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|stepLimit [?][id1]|Decimal number as string|Max 'steps', this determines the max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result": "0x943e41fb5079f4f67d13344367564b2351cb1b4606b370f48533fa1fe33220a0",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.setTokenLimit(["btp-0x61.bsc-WBNB"], ["0x0"], "hx0123..", "1234...")
```
------------------
#### `addBlacklistAddress(_net, _addresses, from, pk, stepLimit)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_net|string|Chain network string identifier (btp formatted).|
|_addresses|string[]|Array of addresses.|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|stepLimit [?][id1]|Decimal number as string|Max 'steps', this determines the max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result": "0xe7519f7867942e8d7b677baecf45b53c23d18ceed26232dbb86ea2065009e410",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.addBlacklistAddress("0x61.bsc", ["0x0123.."], "hx0123..", "1234...")
```
------------------
#### `addRestriction(from, pk, stepLimit)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|stepLimit [?][id1]|Decimal number as string|Max 'steps', this determines the max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result": "0x00aec9ffc574ae2d1795f98375d4ca2609e586b47dac45d1ff022ad24e880187",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.addRestriction("hx0123..", "1234...")
```
------------------
#### `disableRestrictions(from, pk, stepLimit)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|stepLimit [?][id1]|Decimal number as string|Max 'steps', this determines the max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "result": "0xc2d08035d466fa14a8919f7b6c37b368d549693cd822ca9ffa7fb97ae9ef7264",
  "id":140
}

```
##### Example
```js
const balance = await SDK.icon.methods.disableRestrictions("hx0123..", "1234...")
```
------------------

### IconBridge.icon.web (TO BE IMPLEMENTED)

`iconBridge.icon.web` offers the unsigned raw JSON RPC string of the selected method of the ICON Bridge. This option is intended to be used with a third party wallet (ICONex, Hana) to sign the required transaction object without your program having any access to the users private key.

------------------
### IconBridge.bsc

Methods for interacting with the ICON Bridge originating from the Binance Smart Chain.

### IconBridge.bsc.methods

`iconBridge.bsc.methods` offers all the readonly and signed methods available on the ICON Bridge to be called directly with a valid set of params. The SDK will internally make the appropiate http/https request, handle the response and return the result in an asynchronous way.

------------------
#### `balanceOf(_owner, _coinName)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_owner|address|Wallet address to check.|
|_coinName|string|Name of token to check.|

##### Returns
```js
{
  "0":"10000000000000000000",
  "1":"0",
  "2":"0",
  "3":"12774500000000000000000",
  "__length__":4,
  "_usableBalance":"10000000000000000000",
  "_lockedBalance":"0",
  "_refundableBalance":"0",
  "_userBalance":"12774500000000000000000"
}

```
##### Example
```js
const balance = await SDK.bsc.methods.balanceOf("0x0123..", "btp-0x2.icon-bnUSD")
```
------------------

#### `balanceOfBatch(_owner, _coinNames)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_owner|address|Wallet address to check.|
|_coinNames|string[]|Array of names of tokens to check.|

##### Returns
```js
{
  "0":["10000000000000000000"],
  "1":["0"],
  "2":["0"],
  "3":["12774500000000000000000"],
  "__length__":4,
  "_usableBalances":["10000000000000000000"],
  "_lockedBalances":["0"],
  "_refundableBalances":["0"],
  "_userBalances":["12774500000000000000000"]
}

```
##### Example
```js
const balance = await SDK.bsc.methods.balanceOfBatch("0x0123..", ["btp-0x2.icon-bnUSD"])
```
------------------

#### `coinId(_coinName)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_coinName|string|Name of token to check.|

##### Returns
```js
{
  "0":"0x7d8c52A23FD7e3ca1342797baE7caF6d7b8036BA",
  "__length__":1,
}

```
##### Example
```js
const balance = await SDK.bsc.methods.coinId("btp-0x2.icon-ICX")
```
------------------
#### `coinNames()`
** NO PARAMS **

##### Returns
```js
{
  "0":[
    "btp-0x61.bsc-BNB",
    "btp-0x61.bsc-BUSD",
    "btp-0x61.bsc-USDT",
    "btp-0x61.bsc-USDC",
    "btp-0x61.bsc-BTCB",
    "btp-0x61.bsc-ETH",
    "btp-0x2.icon-ICX",
    "btp-0x2.icon-sICX",
    "btp-0x2.icon-bnUSD",
    "btp-0x228.snow-ICZ"
  ],
  "__length__":1,
  "_names":[
    "btp-0x61.bsc-BNB",
    "btp-0x61.bsc-BUSD",
    "btp-0x61.bsc-USDT",
    "btp-0x61.bsc-USDC",
    "btp-0x61.bsc-BTCB",
    "btp-0x61.bsc-ETH",
    "btp-0x2.icon-ICX",
    "btp-0x2.icon-sICX",
    "btp-0x2.icon-bnUSD",
    "btp-0x228.snow-ICZ"
  ]
}

```
##### Example
```js
const balance = await SDK.bsc.methods.coinNames()
```
------------------
#### `feeRatio(coinName)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_coinName|string|Name of token to check.|

##### Returns
```js
{
  "0":"0",
  "1":"4300000000000000000",
  "__length__":2,
  "_feeNumerator":"0",
  "_fixedFee":"4300000000000000000"
}

```
##### Example
```js
const balance = await SDK.bsc.methods.feeRatio("btp-0x2.icon-ICX")
```
------------------

#### `getAccumulatedFees()`
** NO PARAMS **

##### Returns
```js
{
  "0":[
    ["btp-0x61.bsc-BNB","0"],
    ["btp-0x61.bsc-BUSD","0"],
    ["btp-0x61.bsc-USDT","0"],
    ["btp-0x61.bsc-USDC","0"],
    ["btp-0x61.bsc-BTCB","0"],
    ["btp-0x61.bsc-ETH","0"],
    ["btp-0x2.icon-ICX","0"],
    ["btp-0x2.icon-sICX","0"],
    ["btp-0x2.icon-bnUSD","0"],
    ["btp-0x228.snow-ICZ","0"]
  ],
  "__length__":1,
  "_accumulatedFees":[
    ["btp-0x61.bsc-BNB","0"],
    ["btp-0x61.bsc-BUSD","0"],
    ["btp-0x61.bsc-USDT","0"],
    ["btp-0x61.bsc-USDC","0"],
    ["btp-0x61.bsc-BTCB","0"],
    ["btp-0x61.bsc-ETH","0"],
    ["btp-0x2.icon-ICX","0"],
    ["btp-0x2.icon-sICX","0"],
    ["btp-0x2.icon-bnUSD","0"],
    ["btp-0x228.snow-ICZ","0"]
  ]
}

```
##### Example
```js
const balance = await SDK.bsc.methods.getAccumulatedFees()
```
------------------
#### `getNativeCoinName()`
** NO PARAMS **

##### Returns
```js
{
  "0":"btp-0x61.bsc-BNB",
  "__length__":1
}

```
##### Example
```js
const balance = await SDK.bsc.methods.getNativeCoinName()
```
------------------
#### `getOwners()`
** NO PARAMS **

##### Returns
```js
{
  "0":["0xD5F24A22A9E4029dEeCbF4dd38Ab6BE4657Fc5B7"],
  "__length__":1
}

```
##### Example
```js
const balance = await SDK.bsc.methods.getOwners()
```
------------------
#### `isOwner(_owner)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_owner|address|Wallet address to check.|

##### Returns
```js
{
  "0":true,
  "__length__":1
}

```
##### Example
```js
const balance = await SDK.bsc.methods.isOwner("0xd5f24a22a9e4029deecbf4dd38ab6be4657fc5b7")
```
------------------
#### `isValidCoin(_coinName)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|_coinName|string|Name of token to check.|

##### Returns
```js
{
  "0":true,
  "__length__":1,
  "_valid": true
}

```
##### Example
```js
const balance = await SDK.bsc.methods.isValidCoin("btp-0x2.icon-ICX")
```
------------------
#### `transfer(targetAddress, targetChain, from, pk, _value, _coinName, gas)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|targetAddress|string|Wallet address of receiver.|
|targetChain|string|Receiver chain. Currently only "icon" supported.|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|_value|Decimal number as string|Amount of token to transfer.|
|_coinName|string|Name of token to transfer.|
|gas [?][id1]|Decimal|Max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "id":49,
  "result":"0x27fd4c75591e9ba64e5ddc32129012d188fc56926d17bc206f137965f6035f04"
}

```
##### Example
```js
const balance = await SDK.bsc.methods.transfer("hx123..", "icon", "0x0123..", "1234..", "50", "btp-0x2.icon-ICX")
```
------------------
#### `approveTransfer(from, pk, amount, tokenContractAddress, tokenContractAbi, gas)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|amount|Decimal number as string|Amount of token to transfer.|
|tokenContract|string|Contract for the token to transfer.|
|tokenContractAbi [?][id1]|Array\<Object\>|Contract abi for the token to transfer.|
|gas [?][id1]|Decimal|Max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "id":49,
  "result":"0xfa1233a7154e5071710e8a5cc3e9b61de2d6231c7d5bcc95782dbfb03e5ffb2f"
}

```
##### Example
```js
const balance = await SDK.bsc.methods.approveTransfer("0x0123..", "12345..", "50", "0x7d8c52A23FD7e3ca1342797baE7caF6d7b8036BA")
```
------------------
#### `approveAndTransfer(targetAddress, targetChain, from, pk, _coinName, _value, tokenContractAddress, tokenContractAbi, gas)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|targetAddress|string|Wallet address of receiver.|
|targetChain|string|Receiver chain. Currently only "icon" supported.|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|_value|Decimal number as string|Amount of token to transfer.|
|_coinName|string|Name of token to transfer.|
|tokenContract|string|Contract for the token to transfer.|
|tokenContractAbi [?][id1]|Array\<Object\>|Contract abi for the token to transfer.|
|gas [?][id1]|Decimal|Max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "id":49,
  "result":"0x8c5922efc4560fdf23d5ad3f1d7c275f5638fe09e60a85ebfb91f1cefbd2104f"
}

```
##### Example
```js
const balance = await SDK.bsc.methods.approveAndTransfer("hx0123..", "icon", "0x0123..", "12345..", "50", "btp-0x2.icon-ICX",  "0x7d8c52A23FD7e3ca1342797baE7caF6d7b8036BA")
```

------------------
#### `transferBatch(targetAddress, targetChain, from, pk, _coinNames, _values, gas)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|targetAddress|string|Wallet address of receiver.|
|targetChain|string|Receiver chain. Currently only "icon" supported.|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|_values|Array\<Decimal number as string\>|Amounts of tokens to transfer.|
|_coinNames|Array\<string\>|Names of tokens to transfer.|
|gas [?][id1]|Decimal|Max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "id":49,
  "result":"0x4b8886606539ed91ef90900a8a32605063d0c881b366132aded9115d021c2a91"
}

```
##### Example
```js
const balance = await SDK.bsc.methods.transferBatch("hx0123..", "icon", "0x0123..", "12345..", ["50"], ["btp-0x2.icon-ICX"])
```

------------------
#### `transferNativeCoin(targetAddress, targetChain, from, pk, amount, gas)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|targetAddress|string|Wallet address of receiver.|
|targetChain|string|Receiver chain. Currently only "icon" supported.|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|amount|Decimal number as string|Amount of native coin to transfer.|
|gas [?][id1]|Decimal|Max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "id":49,
  "result":"0x64cbdc785c74a9bbb4217ba8860fb796910d89462be75f41f31e63b7a0c59c25"
}

```
##### Example
```js
const balance = await SDK.bsc.methods.transferNativeCoin("hx0123..", "icon", "0x0123..", "12345..", "0.01")
```
------------------
#### `addOwner(from, pk, _owner, gas)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|_owner|Address|Address to add as owner of contract.|
|gas [?][id1]|Decimal|Max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "id":49,
  "result":"0x0008cb96d74af6d180b5a9ebeff95ccf6d4a2ef91e44a00c8a8eb7e353b2a327"
}

```
##### Example
```js
const balance = await SDK.bsc.methods.addOwner("0x0123..", "12345..", "0x2345..")
```
------------------
#### `reclaim(from, pk, _coinName, _value, gas)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|_coinName|string|Name of token to transfer.|
|_value|Decimal number as string|Amount of token to transfer.|
|gas [?][id1]|Decimal|Max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "id":49,
  "result":"0x2af680892738d5551c8411043551e92ab1447b7d07cc39234e7c948ca31f3e1a"
}

```
##### Example
```js
const balance = await SDK.bsc.methods.reclaim("0x0123..", "12345..", "btp-0x2.icon-ICX", "10")
```
------------------
#### `register(from, pk, _name, _symbol, _feeNumerator, _fixedFee, _addr, gas)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|_name|string|Name of token to register.|
|_symbol|string|Symbol of token to register.|
|_decimals|Number as hex string|Token decimals.|
|_feeNumerator|Number as hex string|Token fee numerator.|
|_fixedFee|Number as hex string|Token fixed fee.|
|_addr|address|Token contract address.|
|gas [?][id1]|Decimal|Max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "id":49,
  "result":"0x8bb2a4d24f0d17207d00d7c6b8b9b9a366a0809bd7ba6011c7f40cbf334bf53f"
}

```
##### Example
```js
const balance = await SDK.bsc.methods.register("btp-0x61.bsc-WBNB", "BNB", "0x12", "0x0", "0x2aa1efb94e000", "0x7d8c52A23FD7e3ca1342797baE7caF6d7b8036BA")
```
------------------
#### `removeOwner(from, pk, _owner, gas)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|_owner|Address|Address to remove as owner of contract.|
|gas [?][id1]|Decimal|Max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "id":49,
  "result":"0xa683bec14f0a9e962308d4753551ac0c979f963a4d00ce6bfda3e996f72aa245"
}

```
##### Example
```js
const balance = await SDK.bsc.methods.removeOwner("0x0123..", "12345..", "0x2345..")
```
------------------
#### `setFeeRatio(from, pk, _name, _feeNumerator, _fixedFee, gas)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|_name|string|Name of token to register.|
|_feeNumerator|Number as hex string|Token fee numerator.|
|_fixedFee|Number as hex string|Token fixed fee.|
|gas [?][id1]|Decimal|Max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "id":49,
  "result":"0x86ab3e862e2593d8ef6cc4e21bd139358ecd9565ef81e4e2ac154c91f238d4be"
}

```
##### Example
```js
const balance = await SDK.bsc.methods.setFeeRatio("btp-0x2.icon-ICX", 100, 10, 10000000)
```
------------------
#### `updateBTSPeriphery(from, pk, _btsPeriphery, gas)`
| Parameter ([?][id1])| Type | Description|
|--------------|------|----------|
|from|address|Wallet address of origin.|
|pk|string|Private key of Wallet address of origin.|
|_name|string|Name of token to register.|
|_btsPeriphery|address|address of btsPeriphery.|
|gas [?][id1]|Decimal|Max fee to pay.|

##### Returns
```js
{
  "jsonrpc":"2.0",
  "id":49,
  "result":"0xdf45876b62bdd0210f7a4938c68eb449a96af02e6407caf5391e74158453035d"
}

```
##### Example
```js
const balance = await SDK.bsc.methods.updateBTSPeriphery("0x1234..", "1234..", "0x234..")
```

------------------
### IconBridge.bsc.web (TO BE IMPLEMENTED)

`iconBridge.bsc.web` offers the unsigned raw JSON RPC string of the selected method of the ICON Bridge. This option is intended to be used with a third party wallet (Metamask) to sign the required transaction object without your program having any access to the users private key.

------------------
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
