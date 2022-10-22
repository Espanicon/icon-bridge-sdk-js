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
      return this.#getContract(abi, contractAddress, this.bscWeb3)
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
    getBTSCoreLogicContract: (chain: string = "bsc") => {
      const isMainnet: boolean | null = this.params.useMainnet == null 
        ? true 
        : this.params.useMainnet;
      return this.#getBTSCoreLogicContract(chain, isMainnet)
    },
    getBTSCoreLogicContractAbi: () => {
      const isMainnet: boolean | null = this.params.useMainnet == null 
        ? true 
        : this.params.useMainnet;
      return this.#getAbiOf("BTSCore", "bsc", isMainnet, true)
    },
    getBTSCoreLogicContractObject: (chain: string) => {
      return this.getBTSCoreLogicContractObject(chain, this.bscWeb3)
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

  #getContract = (abi: any, contractAddress: string, web3Wrapper: any) => {
    try {
    const contract = new web3Wrapper.eth.Contract(abi, contractAddress);
    return contract;
    } catch (err) {

      throw new Error(`Error running #getContract(). Params:\nabi: ${abi}\ncontractAddress: ${contractAddress}\nweb3Wrapper: ${web3Wrapper}.\n${err}`)
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

  getBTSCoreLogicContractObject = (chain: string, web3Wrapper: any) => {
    const isMainnet: boolean | null = this.params.useMainnet == null 
      ? true 
      : this.params.useMainnet;
    const contractAddress = this.#getBTSCoreLogicContract(chain, isMainnet);
    const abi = this.#getAbiOf("BTSCore", chain, isMainnet, true)
    return this.#getContract(abi, contractAddress, web3Wrapper)
  }
}

export = IconBridgeSDK;
