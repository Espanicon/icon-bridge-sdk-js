// utils/networks.ts
//
export const chains = {
  icon: "icon",
  bsc: "bsc"
};

export const networks = {
  mainnet: {
    [chains.icon]: {
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
    [chains.bsc]: {
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
        hostname: "https://bsc-dataseed.binance.org", // TODO: must have https
        nid: 56
      }
    }
  },
  testnet: {
    [chains.icon]: {
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
    [chains.bsc]: {
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
        // TODO: must have https://
        hostname: "https://data-seed-prebsc-1-s1.binance.org:8545",
        nid: 97
      }
    }
  }
};
