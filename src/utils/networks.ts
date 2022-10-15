// utils/networks.ts
//
const networks = {
  mainnet: {
    icon: {
      uri: "https://ctz.solidwallet.io/api/v3/icon_dex",
      tracker: "",
      network_id: "0x1",
      btp_network_id: "0x1.icon",
      block_height: 54062001
    },
    bsc: {
      uri: "https://bsc-dataseed.binance.org",
      tracker: "",
      network_id: "0x38",
      btp_network_id: "0x38.bsc",
      block_height: 20493051
    }
  },
  testnet: {
    icon: {
      uri: "https://lisbon.net.solidwallet.io/api/v3/icon_dex",
      tracker: "https://lisbon.tracker.solidwallet.io/",
      network_id: "0x2",
      btp_network_id: "0x2.icon",
      block_height: 11273953
    },
    bsc: {
      uri: "https://data-seed-prebsc-1-s1.binance.org:8545",
      tracker: "https://testnet.bscscan.com/",
      network_id: "0x61",
      btp_network_id: "0x61.bsc",
      block_height: 21985565
    }
  }
};

export = networks;
