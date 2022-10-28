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
      // check if class object was created for mainnet or testnet
      const isMainnet: boolean | null = this.params.useMainnet == null 
        ? true 
        : this.params.useMainnet;

      try {
        // get contract address and contract object
        const BTSProxyContractAddress = this.getBTSCoreProxyContractAddress(
          'bsc',
          isMainnet
        );
        const contractObject = this.getBTSCoreLogicContractObject(
          'bsc',
          isMainnet
        );

        // decoding a call to readonly method
        const contractMethod = contractObject.methods.balanceOf(
          _owner, 
          _coinName
        );
        const encodedData = contractMethod.encodeABI();

        // making readonly call
        const contractMethodCallResponse = await this.bscWeb3.eth.call({
          to: BTSProxyContractAddress,
          data: encodedData
        })

        // parsing the hex response into utf8
        const parsedResponse = this.bscWeb3.utils.toUtf8(
          contractMethodCallResponse
        )

        return parsedResponse
      } catch (err) {
        console.log(err)
        throw new Error(`Error running balanceOf(_owner, _coinName). Params:\n_owner: ${_owner}\n_coinName: ${_coinName}\n`)
      }

    },

  };

  #getAbiOf = (
    contractLabel: string,
    chain: string, 
    isMainnet: boolean,
    getLogicContract: boolean = false
  ) => {
    return this.sdkUtils.getAbiOfLabelFromLocalData(
      contractLabel,
      chain, 
      isMainnet,
      getLogicContract
    )
  };

  #getBTSAbi = (chain: string, isMainnet: boolean) => {
    return this.#getAbiOf("BTSCore", chain, isMainnet)
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
