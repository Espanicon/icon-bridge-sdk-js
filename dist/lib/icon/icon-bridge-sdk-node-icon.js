"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Exception = require("../../utils/exception");
const baseICONSDK = require("./icon-bridge-sdk-icon");
class IconBridgeSDKNodeIcon extends baseICONSDK {
    constructor(params, sdkUtils) {
        super(params, sdkUtils);
        this.localMethods = {
            transferNativeCoin: (_to, amount) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const foo = [_to, amount];
                    console.log(foo);
                    return null;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferNativeCoin(). Params:\n_to: ${_to}\namount: ${amount}\n`);
                    return { error: errorResult.toString() };
                }
            })
        };
        this.params = params;
        this.sdkUtils = sdkUtils;
        this.methods = Object.assign(Object.assign({}, this.superMethods), this.localMethods);
    }
}
module.exports = IconBridgeSDKNodeIcon;
//# sourceMappingURL=icon-bridge-sdk-node-icon.js.map