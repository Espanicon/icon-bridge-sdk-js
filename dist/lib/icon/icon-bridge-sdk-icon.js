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
const EspaniconSDK = require("@espanicon/espanicon-sdk");
class IconBridgeSDKIcon {
    constructor(params, sdkUtils) {
        this.superMethods = {
            balanceOf: (_owner, _coinName) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
                    const btsContract = this.sdkUtils.getContractOf("bts", "icon", isMainnet);
                    const JSONRPCObject = this.iconWeb3.makeICXCallRequestObj("balanceOf", { _owner: _owner, _coinName: _coinName }, null, btsContract);
                    const request = yield this.iconWeb3.queryMethod(this.iconWeb3.scores.apiRoutes.v3, JSONRPCObject, this.iconWeb3.apiNode);
                    return request;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running balanceOf(). Params:\n_owner: ${_owner}\n_coinName: ${_coinName}\n`);
                    return { error: errorResult.toString() };
                }
            })
        };
        this.params = params;
        this.sdkUtils = sdkUtils;
        this.iconWeb3 = new EspaniconSDK(this.params.iconProvider.hostname, this.params.iconProvider.nid);
    }
}
module.exports = IconBridgeSDKIcon;
//# sourceMappingURL=icon-bridge-sdk-icon.js.map