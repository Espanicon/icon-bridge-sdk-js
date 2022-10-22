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
    getLogicContract: async (
      address: string,
      memSlot: string = this.sdkUtils.labels.memSlot,
      web3Wrapper: any = this.bscWeb3
    ) => {
      try {
      return await this.#getLogicContract(address, memSlot, web3Wrapper);
      } catch (err) {
        throw new Error(`Error running 'getLogicContract' method.\n${err}`)
      }
    },
    getContract: (abi: any, contractAddress: string) => {
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
      return this.#getBTSCoreLogicContract('bsc', isMainnet)
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
    }
  };

  #getContractLocally = (
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

  #getBTSCoreLogicContract = (
    chain: string,
    isMainnet: boolean,
  ) => {
    return this.#getContractLocally(
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
    return this.#getContractLocally(
      "BTSCore",
      chain,
      isMainnet
    )
  }

  #getLogicContract = async (
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
      throw new Error(`Error running #getLogicContract(). Params:\naddress: ${address}\nmemSlot: ${memSlot}\n.\n${err}`)
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
      const contractAddress = this.#getContractLocally(
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

  getBTSCoreProxyContractObject = (chain: string, web3Wrapper: any) => {
    return this.getContractObjectByLabel("BTSCore", chain, web3Wrapper, false)
  }


  getBTSCoreLogicContractObject = (chain: string, web3Wrapper: any) => {
    return this.getContractObjectByLabel("BTSCore", chain, web3Wrapper, true)
;
  }
}

export = IconBridgeSDK;
