import EspaniconSDK from "@espanicon/espanicon-sdk";
// import utils from "./utils/utils.js";
import IconBridgeSDK from "./lib/icon-bridge-sdk.js";
import bscNodeBridge from "./lib/bsc/icon-bridge-sdk-node-bsc.js";
import iconNodeBridge from "./lib/icon/icon-bridge-sdk-icon.js";

// types
type Provider = {
  hostname: string;
  nid: null | number;
};

type InputParams = {
  useMainnet: null | boolean;
  iconProvider?: Provider;
  bscProvider?: Provider;
  abiData?: unknown;
};
// variables
const defaultParams = {
  useMainnet: true
};

// code logic
export default class IconBridgeSDKWeb extends IconBridgeSDK {
  bsc: any;
  icon: any;

  constructor(inputParams: InputParams = defaultParams) {
    super(inputParams);

    this.icon = new iconNodeBridge(this.params, this.sdkUtils, EspaniconSDK);
    this.bsc = new bscNodeBridge(
      this.params,
      this.bscWeb3,
      this.sdkUtils,
      this.lib,
      this.icon.queryMethod
    );
  }
}
