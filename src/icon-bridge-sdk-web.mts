import EspaniconSDKWeb from "@espanicon/espanicon-sdk";
// import utils from "./utils/utils.js";
import IconBridgeSDK from "./icon-bridge-sdk.js";

// types
type Provider = {
  hostname: string;
  nid: null | number
}

type InputParams = {
  useMainnet: null | boolean;
  iconProvider?: Provider;
  bscProvider?: Provider;
}
// variables
const defaultParams = {
  useMainnet: true
}

// code logic
export default class IconBridgeSDKWeb extends IconBridgeSDK {
  IconWeb3: any;
  constructor(inputParams: InputParams = defaultParams ) {
    super(inputParams);
    this.IconWeb3 = new EspaniconSDKWeb(
      this.params.iconProvider.hostname,
      this.params.iconProvider.nid
    );
  }
}
