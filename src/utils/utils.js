"use strict";
const networks = {
    mainnet: {
        icon: {
            uri: "https://ctz.solidwallet.io/api/v3/icon_dex",
            tracker: "",
            network_id: "0x1",
            btp_network_id: "0x1.icon",
            block_height: 54062001,
            contracts: {
                sICX: "cx2609b924e33ef00b648a409245c7ea394c467824",
                bnUSD: "cx88fd7df7ddff82f7cc735c871dc519838cb235bb",
                BNB: "cx077807f2322aeb42ea19a1fcc0c9f3d3f35e1461",
                BUSD: "cxb49d82c46be6b61cab62aaf9824b597c6cf8a25d",
                USDT: "cx8e4d9b4164618f796d493a8154f1f17ad75f11bb",
                USDC: "cx532e4235f9004c233604c1be98ca839cd777d58c",
                BTCB: "cx5b5a03cb525a1845d0af3a872d525b18a810acb0",
                ETH: "cx288d13e1b63563459a2ac6179f237711f6851cb5",
                bmc: "cx23a91ee3dd290486a9113a6a42429825d813de53",
                bts: "cxcef70e92b89f2d8191a0582de966280358713c32"
            }
        },
        bsc: {
            uri: "https://bsc-dataseed.binance.org",
            tracker: "",
            network_id: "0x38",
            btp_network_id: "0x38.bsc",
            block_height: 20493051,
            contracts: {
                BUSD: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
                USDT: "0x55d398326f99059fF775485246999027B3197955",
                USDC: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
                BTCB: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
                ETH: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
                ICX: "0x9b7b6A964f8870699Ae74744941663D257b0ec1f",
                sICX: "0x33acDF0Fe57C531095F6bf5a992bF5aA81c94Acf",
                bnUSD: "0xa804D2e9221057099eF331AE1c0D6616cC27d770",
                BMCManagement: "0xe221e50fbe2Ba54b1898b4c02F66bf9598fbD1dB",
                BMCPeriphery: "0x034AaDE86BF402F023Aa17E5725fABC4ab9E9798",
                BTSCore: "0x7A4341Af4995884546Bcf7e09eB98beD3eD26D28",
                BTSPeriphery: "0x556CA2d717d366A448c118D14e94a744b3c6578c"
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
            contracts: {
                sICX: "cxc7b869d97a567044a2a5acea180ecd9071cd20b0",
                bnUSD: "cxcadcaf77d8e46089fd3d98fcf71eabee1700f148",
                BNB: "cx55b835590d43af7bf6f5be3c3d50982264d24e5d",
                BUSD: "cx39a7fefbe48ca7984e036abb1fab16f25fa641bb",
                USDT: "cxdb7e556a7fd5441bead5d7c5403d414223d51132",
                USDC: "cxf021731307d9f382935ac4bda81ee03946e1e4bd",
                BTCB: "cx7c1ef7b631a64e33e35565b81e669a05cdd0d968",
                ETH: "cx4663c5f1d955207c5718aedb11ff029f08b50036",
                bmc: "cx053b96e2de3b9e6fc06db7b390d96ebf5fe82892",
                bts: "cxa843db0a27750230559f997bafaeb7f8739afc81"
            }
        },
        bsc: {
            uri: "https://data-seed-prebsc-1-s1.binance.org:8545",
            tracker: "https://testnet.bscscan.com/",
            network_id: "0x61",
            btp_network_id: "0x61.bsc",
            block_height: 21985565,
            contracts: {
                BUSD: "0x119344c4354AcD401Ffb7Ed58e2B03fBA6759a87",
                USDT: "0x51C59A4453e26c1DC46E282cbC6FFDD72ceC16DA",
                USDC: "0x2f84D2Eeac14e2d02aaf00eB25801721D4233d19",
                BTCB: "0xd5d707da717cf4771Ed995f16E976C711890F118",
                ETH: "0xE3471f58314332502Be2B0681a66D674D98763D6",
                ICX: "0x7d8c52A23FD7e3ca1342797baE7caF6d7b8036BA",
                sICX: "0x0a7792fe75548b26b287871081Aa6b05f48D9e89",
                bnUSD: "0xc0c1aA22F99bb6724dC4159C256A5989D90A659C",
                BMCManagement: "0x5B9733113745F87A790321e2a84e73CbDa628B95",
                BMCPeriphery: "0x853CceE29C20331DB18937E6bEdb8ab477ebe691",
                BTSCore: "0x1a2aDf985D6c2700fdAf72A9c1e2b39e3B647F7e",
                BTSPeriphery: "0x69555E113279b3d3805492a829DD765ED394A669"
            }
        }
    }
};
const utils = {
    networks
};
module.exports = utils;
//# sourceMappingURL=utils.js.map