import EspaniconSDK from "@espanicon/espanicon-sdk";
import IconBridgeSDK from "./lib/icon-bridge-sdk.js";
import bscNodeBridge from "./lib/bsc/icon-bridge-sdk-node-bsc.js";
import iconNodeBridge from './lib/icon/icon-bridge-sdk-node-icon.js';
const defaultParams = {
    useMainnet: true
};
export default class IconBridgeSDKWeb extends IconBridgeSDK {
    constructor(inputParams = defaultParams) {
        super(inputParams);
        this.icon = new iconNodeBridge(this.params, this.sdkUtils, EspaniconSDK);
        this.bsc = new bscNodeBridge(this.params, this.bscWeb3, this.sdkUtils, this.lib, this.icon.queryMethod);
    }
}
//# sourceMappingURL=icon-bridge-sdk-web.mjs.map