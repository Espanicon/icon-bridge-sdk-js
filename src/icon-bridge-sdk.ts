import utils from "./utils/utils";
import Web3 from "web3";

// types

// variables

// SDK
class IconBridgeSDK {
  utils: any;
  params = utils.defaultSDKParams;
  bscWeb3: any;

  constructor(inputParams = utils.defaultSDKParams) {
  this.utils = utils;
  this.params = utils.getSDKParams(inputParams)
  this.bscWeb3 = new Web3(this.params.bscProvider.hostname);
  }

  bsc = {
    getLogicContract: async (
      address: string,
      memSlot: string = utils.labels.memSlot,
      web3Wrapper: any = this.bscWeb3
    ) => {
      return await this.#getLogicContract(address, memSlot, web3Wrapper);
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
    getBTSCoreLogicContract: () => {
      const isMainnet: boolean | null = this.params.useMainnet == null 
        ? true 
        : this.params.useMainnet;
      return this.#getBTSCoreLogicContract("bsc", isMainnet)
    },

    getBTSCoreLogicContractAbi: () => {
      const isMainnet: boolean | null = this.params.useMainnet == null 
        ? true 
        : this.params.useMainnet;
      return this.#getAbiOf("BTSCore", "bsc", isMainnet, true)
    },

    getBTSCoreLogicContractObject: () => {
      const isMainnet: boolean | null = this.params.useMainnet == null 
        ? true 
        : this.params.useMainnet;
      const contractAddress = this.#getBTSCoreLogicContract("bsc", isMainnet);
      const abi = this.#getAbiOf("BTSCore", "bsc", isMainnet, true)
      return this.#getContract(abi, contractAddress, this.bscWeb3)
    }
  };

  #getContractLocally = (
    label: string,
    chain: string, 
    isMainnet: boolean, 
    getLogicContract: boolean = false
  ) => {
    return utils.getContractOfLabelFromLocalData(
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

  #getLogicContract = async (
    address: string,
    memSlot: string,
    web3Wrapper: any
  ) => {
    let result: any = null;

    try {
      const memData = await web3Wrapper.eth.getStorageAt(address, memSlot);
      result = this.utils.removeZerosFromAddress(memData)

    } catch (err) {
      console.log(
        `Error running getLogicContract(). Params:\naddress: ${address}\nmemSlot: ${memSlot}\n`
      );
      console.log(err);
    }

    return result;
  };

  #getContract = (abi: any, contractAddress: string, web3Wrapper: any) => {
    const contract = new web3Wrapper.eth.Contract(abi, contractAddress);
    return contract
  };

  #getAbiOf = (
    contractLabel: string,
    chain: string, 
    isMainnet: boolean,
    getLogicContract: boolean = false
  ) => {
    return utils.getAbiOfLabelFromLocalData(
      contractLabel,
      chain, 
      isMainnet,
      getLogicContract
    )
  };

  #getBTSAbi = (chain: string, isMainnet: boolean) => {
    return this.#getAbiOf("BTSCore", chain, isMainnet)
  };

  //#getBTSContract = (chain: string, isMainnet: boolean) => {
  //  //TODO: incomplete implementation fo this method
  //  const abi = this.#getBTSAbi(chain, isMainnet)
  //  const contractAddress = utils.getContractOf("BTSCore", chain, isMainnet)
  //  console.log(abi, contractAddress)
  //}
}

export = IconBridgeSDK;
