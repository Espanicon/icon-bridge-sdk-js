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

export const tokenLabels: string[] = [
  labels.sicx,
  labels.bnusd,
  labels.bnb,
  labels.busd,
  labels.usdt,
  labels.usdc,
  labels.btcb,
  labels.eth,
  labels.icx
];
export const tokenNames = {
  icon: {
    mainnet: null,
    testnet: null
  },
  bsc: {
    mainnet: {
      [labels.sicx]: "btp-0x1.icon-sICX",
      [labels.bnusd]: "btp-0x1.icon-bnUSD",
      [labels.bnb]: "btp-0x38.bsc-BNB",
      [labels.busd]: "btp-0x38.bsc-BUSD",
      [labels.usdt]: "btp-0x38.bsc-USDT",
      [labels.usdc]: "btp-0x38.bsc-USDC",
      [labels.btcb]: "btp-0x38.bsc-BTCB",
      [labels.eth]: "btp-0x38.bsc-ETH",
      [labels.icx]: "btp-0x1.icon-ICX"
    },
    testnet: {
      [labels.sicx]: "btp-0x2.icon-sICX",
      [labels.bnusd]: "btp-0x2.icon-bnUSD",
      [labels.bnb]: "btp-0x61.bsc-BNB",
      [labels.busd]: "btp-0x61.bsc-BUSD",
      [labels.usdt]: "btp-0x61.bsc-USDT",
      [labels.usdc]: "btp-0x61.bsc-USDC",
      [labels.btcb]: "btp-0x61.bsc-BTCB",
      [labels.eth]: "btp-0x61.bsc-ETH",
      [labels.icx]: "btp-0x2.icon-ICX"
    }
  }
};
export type TokenKeys = keyof typeof labels;
export type TokenValues = typeof labels[TokenKeys];

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
        address: "cx3044ad389267b50eb3c57103eade0c5a72261c1a"
      },
      [labels.bnusd]: {
        address: "cx7f45afe9d8ce95e80c1be7c4eef2ea0dd843c4e3"
      },
      [labels.bnb]: {
        address: "cxcea1078c39e8b887692d3ccdd81bd711a6260ea5"
      },
      [labels.busd]: {
        address: "cxea67f5fe1d1f7e1d29d54f185f0585b8262c788e"
      },
      [labels.usdt]: {
        address: "cxac717247714a0b8e2b9038fdadfdcc0f033e325b"
      },
      [labels.usdc]: {
        address: "cxd840ae3c79c1366895747aa8c228bd7e3459032f"
      },
      [labels.btcb]: {
        address: "cx63be8619af9cdf1cb053ccde7642ae974648a8c1"
      },
      [labels.eth]: {
        address: "cx4b9cd9bb520b08d14c19c5035295f7e44003e42f"
      },
      [labels.bmc]: {
        address: "cxcc165238ae0e894835e88f549f22e520c7ad740f"
      },
      [labels.bts]: {
        address: "cx949e9e242305309ed234c19183e9ed6e8f44ee73"
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
        address: "0xED41B3B136a96c867Ee265cC8a79a8ea39eeC9C4"
      },
      [labels.usdt]: {
        address: "0x8dE8FaF129d5BD9844dbc92024907d48B415987C"
      },
      [labels.usdc]: {
        address: "0x9DDBcf279D1D01C32A2c13efCB6415f37416857F"
      },
      [labels.btcb]: {
        address: "0x299Fb600FB51A208d3c268Da187539a59bE40041"
      },
      [labels.eth]: {
        address: "0xd49a76cF9a79F13deaAcB789039e3ef76C4c1c5F"
      },
      [labels.icx]: {
        address: "0x0C8773fa9A67291e089cB8136Abb1bcb0Aae220F"
      },
      [labels.sicx]: {
        address: "0xBBE70cE3dAe164a188a47e6Be898F09D29AFdF74"
      },
      [labels.bnusd]: {
        address: "0x4F6f26967a882c12a03DAe27272Ed0fd85A94443"
      },
      [labels.BMCManagement]: {
        address: "0x9Ab68EB48423AF80d7BDAffd7Ad976f69aa67e37",
        isProxy: false,
        implementation: null
      },
      [labels.BMCPeriphery]: {
        address: "0x99B22952e4D37d46046c46cD9F91cE1cdfB0605B",
        isProxy: false,
        implementation: null
      },
      [labels.BTSCore]: {
        address: "0x9fCBAD6F4C9dC2C0b109408E39cf042B9b2aE65A",
        isProxy: true,
        implementation: null
      },
      [labels.BTSPeriphery]: {
        address: "0xd75A671A5196459b13c97424B0C275D51D2C3488",
        isProxy: true,
        implementation: null
      }
    }
  }
};

export const genericAbi = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    constant: true,
    inputs: [],
    name: "_decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "_name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "_symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "burn",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256"
      }
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getOwner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256"
      }
    ],
    name: "increaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "mint",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address"
      },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address"
      },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
];
