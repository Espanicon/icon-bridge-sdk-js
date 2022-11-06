"use strict";
const IconBridgeSDK = require("./lib/icon-bridge-sdk");
const EspaniconSDKNode = require("@espanicon/espanicon-sdk");
const bscNodeBridge = require("./lib/bsc/icon-bridge-sdk-node-bsc");
const defaultParams = {
    useMainnet: true
};
class IconBridgeSDKNode extends IconBridgeSDK {
    constructor(inputParams = defaultParams) {
        super(inputParams);
        this.iconWeb3 = new EspaniconSDKNode(this.params.iconProvider.hostname, this.params.iconProvider.nid);
        this.bsc = new bscNodeBridge(this.params, this.bscWeb3, this.sdkUtils, this.lib);
    }
}
module.exports = IconBridgeSDKNode;
//# sourceMappingURL=icon-bridge-sdk-node.js.map