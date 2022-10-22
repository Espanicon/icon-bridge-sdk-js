const IconBridgeSDK = require("./icon-bridge-sdk");
const EspaniconSDKNode = require("@espanicon/espanicon-sdk");
import utils from "./utils/utils";

class IconBridgeSDKNode extends IconBridgeSDK {
  iconWeb3: any;
  constructor(inputParams = utils.defaultSDKParams) {
    super(inputParams);
    this.iconWeb3 = new EspaniconSDKNode(
      this.params.iconProvider.hostname,
      this.params.iconProvider.nid
    );
    this.bsc = {
      ...this.bsc,
      transferNativeCoin: async (
        amount: string,
        from: string,
        to: string,
        privateKey: string,
        toChain:string,
      ) => {
        return await this.#transferNativeCoin(
          amount,
          from,
          to,
          privateKey, 
          toChain,
          "bsc",
          this.bscWeb3
        )
      }
    };
  }

  #transferNativeCoin = async (
    amount: string,
    from: string,
    to: string,
    privateKey: string,
    toChain: string,
    fromChain: string,
    web3Wrapper: any
  ) => {
    try {
      const isMainnet = this.params.useMainnet == null 
        ? true 
        : this.params.useMainnet;

      // get contract object with the methods
      const contract = this.getBTSCoreLogicContractObject(fromChain, web3Wrapper);
      // get the correctly formatted BTP address (btp://<BTP_NID>/<ADDRESS>
      const btpAddress = this.sdkUtils.getBTPAddress(to, toChain, isMainnet);
      const proxyAddress = this.getBTSCoreProxyContractAddress("bsc", isMainnet);
      // create the query and tx object
      const query = contract.methods.transferNativeCoin(btpAddress);
      const tx = {
        from:from,
        // to: contract._address,
        to: proxyAddress,
        gas: 2000000,
        data: query.encodeABI(),
        value: web3Wrapper.utils.toWei(amount, "ether")
      }
      // create the signed tx
      const signedTx = await web3Wrapper.eth.accounts.signTransaction(
        tx,
        privateKey
      )
      // get tx receipt
      const receipt = await web3Wrapper.eth.sendSignedTransaction(
        signedTx.rawTransaction
      )

      return receipt.transactionHash
    } catch (err) {
      console.log(`Error running #transferNativeCoin.\n${err}`)
      return null
    }

  }
}
export = IconBridgeSDKNode;
