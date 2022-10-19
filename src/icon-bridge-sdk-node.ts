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
  }
}
export = IconBridgeSDKNode;
