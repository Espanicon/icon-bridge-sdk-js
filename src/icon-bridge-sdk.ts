// icon-bridge-sdk.ts
//
import utils from "./utils/utils";
import Web3 from "web3";

// types
type Provider = {
  hostname: string;
  nid: null | number
}

type InputParams = {
  useMainnet: null | boolean,
  iconProvider?: Provider,
  bscProvider?: Provider
}

// variables
const defaultParams: InputParams = {
  useMainnet: true
}

// main code

/**
 * Class that provides the API for interacting with the ICON Bridge
 */
class IconBridgeSDK {
  sdkUtils: any = utils;
  params = utils.defaultSDKParams;
  bscWeb3: any;

  /**
   * Configuration object for the initialization of the library
   * @param inputParams - initialization object.
   * @param inputParams.useMainnet - Use mainnet or testnet.
   * @param inputParams.<PROVIDER>.hostname - chain node provider url.
   * @param inputParams.<PROVIDER>.nid - chain node provider nid.
   */
  constructor(inputParams: InputParams = defaultParams ) {
  this.params = this.sdkUtils.getSDKParams(inputParams)
  this.bscWeb3 = new Web3(this.params.bscProvider.hostname);
  }


// ######################################################################
/**
 * General private and public methods 
 */

  /**
   * Make readonly query to the BTS smart contract.
   * @param methodName - name of the smart contract method to call.
   * @param chain - chain to use.
   * @param web3Wrapper - object containing the web3 library to use.
   * @param rest - Array of params to pass to method call.
   */
  BTSReadonlyQuery = async (
    methodName: string,
    chain: string,
    web3Wrapper: any,
    ...rest: any[]
  ): Promise<string | null> => {
    // check if class object was created for mainnet or testnet
    const isMainnet: boolean | null = this.params.useMainnet == null 
      ? true 
      : this.params.useMainnet;

    try {
      // get contract address and contract object
      const BTSProxyContractAddress = this.getBTSCoreProxyContractAddress(
        chain,
        isMainnet
      );

      const contractObject = this.getBTSCoreLogicContractObject(
        chain,
        web3Wrapper
      );

      // decoding a call to readonly method
      let encodedData = null;
      const contractMethod = contractObject.methods[methodName];
      if (rest.length === 0) {
        encodedData = contractMethod().encodeABI();
      } else {
        encodedData = contractMethod(...rest).encodeABI();
      }

      // making readonly call
      const contractMethodCallResponse = await web3Wrapper.eth.call({
        to: BTSProxyContractAddress,
        data: encodedData
      })

      return contractMethodCallResponse
    } catch (err) {
      console.log(err)
      throw new Error(
        `Error running ${methodName}(). Params:\n ** NO PARAMS**\n`
      )
    }
  }

  /**
   * Get ABI of a contract.
   * @param contractLabel - string label of the contract.
   * @param chain - chain to query.
   * @param isMainnet - use mainnet or testnet.
   * @param getLogicContract - get logic or proxy contract
   */
  #getAbiOf = (
    contractLabel: string,
    chain: string, 
    isMainnet: boolean,
    getLogicContract: boolean = true
  ) => {
    return this.sdkUtils.getAbiOfLabelFromLocalData(
      contractLabel,
      chain, 
      isMainnet,
      getLogicContract
    )
  };

  /**
   * Get ABI of the BTS contract
   * @param chain - chain to query.
   * @param isMainnet - use mainnet or testnet.
   * @param getLogicContract - get logic or proxy contract
   */
  #getBTSAbi = (
    chain: string,
    isMainnet: boolean,
    getLogicContract = true
  ) => {
    return this.#getAbiOf("BTSCore", chain, isMainnet, getLogicContract)
  };

  /**
   * Get web3 object of a contract given a contract label.
   * @param label -  string label of the contract.
   * @param chain - chain to query.
   * @param web3Wrapper - object containing the web3 library to use.
   * @param getLogicContract - get logic or proxy contract
   */
  getContractObjectByLabel = (
    label: string, 
    chain: string, 
    web3Wrapper: any,
    getLogicContract: boolean = false
  ) => {
    try {
      const isMainnet: boolean | null = this.params.useMainnet == null 
        ? true 
        : this.params.useMainnet;
      const contractAddress = this.#getContractAddressLocally(
        label,
        chain,
        isMainnet,
        getLogicContract
      )
  ;
      const abi = this.#getAbiOf(label, chain, isMainnet, getLogicContract)
      return this.#getContractObject(abi, contractAddress, web3Wrapper)
    } catch (err) {
      throw new Error(
        `Error running #getContractObjectByLabel(). Params:\nlabel: ${label}\nchain: ${chain}\nweb3Wrapper: ${web3Wrapper}\ngetLogicContract: ${getLogicContract}.\n${err}`
      )
    }
  };

  /**
   * Get contract address from local data.
   * @param label -  string label of the contract.
   * @param chain - chain to query.
   * @param isMainnet - use mainnet or testnet.
   * @param getLogicContract - get logic or proxy contract
   */
  #getContractAddressLocally = (
    label: string,
    chain: string, 
    isMainnet: boolean, 
    getLogicContract: boolean = false
  ) => {
    return this.sdkUtils.getContractOfLabelFromLocalData(
      label, 
      chain, 
      isMainnet, 
      getLogicContract
    )
  };

  /**
   * Get contract address of the BTSCore implementation contract.
   * @param chain - chain to query.
   * @param isMainnet - use mainnet or testnet.
   */
  #getBTSCoreLogicContractAddress = (
    chain: string,
    isMainnet: boolean,
  ) => {
    return this.#getContractAddressLocally(
      "BTSCore",
      chain,
      isMainnet,
      true
    )
  }

  /**
   * Get contract address of the BTSCore proxy contract.
   * @param chain - chain to query.
   * @param isMainnet - use mainnet or testnet.
   */
  getBTSCoreProxyContractAddress = (
    chain: string,
    isMainnet: boolean,
  ) => {
    return this.#getContractAddressLocally(
      "BTSCore",
      chain,
      isMainnet
    )
  }

  /**
   * Get contract address of the BTSCore implementation contract on chain.
   * @param address - address of the proxy contract.
   * @param memSlot - memory slot where the contract is saved.
   * @param web3Wrapper - object containing the web3 library to use.
   */
  #getLogicContractAddressOnChain = async (
    address: string,
    memSlot: string,
    web3Wrapper: any
  ) => {
    let result: any = null;

    try {
      const memData = await web3Wrapper.eth.getStorageAt(address, memSlot);
      result = this.sdkUtils.removeZerosFromAddress(memData)
      return result;
    } catch (err) {
      throw new Error(
        `Error running #getLogicContractAddressOnChain(). Params:\naddress: ${address}\nmemSlot: ${memSlot}\n.\n${err}`
      )
    }
  };

  /**
   * Get contract web3 object.
   * @param abi - abi of the contract.
   * @param contractAddress - contract address.
   * @param web3Wrapper - object containing the web3 library to use.
   */
  #getContractObject = (
    abi: any,
    contractAddress: string,
    web3Wrapper: any
  ) => {
    try {
    const contract = new web3Wrapper.eth.Contract(abi, contractAddress);
    return contract;
    } catch (err) {
      throw new Error(
        `Error running #getContractObject(). Params:\nabi: ${abi}\ncontractAddress: ${contractAddress}\nweb3Wrapper: ${web3Wrapper}.\n${err}`
      )
    }
  };

  /**
   * Get web3 object of the BTSCore proxy contract.
   * @param chain - chain to query.
   * @param web3Wrapper - object containing the web3 library to use.
   */
  getBTSCoreProxyContractObject = (chain: string, web3Wrapper: any) => {
    return this.getContractObjectByLabel("BTSCore", chain, web3Wrapper, false)
  }

  /**
   * Get web3 object of the BTSCore implementation contract.
   * @param chain - chain to query.
   * @param web3Wrapper - object containing the web3 library to use.
   */
  getBTSCoreLogicContractObject = (chain: string, web3Wrapper: any) => {
    return this.getContractObjectByLabel("BTSCore", chain, web3Wrapper, true)
;
  }


// ######################################################################
/**
 * Internal class object with methods for interacting with BSC endpoint of
 * the ICON Bridge.
 */
  bsc = {

    /**
     * Get the contract that holds the implementation code of a proxy 
     * contract (address) on chain.
     * @param address - proxy contract address.
     * @param memSlot - memory slot that holds the logic contract address.
     * @return logic contract address.
     */
    getLogicContractAddressOnChain: async (
      address: string,
      memSlot: string = this.sdkUtils.labels.memSlot,
    ) => {
      try {
      return await this.#getLogicContractAddressOnChain(
        address,
        memSlot, 
        this.bscWeb3
      );
      } catch (err) {
        throw new Error(
          `Error running 'getLogicContractAddressOnChain' method.\n${err}`
        )
      }
    },

    /**
     * Get contract web3 object
     * @param abi - contract ABI.
     * @param contractAddress - Contract address.
     * @return Contract web3 object.
     */
    getContractObject: (abi: any, contractAddress: string) => {
      return this.#getContractObject(abi, contractAddress, this.bscWeb3)
    },

    /**
     * Get ABI of a contract
     * @param contractLabel - string label of the contract.
     * @param getLogicContract - if true gets logic contract object else gets proxy contract object.
     * @return ABI of the contract.
     */
    getAbiOf: (
      contractLabel: string,
      getLogicContract: boolean = false
    ) => { 
      const isMainnet: boolean | null = this.params.useMainnet == null 
        ? true 
        : this.params.useMainnet;
      return this.#getAbiOf(contractLabel, "bsc", isMainnet, getLogicContract)
    },

    /**
     * Get ABI of BTS contract
     * @return ABI of the contract.
     */
    getBTSAbi: () => {
      const isMainnet: boolean | null = this.params.useMainnet == null 
        ? true 
        : this.params.useMainnet;
      return this.#getBTSAbi("bsc", isMainnet)
    },

    /**
     * Get address of BTSCore implementation contract.
     * @return Address of implementation contract.
     */
    getBTSCoreLogicContractAddress: () => {
      const isMainnet: boolean | null = this.params.useMainnet == null 
        ? true 
        : this.params.useMainnet;
      return this.#getBTSCoreLogicContractAddress('bsc', isMainnet)
    },

    /**
     * Get web3 object for BTSCore proxy contract.
     * @return web3 object of contract.
     */
    getBTSCoreProxyContractObject: () => {
      return this.getBTSCoreProxyContractObject('bsc', this.bscWeb3)
    },

    /**
     * Get ABI of BTSCore logic contract.
     * @return ABI of BTSCore implementation contract.
     */
    getBTSCoreLogicContractAbi: () => {
      const isMainnet: boolean | null = this.params.useMainnet == null 
        ? true 
        : this.params.useMainnet;
      return this.#getAbiOf("BTSCore", "bsc", isMainnet, true)
    },

    /**
     * Get object of BTSCore implementation contract.
     * @return object of BTSCore implementation contract.
     */
    getBTSCoreLogicContractObject: () => {
      return this.getBTSCoreLogicContractObject("bsc", this.bscWeb3)
    },

    /**
     * Get the token balance of a wallet.
     * @param _owner - wallet address.
     * @param _coinName - token name.
     * @return token balance of a wallet.
     */
    balanceOf: async (
      _owner: string, 
      _coinName: string
    ): Promise<string | null> => {
      try {
        const isMainnet: boolean | null = this.params.useMainnet == null 
          ? true 
          : this.params.useMainnet;

        const response = await this.BTSReadonlyQuery(
          'balanceOf',
          'bsc', 
          this.bscWeb3,
          _owner,
          _coinName
        );

        const BTSLogicContractABI = this.#getAbiOf(
          'BTSCore',
          'bsc',
          isMainnet,
          true
        );

        const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(
          BTSLogicContractABI[4].outputs,
          response
        );

        return parsedResponse
      } catch (err) {
        console.log(err)
        throw new Error(
          `Error running balanceOf(). Params:\n_owner: ${_owner}\n_coinName: ${_coinName}\n`
        )
      }
    },
    
    /**
     * Get name of tokens.
     * @return name of tokens.
     */
    coinNames: async (): Promise<string | null> => {
      try {
        const isMainnet: boolean | null = this.params.useMainnet == null 
          ? true 
          : this.params.useMainnet;

        const response = await this.BTSReadonlyQuery(
          'coinNames',
          'bsc', 
          this.bscWeb3
        );

        const BTSLogicContractABI = this.#getAbiOf(
          'BTSCore',
          'bsc',
          isMainnet,
          true
        );

        const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(
          BTSLogicContractABI[7].outputs,
          response
        );

        // return parsedResponse['_names']
        return parsedResponse
      } catch (err) {
        console.log(err)
        throw new Error(
          `Error running coinNames(). Params:\n ** NO PARAMS**\n`
        )
      }
    },

    /**
     * Add another Owner. Caller must be an Owner of BTP network.
     * @param _owner - Address of new owner
     * @return 
     */
    addOwner: async (_owner: string): Promise<void> => {
    // index 3
    console.log(_owner)
    },

    /**
     * Returns a list of balance of an account. The order of request's
     * coinNames must be the same with the order of return balance.
     * @param _owner - Address.
     * @param _coinNames - array of coin names.
     * @return 
     */
    balanceOfBatch: async (
      _owner: string,
      _coinNames: string[]
    ): Promise<void> => {
      try {
        const isMainnet: boolean | null = this.params.useMainnet == null 
          ? true 
          : this.params.useMainnet;

        const response = await this.BTSReadonlyQuery(
          'balanceOfBatch',
          'bsc', 
          this.bscWeb3,
          _owner,
          _coinNames
        );

        const BTSLogicContractABI = this.#getAbiOf(
          'BTSCore',
          'bsc',
          isMainnet,
          true
        );

        const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(
          BTSLogicContractABI[5].outputs,
          response
        );

        return parsedResponse
      } catch (err) {
        console.log(err)
        throw new Error(
          `Error running balanceOfBatch(). Params:\n_owner: ${_owner}\n_coinNames: ${_coinNames}\n`
        )
      }
    },

    /**
     * Returns an id number of coin whose name is the same with given _coinName
     * @param _coinName - name of coin.
     * @return 
     */
    coinId: async (_coinName: string): Promise<void> => {
      try {
        const isMainnet: boolean | null = this.params.useMainnet == null 
          ? true 
          : this.params.useMainnet;

        const response = await this.BTSReadonlyQuery(
          'coinId',
          'bsc', 
          this.bscWeb3,
          _coinName
        );

        const BTSLogicContractABI = this.#getAbiOf(
          'BTSCore',
          'bsc',
          isMainnet,
          true
        );

        const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(
          BTSLogicContractABI[6].outputs,
          response
        );

        return parsedResponse
      } catch (err) {
        console.log(err)
        throw new Error(
          `Error running coinId(). Params:\n_coinName: ${_coinName}\n`
        )
      }
    },

    /**
     * Get fee numerator and fixed fee.
     * @param _coinName - name of coin.
     * @return 
     */
    feeRatio: async (_coinName: string): Promise<void> => {
      try {
        const isMainnet: boolean | null = this.params.useMainnet == null 
          ? true 
          : this.params.useMainnet;

        const response = await this.BTSReadonlyQuery(
          'feeRatio',
          'bsc', 
          this.bscWeb3,
          _coinName
        );

        const BTSLogicContractABI = this.#getAbiOf(
          'BTSCore',
          'bsc',
          isMainnet,
          true
        );

        const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(
          BTSLogicContractABI[8].outputs,
          response
        );

        return parsedResponse
      } catch (err) {
        console.log(err)
        throw new Error(
          `Error running feeRatio(). Params:\n_coinName: ${_coinName}\n`
        )
      }
    },

    /**
     * Returns a list of accumulated fees. Only return the asset that has
     * asset's value greater than 0.
     * @return Array of assets.
     */
    getAccumulatedFees: async (): Promise<void> => {
      try {
        const isMainnet: boolean | null = this.params.useMainnet == null 
          ? true 
          : this.params.useMainnet;

        const response = await this.BTSReadonlyQuery(
          'getAccumulatedFees',
          'bsc', 
          this.bscWeb3
        );

        const BTSLogicContractABI = this.#getAbiOf(
          'BTSCore',
          'bsc',
          isMainnet,
          true
        );

        const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(
          BTSLogicContractABI[9].outputs,
          response
        );

        return parsedResponse
      } catch (err) {
        console.log(err)
        throw new Error(
          `Error running getAccumulatedFees(). Params:\n ** NO PARAMS **\n`
        )
      }
    },

    /**
     * Returns name of native coin.
     * @return string name of native coin.
     */
    getNativeCoinName: async (): Promise<void> => {
      // index 10
    },

    /**
     * Returns list of current owners.
     * @return Array of address of current owners.
     */
    getOwners: async (): Promise<void> => {
      // index 11
    },

    /**
     * Handle a response of a requested service. Caller must be a 
     * BTSPeriphery contract.
     * @param _requester - an address of originator of a requested service.
     * @param _coinName - name of requested coin.
     * @param _value - amount to receive on a destination chain.
     * @param _fee - amount of charged fee.
     * @param _rspCode -
     */
    handleResponseService: async (
      _requester: string,
      _coinName: string,
      _value: number,
      _fee: number,
      _rspCode: number
    ): Promise<void> => {
      // index 12
      console.log([_requester,_coinName, _value, _fee, _rspCode])
    },

    /**
     * TODO: no info provided on this function in the BSC smart contract code.
     * https://testnet.bscscan.com/address/0xe020d4ad483c7ec90a24d9db502e66564ef9c236#code
     */
    initialize: async (
      _nativeCoinName: string,
      _feeNumerator: number,
      _fixedFee: number
    ): Promise<void> => {
      // index 13
      console.log([_nativeCoinName, _feeNumerator, _fixedFee])
    },

    /**
     * Checks is a especified address has owner role.
     * @param _owner- address to check.
     */
    isOwner: async (_owner: string): Promise<void> => {
      // index 14
      console.log(_owner)
    },

    /**
     * Checks validity of a coin name.
     * @param _coinName - coin name to check.
     */
    isValidCoin: async (_coinName: string): Promise<void> => {
      // index 15
      console.log(_coinName)
    },

    /**
     * Mint the wrapped coin. Caller must be a BTSPeriphery contract.
     * @param _to - account that receives the minted coin.
     * @param _coinName - coin name.
     * @param _value - minted amount.
     */
    mint: async (
    _to: string,
    _coinName: string,
    _value: number
    ): Promise<void> => {
      // index 16
      console.log(_to, _coinName, _value)
    },

    /**
     * Reclaim the token's refundable balance by an owner. Caller must be
     * owner of coin.
     * @param _coinName - coin name.
     * @param _value - amount of re-claiming tokens.
     */
    reclaim: async (_coinName: string, _value: number): Promise<void> => {
      // index 17
      console.log(_coinName, _value)
    },

    /**
     * For information on this specific method check the solidity smart
     * contract code on the following link:
     * https://testnet.bscscan.com/address/0xe020d4ad483c7ec90a24d9db502e66564ef9c236#code#F1#L653
     * @param _to -
     * @param _coinName -
     * @param _value -
     */
    refund: async (
      _to: string,
      _coinName: string,
      _value: number
    ): Promise<void> => {
      // index 18
      console.log([_to, _coinName,_value])
    },

    /**
     * Registers a wrapped coin and id number of a supporting coin. Caller
     * must be an owner of this contract.
     * @param _name - must be different with the native coin name.
     * @param _symbol - symbol name for a wrapped coin.
     * @param _decimals - decimal number.
     * @param _feeNumerator -
     * @param _fixedFee -
     * @param _addr -
     */
    register: async (
    _name: string,
    _symbol: string,
    _decimals: number,
    _feeNumerator: number,
    _fixedFee: number,
    _addr: string
    ): Promise<void> => {
      // index 19
      console.log([_name, _symbol, _decimals, _feeNumerator, _fixedFee, _addr])
    },

    /**
     * Removing an existing owner. Caller must be an owner of BTP network.
     * @param _owner - address of owner to be removed.
     */
    removeOwner: async (_owner: string): Promise<void> => {
      // index 20
      console.log(_owner)
    },

    /**
     * Set fee ratio. Caller must be an owner of this contract.
     * @param _name -
     * @param _feeNumerator -
     * @param _fixedFee -
     */
    setFeeRatio: async (
      _name: string,
      _feeNumerator: number,
      _fixedFee: number
    ): Promise<void> => {
      // index 21
      console.log([_name, _feeNumerator, _fixedFee])
    },

    /**
     * Allow users to deposit an amount of wrapped native coin into the
     * BTSCore contract.
     * @param _coinName - given name of wrapped coin.
     * @param _value - amount to transfer.
     * @param _to - target BTP address.
     */
    transfer: async (
    _coinName: string,
    _value: number,
    _to: string
    ): Promise<void> => {
      // index 22
      console.log([_coinName, _value, _to])
    },

    /**
     * Allow users to transfer multiple coins/wrapped coins to another chain.
     * @param _coinNames - list of coins.
     * @param _values - list of values in same order of coins.
     * @param _to - target BTP address.
     */
    transferBatch: async (
    _coinNames: string[],
    _values: string[],
    _to: string
    ): Promise<void> => {
      // index 23
      console.log([_coinNames, _values, _to])
    },

    /**
     * Handle request of fee gathering. Caller must be an
     * BTSPeriphery contract.
     * @param _fa - 
     */
    transferFees: async (_fa: string): Promise<void> => {
      // index 24
      console.log(_fa)
    },

    /**
     * Allows user to deposit native coin into a BTSCore contract.
     * @param _to - address that receives transfer.
     */
    transferNativeCoin: async (_to: string): Promise<void> => {
      // index 25
      console.log(_to)
    },

    /**
     * Updates BTS periphery address. Caller must be owner of contract.
     * @param _btsPeriphery - btsPeriphery contract address.
     */
    updateBTSPeriphery: async (_btsPeriphery: string): Promise<void> => {
      // index 26
      console.log(_btsPeriphery)
    },
  };


// ######################################################################
/**
 * Internal class object with methods for interacting with ICON endpoint of
 * the ICON Bridge.
 */
  icon = {}
}

export = IconBridgeSDK;
