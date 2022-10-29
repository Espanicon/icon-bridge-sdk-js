import utils from "./utils/utils";
import Web3 from "web3";

// types

// variables

// SDK
class IconBridgeSDK {
  sdkUtils: any = utils;
  params = utils.defaultSDKParams;
  bscWeb3: any;

  constructor(inputParams = utils.defaultSDKParams) {
  this.params = this.sdkUtils.getSDKParams(inputParams)
  this.bscWeb3 = new Web3(this.params.bscProvider.hostname);
  }

  bsc = {
    getLogicContractAddressOnChain: async (
      address: string,
      memSlot: string = this.sdkUtils.labels.memSlot,
      web3Wrapper: any = this.bscWeb3
    ) => {
      try {
      return await this.#getLogicContractAddressOnChain(address, memSlot, web3Wrapper);
      } catch (err) {
        throw new Error(`Error running 'getLogicContractAddressOnChain' method.\n${err}`)
      }
    },
    getContractObject: (abi: any, contractAddress: string) => {
      return this.#getContractObject(abi, contractAddress, this.bscWeb3)
    },
    getAbiOf: (contractLabel: string, getLogicContract: boolean = false) => { 

      const isMainnet: boolean | null = this.params.useMainnet == null 
        ? true 
        : this.params.useMainnet;
      return this.#getAbiOf(contractLabel, "bsc", isMainnet, getLogicContract)
    },
    getBTSAbi: () => {
      const isMainnet: boolean | null = this.params.useMainnet == null 
        ? true 
        : this.params.useMainnet;
      return this.#getBTSAbi("bsc", isMainnet)
    },
    getBTSCoreLogicContract: () => {
      const isMainnet: boolean | null = this.params.useMainnet == null 
        ? true 
        : this.params.useMainnet;
      return this.#getBTSCoreLogicContractAddress('bsc', isMainnet)
    },
    getBTSCoreProxyContractObject: () => {
      return this.getBTSCoreProxyContractObject('bsc', this.bscWeb3)
    },
    getBTSCoreLogicContractAbi: () => {
      const isMainnet: boolean | null = this.params.useMainnet == null 
        ? true 
        : this.params.useMainnet;
      return this.#getAbiOf("BTSCore", "bsc", isMainnet, true)
    },
    getBTSCoreLogicContractObject: () => {
      return this.getBTSCoreLogicContractObject("bsc", this.bscWeb3)
    },

    // BTS specific methods
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

    addOwner: (_owner: string): void => {
    // index 3
    console.log(_owner)
    },
    // balanceOf()
    balanceOfBatch: (_owner: string, _coinNames: string[]): void => {
      // index 5
      console.log([_owner, _coinNames])
    },
    coinId: (_coinName: string): void => {
      // index 6
      console.log(_coinName)
    },
    // coinNames
    feeRatio: (_coinName: string): void => {
      // index 8
      console.log(_coinName)
    },
    getAccumulatedFees: (): void => {
      // index 9
    },
    getNativeCoinName: (): void => {
      // index 10
    },
    getOwners: (): void => {
      // index 11
    },
    handleResponseService: (
      _requester: string,
      _coinName: string,
      _value: number,
      _fee: number,
      _rspCode: number
    ): void => {
      // index 12
      console.log([_requester,_coinName, _value, _fee, _rspCode])
    },
    initialize: (
      _nativeCoinName: string,
      _feeNumerator: number,
      _fixedFee: number
    ): void => {
      // index 13
      console.log([_nativeCoinName, _feeNumerator, _fixedFee])
    },
    isOwner: (_owner: string): void => {
      // index 14
      console.log(_owner)
    },
    isValidCoin: (_coinName: string): void => {
      // index 15
      console.log(_coinName)
    },
    mint: (
    _to: string,
    _coinName: string,
    _value: number
    ): void => {
      // index 16
      console.log(_to, _coinName, _value)
    },
    reclaim: (_coinName: string, _value: number): void => {
      // index 17
      console.log(_coinName, _value)
    },
    refund: (_to: string, _coinName: string, _value: number): void => {
      // index 18
      console.log([_to, _coinName,_value])
    },
    register: (
    _name: string,
    _symbol: string,
    _decimals: number,
    _feeNumerator: number,
    _fixedFee: number,
    _addr: string
    ): void => {
      // index 19
      console.log([_name, _symbol, _decimals, _feeNumerator, _fixedFee, _addr])
    },
    removeOwner: (_owner: string): void => {
      // index 20
      console.log(_owner)
    },
    setFeeRatio: (
      _name: string,
      _feeNumerator: number,
      _fixedFee: number
    ): void => {
      // index 21
      console.log([_name, _feeNumerator, _fixedFee])
    },
    transfer: (
    _coinName: string,
    _value: number,
    _to: string
    ): void => {
      // index 22
      console.log([_coinName, _value, _to])
    },
    transferBatch: (
    _coinNames: string[],
    _values: string[],
    _to: string
    ): void => {
      // index 23
      console.log([_coinNames, _values, _to])
    },
    transferFees: (_fa: string): void => {
      // index 24
      console.log(_fa)
    },
    transferNativeCoin: (_to: string): void => {
      // index 25
      console.log(_to)
    },
    updateBTSPeriphery: (_btsPeriphery: string): void => {
      // index 26
      console.log(_btsPeriphery)
    },
  };

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

  #getBTSAbi = (
    chain: string,
    isMainnet: boolean,
    getLogicContract = true
  ) => {
    return this.#getAbiOf("BTSCore", chain, isMainnet, getLogicContract)
  };

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
      throw new Error(`Error running #getContractObjectByLabel(). Params:\nlabel: ${label}\nchain: ${chain}\nweb3Wrapper: ${web3Wrapper}\ngetLogicContract: ${getLogicContract}.\n${err}`)

    }
  };

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
      throw new Error(`Error running #getLogicContractAddressOnChain(). Params:\naddress: ${address}\nmemSlot: ${memSlot}\n.\n${err}`)
    }
  };

  #getContractObject = (abi: any, contractAddress: string, web3Wrapper: any) => {
    try {
    const contract = new web3Wrapper.eth.Contract(abi, contractAddress);
    return contract;
    } catch (err) {

      throw new Error(`Error running #getContractObject(). Params:\nabi: ${abi}\ncontractAddress: ${contractAddress}\nweb3Wrapper: ${web3Wrapper}.\n${err}`)
    }
  };

  getBTSCoreProxyContractObject = (chain: string, web3Wrapper: any) => {
    return this.getContractObjectByLabel("BTSCore", chain, web3Wrapper, false)
  }


  getBTSCoreLogicContractObject = (chain: string, web3Wrapper: any) => {
    return this.getContractObjectByLabel("BTSCore", chain, web3Wrapper, true)
;
  }
}

export = IconBridgeSDK;
