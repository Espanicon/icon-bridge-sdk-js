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
      transferNativeCoin: (
        amount: number,
        from: string,
        to: string,
        privateKey: string
      ) => {
        return this.#transferNativeCoin(amount, from, to, privateKey)
      }
    };
  }

  #transferNativeCoin = (
    amount: number,
    from: string,
    to: string,
    privateKey: string
  ) => {
    const foo = [amount, from, to, privateKey]
    console.log(foo)
    
    const account = this.bscWeb3.eth.accounts.privateKeyToAccount(privateKey);
    this.bscWeb3.eth.accounts.wallet.add(account);
    // this.bscWeb3.eth.defaultAccount = account.address
    console.log('accounts')
    console.log(this.bscWeb3.eth.accounts.wallet)
  }
}
export = IconBridgeSDKNode;
