"use strict";
const networks = {
    mainnet: {
        icon: {
            uri: "https://ctz.solidwallet.io/api/v3/icon_dex",
            tracker: "https://tracker.icon.community",
            network_id: "0x1",
            btp_network_id: "0x1.icon",
            block_height: 54062001,
            provider: {
                hostname: "ctz.solidwallet.io",
                nid: 1
            }
        },
        bsc: {
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
                nid: 1
            }
        }
    },
    testnet: {
        icon: {
            uri: "https://lisbon.net.solidwallet.io/api/v3/icon_dex",
            tracker: "https://lisbon.tracker.solidwallet.io/",
            network_id: "0x2",
            btp_network_id: "0x2.icon",
            block_height: 11273953,
            provider: {
                hostname: "lisbon.net.solidwallet.io",
                nid: 2
            }
        },
        bsc: {
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
                nid: 1
            }
        }
    }
};
module.exports = networks;
//# sourceMappingURL=networks.js.map