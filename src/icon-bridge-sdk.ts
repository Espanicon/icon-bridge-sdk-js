import utils from "./utils/utils";
import Web3 from "web3";

// types

// variables

// SDK

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
   */
  constructor(inputParams = utils.defaultSDKParams) {
  this.params = this.sdkUtils.getSDKParams(inputParams)
  this.bscWeb3 = new Web3(this.params.bscProvider.hostname);
  }

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
     * TODO
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
     * TODO
     */
    getNativeCoinName: async (): Promise<void> => {
      // index 10
    },

    /**
     * TODO
     */
    getOwners: async (): Promise<void> => {
      // index 11
    },

    /**
     * TODO
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
     * TODO
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
     * TODO
     */
    isOwner: async (_owner: string): Promise<void> => {
      // index 14
      console.log(_owner)
    },

    /**
     * TODO
     */
    isValidCoin: async (_coinName: string): Promise<void> => {
      // index 15
      console.log(_coinName)
    },

    /**
     * TODO
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
     * TODO
     */
    reclaim: async (_coinName: string, _value: number): Promise<void> => {
      // index 17
      console.log(_coinName, _value)
    },

    /**
     * TODO
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
     * TODO
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
     * TODO
     */
    removeOwner: async (_owner: string): Promise<void> => {
      // index 20
      console.log(_owner)
    },

    /**
     * TODO
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
     * TODO
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
     * TODO
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
     * TODO
     */
    transferFees: async (_fa: string): Promise<void> => {
      // index 24
      console.log(_fa)
    },

    /**
     * TODO
     */
    transferNativeCoin: async (_to: string): Promise<void> => {
      // index 25
      console.log(_to)
    },

    /**
     * TODO
     */
    updateBTSPeriphery: async (_btsPeriphery: string): Promise<void> => {
      // index 26
      console.log(_btsPeriphery)
    },
  };

  /**
   * TODO
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
   * TODO
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
   * TODO
   */
  #getBTSAbi = (
    chain: string,
    isMainnet: boolean,
    getLogicContract = true
  ) => {
    return this.#getAbiOf("BTSCore", chain, isMainnet, getLogicContract)
  };

  /**
   * TODO
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
   * TODO
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
   * TODO
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
   * TODO
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
   * TODO
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
   * TODO
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
   * TODO
   */
  getBTSCoreProxyContractObject = (chain: string, web3Wrapper: any) => {
    return this.getContractObjectByLabel("BTSCore", chain, web3Wrapper, false)
  }

  /**
   * TODO
   */
  getBTSCoreLogicContractObject = (chain: string, web3Wrapper: any) => {
    return this.getContractObjectByLabel("BTSCore", chain, web3Wrapper, true)
;
  }
}

export = IconBridgeSDK;
