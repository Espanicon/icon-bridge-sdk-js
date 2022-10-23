import EspaniconSDKWeb from "@espanicon/espanicon-sdk";
import utils from "./utils/utils.js";
import IconBridgeSDK from "./icon-bridge-sdk.js";
export default class IconBridgeSDKWeb extends IconBridgeSDK {
    constructor(inputParams = utils.defaultSDKParams) {
        super(inputParams);
        this.IconWeb3 = new EspaniconSDKWeb(this.params.iconProvider.hostname, this.params.iconProvider.nid);
    }
}
//# sourceMappingURL=icon-bridge-sdk-web.mjs.map