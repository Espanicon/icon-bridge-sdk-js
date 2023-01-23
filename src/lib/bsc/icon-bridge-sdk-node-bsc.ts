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
  web: any;

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
    super(params, bscWeb3, callbackLib, sdkUtils, queryMethod);
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
    this.web = {
      ...this.#web
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
      pk: string | null,
      _value: string,
      _coinName: string,
      gas: number | null = 2000000,
      useNativeQueryMethod: boolean = true,
      useWeb: boolean = false
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
          useWeb,
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
     * @param targetAddress - address of receiver.
     * @param targetChain - receiver chain.
     * @param from - address of sender.
     * @param pk - private key of sender.
     * @param _coinNames - name of coin to transfer.
     * @param _values - amount to transfer.
     * @param gas - transfer fee amount.
     */
    transferBatch: async (
      targetAddress: string,
      targetChain: string = "icon",
      from: string,
      pk: string | null,
      _values: string[],
      _coinNames: string[],
      gas: number | null = 2000000,
      useNativeQueryMethod: boolean = true,
      useWeb: boolean = false
    ): Promise<any> => {
      // index 23
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

        const valuesInWei = _values.map(_value => {
         return this.#bscWeb3.utils.toWei(_value, "ether");
        })

        // token transaction
        const response = await this.#signBTSCoreTx(
          useWeb,
          from,
          pk,
          "transferBatch",
          null,
          gas,
          queryMethod,
          _coinNames,
          valuesInWei,
          btpAddress
        );

        return response;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running transferBatch(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\n_values: ${_values}\n_coinNames: ${_coinNames}\n`
        );
        return { error: errorResult.toString() };
      }
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
      pk: string | null,
      amount: string,
      gas: number | null = 2000000,
      useNativeQueryMethod: boolean = true,
      useWeb: boolean = false
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
          useWeb,
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
     * @param _value - amount to transfer.
     * @param _coinName - given name of wrapped coin.
     * @param tokenContractAddress - contract address of the token to be sent.
     * @param tokenContractAbi - contract abi of the token to be sent.
     * @param gas - transfer fee amount.
     */
    approveAndTransfer: async (
      targetAddress: string,
      targetChain: string = "icon",
      from: string,
      pk: string,
      _value: string,
      _coinName: string,
      tokenContractAddress: string,
      tokenContractAbi: any[] = this.#sdkUtils.genericAbi,
      gas: number | null = 2000000,
      useNativeQueryMethod: boolean = true,
      // useWeb: boolean = false
    ): Promise<any> => {
      try {
        return await this.#approveAndTransfer(
          // useWeb,
          targetAddress,
          targetChain,
          from,
          pk,
          _coinName,
          _value,
          tokenContractAddress,
          tokenContractAbi,
          gas,
          useNativeQueryMethod
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
      pk: string | null,
      amount: string,
      tokenContractAddress: string,
      tokenContractAbi: any[] = this.#sdkUtils.genericAbi,
      gas: number | null = null,
      useNativeQueryMethod: boolean = true,
      useWeb: boolean = false
    ) => {
      try {
        // this params determine if we use the native query method, which
        // would be http/https when running on nodejs or fetch if running
        // on the browser or if we directly use the query method included
        // in the web3js library. the default is not to use the method
        // included in the web3js library.
        const queryMethod = useNativeQueryMethod ? this.queryMethod : null;

        // first approve the contract to make transfer
        const response = await this.#approveBTSCoreForTransfer(
          useWeb,
          from,
          pk,
          amount,
          tokenContractAddress,
          tokenContractAbi,
          gas,
          queryMethod
        );
        return response
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running approveTransfer(). Params:\nfrom: ${from}\npk: ${pk}\namount: ${amount}\ntokenContractAddress: ${tokenContractAddress}\ntokenContractAbi: ${tokenContractAbi}\n`
        );
        return { error: errorResult.toString() };
      }
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
      pk: string | null,
      _owner: string,
      gas: number | null = null,
      useNativeQueryMethod: boolean = true,
      useWeb: boolean = false
    ): Promise<any> => {
      try {
        // this params determine if we use the native query method, which
        // would be http/https when running on nodejs or fetch if running
        // on the browser or if we directly use the query method included
        // in the web3js library. the default is not to use the method
        // included in the web3js library.
        const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
        return await this.#signBTSCoreTx(
          useWeb,
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
      pk: string | null,
      _coinName: string,
      _value: number,
      gas: number | null = null,
      useNativeQueryMethod: boolean = true,
      useWeb: boolean = false
    ): Promise<any> => {
      try {
        // this params determine if we use the native query method, which
        // would be http/https when running on nodejs or fetch if running
        // on the browser or if we directly use the query method included
        // in the web3js library. the default is not to use the method
        // included in the web3js library.
        const queryMethod = useNativeQueryMethod ? this.queryMethod : null;

        const valueInWei = this.#bscWeb3.utils.toWei(_value, "ether");

        return await this.#signBTSCoreTx(
          useWeb,
          from,
          pk,
          "reclaim",
          null,
          gas,
          queryMethod,
          _coinName,
         valueInWei 
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
      pk: string | null,
      _name: string,
      _symbol: string,
      _decimals: string,
      _feeNumerator: string,
      _fixedFee: string,
      _addr: string,
      gas: number | null = null,
      useNativeQueryMethod: boolean = true,
      useWeb: boolean = false
    ): Promise<any> => {
      try {
        // this params determine if we use the native query method, which
        // would be http/https when running on nodejs or fetch if running
        // on the browser or if we directly use the query method included
        // in the web3js library. the default is not to use the method
        // included in the web3js library.
        const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
        return await this.#signBTSCoreTx(
          useWeb,
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
      pk: string | null,
      _owner: string,
      gas: number | null = null,
      useNativeQueryMethod: boolean = true,
      useWeb: boolean = false
    ): Promise<any> => {
      try {
        // this params determine if we use the native query method, which
        // would be http/https when running on nodejs or fetch if running
        // on the browser or if we directly use the query method included
        // in the web3js library. the default is not to use the method
        // included in the web3js library.
        const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
        return await this.#signBTSCoreTx(
          useWeb,
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
      pk: string | null,
      _name: string,
      _feeNumerator: number,
      _fixedFee: number,
      gas: number | null = null,
      useNativeQueryMethod: boolean = true,
      useWeb: boolean = false
    ): Promise<any> => {
      // this params determine if we use the native query method, which
      // would be http/https when running on nodejs or fetch if running
      // on the browser or if we directly use the query method included
      // in the web3js library. the default is not to use the method
      // included in the web3js library.
      const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
      try {
        return await this.#signBTSCoreTx(
          useWeb,
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
      pk: string | null,
      _btsPeriphery: string,
      gas: number | null = null,
      useNativeQueryMethod: boolean = true,
      useWeb: boolean = false
    ): Promise<any> => {
      try {
        // this params determine if we use the native query method, which
        // would be http/https when running on nodejs or fetch if running
        // on the browser or if we directly use the query method included
        // in the web3js library. the default is not to use the method
        // included in the web3js library.
        const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
        return await this.#signBTSCoreTx(
          useWeb,
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

  #web = {
    /**
     * Allow users to deposit an amount of token into the
     * BTSCore contract.
     * @param targetAddress - address of receiver.
     * @param targetChain - receiver chain.
     * @param from - address of sender.
     * @param _value - amount to transfer.
     * @param _coinName - name of coin to transfer.
     * @param gas - transfer fee amount.
     */
    transfer: async (
      targetAddress: string,
      targetChain: string = "icon",
      from: string,
      _value: string,
      _coinName: string,
      gas: number | null = 2000000
    ): Promise<any> => {
      //
      return await this.#localMethods.transfer(
        targetAddress,
        targetChain,
        from,
        null,
        _value,
        _coinName,
        gas,
        true,
        true
      )
    },

    /**
     * Allow users to transfer multiple coins/wrapped coins to another chain.
     * @param targetAddress - address of receiver.
     * @param targetChain - receiver chain.
     * @param from - address of sender.
     * @param _coinNames - name of coin to transfer.
     * @param _values - amount to transfer.
     * @param gas - transfer fee amount.
     */
    transferBatch: async (
      targetAddress: string,
      targetChain: string = "icon",
      from: string,
      _values: string[],
      _coinNames: string[],
      gas: number | null = 2000000
    ): Promise<any> => {
      //
      return await this.#localMethods.transferBatch(
        targetAddress,
        targetChain,
        from,
        null,
        _values,
        _coinNames,
        gas,
        true,
        true
      )
    },

    /**
     * Allows user to deposit native coin into a BTSCore contract.
     * @param targetAddress - address that receives transfer.
     * @param targetChain - chain that receives transfer.
     * @param from - public address of origin.
     * @param amount - amount of native coin to send.
     * @param gas - transfer fee amount.
     */
    transferNativeCoin: async (
      targetAddress: string,
      targetChain: string = "icon",
      from: string,
      amount: string,
      gas: number | null = 2000000
    ): Promise<any> => {
      //
      return await this.#localMethods.transferNativeCoin(
        targetAddress,
        targetChain,
        from,
        null,
        amount,
        gas,
        true,
        true
      )
    },

    /**
     * Approves an amount of token to be sent by the BTSCore contract on
     * behalf of the originator wallet.
     * @param from - address of sender.
     * @param amount - amount to approve.
     * @param tokenContractAddress - Contract address of the token to approve.
     * @param tokenContractAbi - Contract abi of the token to approve.
     * @param gas - transfer fee amount.
     */
    approveTransfer: async (
      from: string,
      amount: string,
      tokenContractAddress: string,
      tokenContractAbi: any[] = this.#sdkUtils.genericAbi,
      gas: number | null = null
    ) => {
      //
      return await this.#localMethods.approveTransfer(
        from,
        null,
        amount,
        tokenContractAddress,
        tokenContractAbi,
        gas,
        true,
        true
      )
    },

    ///////////////////////////////////////////////////////////////////
    //
    // The following methods can only be called by contract owners
    /**
     * Add another Owner. Caller must be an Owner of BTP network.
     * @param from - address of sender.
     * @param _owner - Address of new owner
     * @param gas - transfer fee amount.
     * @return
     */
    //addOwner: async (
    //  from: string,
    //  _owner: string,
    //  gas: number | null = null
    //): Promise<any> => {
    //  //
    //  return await this.#localMethods.addOwner(
    //    from,
    //    null,
    //    _owner,
    //    gas,
    //    true,
    //    true
    //  )
    //},

    /**
     * Reclaim the token's refundable balance by an owner. Caller must be
     * owner of coin.
     * @param from - address of sender.
     * @param _coinName - coin name.
     * @param _value - amount of re-claiming tokens.
     * @param gas - transfer fee amount.
     */
    reclaim: async (
      from: string,
      _coinName: string,
      _value: number,
      gas: number | null = null
    ): Promise<any> => {
      //
      return await this.#localMethods.reclaim(
        from,
        null,
        _coinName,
        _value,
        gas,
        true,
        true
      )
    },

    /**
     * Registers a wrapped coin and id number of a supporting coin. Caller
     * must be an owner of this contract.
     * @param from - address of sender.
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
      _name: string,
      _symbol: string,
      _decimals: string,
      _feeNumerator: string,
      _fixedFee: string,
      _addr: string,
      gas: number | null = null
    ): Promise<any> => {
      //
      return await this.#localMethods.register(
        from,
        null,
        _name,
        _symbol,
        _decimals,
        _feeNumerator,
        _fixedFee,
        _addr,
        gas,
        true,
        true
      )
    },

    /**
     * Removing an existing owner. Caller must be an owner of BTP network.
     * @param from - address of sender.
     * @param _owner - address of owner to be removed.
     * @param gas - transfer fee amount.
     */
    //removeOwner: async (
    //  from: string,
    //  _owner: string,
    //  gas: number | null = null
    //): Promise<any> => {
    //  //
    //  return await this.#localMethods.removeOwner(
    //    from,
    //    null,
    //    _owner,
    //    gas,
    //    true,
    //    true
    //  )
    //},

    /**
     * Set fee ratio. Caller must be an owner of this contract.
     * @param from - address of sender.
     * @param _name -
     * @param _feeNumerator -
     * @param _fixedFee -
     * @param gas - transfer fee amount.
     */
    setFeeRatio: async (
      from: string,
      _name: string,
      _feeNumerator: number,
      _fixedFee: number,
      gas: number | null = null
    ): Promise<any> => {
      //
      return await this.#localMethods.setFeeRatio(
        from,
        null,
        _name,
        _feeNumerator,
        _fixedFee,
        gas,
        true,
        true
      )
    },

    /**
     * Updates BTS periphery address. Caller must be owner of contract.
     * @param from - address of sender.
     * @param _btsPeriphery - btsPeriphery contract address.
     * @param gas - transfer fee amount.
     */
    updateBTSPeriphery: async (
      from: string,
      _btsPeriphery: string,
      gas: number | null = null
    ): Promise<any> => {
      //
      return await this.#localMethods.updateBTSPeriphery(
        from,
        null,
        _btsPeriphery,
        gas,
        true,
        true
      )
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
    useWeb: boolean = false,
    from: string,
    pk: string | null,
    amount: string,
    tokenContractAddress: string,
    tokenContractAbi: any[],
    gas: number | null = null,
    queryMethod: null = null
  ) => {
    //
    const isMainnet: boolean | null =
      this.#params.useMainnet == null ? true : this.#params.useMainnet;

    const btsCoreAddress = this.#callbackLib.getBTSCoreProxyContractAddress(
      "bsc",
      isMainnet
    );

    return await this.#callbackLib.approveTransfer(
      useWeb,
      from,
      pk,
      btsCoreAddress,
      amount,
      tokenContractAddress,
      tokenContractAbi,
      this.#bscWeb3,
      gas,
      queryMethod
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
    useWeb: boolean = false,
    from: string,
    pk: string | null,
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
        useWeb,
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
        useWeb,
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
    const preTxRequest = await this.#approveBTSCoreForTransfer(
      false,
      from,
      pk,
      _value,
      tokenContractAddress,
      tokenContractAbi,
      gas,
      queryMethod
    );

    // if the preTxRequest was successfull the reply object will
    // have a 'result' param. In that case we wait for 5 seconds
    // to allow the chain to generate a new block to ensure that
    // the following cross chain transaction will be successfull
    if (preTxRequest.result != null) {
      await this.#sdkUtils.sleep(10000)
    } else {
      throw new Error(
        `pre approve tx returned error. Result: ${preTxRequest}`
      )
    }

    const btpAddress = this.#sdkUtils.getBTPAddress(
      targetAddress,
      targetChain,
      isMainnet
    );

    const valueInWei = this.#bscWeb3.utils.toWei(_value, "ether");

    // token transaction after approval
    const txRequest = await this.#signBTSCoreTx(
      false,
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

    return txRequest;
  };
}

export = IconBridgeSDKNodeBSC;
