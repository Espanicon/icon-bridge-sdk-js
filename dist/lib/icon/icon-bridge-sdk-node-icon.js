"use strict";
const baseICONSDK = require("./icon-bridge-sdk-icon");
class IconBridgeSDKNodeIcon extends baseICONSDK {
    constructor(params, sdkUtils) {
        super(params, sdkUtils);
        this.localMethods = {
            foo: "foo"
        };
        this.params = params;
        this.sdkUtils = sdkUtils;
        this.methods = Object.assign(Object.assign({}, this.superMethods), this.localMethods);
    }
}
module.exports = IconBridgeSDKNodeIcon;
//# sourceMappingURL=icon-bridge-sdk-node-icon.js.map