import utils from "./utils/utils";
import Web3 from "web3";

const bscMainnet = new Web3(utils.bscNode.node);
const bscTestnet = new Web3(utils.bscNodeTestnet.node);

export default class IconBridgeSDK {
  icon: any = {};
  bsc: any = {
    getlogicContact: this.#getLogicContract
    }
  constructor() {
    //
  }

  async #getLogicContract(
    address: string,
    isMainnet: boolean = true,
    memSlot: string = utils.labels.memSlot
  ) {
    let result: any = null;

    try {
      if (isMainnet === true) {
        result = await bscMainnet.eth.getStorageAt(address, memSlot);
      } else {
        result = await bscTestnet.eth.getStorageAt(address, memSlot);
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
