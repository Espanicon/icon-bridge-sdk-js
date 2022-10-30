import EspaniconSDKWeb from "@espanicon/espanicon-sdk";
import IconBridgeSDK from "./icon-bridge-sdk.js";
const defaultParams = {
    useMainnet: true
};
export default class IconBridgeSDKWeb extends IconBridgeSDK {
    constructor(inputParams = defaultParams) {
        super(inputParams);
        this.IconWeb3 = new EspaniconSDKWeb(this.params.iconProvider.hostname, this.params.iconProvider.nid);
    }
}
//# sourceMappingURL=icon-bridge-sdk-web.mjs.map