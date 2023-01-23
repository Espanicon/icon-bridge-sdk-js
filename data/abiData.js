const data = {
  bsc: {
    mainnet: {
      BUSD: {
        abi: [
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
              { internalType: "address", name: "spender", type: "address" }
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
              { internalType: "address", name: "spender", type: "address" },
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
              { internalType: "address", name: "account", type: "address" }
            ],
            name: "balanceOf",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            payable: false,
            stateMutability: "view",
            type: "function"
          },
          {
            constant: false,
            inputs: [
              { internalType: "uint256", name: "amount", type: "uint256" }
            ],
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
              { internalType: "address", name: "spender", type: "address" },
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
              { internalType: "address", name: "spender", type: "address" },
              { internalType: "uint256", name: "addedValue", type: "uint256" }
            ],
            name: "increaseAllowance",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            constant: false,
            inputs: [
              { internalType: "uint256", name: "amount", type: "uint256" }
            ],
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
              { internalType: "address", name: "recipient", type: "address" },
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
              { internalType: "address", name: "sender", type: "address" },
              { internalType: "address", name: "recipient", type: "address" },
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
              { internalType: "address", name: "newOwner", type: "address" }
            ],
            name: "transferOwnership",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
          }
        ],
        address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
        implementation: { address: null, abi: null }
      },
      genericToken: {
        abi: [
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
              { internalType: "address", name: "spender", type: "address" }
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
              { internalType: "address", name: "spender", type: "address" },
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
              { internalType: "address", name: "account", type: "address" }
            ],
            name: "balanceOf",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            payable: false,
            stateMutability: "view",
            type: "function"
          },
          {
            constant: false,
            inputs: [
              { internalType: "uint256", name: "amount", type: "uint256" }
            ],
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
              { internalType: "address", name: "spender", type: "address" },
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
              { internalType: "address", name: "spender", type: "address" },
              { internalType: "uint256", name: "addedValue", type: "uint256" }
            ],
            name: "increaseAllowance",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            constant: false,
            inputs: [
              { internalType: "uint256", name: "amount", type: "uint256" }
            ],
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
              { internalType: "address", name: "recipient", type: "address" },
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
              { internalType: "address", name: "sender", type: "address" },
              { internalType: "address", name: "recipient", type: "address" },
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
              { internalType: "address", name: "newOwner", type: "address" }
            ],
            name: "transferOwnership",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
          }
        ],
        address: null,
        implementation: { abi: null, address: null }
      },
      USDT: {
        abi: [
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
              { internalType: "address", name: "spender", type: "address" }
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
              { internalType: "address", name: "spender", type: "address" },
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
              { internalType: "address", name: "account", type: "address" }
            ],
            name: "balanceOf",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            payable: false,
            stateMutability: "view",
            type: "function"
          },
          {
            constant: false,
            inputs: [
              { internalType: "uint256", name: "amount", type: "uint256" }
            ],
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
              { internalType: "address", name: "spender", type: "address" },
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
              { internalType: "address", name: "spender", type: "address" },
              { internalType: "uint256", name: "addedValue", type: "uint256" }
            ],
            name: "increaseAllowance",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            constant: false,
            inputs: [
              { internalType: "uint256", name: "amount", type: "uint256" }
            ],
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
              { internalType: "address", name: "recipient", type: "address" },
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
              { internalType: "address", name: "sender", type: "address" },
              { internalType: "address", name: "recipient", type: "address" },
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
              { internalType: "address", name: "newOwner", type: "address" }
            ],
            name: "transferOwnership",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
          }
        ],
        address: "0x55d398326f99059fF775485246999027B3197955",
        implementation: { address: null, abi: null }
      },
      USDC: {
        abi: [
          {
            inputs: [
              { internalType: "address", name: "logic", type: "address" },
              { internalType: "address", name: "admin", type: "address" },
              { internalType: "bytes", name: "data", type: "bytes" }
            ],
            stateMutability: "nonpayable",
            type: "constructor"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address",
                name: "previousAdmin",
                type: "address"
              },
              {
                indexed: false,
                internalType: "address",
                name: "newAdmin",
                type: "address"
              }
            ],
            name: "AdminChanged",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "implementation",
                type: "address"
              }
            ],
            name: "Upgraded",
            type: "event"
          },
          { stateMutability: "payable", type: "fallback" },
          {
            inputs: [],
            name: "admin",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              { internalType: "address", name: "newAdmin", type: "address" }
            ],
            name: "changeAdmin",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [],
            name: "implementation",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              }
            ],
            name: "upgradeTo",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              },
              { internalType: "bytes", name: "data", type: "bytes" }
            ],
            name: "upgradeToAndCall",
            outputs: [],
            stateMutability: "payable",
            type: "function"
          },
          { stateMutability: "payable", type: "receive" }
        ],
        address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
        implementation: { address: null, abi: null }
      },
      BTCB: {
        abi: [
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
              { internalType: "address", name: "spender", type: "address" }
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
              { internalType: "address", name: "spender", type: "address" },
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
              { internalType: "address", name: "account", type: "address" }
            ],
            name: "balanceOf",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            payable: false,
            stateMutability: "view",
            type: "function"
          },
          {
            constant: false,
            inputs: [
              { internalType: "uint256", name: "amount", type: "uint256" }
            ],
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
              { internalType: "address", name: "spender", type: "address" },
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
              { internalType: "address", name: "spender", type: "address" },
              { internalType: "uint256", name: "addedValue", type: "uint256" }
            ],
            name: "increaseAllowance",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            constant: false,
            inputs: [
              { internalType: "uint256", name: "amount", type: "uint256" }
            ],
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
              { internalType: "address", name: "recipient", type: "address" },
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
              { internalType: "address", name: "sender", type: "address" },
              { internalType: "address", name: "recipient", type: "address" },
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
              { internalType: "address", name: "newOwner", type: "address" }
            ],
            name: "transferOwnership",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
          }
        ],
        address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
        implementation: { address: null, abi: null }
      },
      ETH: {
        abi: [
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
              { internalType: "address", name: "spender", type: "address" }
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
              { internalType: "address", name: "spender", type: "address" },
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
              { internalType: "address", name: "account", type: "address" }
            ],
            name: "balanceOf",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            payable: false,
            stateMutability: "view",
            type: "function"
          },
          {
            constant: false,
            inputs: [
              { internalType: "uint256", name: "amount", type: "uint256" }
            ],
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
              { internalType: "address", name: "spender", type: "address" },
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
              { internalType: "address", name: "spender", type: "address" },
              { internalType: "uint256", name: "addedValue", type: "uint256" }
            ],
            name: "increaseAllowance",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            constant: false,
            inputs: [
              { internalType: "uint256", name: "amount", type: "uint256" }
            ],
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
              { internalType: "address", name: "recipient", type: "address" },
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
              { internalType: "address", name: "sender", type: "address" },
              { internalType: "address", name: "recipient", type: "address" },
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
              { internalType: "address", name: "newOwner", type: "address" }
            ],
            name: "transferOwnership",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
          }
        ],
        address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
        implementation: { address: null, abi: null }
      },
      ICX: {
        abi: null,
        address: "0x9b7b6A964f8870699Ae74744941663D257b0ec1f",
        implementation: { address: null, abi: null }
      },
      sICX: {
        abi: null,
        address: "0x33acDF0Fe57C531095F6bf5a992bF5aA81c94Acf",
        implementation: { address: null, abi: null }
      },
      bnUSD: {
        abi: null,
        address: "0xa804D2e9221057099eF331AE1c0D6616cC27d770",
        implementation: { address: null, abi: null }
      },
      BMCManagement: {
        abi: [
          {
            inputs: [
              { internalType: "address", name: "_logic", type: "address" },
              { internalType: "address", name: "admin_", type: "address" },
              { internalType: "bytes", name: "_data", type: "bytes" }
            ],
            stateMutability: "payable",
            type: "constructor"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address",
                name: "previousAdmin",
                type: "address"
              },
              {
                indexed: false,
                internalType: "address",
                name: "newAdmin",
                type: "address"
              }
            ],
            name: "AdminChanged",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "beacon",
                type: "address"
              }
            ],
            name: "BeaconUpgraded",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "implementation",
                type: "address"
              }
            ],
            name: "Upgraded",
            type: "event"
          },
          { stateMutability: "payable", type: "fallback" },
          {
            inputs: [],
            name: "admin",
            outputs: [
              { internalType: "address", name: "admin_", type: "address" }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              { internalType: "address", name: "newAdmin", type: "address" }
            ],
            name: "changeAdmin",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [],
            name: "implementation",
            outputs: [
              {
                internalType: "address",
                name: "implementation_",
                type: "address"
              }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              }
            ],
            name: "upgradeTo",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              },
              { internalType: "bytes", name: "data", type: "bytes" }
            ],
            name: "upgradeToAndCall",
            outputs: [],
            stateMutability: "payable",
            type: "function"
          },
          { stateMutability: "payable", type: "receive" }
        ],
        address: "0xe221e50fbe2Ba54b1898b4c02F66bf9598fbD1dB",
        implementation: { address: null, abi: null }
      },
      BMCPeriphery: {
        abi: [
          {
            inputs: [
              { internalType: "address", name: "_logic", type: "address" },
              { internalType: "address", name: "admin_", type: "address" },
              { internalType: "bytes", name: "_data", type: "bytes" }
            ],
            stateMutability: "payable",
            type: "constructor"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address",
                name: "previousAdmin",
                type: "address"
              },
              {
                indexed: false,
                internalType: "address",
                name: "newAdmin",
                type: "address"
              }
            ],
            name: "AdminChanged",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "beacon",
                type: "address"
              }
            ],
            name: "BeaconUpgraded",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "implementation",
                type: "address"
              }
            ],
            name: "Upgraded",
            type: "event"
          },
          { stateMutability: "payable", type: "fallback" },
          {
            inputs: [],
            name: "admin",
            outputs: [
              { internalType: "address", name: "admin_", type: "address" }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              { internalType: "address", name: "newAdmin", type: "address" }
            ],
            name: "changeAdmin",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [],
            name: "implementation",
            outputs: [
              {
                internalType: "address",
                name: "implementation_",
                type: "address"
              }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              }
            ],
            name: "upgradeTo",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              },
              { internalType: "bytes", name: "data", type: "bytes" }
            ],
            name: "upgradeToAndCall",
            outputs: [],
            stateMutability: "payable",
            type: "function"
          },
          { stateMutability: "payable", type: "receive" }
        ],
        address: "0x034AaDE86BF402F023Aa17E5725fABC4ab9E9798",
        implementation: { address: null, abi: null }
      },
      BTSCore: {
        abi: [
          {
            inputs: [
              { internalType: "address", name: "_logic", type: "address" },
              { internalType: "address", name: "admin_", type: "address" },
              { internalType: "bytes", name: "_data", type: "bytes" }
            ],
            stateMutability: "payable",
            type: "constructor"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address",
                name: "previousAdmin",
                type: "address"
              },
              {
                indexed: false,
                internalType: "address",
                name: "newAdmin",
                type: "address"
              }
            ],
            name: "AdminChanged",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "beacon",
                type: "address"
              }
            ],
            name: "BeaconUpgraded",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "implementation",
                type: "address"
              }
            ],
            name: "Upgraded",
            type: "event"
          },
          { stateMutability: "payable", type: "fallback" },
          {
            inputs: [],
            name: "admin",
            outputs: [
              { internalType: "address", name: "admin_", type: "address" }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              { internalType: "address", name: "newAdmin", type: "address" }
            ],
            name: "changeAdmin",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [],
            name: "implementation",
            outputs: [
              {
                internalType: "address",
                name: "implementation_",
                type: "address"
              }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              }
            ],
            name: "upgradeTo",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              },
              { internalType: "bytes", name: "data", type: "bytes" }
            ],
            name: "upgradeToAndCall",
            outputs: [],
            stateMutability: "payable",
            type: "function"
          },
          { stateMutability: "payable", type: "receive" }
        ],
        address: "0x7A4341Af4995884546Bcf7e09eB98beD3eD26D28",
        implementation: {
          address: "0x4d7534aee280e25016172cb05240d912dc8ca154",
          abi: null
        }
      },
      BTSPeriphery: {
        abi: [
          {
            inputs: [
              { internalType: "address", name: "_logic", type: "address" },
              { internalType: "address", name: "admin_", type: "address" },
              { internalType: "bytes", name: "_data", type: "bytes" }
            ],
            stateMutability: "payable",
            type: "constructor"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address",
                name: "previousAdmin",
                type: "address"
              },
              {
                indexed: false,
                internalType: "address",
                name: "newAdmin",
                type: "address"
              }
            ],
            name: "AdminChanged",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "beacon",
                type: "address"
              }
            ],
            name: "BeaconUpgraded",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "implementation",
                type: "address"
              }
            ],
            name: "Upgraded",
            type: "event"
          },
          { stateMutability: "payable", type: "fallback" },
          {
            inputs: [],
            name: "admin",
            outputs: [
              { internalType: "address", name: "admin_", type: "address" }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              { internalType: "address", name: "newAdmin", type: "address" }
            ],
            name: "changeAdmin",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [],
            name: "implementation",
            outputs: [
              {
                internalType: "address",
                name: "implementation_",
                type: "address"
              }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              }
            ],
            name: "upgradeTo",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              },
              { internalType: "bytes", name: "data", type: "bytes" }
            ],
            name: "upgradeToAndCall",
            outputs: [],
            stateMutability: "payable",
            type: "function"
          },
          { stateMutability: "payable", type: "receive" }
        ],
        address: "0x556CA2d717d366A448c118D14e94a744b3c6578c",
        implementation: {
          address: "0x9f09a512e746ecb23d77d31666b55fa4c06153b2",
          abi: [
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint8",
                  name: "version",
                  type: "uint8"
                }
              ],
              name: "Initialized",
              type: "event"
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "_from",
                  type: "address"
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_sn",
                  type: "uint256"
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_code",
                  type: "uint256"
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "_response",
                  type: "string"
                }
              ],
              name: "TransferEnd",
              type: "event"
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "string",
                  name: "_from",
                  type: "string"
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "_to",
                  type: "address"
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_sn",
                  type: "uint256"
                },
                {
                  components: [
                    {
                      internalType: "string",
                      name: "coinName",
                      type: "string"
                    },
                    { internalType: "uint256", name: "value", type: "uint256" }
                  ],
                  indexed: false,
                  internalType: "struct Types.Asset[]",
                  name: "_assetDetails",
                  type: "tuple[]"
                }
              ],
              name: "TransferReceived",
              type: "event"
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "_from",
                  type: "address"
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "_to",
                  type: "string"
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_sn",
                  type: "uint256"
                },
                {
                  components: [
                    {
                      internalType: "string",
                      name: "coinName",
                      type: "string"
                    },
                    { internalType: "uint256", name: "value", type: "uint256" },
                    { internalType: "uint256", name: "fee", type: "uint256" }
                  ],
                  indexed: false,
                  internalType: "struct Types.AssetTransferDetail[]",
                  name: "_assetDetails",
                  type: "tuple[]"
                }
              ],
              name: "TransferStart",
              type: "event"
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "string",
                  name: "_from",
                  type: "string"
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_sn",
                  type: "uint256"
                }
              ],
              name: "UnknownResponse",
              type: "event"
            },
            {
              inputs: [
                { internalType: "string[]", name: "_address", type: "string[]" }
              ],
              name: "addToBlacklist",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [{ internalType: "address", name: "", type: "address" }],
              name: "blacklist",
              outputs: [{ internalType: "bool", name: "", type: "bool" }],
              stateMutability: "view",
              type: "function"
            },
            {
              inputs: [{ internalType: "string", name: "_to", type: "string" }],
              name: "checkParseAddress",
              outputs: [],
              stateMutability: "pure",
              type: "function"
            },
            {
              inputs: [
                { internalType: "string", name: "_coinName", type: "string" },
                { internalType: "address", name: "_user", type: "address" },
                { internalType: "uint256", name: "_value", type: "uint256" }
              ],
              name: "checkTransferRestrictions",
              outputs: [],
              stateMutability: "view",
              type: "function"
            },
            {
              inputs: [
                { internalType: "string", name: "", type: "string" },
                { internalType: "string", name: "_svc", type: "string" },
                { internalType: "uint256", name: "_sn", type: "uint256" },
                { internalType: "uint256", name: "_code", type: "uint256" },
                { internalType: "string", name: "_msg", type: "string" }
              ],
              name: "handleBTPError",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [
                { internalType: "string", name: "_from", type: "string" },
                { internalType: "string", name: "_svc", type: "string" },
                { internalType: "uint256", name: "_sn", type: "uint256" },
                { internalType: "bytes", name: "_msg", type: "bytes" }
              ],
              name: "handleBTPMessage",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [
                { internalType: "string", name: "_fa", type: "string" },
                { internalType: "string", name: "_svc", type: "string" }
              ],
              name: "handleFeeGathering",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [
                { internalType: "string", name: "_to", type: "string" },
                {
                  components: [
                    {
                      internalType: "string",
                      name: "coinName",
                      type: "string"
                    },
                    { internalType: "uint256", name: "value", type: "uint256" }
                  ],
                  internalType: "struct Types.Asset[]",
                  name: "_assets",
                  type: "tuple[]"
                }
              ],
              name: "handleRequestService",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [],
              name: "hasPendingRequest",
              outputs: [{ internalType: "bool", name: "", type: "bool" }],
              stateMutability: "view",
              type: "function"
            },
            {
              inputs: [
                { internalType: "address", name: "_bmc", type: "address" },
                { internalType: "address", name: "_btsCore", type: "address" }
              ],
              name: "initialize",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [
                { internalType: "string[]", name: "_address", type: "string[]" }
              ],
              name: "removeFromBlacklist",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              name: "requests",
              outputs: [
                { internalType: "string", name: "from", type: "string" },
                { internalType: "string", name: "to", type: "string" }
              ],
              stateMutability: "view",
              type: "function"
            },
            {
              inputs: [
                { internalType: "address", name: "_from", type: "address" },
                { internalType: "string", name: "_to", type: "string" },
                {
                  internalType: "string[]",
                  name: "_coinNames",
                  type: "string[]"
                },
                {
                  internalType: "uint256[]",
                  name: "_values",
                  type: "uint256[]"
                },
                { internalType: "uint256[]", name: "_fees", type: "uint256[]" }
              ],
              name: "sendServiceMessage",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [],
              name: "serviceName",
              outputs: [{ internalType: "string", name: "", type: "string" }],
              stateMutability: "view",
              type: "function"
            },
            {
              inputs: [
                {
                  internalType: "string[]",
                  name: "_coinNames",
                  type: "string[]"
                },
                {
                  internalType: "uint256[]",
                  name: "_tokenLimits",
                  type: "uint256[]"
                }
              ],
              name: "setTokenLimit",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [{ internalType: "string", name: "", type: "string" }],
              name: "tokenLimit",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "view",
              type: "function"
            }
          ]
        }
      }
    },
    testnet: {
      BUSD: {
        abi: [
          {
            inputs: [
              { internalType: "address", name: "_logic", type: "address" },
              { internalType: "address", name: "admin_", type: "address" },
              { internalType: "bytes", name: "_data", type: "bytes" }
            ],
            stateMutability: "payable",
            type: "constructor"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address",
                name: "previousAdmin",
                type: "address"
              },
              {
                indexed: false,
                internalType: "address",
                name: "newAdmin",
                type: "address"
              }
            ],
            name: "AdminChanged",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "beacon",
                type: "address"
              }
            ],
            name: "BeaconUpgraded",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "implementation",
                type: "address"
              }
            ],
            name: "Upgraded",
            type: "event"
          },
          { stateMutability: "payable", type: "fallback" },
          {
            inputs: [],
            name: "admin",
            outputs: [
              { internalType: "address", name: "admin_", type: "address" }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              { internalType: "address", name: "newAdmin", type: "address" }
            ],
            name: "changeAdmin",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [],
            name: "implementation",
            outputs: [
              {
                internalType: "address",
                name: "implementation_",
                type: "address"
              }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              }
            ],
            name: "upgradeTo",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              },
              { internalType: "bytes", name: "data", type: "bytes" }
            ],
            name: "upgradeToAndCall",
            outputs: [],
            stateMutability: "payable",
            type: "function"
          },
          { stateMutability: "payable", type: "receive" }
        ],
        address: "0xED41B3B136a96c867Ee265cC8a79a8ea39eeC9C4",
        implementation: { address: null, abi: null }
      },
      genericToken: {
        abi: [
          {
            inputs: [
              { internalType: "address", name: "_logic", type: "address" },
              { internalType: "address", name: "admin_", type: "address" },
              { internalType: "bytes", name: "_data", type: "bytes" }
            ],
            stateMutability: "payable",
            type: "constructor"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address",
                name: "previousAdmin",
                type: "address"
              },
              {
                indexed: false,
                internalType: "address",
                name: "newAdmin",
                type: "address"
              }
            ],
            name: "AdminChanged",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "beacon",
                type: "address"
              }
            ],
            name: "BeaconUpgraded",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "implementation",
                type: "address"
              }
            ],
            name: "Upgraded",
            type: "event"
          },
          { stateMutability: "payable", type: "fallback" },
          {
            inputs: [],
            name: "admin",
            outputs: [
              { internalType: "address", name: "admin_", type: "address" }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              { internalType: "address", name: "newAdmin", type: "address" }
            ],
            name: "changeAdmin",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [],
            name: "implementation",
            outputs: [
              {
                internalType: "address",
                name: "implementation_",
                type: "address"
              }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              }
            ],
            name: "upgradeTo",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              },
              { internalType: "bytes", name: "data", type: "bytes" }
            ],
            name: "upgradeToAndCall",
            outputs: [],
            stateMutability: "payable",
            type: "function"
          },
          { stateMutability: "payable", type: "receive" }
        ],
        address: null,
        implementation: { abi: null, address: null }
      },
      USDT: {
        abi: [
          {
            inputs: [
              { internalType: "address", name: "_logic", type: "address" },
              { internalType: "address", name: "admin_", type: "address" },
              { internalType: "bytes", name: "_data", type: "bytes" }
            ],
            stateMutability: "payable",
            type: "constructor"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address",
                name: "previousAdmin",
                type: "address"
              },
              {
                indexed: false,
                internalType: "address",
                name: "newAdmin",
                type: "address"
              }
            ],
            name: "AdminChanged",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "beacon",
                type: "address"
              }
            ],
            name: "BeaconUpgraded",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "implementation",
                type: "address"
              }
            ],
            name: "Upgraded",
            type: "event"
          },
          { stateMutability: "payable", type: "fallback" },
          {
            inputs: [],
            name: "admin",
            outputs: [
              { internalType: "address", name: "admin_", type: "address" }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              { internalType: "address", name: "newAdmin", type: "address" }
            ],
            name: "changeAdmin",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [],
            name: "implementation",
            outputs: [
              {
                internalType: "address",
                name: "implementation_",
                type: "address"
              }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              }
            ],
            name: "upgradeTo",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              },
              { internalType: "bytes", name: "data", type: "bytes" }
            ],
            name: "upgradeToAndCall",
            outputs: [],
            stateMutability: "payable",
            type: "function"
          },
          { stateMutability: "payable", type: "receive" }
        ],
        address: "0x8dE8FaF129d5BD9844dbc92024907d48B415987C",
        implementation: { address: null, abi: null }
      },
      USDC: {
        abi: [
          {
            inputs: [
              { internalType: "address", name: "_logic", type: "address" },
              { internalType: "address", name: "admin_", type: "address" },
              { internalType: "bytes", name: "_data", type: "bytes" }
            ],
            stateMutability: "payable",
            type: "constructor"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address",
                name: "previousAdmin",
                type: "address"
              },
              {
                indexed: false,
                internalType: "address",
                name: "newAdmin",
                type: "address"
              }
            ],
            name: "AdminChanged",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "beacon",
                type: "address"
              }
            ],
            name: "BeaconUpgraded",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "implementation",
                type: "address"
              }
            ],
            name: "Upgraded",
            type: "event"
          },
          { stateMutability: "payable", type: "fallback" },
          {
            inputs: [],
            name: "admin",
            outputs: [
              { internalType: "address", name: "admin_", type: "address" }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              { internalType: "address", name: "newAdmin", type: "address" }
            ],
            name: "changeAdmin",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [],
            name: "implementation",
            outputs: [
              {
                internalType: "address",
                name: "implementation_",
                type: "address"
              }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              }
            ],
            name: "upgradeTo",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              },
              { internalType: "bytes", name: "data", type: "bytes" }
            ],
            name: "upgradeToAndCall",
            outputs: [],
            stateMutability: "payable",
            type: "function"
          },
          { stateMutability: "payable", type: "receive" }
        ],
        address: "0x9DDBcf279D1D01C32A2c13efCB6415f37416857F",
        implementation: { address: null, abi: null }
      },
      BTCB: {
        abi: [
          {
            inputs: [
              { internalType: "address", name: "_logic", type: "address" },
              { internalType: "address", name: "admin_", type: "address" },
              { internalType: "bytes", name: "_data", type: "bytes" }
            ],
            stateMutability: "payable",
            type: "constructor"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address",
                name: "previousAdmin",
                type: "address"
              },
              {
                indexed: false,
                internalType: "address",
                name: "newAdmin",
                type: "address"
              }
            ],
            name: "AdminChanged",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "beacon",
                type: "address"
              }
            ],
            name: "BeaconUpgraded",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "implementation",
                type: "address"
              }
            ],
            name: "Upgraded",
            type: "event"
          },
          { stateMutability: "payable", type: "fallback" },
          {
            inputs: [],
            name: "admin",
            outputs: [
              { internalType: "address", name: "admin_", type: "address" }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              { internalType: "address", name: "newAdmin", type: "address" }
            ],
            name: "changeAdmin",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [],
            name: "implementation",
            outputs: [
              {
                internalType: "address",
                name: "implementation_",
                type: "address"
              }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              }
            ],
            name: "upgradeTo",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              },
              { internalType: "bytes", name: "data", type: "bytes" }
            ],
            name: "upgradeToAndCall",
            outputs: [],
            stateMutability: "payable",
            type: "function"
          },
          { stateMutability: "payable", type: "receive" }
        ],
        address: "0x299Fb600FB51A208d3c268Da187539a59bE40041",
        implementation: { address: null, abi: null }
      },
      ETH: {
        abi: [
          {
            inputs: [
              { internalType: "address", name: "_logic", type: "address" },
              { internalType: "address", name: "admin_", type: "address" },
              { internalType: "bytes", name: "_data", type: "bytes" }
            ],
            stateMutability: "payable",
            type: "constructor"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address",
                name: "previousAdmin",
                type: "address"
              },
              {
                indexed: false,
                internalType: "address",
                name: "newAdmin",
                type: "address"
              }
            ],
            name: "AdminChanged",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "beacon",
                type: "address"
              }
            ],
            name: "BeaconUpgraded",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "implementation",
                type: "address"
              }
            ],
            name: "Upgraded",
            type: "event"
          },
          { stateMutability: "payable", type: "fallback" },
          {
            inputs: [],
            name: "admin",
            outputs: [
              { internalType: "address", name: "admin_", type: "address" }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              { internalType: "address", name: "newAdmin", type: "address" }
            ],
            name: "changeAdmin",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [],
            name: "implementation",
            outputs: [
              {
                internalType: "address",
                name: "implementation_",
                type: "address"
              }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              }
            ],
            name: "upgradeTo",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              },
              { internalType: "bytes", name: "data", type: "bytes" }
            ],
            name: "upgradeToAndCall",
            outputs: [],
            stateMutability: "payable",
            type: "function"
          },
          { stateMutability: "payable", type: "receive" }
        ],
        address: "0xd49a76cF9a79F13deaAcB789039e3ef76C4c1c5F",
        implementation: { address: null, abi: null }
      },
      ICX: {
        abi: null,
        address: "0x0C8773fa9A67291e089cB8136Abb1bcb0Aae220F",
        implementation: { address: null, abi: null }
      },
      sICX: {
        abi: null,
        address: "0xBBE70cE3dAe164a188a47e6Be898F09D29AFdF74",
        implementation: { address: null, abi: null }
      },
      bnUSD: {
        abi: null,
        address: "0x4F6f26967a882c12a03DAe27272Ed0fd85A94443",
        implementation: { address: null, abi: null }
      },
      BMCManagement: {
        abi: [
          {
            inputs: [
              { internalType: "address", name: "_logic", type: "address" },
              { internalType: "address", name: "admin_", type: "address" },
              { internalType: "bytes", name: "_data", type: "bytes" }
            ],
            stateMutability: "payable",
            type: "constructor"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address",
                name: "previousAdmin",
                type: "address"
              },
              {
                indexed: false,
                internalType: "address",
                name: "newAdmin",
                type: "address"
              }
            ],
            name: "AdminChanged",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "beacon",
                type: "address"
              }
            ],
            name: "BeaconUpgraded",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "implementation",
                type: "address"
              }
            ],
            name: "Upgraded",
            type: "event"
          },
          { stateMutability: "payable", type: "fallback" },
          {
            inputs: [],
            name: "admin",
            outputs: [
              { internalType: "address", name: "admin_", type: "address" }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              { internalType: "address", name: "newAdmin", type: "address" }
            ],
            name: "changeAdmin",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [],
            name: "implementation",
            outputs: [
              {
                internalType: "address",
                name: "implementation_",
                type: "address"
              }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              }
            ],
            name: "upgradeTo",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              },
              { internalType: "bytes", name: "data", type: "bytes" }
            ],
            name: "upgradeToAndCall",
            outputs: [],
            stateMutability: "payable",
            type: "function"
          },
          { stateMutability: "payable", type: "receive" }
        ],
        address: "0x9Ab68EB48423AF80d7BDAffd7Ad976f69aa67e37",
        implementation: { address: null, abi: null }
      },
      BMCPeriphery: {
        abi: [
          {
            inputs: [
              { internalType: "address", name: "_logic", type: "address" },
              { internalType: "address", name: "admin_", type: "address" },
              { internalType: "bytes", name: "_data", type: "bytes" }
            ],
            stateMutability: "payable",
            type: "constructor"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address",
                name: "previousAdmin",
                type: "address"
              },
              {
                indexed: false,
                internalType: "address",
                name: "newAdmin",
                type: "address"
              }
            ],
            name: "AdminChanged",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "beacon",
                type: "address"
              }
            ],
            name: "BeaconUpgraded",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "implementation",
                type: "address"
              }
            ],
            name: "Upgraded",
            type: "event"
          },
          { stateMutability: "payable", type: "fallback" },
          {
            inputs: [],
            name: "admin",
            outputs: [
              { internalType: "address", name: "admin_", type: "address" }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              { internalType: "address", name: "newAdmin", type: "address" }
            ],
            name: "changeAdmin",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [],
            name: "implementation",
            outputs: [
              {
                internalType: "address",
                name: "implementation_",
                type: "address"
              }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              }
            ],
            name: "upgradeTo",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              },
              { internalType: "bytes", name: "data", type: "bytes" }
            ],
            name: "upgradeToAndCall",
            outputs: [],
            stateMutability: "payable",
            type: "function"
          },
          { stateMutability: "payable", type: "receive" }
        ],
        address: "0x99B22952e4D37d46046c46cD9F91cE1cdfB0605B",
        implementation: { address: null, abi: null }
      },
      BTSCore: {
        abi: [
          {
            inputs: [
              { internalType: "address", name: "_logic", type: "address" },
              { internalType: "address", name: "admin_", type: "address" },
              { internalType: "bytes", name: "_data", type: "bytes" }
            ],
            stateMutability: "payable",
            type: "constructor"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address",
                name: "previousAdmin",
                type: "address"
              },
              {
                indexed: false,
                internalType: "address",
                name: "newAdmin",
                type: "address"
              }
            ],
            name: "AdminChanged",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "beacon",
                type: "address"
              }
            ],
            name: "BeaconUpgraded",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "implementation",
                type: "address"
              }
            ],
            name: "Upgraded",
            type: "event"
          },
          { stateMutability: "payable", type: "fallback" },
          {
            inputs: [],
            name: "admin",
            outputs: [
              { internalType: "address", name: "admin_", type: "address" }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              { internalType: "address", name: "newAdmin", type: "address" }
            ],
            name: "changeAdmin",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [],
            name: "implementation",
            outputs: [
              {
                internalType: "address",
                name: "implementation_",
                type: "address"
              }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              }
            ],
            name: "upgradeTo",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              },
              { internalType: "bytes", name: "data", type: "bytes" }
            ],
            name: "upgradeToAndCall",
            outputs: [],
            stateMutability: "payable",
            type: "function"
          },
          { stateMutability: "payable", type: "receive" }
        ],
        address: "0x9fCBAD6F4C9dC2C0b109408E39cf042B9b2aE65A",
        implementation: {
          address: "0x523281fe6a55ebdc6f488a582d888c14a01c7c87",
          abi: [
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint8",
                  name: "version",
                  type: "uint8"
                }
              ],
              name: "Initialized",
              type: "event"
            },
            {
              inputs: [
                { internalType: "address", name: "_owner", type: "address" },
                { internalType: "string", name: "_coinName", type: "string" }
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "_usableBalance",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "_lockedBalance",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "_refundableBalance",
                  type: "uint256"
                },
                {
                  internalType: "uint256",
                  name: "_userBalance",
                  type: "uint256"
                }
              ],
              stateMutability: "view",
              type: "function"
            },
            {
              inputs: [
                { internalType: "address", name: "_owner", type: "address" },
                {
                  internalType: "string[]",
                  name: "_coinNames",
                  type: "string[]"
                }
              ],
              name: "balanceOfBatch",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "_usableBalances",
                  type: "uint256[]"
                },
                {
                  internalType: "uint256[]",
                  name: "_lockedBalances",
                  type: "uint256[]"
                },
                {
                  internalType: "uint256[]",
                  name: "_refundableBalances",
                  type: "uint256[]"
                },
                {
                  internalType: "uint256[]",
                  name: "_userBalances",
                  type: "uint256[]"
                }
              ],
              stateMutability: "view",
              type: "function"
            },
            {
              inputs: [
                { internalType: "string", name: "_coinName", type: "string" }
              ],
              name: "coinId",
              outputs: [{ internalType: "address", name: "", type: "address" }],
              stateMutability: "view",
              type: "function"
            },
            {
              inputs: [],
              name: "coinNames",
              outputs: [
                { internalType: "string[]", name: "_names", type: "string[]" }
              ],
              stateMutability: "view",
              type: "function"
            },
            {
              inputs: [
                { internalType: "string", name: "_coinName", type: "string" }
              ],
              name: "feeRatio",
              outputs: [
                {
                  internalType: "uint256",
                  name: "_feeNumerator",
                  type: "uint256"
                },
                { internalType: "uint256", name: "_fixedFee", type: "uint256" }
              ],
              stateMutability: "view",
              type: "function"
            },
            {
              inputs: [],
              name: "getAccumulatedFees",
              outputs: [
                {
                  components: [
                    {
                      internalType: "string",
                      name: "coinName",
                      type: "string"
                    },
                    { internalType: "uint256", name: "value", type: "uint256" }
                  ],
                  internalType: "struct Types.Asset[]",
                  name: "_accumulatedFees",
                  type: "tuple[]"
                }
              ],
              stateMutability: "view",
              type: "function"
            },
            {
              inputs: [],
              name: "getNativeCoinName",
              outputs: [{ internalType: "string", name: "", type: "string" }],
              stateMutability: "view",
              type: "function"
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_requester",
                  type: "address"
                },
                { internalType: "string", name: "_coinName", type: "string" },
                { internalType: "uint256", name: "_value", type: "uint256" },
                { internalType: "uint256", name: "_fee", type: "uint256" },
                { internalType: "uint256", name: "_rspCode", type: "uint256" }
              ],
              name: "handleResponseService",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_nativeCoinName",
                  type: "string"
                },
                {
                  internalType: "uint256",
                  name: "_feeNumerator",
                  type: "uint256"
                },
                { internalType: "uint256", name: "_fixedFee", type: "uint256" },
                {
                  internalType: "address",
                  name: "_ownerManager",
                  type: "address"
                }
              ],
              name: "initialize",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [
                { internalType: "string", name: "_coinName", type: "string" }
              ],
              name: "isValidCoin",
              outputs: [{ internalType: "bool", name: "_valid", type: "bool" }],
              stateMutability: "view",
              type: "function"
            },
            {
              inputs: [
                { internalType: "address", name: "_to", type: "address" },
                { internalType: "string", name: "_coinName", type: "string" },
                { internalType: "uint256", name: "_value", type: "uint256" }
              ],
              name: "mint",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [
                { internalType: "string", name: "_coinName", type: "string" },
                { internalType: "uint256", name: "_value", type: "uint256" }
              ],
              name: "reclaim",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [
                { internalType: "address", name: "_to", type: "address" },
                { internalType: "string", name: "_coinName", type: "string" },
                { internalType: "uint256", name: "_value", type: "uint256" }
              ],
              name: "refund",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [
                { internalType: "string", name: "_name", type: "string" },
                { internalType: "string", name: "_symbol", type: "string" },
                { internalType: "uint8", name: "_decimals", type: "uint8" },
                {
                  internalType: "uint256",
                  name: "_feeNumerator",
                  type: "uint256"
                },
                { internalType: "uint256", name: "_fixedFee", type: "uint256" },
                { internalType: "address", name: "_addr", type: "address" }
              ],
              name: "register",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_ownerManager",
                  type: "address"
                }
              ],
              name: "setBTSOwnerManager",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [
                { internalType: "string", name: "_name", type: "string" },
                {
                  internalType: "uint256",
                  name: "_feeNumerator",
                  type: "uint256"
                },
                { internalType: "uint256", name: "_fixedFee", type: "uint256" }
              ],
              name: "setFeeRatio",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [
                { internalType: "string", name: "_coinName", type: "string" },
                { internalType: "uint256", name: "_value", type: "uint256" },
                { internalType: "string", name: "_to", type: "string" }
              ],
              name: "transfer",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [
                {
                  internalType: "string[]",
                  name: "_coinNames",
                  type: "string[]"
                },
                {
                  internalType: "uint256[]",
                  name: "_values",
                  type: "uint256[]"
                },
                { internalType: "string", name: "_to", type: "string" }
              ],
              name: "transferBatch",
              outputs: [],
              stateMutability: "payable",
              type: "function"
            },
            {
              inputs: [{ internalType: "string", name: "_fa", type: "string" }],
              name: "transferFees",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [{ internalType: "string", name: "_to", type: "string" }],
              name: "transferNativeCoin",
              outputs: [],
              stateMutability: "payable",
              type: "function"
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_btsPeriphery",
                  type: "address"
                }
              ],
              name: "updateBTSPeriphery",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [],
              name: "updateCoinDb",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            }
          ]
        }
      },
      BTSPeriphery: {
        abi: [
          {
            inputs: [
              { internalType: "address", name: "_logic", type: "address" },
              { internalType: "address", name: "admin_", type: "address" },
              { internalType: "bytes", name: "_data", type: "bytes" }
            ],
            stateMutability: "payable",
            type: "constructor"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address",
                name: "previousAdmin",
                type: "address"
              },
              {
                indexed: false,
                internalType: "address",
                name: "newAdmin",
                type: "address"
              }
            ],
            name: "AdminChanged",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "beacon",
                type: "address"
              }
            ],
            name: "BeaconUpgraded",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "implementation",
                type: "address"
              }
            ],
            name: "Upgraded",
            type: "event"
          },
          { stateMutability: "payable", type: "fallback" },
          {
            inputs: [],
            name: "admin",
            outputs: [
              { internalType: "address", name: "admin_", type: "address" }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              { internalType: "address", name: "newAdmin", type: "address" }
            ],
            name: "changeAdmin",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [],
            name: "implementation",
            outputs: [
              {
                internalType: "address",
                name: "implementation_",
                type: "address"
              }
            ],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              }
            ],
            name: "upgradeTo",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newImplementation",
                type: "address"
              },
              { internalType: "bytes", name: "data", type: "bytes" }
            ],
            name: "upgradeToAndCall",
            outputs: [],
            stateMutability: "payable",
            type: "function"
          },
          { stateMutability: "payable", type: "receive" }
        ],
        address: "0xd75A671A5196459b13c97424B0C275D51D2C3488",
        implementation: {
          address: "0xbece868fb46b5782db198c57cd2feff21c6eb9ac",
          abi: [
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint8",
                  name: "version",
                  type: "uint8"
                }
              ],
              name: "Initialized",
              type: "event"
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "_from",
                  type: "address"
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_sn",
                  type: "uint256"
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_code",
                  type: "uint256"
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "_response",
                  type: "string"
                }
              ],
              name: "TransferEnd",
              type: "event"
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "string",
                  name: "_from",
                  type: "string"
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "_to",
                  type: "address"
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_sn",
                  type: "uint256"
                },
                {
                  components: [
                    {
                      internalType: "string",
                      name: "coinName",
                      type: "string"
                    },
                    { internalType: "uint256", name: "value", type: "uint256" }
                  ],
                  indexed: false,
                  internalType: "struct Types.Asset[]",
                  name: "_assetDetails",
                  type: "tuple[]"
                }
              ],
              name: "TransferReceived",
              type: "event"
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "_from",
                  type: "address"
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "_to",
                  type: "string"
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_sn",
                  type: "uint256"
                },
                {
                  components: [
                    {
                      internalType: "string",
                      name: "coinName",
                      type: "string"
                    },
                    { internalType: "uint256", name: "value", type: "uint256" },
                    { internalType: "uint256", name: "fee", type: "uint256" }
                  ],
                  indexed: false,
                  internalType: "struct Types.AssetTransferDetail[]",
                  name: "_assetDetails",
                  type: "tuple[]"
                }
              ],
              name: "TransferStart",
              type: "event"
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "string",
                  name: "_from",
                  type: "string"
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_sn",
                  type: "uint256"
                }
              ],
              name: "UnknownResponse",
              type: "event"
            },
            {
              inputs: [
                { internalType: "string[]", name: "_address", type: "string[]" }
              ],
              name: "addToBlacklist",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [{ internalType: "address", name: "", type: "address" }],
              name: "blacklist",
              outputs: [{ internalType: "bool", name: "", type: "bool" }],
              stateMutability: "view",
              type: "function"
            },
            {
              inputs: [{ internalType: "string", name: "_to", type: "string" }],
              name: "checkParseAddress",
              outputs: [],
              stateMutability: "pure",
              type: "function"
            },
            {
              inputs: [
                { internalType: "string", name: "_coinName", type: "string" },
                { internalType: "address", name: "_user", type: "address" },
                { internalType: "uint256", name: "_value", type: "uint256" }
              ],
              name: "checkTransferRestrictions",
              outputs: [],
              stateMutability: "view",
              type: "function"
            },
            {
              inputs: [
                { internalType: "string", name: "", type: "string" },
                { internalType: "string", name: "_svc", type: "string" },
                { internalType: "uint256", name: "_sn", type: "uint256" },
                { internalType: "uint256", name: "_code", type: "uint256" },
                { internalType: "string", name: "_msg", type: "string" }
              ],
              name: "handleBTPError",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [
                { internalType: "string", name: "_from", type: "string" },
                { internalType: "string", name: "_svc", type: "string" },
                { internalType: "uint256", name: "_sn", type: "uint256" },
                { internalType: "bytes", name: "_msg", type: "bytes" }
              ],
              name: "handleBTPMessage",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [
                { internalType: "string", name: "_fa", type: "string" },
                { internalType: "string", name: "_svc", type: "string" }
              ],
              name: "handleFeeGathering",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [
                { internalType: "string", name: "_to", type: "string" },
                {
                  components: [
                    {
                      internalType: "string",
                      name: "coinName",
                      type: "string"
                    },
                    { internalType: "uint256", name: "value", type: "uint256" }
                  ],
                  internalType: "struct Types.Asset[]",
                  name: "_assets",
                  type: "tuple[]"
                }
              ],
              name: "handleRequestService",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [],
              name: "hasPendingRequest",
              outputs: [{ internalType: "bool", name: "", type: "bool" }],
              stateMutability: "view",
              type: "function"
            },
            {
              inputs: [
                { internalType: "address", name: "_bmc", type: "address" },
                { internalType: "address", name: "_btsCore", type: "address" }
              ],
              name: "initialize",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [
                { internalType: "string[]", name: "_address", type: "string[]" }
              ],
              name: "removeFromBlacklist",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              name: "requests",
              outputs: [
                { internalType: "string", name: "from", type: "string" },
                { internalType: "string", name: "to", type: "string" }
              ],
              stateMutability: "view",
              type: "function"
            },
            {
              inputs: [
                { internalType: "address", name: "_from", type: "address" },
                { internalType: "string", name: "_to", type: "string" },
                {
                  internalType: "string[]",
                  name: "_coinNames",
                  type: "string[]"
                },
                {
                  internalType: "uint256[]",
                  name: "_values",
                  type: "uint256[]"
                },
                { internalType: "uint256[]", name: "_fees", type: "uint256[]" }
              ],
              name: "sendServiceMessage",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [],
              name: "serviceName",
              outputs: [{ internalType: "string", name: "", type: "string" }],
              stateMutability: "view",
              type: "function"
            },
            {
              inputs: [
                {
                  internalType: "string[]",
                  name: "_coinNames",
                  type: "string[]"
                },
                {
                  internalType: "uint256[]",
                  name: "_tokenLimits",
                  type: "uint256[]"
                }
              ],
              name: "setTokenLimit",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              inputs: [{ internalType: "string", name: "", type: "string" }],
              name: "tokenLimit",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "view",
              type: "function"
            }
          ]
        }
      }
    }
  },
  icon: {
    mainnet: {
      sICX: { address: "cx2609b924e33ef00b648a409245c7ea394c467824" },
      bnUSD: { address: "cx88fd7df7ddff82f7cc735c871dc519838cb235bb" },
      BNB: { address: "cx077807f2322aeb42ea19a1fcc0c9f3d3f35e1461" },
      BUSD: { address: "cxb49d82c46be6b61cab62aaf9824b597c6cf8a25d" },
      USDT: { address: "cx8e4d9b4164618f796d493a8154f1f17ad75f11bb" },
      USDC: { address: "cx532e4235f9004c233604c1be98ca839cd777d58c" },
      BTCB: { address: "cx5b5a03cb525a1845d0af3a872d525b18a810acb0" },
      ETH: { address: "cx288d13e1b63563459a2ac6179f237711f6851cb5" },
      bmc: { address: "cx23a91ee3dd290486a9113a6a42429825d813de53" },
      bts: { address: "cxcef70e92b89f2d8191a0582de966280358713c32" }
    },
    testnet: {
      sICX: { address: "cx3044ad389267b50eb3c57103eade0c5a72261c1a" },
      bnUSD: { address: "cx7f45afe9d8ce95e80c1be7c4eef2ea0dd843c4e3" },
      BNB: { address: "cxcea1078c39e8b887692d3ccdd81bd711a6260ea5" },
      BUSD: { address: "cxea67f5fe1d1f7e1d29d54f185f0585b8262c788e" },
      USDT: { address: "cxac717247714a0b8e2b9038fdadfdcc0f033e325b" },
      USDC: { address: "cxd840ae3c79c1366895747aa8c228bd7e3459032f" },
      BTCB: { address: "cx63be8619af9cdf1cb053ccde7642ae974648a8c1" },
      ETH: { address: "cx4b9cd9bb520b08d14c19c5035295f7e44003e42f" },
      bmc: { address: "cxcc165238ae0e894835e88f549f22e520c7ad740f" },
      bts: { address: "cx949e9e242305309ed234c19183e9ed6e8f44ee73" }
    }
  }
};
module.exports = data;
