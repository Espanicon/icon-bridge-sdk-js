"use strict";
const IconBridgeSDK = require("./lib/icon-bridge-sdk");
const bscNodeBridge = require("./lib/bsc/icon-bridge-sdk-node-bsc");
const iconNodeBridge = require("./lib/icon/icon-bridge-sdk-node-icon");
const EspaniconSDK = require("@espanicon/espanicon-sdk");
const defaultParams = {
    useMainnet: true
};
class IconBridgeSDKNode extends IconBridgeSDK {
    constructor(inputParams = defaultParams) {
        super(inputParams);
        this.icon = new iconNodeBridge(this.params, this.sdkUtils, EspaniconSDK);
        this.bsc = new bscNodeBridge(this.params, this.bscWeb3, this.sdkUtils, this.lib, this.icon.queryMethod);
    }
}
module.exports = IconBridgeSDKNode;
//# sourceMappingURL=icon-bridge-sdk-node.js.map