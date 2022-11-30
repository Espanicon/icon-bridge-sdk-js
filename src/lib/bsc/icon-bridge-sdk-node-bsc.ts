// icon-bridge-sdk-node-bsc.ts
//
const baseBSCSDK = require("./icon-bridge-sdk-bsc");
const Exception = require("../../utils/exception");

// types
type Provider = {
  hostname: string;
  nid: null | number;
};

type InputParams = {
  useMainnet: null | boolean;
  iconProvider?: Provider;
  bscProvider?: Provider;
};

// main code

/**
 * Class that provides the API for interacting with the ICON Bridge
 */
class IconBridgeSDKNodeBSC extends baseBSCSDK {
  #params: any;
  #bscWeb3: any;
  #sdkUtils: any;
  #callbackLib: any;
  methods: any;
  queryMethod: any;

  /**
   * Constructor
   */
  constructor(
    params: InputParams,
    bscWeb3: any,
    sdkUtils: any,
    callbackLib: any,
    queryMethod: any
  ) {
    super(params, bscWeb3, callbackLib, queryMethod);
    this.#params = {
      ...params,
      nonce: 0
    };
    this.#bscWeb3 = bscWeb3;
    this.#sdkUtils = sdkUtils;
    this.#callbackLib = callbackLib;
    this.methods = {
      ...this.superMethods,
      ...this.#localMethods
    };
    this.queryMethod = queryMethod;
  }

  #localMethods = {
    /**
     * Allow users to deposit an amount of token into the
     * BTSCore contract.
     * @param targetAddress - address of receiver.
     * @param targetChain - receiver chain.
     * @param from - address of sender.
     * @param pk - private key of sender.
     * @param _value - amount to transfer.
     * @param _coinName - name of coin to transfer.
     * @param gas - transfer fee amount.
     */
    transfer: async (
      targetAddress: string,
      targetChain: string = "icon",
      from: string,
      pk: string,
      _value: string,
      _coinName: string,
      gas: number | null = 2000000,
      useNativeQueryMethod: boolean = true
    ): Promise<any> => {
      //
      try {
        const isMainnet: boolean | null =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        // this params determine if we use the native query method, which
        // would be http/https when running on nodejs or fetch if running
        // on the browser or if we directly use the query method included
        // in the web3js library. the default is not to use the method
        // included in the web3js library.
        const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
        const btpAddress = this.#sdkUtils.getBTPAddress(
          targetAddress,
          targetChain,
          isMainnet
        );

        const valueInWei = this.#bscWeb3.utils.toWei(_value, "ether");

        // token transaction
        const response = await this.#signBTSCoreTx(
          from,
          pk,
          "transfer",
          null,
          gas,
          queryMethod,
          _coinName,
          valueInWei,
          btpAddress
        );

        return response;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running transfer(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n_value: ${_value}\n_coinName: ${_coinName}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Allow users to transfer multiple coins/wrapped coins to another chain.
     * @param _coinNames - list of coins.
     * @param _values - list of values in same order of coins.
     * @param _to - target BTP address.
     */
    transferBatch: async (
      _coinNames: string[],
      _values: string[],
      _to: string,
      gas: number | null = 2000000
    ): Promise<void> => {
      // index 23
      console.log([_coinNames, _values, _to, gas]);
    },

    /**
     * Allows user to deposit native coin into a BTSCore contract.
     * @param targetAddress - address that receives transfer.
     * @param targetChain - chain that receives transfer.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param amount - amount of native coin to send.
     * @param gas - transfer fee amount.
     */
    transferNativeCoin: async (
      targetAddress: string,
      targetChain: string = "icon",
      from: string,
      pk: string,
      amount: string,
      gas: number | null = 2000000,
      useNativeQueryMethod: boolean = true
    ): Promise<any> => {
      try {
        const isMainnet: boolean | null =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        // this params determine if we use the native query method, which
        // would be http/https when running on nodejs or fetch if running
        // on the browser or if we directly use the query method included
        // in the web3js library. the default is not to use the method
        // included in the web3js library.
        const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
        //
        const btpAddress = this.#sdkUtils.getBTPAddress(
          targetAddress,
          targetChain,
          isMainnet
        );
        return await this.#signBTSCoreTx(
          from,
          pk,
          "transferNativeCoin",
          amount,
          gas,
          queryMethod,
          btpAddress
        );
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running transferNativeCoin(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\namount: ${amount}\ngas: ${gas}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Allow users to deposit an amount of wrapped native coin into the
     * BTSCore contract.
     * @param targetAddress - address of receiver.
     * @param targetChain - receiver chain.
     * @param from - address of sender.
     * @param pk - private key of sender.
     * @param _coinName - given name of wrapped coin.
     * @param _value - amount to transfer.
     * @param tokenContractAddress - contract address of the token to be sent.
     * @param tokenContractAbi - contract abi of the token to be sent.
     * @param gas - transfer fee amount.
     */
    approveAndTransfer: async (
      targetAddress: string,
      targetChain: string = "icon",
      from: string,
      pk: string,
      _coinName: string,
      _value: string,
      tokenContractAddress: string,
      tokenContractAbi: any[],
      gas: number | null = 2000000
    ): Promise<any> => {
      try {
        return await this.#approveAndTransfer(
          targetAddress,
          targetChain,
          from,
          pk,
          _coinName,
          _value,
          tokenContractAddress,
          tokenContractAbi,
          gas
        );
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running #approveAndTransfer(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n_coinName: ${_coinName}\n_value: ${_value}\ntokenContractAddress: ${tokenContractAddress}\ntokenContractAbi: ${tokenContractAbi}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Approves an amount of token to be sent by the BTSCore contract on
     * behalf of the originator wallet.
     * @param from - address of sender.
     * @param pk - private key of sender.
     * @param amount - amount to approve.
     * @param tokenContractAddress - Contract address of the token to approve.
     * @param tokenContractAbi - Contract abi of the token to approve.
     * @param gas - transfer fee amount.
     */
    approveTransfer: async (
      from: string,
      pk: string,
      amount: string,
      tokenContractAddress: string,
      tokenContractAbi: any[],
      gas: number | null = null
    ) => {
      //
      const isMainnet: boolean | null =
        this.#params.useMainnet == null ? true : this.#params.useMainnet;

      const btsCoreAddress = this.#callbackLib.getBTSCoreProxyContractAddress(
        "bsc",
        isMainnet
      );

      return await this.#callbackLib.approveTransfer(
        from,
        pk,
        btsCoreAddress,
        amount,
        tokenContractAddress,
        tokenContractAbi,
        "bsc",
        this.#bscWeb3,
        gas
      );
    },


    ///////////////////////////////////////////////////////////////////
    //
    // The following methods can only be called by contract owners
    /**
     * Add another Owner. Caller must be an Owner of BTP network.
     * @param from - address of sender.
     * @param pk - private key of sender.
     * @param _owner - Address of new owner
     * @param gas - transfer fee amount.
     * @return
     */
    addOwner: async (
      from: string,
      pk: string,
      _owner: string,
      gas: number | null = null,
      useNativeQueryMethod: boolean = true
    ): Promise<any> => {
      try {
        // this params determine if we use the native query method, which
        // would be http/https when running on nodejs or fetch if running
        // on the browser or if we directly use the query method included
        // in the web3js library. the default is not to use the method
        // included in the web3js library.
        const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
        return await this.#signBTSCoreTx(
          from,
          pk,
          "addOwner",
          null,
          gas,
          queryMethod,
          _owner
        );
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running addOwner(). Params:\nfrom: ${from}\npk: ${pk}\n_owner: ${_owner}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Reclaim the token's refundable balance by an owner. Caller must be
     * owner of coin.
     * @param from - address of sender.
     * @param pk - private key of sender.
     * @param _coinName - coin name.
     * @param _value - amount of re-claiming tokens.
     * @param gas - transfer fee amount.
     */
    reclaim: async (
      from: string,
      pk: string,
      _coinName: string,
      _value: number,
      gas: number | null = null,
      useNativeQueryMethod: boolean = true
    ): Promise<any> => {
      try {
        // this params determine if we use the native query method, which
        // would be http/https when running on nodejs or fetch if running
        // on the browser or if we directly use the query method included
        // in the web3js library. the default is not to use the method
        // included in the web3js library.
        const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
        return await this.#signBTSCoreTx(
          from,
          pk,
          "reclaim",
          null,
          gas,
          queryMethod,
          _coinName,
          _value
        );
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running reclaim(). Params:\nfrom: ${from}\npk: ${pk}\n_coinName: ${_coinName}\n_value: ${_value}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Registers a wrapped coin and id number of a supporting coin. Caller
     * must be an owner of this contract.
     * @param from - address of sender.
     * @param pk - private key of sender.
     * @param _name - must be different with the native coin name.
     * @param _symbol - symbol name for a wrapped coin.
     * @param _decimals - decimal number.
     * @param _feeNumerator -
     * @param _fixedFee -
     * @param _addr -
     * @param gas - transfer fee amount.
     */
    register: async (
      from: string,
      pk: string,
      _name: string,
      _symbol: string,
      _decimals: number,
      _feeNumerator: number,
      _fixedFee: number,
      _addr: string,
      gas: number | null = null,
      useNativeQueryMethod: boolean = true
    ): Promise<any> => {
      try {
        // this params determine if we use the native query method, which
        // would be http/https when running on nodejs or fetch if running
        // on the browser or if we directly use the query method included
        // in the web3js library. the default is not to use the method
        // included in the web3js library.
        const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
        return await this.#signBTSCoreTx(
          from,
          pk,
          "register",
          null,
          gas,
          queryMethod,
          _name,
          _symbol,
          _decimals,
          _feeNumerator,
          _fixedFee,
          _addr
        );
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running register(). Params:\nfrom: ${from}\npk: ${pk}\n_name: ${_name}\n_symbol: ${_symbol}\n_decimals: ${_decimals}\n_feeNumerator: ${_feeNumerator}\n_fixedFee: ${_fixedFee}\n_addr: ${_addr}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Removing an existing owner. Caller must be an owner of BTP network.
     * @param from - address of sender.
     * @param pk - private key of sender.
     * @param _owner - address of owner to be removed.
     * @param gas - transfer fee amount.
     */
    removeOwner: async (
      from: string,
      pk: string,
      _owner: string,
      gas: number | null = null,
      useNativeQueryMethod: boolean = true
    ): Promise<any> => {
      try {
        // this params determine if we use the native query method, which
        // would be http/https when running on nodejs or fetch if running
        // on the browser or if we directly use the query method included
        // in the web3js library. the default is not to use the method
        // included in the web3js library.
        const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
        return await this.#signBTSCoreTx(
          from,
          pk,
          "removeOwner",
          null,
          gas,
          queryMethod,
          _owner
        );
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running removeOwner(). Params:\nfrom: ${from}\npk: ${pk}\n_owner: ${_owner}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Set fee ratio. Caller must be an owner of this contract.
     * @param from - address of sender.
     * @param pk - private key of sender.
     * @param _name -
     * @param _feeNumerator -
     * @param _fixedFee -
     * @param gas - transfer fee amount.
     */
    setFeeRatio: async (
      from: string,
      pk: string,
      _name: string,
      _feeNumerator: number,
      _fixedFee: number,
      gas: number | null = null,
      useNativeQueryMethod: boolean = true
    ): Promise<any> => {
      // this params determine if we use the native query method, which
      // would be http/https when running on nodejs or fetch if running
      // on the browser or if we directly use the query method included
      // in the web3js library. the default is not to use the method
      // included in the web3js library.
      const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
      try {
        return await this.#signBTSCoreTx(
          from,
          pk,
          "setFeeRatio",
          null,
          gas,
          queryMethod,
          _name,
          _feeNumerator,
          _fixedFee
        );
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running setFeeRatio(). Params:\nfrom: ${from}\npk: ${pk}\n_name: ${_name}\n_feeNumerator: ${_feeNumerator}\n_fixedFee: ${_fixedFee}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Updates BTS periphery address. Caller must be owner of contract.
     * @param from - address of sender.
     * @param pk - private key of sender.
     * @param _btsPeriphery - btsPeriphery contract address.
     * @param gas - transfer fee amount.
     */
    updateBTSPeriphery: async (
      from: string,
      pk: string,
      _btsPeriphery: string,
      gas: number | null = null,
      useNativeQueryMethod: boolean = true
    ): Promise<any> => {
      try {
        // this params determine if we use the native query method, which
        // would be http/https when running on nodejs or fetch if running
        // on the browser or if we directly use the query method included
        // in the web3js library. the default is not to use the method
        // included in the web3js library.
        const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
        return await this.#signBTSCoreTx(
          from,
          pk,
          "updateBTSPeriphery",
          null,
          gas,
          queryMethod,
          _btsPeriphery
        );
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running updateBTSPeriphery(). Params:\nfrom: ${from}\npk: ${pk}\n_btsPeriphery: ${_btsPeriphery}\n`
        );
        return { error: errorResult.toString() };
      }
    }
  };

  /**
   * Sign a tx to the BTSCore contract.
   * @param from - address of sender.
   * @param pk - private key of sender.
   * @param amount - amount to approve.
   * @param tokenContractAddress - Contract address of the token to approve.
   * @param tokenContractAbi - Contract abi of the token to approve.
   * @param gas - transfer fee amount.
   */
  #approveBTSCoreForTransfer = async (
    from: string,
    pk: string,
    amount: string,
    tokenContractAddress: string,
    tokenContractAbi: any[],
    gas: number | null = null
  ) => {
    //
    const isMainnet: boolean | null =
      this.#params.useMainnet == null ? true : this.#params.useMainnet;

    const btsCoreAddress = this.#callbackLib.getBTSCoreProxyContractAddress(
      "bsc",
      isMainnet
    );

    return await this.#callbackLib.approveTransfer(
      from,
      pk,
      btsCoreAddress,
      amount,
      tokenContractAddress,
      tokenContractAbi,
      "bsc",
      this.#bscWeb3,
      gas
    );
  };

  /**
   * Sign a tx to the BTSCore contract.
   * @param from - address of sender.
   * @param pk - private key of sender.
   * @param methodName -
   * @param amount -
   * @param gas - transfer fee amount.
   */
  #signBTSCoreTx = async (
    from: string,
    pk: string,
    methodName: string,
    amount: null | string = null,
    gas: number | null = null,
    queryMethod: null = null,
    ...rest: any[]
  ): Promise<string | null> => {
    // get the account nonce on chain. The following code logic is executed
    // to help the library process queue txs more easily. 
    //
    let nonceOnChain: any = null;
    try {
      const bypass = true // TODO: bypass the nonce querying logic
      if (!bypass) {
        if(queryMethod == null) {
          nonceOnChain = await this.#bscWeb3.eth.getTransactionCount(from);
        } else {
          const nonceQuery = await this.#sdkUtils.makeEthGetTransactionCountQuery(
            this.#params.bscProvider.hostname,
            from,
            queryMethod
          );
          if (nonceQuery.result != null) {
            nonceOnChain = parseInt(nonceQuery.result, 16);
          }
        }

        this.#params["nonce"] = this.#params["nonce"] > nonceOnChain
        ? this.#params["nonce"] + 1 
        : nonceOnChain + 1;
      }

    } catch (err) {
      // if an error is catched we simply continue with the transaction
      // without trying to setup a nonce
      this.#params["nonce"] = 0;
    }

    if (rest.length === 0) {
      return await this.#callbackLib.signBTSCoreTx(
        from,
        pk,
        methodName,
        amount,
        "bsc",
        this.#bscWeb3,
        gas,
        queryMethod,
        this.#params.nonce
      );
    } else {
      return await this.#callbackLib.signBTSCoreTx(
        from,
        pk,
        methodName,
        amount,
        "bsc",
        this.#bscWeb3,
        gas,
        queryMethod,
        this.#params.nonce,
        ...rest
      );
    }
  };

  /**
   * Allow users to deposit an amount of token into the
   * BTSCore contract.
   * @param targetAddress - address of receiver.
   * @param targetChain - receiver chain.
   * @param from - address of sender.
   * @param pk - private key of sender.
   * @param _value - amount to transfer.
   * @param tokenLabel - token to transfer.
   * @param gas - transfer fee amount.
   */
  //#transferToken = async (
  //  targetAddress: string,
  //  targetChain: string = "icon",
  //  from: string,
  //  pk: string,
  //  _value: string,
  //  tokenLabel: string,
  //  gas: number | null = 2000000
  //): Promise<any> => {
  //  //
  //  let isMainnet = null;
  //  let coinName = null;
  //  if (this.#params.useMainnet === false) {
  //    isMainnet = false;
  //    coinName = this.#sdkUtils.tokenNames.bsc.testnet[tokenLabel];
  //  } else if (
  //    this.#params.useMainnet === true ||
  //    this.#params.useMainnet == null
  //  ) {
  //    isMainnet = true;
  //    coinName = this.#sdkUtils.tokenNames.bsc.mainnet[tokenLabel];
  //  }
  //  const abi = this.#sdkUtils.genericAbi;
  //  const tokenContractAddress = this.#callbackLib.getContractAddressLocally(
  //    tokenLabel,
  //    "bsc",
  //    isMainnet,
  //    false
  //  );

  //  const request = await this.#approveAndTransfer(
  //    targetAddress,
  //    targetChain,
  //    from,
  //    pk,
  //    coinName,
  //    _value,
  //    tokenContractAddress,
  //    abi,
  //    gas
  //  );

  //  return request;
  //};

  /**
   * Allow users to deposit an amount of wrapped native coin into the
   * BTSCore contract.
   * @param targetAddress - address of receiver.
   * @param targetChain - receiver chain.
   * @param from - address of sender.
   * @param pk - private key of sender.
   * @param _coinName - given name of wrapped coin.
   * @param _value - amount to transfer.
   * @param tokenContractAddress - contract address of the token to be sent.
   * @param tokenContractAbi - contract abi of the token to be sent.
   * @param gas - transfer fee amount.
   */
  #approveAndTransfer = async (
    targetAddress: string,
    targetChain: string = "icon",
    from: string,
    pk: string,
    _coinName: string,
    _value: string,
    tokenContractAddress: string,
    tokenContractAbi: any[],
    gas: number | null = 2000000,
    useNativeQueryMethod: boolean = true
  ): Promise<any> => {
    const isMainnet: boolean | null =
      this.#params.useMainnet == null ? true : this.#params.useMainnet;

    // this params determine if we use the native query method, which
    // would be http/https when running on nodejs or fetch if running
    // on the browser or if we directly use the query method included
    // in the web3js library. the default is not to use the method
    // included in the web3js library.
    const queryMethod = useNativeQueryMethod ? this.queryMethod : null;

    // first approve the contract to make transfer
    const response = await this.#approveBTSCoreForTransfer(
      from,
      pk,
      _value,
      tokenContractAddress,
      tokenContractAbi,
      gas
    );

    const btpAddress = this.#sdkUtils.getBTPAddress(
      targetAddress,
      targetChain,
      isMainnet
    );

    const valueInWei = this.#bscWeb3.utils.toWei(_value, "ether");

    // token transaction after approval
    const response2 = await this.#signBTSCoreTx(
      from,
      pk,
      "transfer",
      null,
      gas,
      queryMethod,
      _coinName,
      valueInWei,
      btpAddress
    );

    return {
      approvalTx: response,
      tokenTx: response2
    };
  };
}

export = IconBridgeSDKNodeBSC;


    ///**
    // * Allow users to deposit an amount of BUSD token into the
    // * BTSCore contract.
    // * @param targetAddress - address of receiver.
    // * @param targetChain - receiver chain.
    // * @param from - address of sender.
    // * @param pk - private key of sender.
    // * @param _value - amount to transfer.
    // * @param gas - transfer fee amount.
    // */
    //transferBUSD: async (
    //  targetAddress: string,
    //  targetChain: string = "icon",
    //  from: string,
    //  pk: string,
    //  _value: string,
    //  gas: number | null = 2000000
    //): Promise<any> => {
    //  //
    //  try {
    //    const tokenLabel = this.#sdkUtils.labels.busd;
    //    return await this.#transferToken(
    //      targetAddress,
    //      targetChain,
    //      from,
    //      pk,
    //      _value,
    //      tokenLabel,
    //      gas
    //    );
    //  } catch (err) {
    //    const errorResult = new Exception(
    //      err,
    //      `Error running transferBUSD(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n_value: ${_value}\n`
    //    );
    //    return { error: errorResult.toString() };
    //  }
    //},

    ///**
    // * Allow users to deposit an amount of USDT token into the
    // * BTSCore contract.
    // * @param targetAddress - address of receiver.
    // * @param targetChain - receiver chain.
    // * @param from - address of sender.
    // * @param pk - private key of sender.
    // * @param _value - amount to transfer.
    // * @param gas - transfer fee amount.
    // */
    //transferUSDT: async (
    //  targetAddress: string,
    //  targetChain: string = "icon",
    //  from: string,
    //  pk: string,
    //  _value: string,
    //  gas: number | null = 2000000
    //): Promise<any> => {
    //  //
    //  try {
    //    const tokenLabel = this.#sdkUtils.labels.usdt;
    //    return await this.#transferToken(
    //      targetAddress,
    //      targetChain,
    //      from,
    //      pk,
    //      _value,
    //      tokenLabel,
    //      gas
    //    );
    //  } catch (err) {
    //    const errorResult = new Exception(
    //      err,
    //      `Error running transferUSDT(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n_value: ${_value}\n`
    //    );
    //    return { error: errorResult.toString() };
    //  }
    //},

    ///**
    // * Allow users to deposit an amount of USDC token into the
    // * BTSCore contract.
    // * @param targetAddress - address of receiver.
    // * @param targetChain - receiver chain.
    // * @param from - address of sender.
    // * @param pk - private key of sender.
    // * @param _value - amount to transfer.
    // * @param gas - transfer fee amount.
    // */
    //transferUSDC: async (
    //  targetAddress: string,
    //  targetChain: string = "icon",
    //  from: string,
    //  pk: string,
    //  _value: string,
    //  gas: number | null = 2000000
    //): Promise<any> => {
    //  try {
    //    const tokenLabel = this.#sdkUtils.labels.usdc;
    //    return await this.#transferToken(
    //      targetAddress,
    //      targetChain,
    //      from,
    //      pk,
    //      _value,
    //      tokenLabel,
    //      gas
    //    );
    //  } catch (err) {
    //    const errorResult = new Exception(
    //      err,
    //      `Error running transferUSDC(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n_value: ${_value}\n`
    //    );
    //    return { error: errorResult.toString() };
    //  }
    //},

    ///**
    // * Allow users to deposit an amount of BTCB token into the
    // * BTSCore contract.
    // * @param targetAddress - address of receiver.
    // * @param targetChain - receiver chain.
    // * @param from - address of sender.
    // * @param pk - private key of sender.
    // * @param _value - amount to transfer.
    // * @param gas - transfer fee amount.
    // */
    //transferBTCB: async (
    //  targetAddress: string,
    //  targetChain: string = "icon",
    //  from: string,
    //  pk: string,
    //  _value: string,
    //  gas: number | null = 2000000
    //): Promise<any> => {
    //  try {
    //    const tokenLabel = this.#sdkUtils.labels.btcb;
    //    return await this.#transferToken(
    //      targetAddress,
    //      targetChain,
    //      from,
    //      pk,
    //      _value,
    //      tokenLabel,
    //      gas
    //    );
    //  } catch (err) {
    //    const errorResult = new Exception(
    //      err,
    //      `Error running transferBTCB(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n_value: ${_value}\n`
    //    );
    //    return { error: errorResult.toString() };
    //  }
    //},

    ///**
    // * Allow users to deposit an amount of ETH token into the
    // * BTSCore contract.
    // * @param targetAddress - address of receiver.
    // * @param targetChain - receiver chain.
    // * @param from - address of sender.
    // * @param pk - private key of sender.
    // * @param _value - amount to transfer.
    // * @param gas - transfer fee amount.
    // */
    //transferETH: async (
    //  targetAddress: string,
    //  targetChain: string = "icon",
    //  from: string,
    //  pk: string,
    //  _value: string,
    //  gas: number | null = 2000000
    //): Promise<any> => {
    //  try {
    //    const tokenLabel = this.#sdkUtils.labels.eth;
    //    return await this.#transferToken(
    //      targetAddress,
    //      targetChain,
    //      from,
    //      pk,
    //      _value,
    //      tokenLabel,
    //      gas
    //    );
    //  } catch (err) {
    //    const errorResult = new Exception(
    //      err,
    //      `Error running transferETH(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n_value: ${_value}\n`
    //    );
    //    return { error: errorResult.toString() };
    //  }
    //},

    ///**
    // * Allow users to deposit an amount of ICX token into the
    // * BTSCore contract.
    // * @param targetAddress - address of receiver.
    // * @param targetChain - receiver chain.
    // * @param from - address of sender.
    // * @param pk - private key of sender.
    // * @param _value - amount to transfer.
    // * @param gas - transfer fee amount.
    // */
    //transferICX: async (
    //  targetAddress: string,
    //  targetChain: string = "icon",
    //  from: string,
    //  pk: string,
    //  _value: string,
    //  gas: number | null = 2000000
    //): Promise<any> => {
    //  //
    //  try {
    //    const tokenLabel = this.#sdkUtils.labels.icx;
    //    return await this.#transferToken(
    //      targetAddress,
    //      targetChain,
    //      from,
    //      pk,
    //      _value,
    //      tokenLabel,
    //      gas
    //    );
    //  } catch (err) {
    //    const errorResult = new Exception(
    //      err,
    //      `Error running transferICX(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n_value: ${_value}\n`
    //    );
    //    return { error: errorResult.toString() };
    //  }
    //},

    ///**
    // * Allow users to deposit an amount of sICX token into the
    // * BTSCore contract.
    // * @param targetAddress - address of receiver.
    // * @param targetChain - receiver chain.
    // * @param from - address of sender.
    // * @param pk - private key of sender.
    // * @param _value - amount to transfer.
    // * @param gas - transfer fee amount.
    // */
    //transferSICX: async (
    //  targetAddress: string,
    //  targetChain: string = "icon",
    //  from: string,
    //  pk: string,
    //  _value: string,
    //  gas: number | null = 2000000
    //): Promise<any> => {
    //  try {
    //    const tokenLabel = this.#sdkUtils.labels.sicx;
    //    return await this.#transferToken(
    //      targetAddress,
    //      targetChain,
    //      from,
    //      pk,
    //      _value,
    //      tokenLabel,
    //      gas
    //    );
    //  } catch (err) {
    //    const errorResult = new Exception(
    //      err,
    //      `Error running transferSICX(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n_value: ${_value}\n`
    //    );
    //    return { error: errorResult.toString() };
    //  }
    //},

    ///**
    // * Allow users to deposit an amount of bnUSD token into the
    // * BTSCore contract.
    // * @param targetAddress - address of receiver.
    // * @param targetChain - receiver chain.
    // * @param from - address of sender.
    // * @param pk - private key of sender.
    // * @param _value - amount to transfer.
    // * @param gas - transfer fee amount.
    // */
    //transferBnUSD: async (
    //  targetAddress: string,
    //  targetChain: string = "icon",
    //  from: string,
    //  pk: string,
    //  _value: string,
    //  gas: number | null = 2000000
    //): Promise<any> => {
    //  try {
    //    const tokenLabel = this.#sdkUtils.labels.bnusd;
    //    return await this.#transferToken(
    //      targetAddress,
    //      targetChain,
    //      from,
    //      pk,
    //      _value,
    //      tokenLabel,
    //      gas
    //    );
    //  } catch (err) {
    //    const errorResult = new Exception(
    //      err,
    //      `Error running transferBnUSD(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n_value: ${_value}\n`
    //    );
    //    return { error: errorResult.toString() };
    //  }
    //},
