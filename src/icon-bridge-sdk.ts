import utils from "./utils/utils";
import Web3 from "web3";

// types

// variables

// SDK
export default class IconBridgeSDK {
  utils: any;
  params = utils.defaultSDKParams;
  bscWeb3: any;
  constructor(inputParams = utils.defaultSDKParams) {
  this.utils = utils;
  this.params = utils.getSDKParams(inputParams)
  this.bscWeb3 = new Web3(this.params.bscProvider);
  }
    bsc = {
      getLogicContract: async (
        address: string,
        memSlot: string = utils.labels.memSlot
      ) => {
        return await this.#getLogicContract(address, memSlot);
      }
    };

  #getLogicContract = async (
    address: string,
    memSlot: string  
  ) => {
    let result: any = null;

    try {
      const memData = await this.bscWeb3.eth.getStorageAt(address, memSlot);
      result = this.utils.removeZerosFromAddress(memData)

    } catch (err) {
      console.log(
        `Error running getLogicContract(). Params:\naddress: ${address}\nmemSlot: ${memSlot}\n`
      );
      console.log(err);
    }

    return result;
  };
}
