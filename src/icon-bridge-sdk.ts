import utils from "./utils/utils";
import Web3 from "web3";

const bscMainnet = new Web3(utils.bscNode.node);
const bscTestnet = new Web3(utils.bscNodeTestnet.node);

type Params = {
  isMainnet: boolean
}
const defaultParams: Params = {
  isMainnet: true
}

export default class IconBridgeSDK {
  utils: any;
  params: Params;
  constructor(inputParams: Params) {
  this.utils = utils;
    this.params = { ...defaultParams, ...inputParams }
  }
    bsc = {
      getLogicContract: async (
        address: string,
        isMainnet: boolean = this.params.isMainnet,
        memSlot: string = utils.labels.memSlot
      ) => {
        return await this.#getLogicContract(address, isMainnet, memSlot);
      }
    };

  #getLogicContract = async (
    address: string,
    isMainnet: boolean,
    memSlot: string  
  ) => {
    let result: any = null;

    try {
      let memData: string | null = null;
      if (isMainnet === true) {
        memData = await bscMainnet.eth.getStorageAt(address, memSlot);
      } else {
        memData = await bscTestnet.eth.getStorageAt(address, memSlot);
      }

      if (memData !== null) {
        result = this.utils.removeZerosFromAddress(memData)
      }

    } catch (err) {
      console.log(
        `Error running getLogicContract(). Params:\naddress: ${address}\nmemSlot: ${memSlot}\nisMainnet: ${isMainnet}`
      );
      console.log(err);
    }

    return result;
  };
}
