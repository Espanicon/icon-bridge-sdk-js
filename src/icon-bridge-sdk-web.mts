import EspaniconSDKWeb from "@espanicon/espanicon-sdk";
// import CustomIconLib from "./utils/customLib.js";
import utils from "./utils/utils";
const IconBridgeSDK = require("./icon-bridge-sdk");

export default class IconBridgeSDKWeb extends IconBridgeSDK.default {
  IconWeb3: any;
  constructor(inputParams = utils.defaultSDKParams) {
    super(inputParams);
    this.iconWeb3 = new EspaniconSDKWeb();
    // this.iconWeb3 = new CustomIconLib();
  }
}
