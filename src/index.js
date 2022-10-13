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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const web3_1 = require("web3");
const EspaniconSDKNode = require("@espanicon/espanicon-sdk");
const utils = require("./utils/utils");
const iconNode = {
    node: "lisbon.net.solidwallet.io",
    nid: 2
};
const bscNode = {
    node: utils.networks.testnet.bsc.uri,
    nid: utils.networks.testnet.bsc.network_id
};
const walletsRaw = {
    icon: {
        address: process.env.WALLET_ICON_ADDRESS,
        pk: process.env.WALLET_ICON_PK
    },
    bsc: {
        address: process.env.WALLET_BSC_ADDRESS,
        pk: process.env.WALLET_BSC_PK
    }
};
const iconLib = new EspaniconSDKNode(iconNode.node, iconNode.nid);
const bscLib = new web3_1.default(bscNode.node);
function runAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        let bscQuery = null;
        let iconQuery = null;
        try {
            iconQuery = yield iconLib.getIcxBalance(walletsRaw.icon.address);
            if (typeof walletsRaw.bsc.address === "string") {
                bscQuery = yield bscLib.eth.getBalance(walletsRaw.bsc.address, (err, wei) => {
                    if (err) {
                        console.log("error inside");
                        console.log(err);
                    }
                    const balance = web3_1.default.utils.fromWei(wei, "ether");
                    console.log("balance inside callback");
                    console.log(balance);
                    return balance;
                });
            }
        }
        catch (err) {
            if (err instanceof Error) {
                console.log("error running queries");
                console.log(err.message);
            }
            console.log("unexpected error", err);
        }
        console.log("bscQuery", bscQuery);
        console.log("iconQuery", iconQuery);
    });
}
runAsync();
//# sourceMappingURL=index.js.map