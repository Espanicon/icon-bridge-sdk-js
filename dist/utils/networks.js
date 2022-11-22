"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.networks = exports.chains = void 0;
exports.chains = {
    icon: "icon",
    bsc: "bsc"
};
exports.networks = {
    mainnet: {
        [exports.chains.icon]: {
            uri: "https://ctz.solidwallet.io/api/v3/icon_dex",
            tracker: {
                hostname: "https://tracker.icon.community",
                routes: {}
            },
            network_id: "0x1",
            btp_network_id: "0x1.icon",
            block_height: 54062001,
            provider: {
                hostname: "https://ctz.solidwallet.io/api/v3/icon_dex",
                nid: 1
            }
        },
        [exports.chains.bsc]: {
            uri: "https://bsc-dataseed.binance.org",
            tracker: {
                hostname: "api.bscscan.com",
                routes: {
                    getContractAbi: "/api?module=contract&action=getabi&address="
                }
            },
            network_id: "0x38",
            btp_network_id: "0x38.bsc",
            block_height: 20493051,
            provider: {
                hostname: "https://bsc-dataseed.binance.org",
                nid: 56
            }
        }
    },
    testnet: {
        [exports.chains.icon]: {
            uri: "https://lisbon.net.solidwallet.io/api/v3/icon_dex",
            tracker: {
                hostname: "https://lisbon.tracker.solidwallet.io/",
                routes: {}
            },
            network_id: "0x2",
            btp_network_id: "0x2.icon",
            block_height: 11273953,
            provider: {
                hostname: "https://lisbon.net.solidwallet.io/api/v3/icon_dex",
                nid: 2
            }
        },
        [exports.chains.bsc]: {
            uri: "https://data-seed-prebsc-1-s1.binance.org:8545",
            tracker: {
                hostname: "api-testnet.bscscan.com",
                routes: {
                    getContractAbi: "/api?module=contract&action=getabi&address="
                }
            },
            network_id: "0x61",
            btp_network_id: "0x61.bsc",
            block_height: 21985565,
            provider: {
                hostname: "https://data-seed-prebsc-1-s1.binance.org:8545",
                nid: 97
            }
        }
    }
};
//# sourceMappingURL=networks.js.map