// utils/contracts.ts
//
export const labels = {
  sicx: "sICX",
  bnusd: "bnUSD",
  bnb: "BNB",
  busd: "BUSD",
  usdt: "USDT",
  usdc: "USDC",
  btcb: "BTCB",
  eth: "ETH",
  bmc: "bmc",
  bts: "bts",
  BMCManagement: "BMCManagement",
  BMCPeriphery: "BMCPeriphery",
  BTSCore: "BTSCore",
  BTSPeriphery: "BTSPeriphery",
  icx: "ICX",
  memSlot: "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
} as const;

export type TokenKeys = keyof typeof labels;
export type TokenValues = typeof labels[TokenKeys];

export const chains = {
  icon: "ICON",
  bsc: "BINANCE_SMART_CHAIN"
} as const;

export type ChainsKeys = keyof typeof chains;
export type ChainsValues = typeof chains[ChainsKeys];

export class GenericContractAddress {
  /**
   * Generic Contract address class
   * */
  private address: string;

  constructor(address: string) {
    this.address = this.validated(address);
  }

  public getAddress(): string {
    return this.address;
  }

  public setAddress(address: string): void {
    this.address = this.validated(address);
  }

  private validated(address: string): string {
    const regex = new RegExp("^0x([a-fA-F0-9]{40,40}$)");

    if (!regex.test(address)) {
      throw new TypeError(`${address} is not a valid contract address.`);
    }

    return address;
  }
}

export type Contracts = {
  [key: string]: {
    [key: string]: {
      address: GenericContractAddress;
    };
  };
};
export const contracts = {
  icon: {
    mainnet: {
      [labels.sicx]: {
        address: "cx2609b924e33ef00b648a409245c7ea394c467824"
      },
      [labels.bnusd]: {
        address: "cx88fd7df7ddff82f7cc735c871dc519838cb235bb"
      },
      [labels.bnb]: {
        address: "cx077807f2322aeb42ea19a1fcc0c9f3d3f35e1461"
      },
      [labels.busd]: {
        address: "cxb49d82c46be6b61cab62aaf9824b597c6cf8a25d"
      },
      [labels.usdt]: {
        address: "cx8e4d9b4164618f796d493a8154f1f17ad75f11bb"
      },
      [labels.usdc]: {
        address: "cx532e4235f9004c233604c1be98ca839cd777d58c"
      },
      [labels.btcb]: {
        address: "cx5b5a03cb525a1845d0af3a872d525b18a810acb0"
      },
      [labels.eth]: {
        address: "cx288d13e1b63563459a2ac6179f237711f6851cb5"
      },
      [labels.bmc]: {
        address: "cx23a91ee3dd290486a9113a6a42429825d813de53"
      },
      [labels.bts]: {
        address: "cxcef70e92b89f2d8191a0582de966280358713c32"
      }
    },
    testnet: {
      [labels.sicx]: {
        address: "cxc7b869d97a567044a2a5acea180ecd9071cd20b0"
      },
      [labels.bnusd]: {
        address: "cxcadcaf77d8e46089fd3d98fcf71eabee1700f148"
      },
      [labels.bnb]: {
        address: "cx55b835590d43af7bf6f5be3c3d50982264d24e5d"
      },
      [labels.busd]: {
        address: "cx39a7fefbe48ca7984e036abb1fab16f25fa641bb"
      },
      [labels.usdt]: {
        address: "cxdb7e556a7fd5441bead5d7c5403d414223d51132"
      },
      [labels.usdc]: {
        address: "cxf021731307d9f382935ac4bda81ee03946e1e4bd"
      },
      [labels.btcb]: {
        address: "cx7c1ef7b631a64e33e35565b81e669a05cdd0d968"
      },
      [labels.eth]: {
        address: "cx4663c5f1d955207c5718aedb11ff029f08b50036"
      },
      [labels.bmc]: {
        address: "cx053b96e2de3b9e6fc06db7b390d96ebf5fe82892"
      },
      [labels.bts]: {
        address: "cxa843db0a27750230559f997bafaeb7f8739afc81"
      }
    }
  },
  bsc: {
    mainnet: {
      [labels.busd]: {
        address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
      },
      [labels.usdt]: {
        address: "0x55d398326f99059fF775485246999027B3197955"
      },
      [labels.usdc]: {
        address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"
      },
      [labels.btcb]: {
        address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c"
      },
      [labels.eth]: {
        address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8"
      },
      [labels.icx]: {
        address: "0x9b7b6A964f8870699Ae74744941663D257b0ec1f"
      },
      [labels.sicx]: {
        address: "0x33acDF0Fe57C531095F6bf5a992bF5aA81c94Acf"
      },
      [labels.bnusd]: {
        address: "0xa804D2e9221057099eF331AE1c0D6616cC27d770"
      },
      [labels.BMCManagement]: {
        address: "0xe221e50fbe2Ba54b1898b4c02F66bf9598fbD1dB",
        isProxy: false,
        implementation: null
      },
      [labels.BMCPeriphery]: {
        address: "0x034AaDE86BF402F023Aa17E5725fABC4ab9E9798",
        isProxy: false,
        implementation: null
      },
      [labels.BTSCore]: {
        address: "0x7A4341Af4995884546Bcf7e09eB98beD3eD26D28",
        isProxy: true,
        implementation: null
      },
      [labels.BTSPeriphery]: {
        address: "0x556CA2d717d366A448c118D14e94a744b3c6578c",
        isProxy: true,
        implementation: null
      }
    },
    testnet: {
      [labels.busd]: {
        address: "0x119344c4354AcD401Ffb7Ed58e2B03fBA6759a87"
      },
      [labels.usdt]: {
        address: "0x51C59A4453e26c1DC46E282cbC6FFDD72ceC16DA"
      },
      [labels.usdc]: {
        address: "0x2f84D2Eeac14e2d02aaf00eB25801721D4233d19"
      },
      [labels.btcb]: {
        address: "0xd5d707da717cf4771Ed995f16E976C711890F118"
      },
      [labels.eth]: {
        address: "0xE3471f58314332502Be2B0681a66D674D98763D6"
      },
      [labels.icx]: {
        address: "0x7d8c52A23FD7e3ca1342797baE7caF6d7b8036BA"
      },
      [labels.sicx]: {
        address: "0x0a7792fe75548b26b287871081Aa6b05f48D9e89"
      },
      [labels.bnusd]: {
        address: "0xc0c1aA22F99bb6724dC4159C256A5989D90A659C"
      },
      [labels.BMCManagement]: {
        address: "0x5B9733113745F87A790321e2a84e73CbDa628B95",
        isProxy: false,
        implementation: null
      },
      [labels.BMCPeriphery]: {
        address: "0x853CceE29C20331DB18937E6bEdb8ab477ebe691",
        isProxy: false,
        implementation: null
      },
      [labels.BTSCore]: {
        address: "0x1a2aDf985D6c2700fdAf72A9c1e2b39e3B647F7e",
        isProxy: true,
        implementation: null
      },
      [labels.BTSPeriphery]: {
        address: "0x69555E113279b3d3805492a829DD765ED394A669",
        isProxy: true,
        implementation: null
      }
    }
  }
};

// export type Contracts = typeof contracts;
