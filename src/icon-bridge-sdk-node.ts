const IconBridgeSDK = require("./lib/icon-bridge-sdk");
// const EspaniconSDKNode = require("@espanicon/espanicon-sdk");
const bscNodeBridge = require("./lib/bsc/icon-bridge-sdk-node-bsc");
const iconNodeBridge = require("./lib/icon/icon-bridge-sdk-node-icon");

// types
type Provider = {
  hostname: string;
  nid?: null | number;
};

type InputParams = {
  useMainnet: null | boolean;
  iconProvider?: Provider;
  bscProvider?: Provider;
};
// variables
const defaultParams = {
  useMainnet: true
};

// code logic
class IconBridgeSDKNode extends IconBridgeSDK {
  // iconWeb3: any;
  bsc: any;
  icon: any;

  constructor(inputParams: InputParams = defaultParams) {
    super(inputParams);
    // this.iconWeb3 = new EspaniconSDKNode(
    //   this.params.iconProvider.hostname,
    //   this.params.iconProvider.nid
    // );

    this.icon = new iconNodeBridge(this.params, this.sdkUtils);

    this.bsc = new bscNodeBridge(
      this.params,
      this.bscWeb3,
      this.sdkUtils,
      this.lib,
      this.icon.iconWeb3.queryMethod
    );
  }
}
export = IconBridgeSDKNode;
