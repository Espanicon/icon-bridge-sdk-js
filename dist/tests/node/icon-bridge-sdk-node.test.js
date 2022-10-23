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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
require("dotenv").config();
const icon_bridge_sdk_node_js_1 = __importDefault(require("../../icon-bridge-sdk-node.js"));
const lib = new icon_bridge_sdk_node_js_1.default({ useMainnet: false });
const wallets = {
    icon: {
        a: {
            pubK: process.env.WALLET_ICON_ADDRESS,
            privK: process.env.WALLET_ICON_PK
        }
    },
    bsc: {
        a: {
            pubK: process.env.WALLET_BSC_ADDRESS,
            privK: process.env.WALLET_BSC_PK
        }
    }
};
function iconBridgeSDKNodeTests() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("transferNativeCoin test");
        const a = yield lib.bsc.transferNativeCoin("1", wallets.bsc.a.pubK, wallets.icon.a.pubK, wallets.bsc.a.privK, "icon");
        console.log(a);
    });
}
module.exports = iconBridgeSDKNodeTests;
//# sourceMappingURL=icon-bridge-sdk-node.test.js.map