// icon-bridge-sdk-bsc.ts
//

// types
type Provider = {
  hostname: string;
  nid: null | number;
};

type InputParams = {
  useMainnet: null | boolean;
  iconProvider?: Provider;
  bscProvider?: Provider;
};

// main code

/**
 * Class that provides the API for interacting with the ICON Bridge
 */
class IconBridgeSDKBSC {
  params;
  bscWeb3;

  /**
   * Constructor
   */
  constructor(params: InputParams, bscWeb3: any) {
    this.params = params;
    this.bscWeb3 = bscWeb3;
  }

  // ######################################################################
  /**
   * Internal class object with methods for interacting with BSC endpoint of
   * the ICON Bridge.
   */
  // bsc = {

  //   /**
  //    * Get the contract that holds the implementation code of a proxy
  //    * contract (address) on chain.
  //    * @param address - proxy contract address.
  //    * @param memSlot - memory slot that holds the logic contract address.
  //    * @return logic contract address.
  //    */
  //   getLogicContractAddressOnChain: async (
  //     address: string,
  //     memSlot: string = this.sdkUtils.labels.memSlot,
  //   ) => {
  //     try {
  //     return await this.#getLogicContractAddressOnChain(
  //       address,
  //       memSlot,
  //       this.bscWeb3
  //     );
  //     } catch (err) {
  //       throw new Error(
  //         `Error running 'getLogicContractAddressOnChain' method.\n${err}`
  //       )
  //     }
  //   },

  //   /**
  //    * Get contract web3 object
  //    * @param abi - contract ABI.
  //    * @param contractAddress - Contract address.
  //    * @return Contract web3 object.
  //    */
  //   getContractObject: (abi: any, contractAddress: string) => {
  //     return this.#getContractObject(abi, contractAddress, this.bscWeb3)
  //   },

  //   /**
  //    * Get ABI of a contract
  //    * @param contractLabel - string label of the contract.
  //    * @param getLogicContract - if true gets logic contract object else gets proxy contract object.
  //    * @return ABI of the contract.
  //    */
  //   getAbiOf: (
  //     contractLabel: string,
  //     getLogicContract: boolean = false
  //   ) => {
  //     const isMainnet: boolean | null = this.params.useMainnet == null
  //       ? true
  //       : this.params.useMainnet;
  //     return this.#getAbiOf(contractLabel, "bsc", isMainnet, getLogicContract)
  //   },

  //   /**
  //    * Get ABI of BTS contract
  //    * @return ABI of the contract.
  //    */
  //   getBTSAbi: () => {
  //     const isMainnet: boolean | null = this.params.useMainnet == null
  //       ? true
  //       : this.params.useMainnet;
  //     return this.#getBTSAbi("bsc", isMainnet)
  //   },

  //   /**
  //    * Get address of BTSCore implementation contract.
  //    * @return Address of implementation contract.
  //    */
  //   getBTSCoreLogicContractAddress: () => {
  //     const isMainnet: boolean | null = this.params.useMainnet == null
  //       ? true
  //       : this.params.useMainnet;
  //     return this.#getBTSCoreLogicContractAddress('bsc', isMainnet)
  //   },

  //   /**
  //    * Get web3 object for BTSCore proxy contract.
  //    * @return web3 object of contract.
  //    */
  //   getBTSCoreProxyContractObject: () => {
  //     return this.getBTSCoreProxyContractObject('bsc', this.bscWeb3)
  //   },

  //   /**
  //    * Get ABI of BTSCore logic contract.
  //    * @return ABI of BTSCore implementation contract.
  //    */
  //   getBTSCoreLogicContractAbi: () => {
  //     const isMainnet: boolean | null = this.params.useMainnet == null
  //       ? true
  //       : this.params.useMainnet;
  //     return this.#getAbiOf("BTSCore", "bsc", isMainnet, true)
  //   },

  //   /**
  //    * Get object of BTSCore implementation contract.
  //    * @return object of BTSCore implementation contract.
  //    */
  //   getBTSCoreLogicContractObject: () => {
  //     return this.getBTSCoreLogicContractObject("bsc", this.bscWeb3)
  //   },

  //   /**
  //    * Get the token balance of a wallet.
  //    * @param _owner - wallet address.
  //    * @param _coinName - token name.
  //    * @return token balance of a wallet.
  //    */
  //   balanceOf: async (
  //     _owner: string,
  //     _coinName: string
  //   ): Promise<string | null> => {
  //     try {
  //       const isMainnet: boolean | null = this.params.useMainnet == null
  //         ? true
  //         : this.params.useMainnet;

  //       const response = await this.BTSReadonlyQuery(
  //         'balanceOf',
  //         'bsc',
  //         this.bscWeb3,
  //         _owner,
  //         _coinName
  //       );

  //       const BTSLogicContractABI = this.#getAbiOf(
  //         'BTSCore',
  //         'bsc',
  //         isMainnet,
  //         true
  //       );

  //       const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(
  //         BTSLogicContractABI[4].outputs,
  //         response
  //       );

  //       return parsedResponse
  //     } catch (err) {
  //       console.log(err)
  //       throw new Error(
  //         `Error running balanceOf(). Params:\n_owner: ${_owner}\n_coinName: ${_coinName}\n`
  //       )
  //     }
  //   },

  //   /**
  //    * Get name of tokens.
  //    * @return name of tokens.
  //    */
  //   coinNames: async (): Promise<string | null> => {
  //     try {
  //       const isMainnet: boolean | null = this.params.useMainnet == null
  //         ? true
  //         : this.params.useMainnet;

  //       const response = await this.BTSReadonlyQuery(
  //         'coinNames',
  //         'bsc',
  //         this.bscWeb3
  //       );

  //       const BTSLogicContractABI = this.#getAbiOf(
  //         'BTSCore',
  //         'bsc',
  //         isMainnet,
  //         true
  //       );

  //       const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(
  //         BTSLogicContractABI[7].outputs,
  //         response
  //       );

  //       // return parsedResponse['_names']
  //       return parsedResponse
  //     } catch (err) {
  //       console.log(err)
  //       throw new Error(
  //         `Error running coinNames(). Params:\n ** NO PARAMS**\n`
  //       )
  //     }
  //   },

  //   /**
  //    * Add another Owner. Caller must be an Owner of BTP network.
  //    * @param _owner - Address of new owner
  //    * @return
  //    */
  //   addOwner: async (_owner: string): Promise<void> => {
  //   // index 3
  //   console.log(_owner)
  //   },

  //   /**
  //    * Returns a list of balance of an account. The order of request's
  //    * coinNames must be the same with the order of return balance.
  //    * @param _owner - Address.
  //    * @param _coinNames - array of coin names.
  //    * @return
  //    */
  //   balanceOfBatch: async (
  //     _owner: string,
  //     _coinNames: string[]
  //   ): Promise<void> => {
  //     try {
  //       const isMainnet: boolean | null = this.params.useMainnet == null
  //         ? true
  //         : this.params.useMainnet;

  //       const response = await this.BTSReadonlyQuery(
  //         'balanceOfBatch',
  //         'bsc',
  //         this.bscWeb3,
  //         _owner,
  //         _coinNames
  //       );

  //       const BTSLogicContractABI = this.#getAbiOf(
  //         'BTSCore',
  //         'bsc',
  //         isMainnet,
  //         true
  //       );

  //       const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(
  //         BTSLogicContractABI[5].outputs,
  //         response
  //       );

  //       return parsedResponse
  //     } catch (err) {
  //       console.log(err)
  //       throw new Error(
  //         `Error running balanceOfBatch(). Params:\n_owner: ${_owner}\n_coinNames: ${_coinNames}\n`
  //       )
  //     }
  //   },

  //   /**
  //    * Returns an id number of coin whose name is the same with given _coinName
  //    * @param _coinName - name of coin.
  //    * @return
  //    */
  //   coinId: async (_coinName: string): Promise<void> => {
  //     try {
  //       const isMainnet: boolean | null = this.params.useMainnet == null
  //         ? true
  //         : this.params.useMainnet;

  //       const response = await this.BTSReadonlyQuery(
  //         'coinId',
  //         'bsc',
  //         this.bscWeb3,
  //         _coinName
  //       );

  //       const BTSLogicContractABI = this.#getAbiOf(
  //         'BTSCore',
  //         'bsc',
  //         isMainnet,
  //         true
  //       );

  //       const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(
  //         BTSLogicContractABI[6].outputs,
  //         response
  //       );

  //       return parsedResponse
  //     } catch (err) {
  //       console.log(err)
  //       throw new Error(
  //         `Error running coinId(). Params:\n_coinName: ${_coinName}\n`
  //       )
  //     }
  //   },

  //   /**
  //    * Get fee numerator and fixed fee.
  //    * @param _coinName - name of coin.
  //    * @return
  //    */
  //   feeRatio: async (_coinName: string): Promise<void> => {
  //     try {
  //       const isMainnet: boolean | null = this.params.useMainnet == null
  //         ? true
  //         : this.params.useMainnet;

  //       const response = await this.BTSReadonlyQuery(
  //         'feeRatio',
  //         'bsc',
  //         this.bscWeb3,
  //         _coinName
  //       );

  //       const BTSLogicContractABI = this.#getAbiOf(
  //         'BTSCore',
  //         'bsc',
  //         isMainnet,
  //         true
  //       );

  //       const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(
  //         BTSLogicContractABI[8].outputs,
  //         response
  //       );

  //       return parsedResponse
  //     } catch (err) {
  //       console.log(err)
  //       throw new Error(
  //         `Error running feeRatio(). Params:\n_coinName: ${_coinName}\n`
  //       )
  //     }
  //   },

  //   /**
  //    * Returns a list of accumulated fees. Only return the asset that has
  //    * asset's value greater than 0.
  //    * @return Array of assets.
  //    */
  //   getAccumulatedFees: async (): Promise<void> => {
  //     try {
  //       const isMainnet: boolean | null = this.params.useMainnet == null
  //         ? true
  //         : this.params.useMainnet;

  //       const response = await this.BTSReadonlyQuery(
  //         'getAccumulatedFees',
  //         'bsc',
  //         this.bscWeb3
  //       );

  //       const BTSLogicContractABI = this.#getAbiOf(
  //         'BTSCore',
  //         'bsc',
  //         isMainnet,
  //         true
  //       );

  //       const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(
  //         BTSLogicContractABI[9].outputs,
  //         response
  //       );

  //       return parsedResponse
  //     } catch (err) {
  //       console.log(err)
  //       throw new Error(
  //         `Error running getAccumulatedFees(). Params:\n ** NO PARAMS **\n`
  //       )
  //     }
  //   },

  //   /**
  //    * Returns name of native coin.
  //    * @return string name of native coin.
  //    */
  //   getNativeCoinName: async (): Promise<void> => {
  //     // index 10
  //   },

  //   /**
  //    * Returns list of current owners.
  //    * @return Array of address of current owners.
  //    */
  //   getOwners: async (): Promise<void> => {
  //     // index 11
  //   },

  //   /**
  //    * Handle a response of a requested service. Caller must be a
  //    * BTSPeriphery contract.
  //    * @param _requester - an address of originator of a requested service.
  //    * @param _coinName - name of requested coin.
  //    * @param _value - amount to receive on a destination chain.
  //    * @param _fee - amount of charged fee.
  //    * @param _rspCode -
  //    */
  //   handleResponseService: async (
  //     _requester: string,
  //     _coinName: string,
  //     _value: number,
  //     _fee: number,
  //     _rspCode: number
  //   ): Promise<void> => {
  //     // index 12
  //     console.log([_requester,_coinName, _value, _fee, _rspCode])
  //   },

  //   /**
  //    * TODO: no info provided on this function in the BSC smart contract code.
  //    * https://testnet.bscscan.com/address/0xe020d4ad483c7ec90a24d9db502e66564ef9c236#code
  //    */
  //   initialize: async (
  //     _nativeCoinName: string,
  //     _feeNumerator: number,
  //     _fixedFee: number
  //   ): Promise<void> => {
  //     // index 13
  //     console.log([_nativeCoinName, _feeNumerator, _fixedFee])
  //   },

  //   /**
  //    * Checks is a especified address has owner role.
  //    * @param _owner- address to check.
  //    */
  //   isOwner: async (_owner: string): Promise<void> => {
  //     // index 14
  //     console.log(_owner)
  //   },

  //   /**
  //    * Checks validity of a coin name.
  //    * @param _coinName - coin name to check.
  //    */
  //   isValidCoin: async (_coinName: string): Promise<void> => {
  //     // index 15
  //     console.log(_coinName)
  //   },

  //   /**
  //    * Mint the wrapped coin. Caller must be a BTSPeriphery contract.
  //    * @param _to - account that receives the minted coin.
  //    * @param _coinName - coin name.
  //    * @param _value - minted amount.
  //    */
  //   mint: async (
  //   _to: string,
  //   _coinName: string,
  //   _value: number
  //   ): Promise<void> => {
  //     // index 16
  //     console.log(_to, _coinName, _value)
  //   },

  //   /**
  //    * Reclaim the token's refundable balance by an owner. Caller must be
  //    * owner of coin.
  //    * @param _coinName - coin name.
  //    * @param _value - amount of re-claiming tokens.
  //    */
  //   reclaim: async (_coinName: string, _value: number): Promise<void> => {
  //     // index 17
  //     console.log(_coinName, _value)
  //   },

  //   /**
  //    * For information on this specific method check the solidity smart
  //    * contract code on the following link:
  //    * https://testnet.bscscan.com/address/0xe020d4ad483c7ec90a24d9db502e66564ef9c236#code#F1#L653
  //    * @param _to -
  //    * @param _coinName -
  //    * @param _value -
  //    */
  //   refund: async (
  //     _to: string,
  //     _coinName: string,
  //     _value: number
  //   ): Promise<void> => {
  //     // index 18
  //     console.log([_to, _coinName,_value])
  //   },

  //   /**
  //    * Registers a wrapped coin and id number of a supporting coin. Caller
  //    * must be an owner of this contract.
  //    * @param _name - must be different with the native coin name.
  //    * @param _symbol - symbol name for a wrapped coin.
  //    * @param _decimals - decimal number.
  //    * @param _feeNumerator -
  //    * @param _fixedFee -
  //    * @param _addr -
  //    */
  //   register: async (
  //   _name: string,
  //   _symbol: string,
  //   _decimals: number,
  //   _feeNumerator: number,
  //   _fixedFee: number,
  //   _addr: string
  //   ): Promise<void> => {
  //     // index 19
  //     console.log([_name, _symbol, _decimals, _feeNumerator, _fixedFee, _addr])
  //   },

  //   /**
  //    * Removing an existing owner. Caller must be an owner of BTP network.
  //    * @param _owner - address of owner to be removed.
  //    */
  //   removeOwner: async (_owner: string): Promise<void> => {
  //     // index 20
  //     console.log(_owner)
  //   },

  //   /**
  //    * Set fee ratio. Caller must be an owner of this contract.
  //    * @param _name -
  //    * @param _feeNumerator -
  //    * @param _fixedFee -
  //    */
  //   setFeeRatio: async (
  //     _name: string,
  //     _feeNumerator: number,
  //     _fixedFee: number
  //   ): Promise<void> => {
  //     // index 21
  //     console.log([_name, _feeNumerator, _fixedFee])
  //   },

  //   /**
  //    * Allow users to deposit an amount of wrapped native coin into the
  //    * BTSCore contract.
  //    * @param _coinName - given name of wrapped coin.
  //    * @param _value - amount to transfer.
  //    * @param _to - target BTP address.
  //    */
  //   transfer: async (
  //   _coinName: string,
  //   _value: number,
  //   _to: string
  //   ): Promise<void> => {
  //     // index 22
  //     console.log([_coinName, _value, _to])
  //   },

  //   /**
  //    * Allow users to transfer multiple coins/wrapped coins to another chain.
  //    * @param _coinNames - list of coins.
  //    * @param _values - list of values in same order of coins.
  //    * @param _to - target BTP address.
  //    */
  //   transferBatch: async (
  //   _coinNames: string[],
  //   _values: string[],
  //   _to: string
  //   ): Promise<void> => {
  //     // index 23
  //     console.log([_coinNames, _values, _to])
  //   },

  //   /**
  //    * Handle request of fee gathering. Caller must be an
  //    * BTSPeriphery contract.
  //    * @param _fa -
  //    */
  //   transferFees: async (_fa: string): Promise<void> => {
  //     // index 24
  //     console.log(_fa)
  //   },

  //   /**
  //    * Allows user to deposit native coin into a BTSCore contract.
  //    * @param _to - address that receives transfer.
  //    */
  //   transferNativeCoin: async (_to: string): Promise<void> => {
  //     // index 25
  //     console.log(_to)
  //   },

  //   /**
  //    * Updates BTS periphery address. Caller must be owner of contract.
  //    * @param _btsPeriphery - btsPeriphery contract address.
  //    */
  //   updateBTSPeriphery: async (_btsPeriphery: string): Promise<void> => {
  //     // index 26
  //     console.log(_btsPeriphery)
  //   },
  // };

  // ######################################################################
  /**
   * Internal class object with methods for interacting with ICON endpoint of
   * the ICON Bridge.
   */
  icon = {};
}

export = IconBridgeSDKBSC;
