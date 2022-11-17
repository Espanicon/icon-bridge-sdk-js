// icon-bridge-sdk-icon.ts
//
const Exception = require("../../utils/exception");
const baseICONSDK = require("./icon-bridge-sdk-icon");
const IconService = require("icon-sdk-js");

// icon web3 lib
const {
  IconBuilder,
  IconAmount,
  IconConverter,
  IconWallet,
  SignedTransaction,
  HttpProvider
} = IconService.default;

const { CallTransactionBuilder } = IconBuilder;

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
class IconBridgeSDKNodeIcon extends baseICONSDK {
  params: any;
  sdkUtils: any;
  iconHttpProvider: any;
  iconService: any;

  /**
   * Constructor
   */
  constructor(params: InputParams, sdkUtils: any) {
    super(params, sdkUtils);
    this.params = params;
    this.sdkUtils = sdkUtils;
    this.iconHttpProvider = new HttpProvider(
      "https://" + this.params.iconProvider.hostname + "/api/v3"
    );
    this.iconService = new IconService.default(this.iconHttpProvider);
    this.methods = {
      ...this.superMethods,
      ...this.localMethods
    };
  }

  // ######################################################################
  /**
   * Internal class object with methods for interacting with ICON endpoint of
   * the ICON Bridge.
   */
  private localMethods = {
    /*
     * Allows users to transfer native coin to another chain.
     * @param targetAddress - address that receives the transfer.
     * @param targetChain - chain that receives the transfer.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param amount - amount of native coin to send.
     * @param stepLimit - max gas to pay.
     */
    transferNativeCoin: async (
      targetAddress: string,
      targetChain: string,
      from: string,
      pk: string,
      amount: number,
      stepLimit: string | null = null
    ): Promise<any> => {
      //
      try {
        const isMainnet: boolean =
          this.params.useMainnet == null ? true : this.params.useMainnet;

        const btpAddress = this.sdkUtils.getBTPAddress(
          targetAddress,
          targetChain,
          isMainnet
        );

        const btsContract = this.sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await this.makeTxRequest(
          from,
          btsContract,
          pk,
          "transferNativeCoin",
          { _to: btpAddress },
          amount,
          stepLimit
        );

        return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running transferNativeCoin(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\npk: ${pk}\namount: ${amount}\nstepLimit: ${stepLimit}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Reclaim the tokens refundable balance by an owner. Caller must be
     * owner of coin.
     * @param _coinName - coin name.
     * @param _value - amount of re-claiming tokens.
     * @param from - address of sender.
     * @param pk - private key of sender.
     * @param stepLimit - max gas to pay.
     */
    reclaim: async (
      _coinName: string,
      _value: string,
      from: string,
      pk: string,
      stepLimit: string | null = null
    ): Promise<any> => {
      //
      try {
        const isMainnet: boolean =
          this.params.useMainnet == null ? true : this.params.useMainnet;

        const btsContract = this.sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await this.makeTxRequest(
          from,
          btsContract,
          pk,
          "transferNativeCoin",
          { _coinName: _coinName, _value: _value },
          0,
          stepLimit
        );

        return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running reclaim(). Params:\n_coinName: ${_coinName}\n_value: ${_value}\nfrom: ${from}\npk: ${pk}`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Allow users to transfer token between chains.
     * @param _coinName - name of coin.
     * @param _value - amount to transfers.
     * @param _to - receiver address BTP formatted.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    transfer: async (
      _coinName: string,
      _value: string,
      _to: string,
      from: string,
      pk: string,
      stepLimit: string | null = null
    ): Promise<any> => {
      //
      try {
        const foo = [_coinName, _value, _to, from, pk, stepLimit];
        console.log(foo);
        return null;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running transfer(). Params:\n_coinName: ${_coinName}\n_value: ${_value}\n_to: ${_to}\nfrom: ${from}\npk: ${pk}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Allow user to transfer a batch of tokens.
     * @param _coinNames - names of tokens to transfer.
     * @param _values - amounts to transfer.
     * @param _to - receiver address BTP formatted.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    transferBatch: async (
      _coinNames: string[],
      _values: string[],
      _to: string,
      from: string,
      pk: string,
      stepLimit: string | null = null
    ): Promise<any> => {
      //
      try {
        const foo = [_coinNames, _values, _to, from, pk, stepLimit];
        console.log(foo);
        return null;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running transferBatch(). Params:\n_coinNames: ${_coinNames}\n_values: ${_values}\n_to: ${_to}\nfrom: ${from}\npk: ${pk}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    //
    // The following methods can only be called by the contract owner
    //

    /*
     * Add another Owner. Caller must be an Owner of BTP network.
     * @param _addr - address of new owner.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    addOwner: async (
      _addr: string,
      from: string,
      pk: string,
      stepLimit: string | null = null
    ): Promise<any> => {
      try {
        const isMainnet: boolean =
          this.params.useMainnet == null ? true : this.params.useMainnet;

        const btsContract = this.sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await this.makeTxRequest(
          from,
          btsContract,
          pk,
          "addOwner",
          { _addr: _addr },
          0,
          stepLimit
        );

        return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running addOwner(). Params:\n_addr: ${_addr}\nfrom: ${from}\npk: ${pk}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Remove an existing owner. Caller must be an owner of BTP network.
     * @param _addr - address of owner to remove.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    removeOwner: async (
      _addr: string,
      from: string,
      pk: string,
      stepLimit: string | null = null
    ): Promise<any> => {
      //
      try {
        const isMainnet: boolean =
          this.params.useMainnet == null ? true : this.params.useMainnet;

        const btsContract = this.sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await this.makeTxRequest(
          from,
          btsContract,
          pk,
          "removeOwner",
          { _addr: _addr },
          0,
          stepLimit
        );

        return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running removeOwner(). Params:\n_addr: ${_addr}\nfrom: ${from}\npk: ${pk}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Registers a wrapped coin and id number of a supporting coin. Caller
     * must be an owner of this contract.
     * @param _name - must be different with the native coin name.
     * @param _symbol - symbol name of wrapped coin.
     * @param _decimals - decimal number.
     * @param _feeNumerator -
     * @param _fixedFee -
     * @param _addr -
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    register: async (
      _name: string,
      _symbol: string,
      _decimals: string,
      _feeNumerator: string,
      _fixedFee: string,
      _addr: string,
      from: string,
      pk: string,
      stepLimit: string | null = null
    ): Promise<any> => {
      //
      try {
        const isMainnet: boolean =
          this.params.useMainnet == null ? true : this.params.useMainnet;

        const btsContract = this.sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await this.makeTxRequest(
          from,
          btsContract,
          pk,
          "register",
          {
            _name: _name,
            _symbol: _symbol,
            _decimals: _decimals,
            _feeNumerator: _feeNumerator,
            _fixedFee: _fixedFee,
            _addr: _addr
          },
          0,
          stepLimit
        );

        return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running register(). Params:\n_name: ${_name}\n_symbol: ${_symbol}\n_decimals: ${_decimals}\n_feeNumerator: ${_feeNumerator}\n_fixedFee: ${_fixedFee}\n_addr: ${_addr}\nfrom: ${from}\npk: ${pk}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Set fee ratio. Caller must be owner of this contract.
     * @param _name -
     * @param _feeNumerator -
     * @param _fixedFee -
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    setFeeRatio: async (
      _name: string,
      _feeNumerator: string,
      _fixedFee: string,
      from: string,
      pk: string,
      stepLimit: string | null = null
    ): Promise<any> => {
      //
      try {
        const isMainnet: boolean =
          this.params.useMainnet == null ? true : this.params.useMainnet;

        const btsContract = this.sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await this.makeTxRequest(
          from,
          btsContract,
          pk,
          "setFeeRatio",
          { _name: _name, _feeNumerator: _feeNumerator, _fixedFee: _fixedFee },
          0,
          stepLimit
        );

        return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running setFeeRatio(). Params:\n_name: ${_name}\n_feeNumerator: ${_feeNumerator}\n_fixedFee: ${_fixedFee}\nfrom: ${from}\npk: ${pk}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Removes blacklisted addresses.
     * @param _net -
     * @param _addresses - addresses to remove from blacklist.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    removeBlacklistAddress: async (
      _net: string,
      _addresses: string[],
      from: string,
      pk: string,
      stepLimit: string | null = null
    ): Promise<any> => {
      //
      try {
        const isMainnet: boolean =
          this.params.useMainnet == null ? true : this.params.useMainnet;

        const btsContract = this.sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await this.makeTxRequest(
          from,
          btsContract,
          pk,
          "removeBlacklistAddress",
          { _net: _net, _addresses: _addresses },
          0,
          stepLimit
        );

        return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running removeBlacklistAddress(). Params:\n_net: ${_net}\n_addresses: ${_addresses}\nfrom: ${from}\npk: ${pk}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Set token limit. Caller must be owner of this contract.
     * @param _coinNames - names of coins.
     * @param _tokenLimits -
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    setTokenLimit: async (
      _coinNames: string[],
      _tokenLimits: string[],
      from: string,
      pk: string,
      stepLimit: string | null = null
    ): Promise<any> => {
      //
      try {
        const isMainnet: boolean =
          this.params.useMainnet == null ? true : this.params.useMainnet;

        const btsContract = this.sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await this.makeTxRequest(
          from,
          btsContract,
          pk,
          "setTokenLimit",
          { _coinNames: _coinNames, _tokenLimits: _tokenLimits },
          0,
          stepLimit
        );

        return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running setTokenLimit(). Params:\n_coinNames: ${_coinNames}\n_tokenLimits: ${_tokenLimits}\nfrom: ${from}\npk: ${pk}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Adds addresses to blacklist. Caller must be owner of this contract.
     * @param _net -
     * @param _addresses - list of addresses to blacklist.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    addBlacklistAddress: async (
      _net: string,
      _addresses: string[],
      from: string,
      pk: string,
      stepLimit: string | null = null
    ): Promise<any> => {
      //
      try {
        const isMainnet: boolean =
          this.params.useMainnet == null ? true : this.params.useMainnet;

        const btsContract = this.sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await this.makeTxRequest(
          from,
          btsContract,
          pk,
          "addBlacklistAddress",
          { _net: _net, _addresses: _addresses },
          0,
          stepLimit
        );

        return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running addBlacklistAddress(). Params:\n_net: ${_net}\n_addresses: ${_addresses}\nfrom: ${from}\npk: ${pk}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Add restriction. Caller must be owner of this contract.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    addRestriction: async (
      from: string,
      pk: string,
      stepLimit: string | null = null
    ): Promise<any> => {
      //
      try {
        const isMainnet: boolean =
          this.params.useMainnet == null ? true : this.params.useMainnet;

        const btsContract = this.sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await this.makeTxRequest(
          from,
          btsContract,
          pk,
          "addRestriction",
          null,
          0,
          stepLimit
        );

        return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running addRestrictions(). Params:\nfrom: ${from}\npk: ${pk}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Disable restrictions. Caller must be owner of this contract.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    disableRestrictions: async (
      from: string,
      pk: string,
      stepLimit: string | null = null
    ): Promise<any> => {
      //
      try {
        const isMainnet: boolean =
          this.params.useMainnet == null ? true : this.params.useMainnet;

        const btsContract = this.sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await this.makeTxRequest(
          from,
          btsContract,
          pk,
          "disableRestrictions",
          null,
          0,
          stepLimit
        );

        return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running disableRestrictions(). Params:\nfrom: ${from}\npk: ${pk}\n`
        );
        return { error: errorResult.toString() };
      }
    }

    //
    // The following methods cannot be called by anyone even contract owners
    //

    ///*
    // *
    // */
    //refund: async (): Promise<any> => {
    //  //
    //  try {
    //    return null;
    //  } catch (err) {
    //    const errorResult = new Exception(
    //      err,
    //      `Error running refund(). Params:\nnull: ${null}\n`
    //    );
    //    return { error: errorResult.toString() };
    //  }
    //},

    ///*
    // *
    // */
    //handleResponseService: async (): Promise<any> => {
    //  //
    //  try {
    //    return null;
    //  } catch (err) {
    //    const errorResult = new Exception(
    //      err,
    //      `Error running handleResponseService(). Params:\nnull: ${null}\n`
    //    );
    //    return { error: errorResult.toString() };
    //  }
    //},

    ///*
    // *
    // */
    //initialize: async (): Promise<any> => {
    //  //
    //  try {
    //    return null;
    //  } catch (err) {
    //    const errorResult = new Exception(
    //      err,
    //      `Error running initialize(). Params:\nnull: ${null}\n`
    //    );
    //    return { error: errorResult.toString() };
    //  }
    //},

    ///*
    // *
    // */
    //transferFees: async (): Promise<any> => {
    //  //
    //  try {
    //    return null;
    //  } catch (err) {
    //    const errorResult = new Exception(
    //      err,
    //      `Error running transferFees(). Params:\nnull: ${null}\n`
    //    );
    //    return { error: errorResult.toString() };
    //  }
    //},

    ///*
    // *
    // */
    //mint: async (): Promise<any> => {
    //  //
    //  try {
    //    return null;
    //  } catch (err) {
    //    const errorResult = new Exception(
    //      err,
    //      `Error running mint(). Params:\nnull: ${null}\n`
    //    );
    //    return { error: errorResult.toString() };
    //  }
    //},
    ///*
    // *
    // */
    //tokenFallback: async (): Promise<any> => {
    //  //
    //  try {
    //    return null;
    //  } catch (err) {
    //    const errorResult = new Exception(
    //      err,
    //      `Error running tokenFallback(). Params:\nnull: ${null}\n`
    //    );
    //    return { error: errorResult.toString() };
    //  }
    //},

    ///*
    // *
    // */
    //handleBTPMessage: async (): Promise<any> => {
    //  //
    //  try {
    //    return null;
    //  } catch (err) {
    //    const errorResult = new Exception(
    //      err,
    //      `Error running handleBTPMessage(). Params:\nnull: ${null}\n`
    //    );
    //    return { error: errorResult.toString() };
    //  }
    //},

    ///*
    // *
    // */
    //handleBTPError: async (): Promise<any> => {
    //  //
    //  try {
    //    return null;
    //  } catch (err) {
    //    const errorResult = new Exception(
    //      err,
    //      `Error running handleBTPError(). Params:\nnull: ${null}\n`
    //    );
    //    return { error: errorResult.toString() };
    //  }
    //},

    ///*
    // *
    // */
    //handleFeeGathering: async (): Promise<any> => {
    //  //
    //  try {
    //    return null;
    //  } catch (err) {
    //    const errorResult = new Exception(
    //      err,
    //      `Error running handleFeeGathering(). Params:\nnull: ${null}\n`
    //    );
    //    return { error: errorResult.toString() };
    //  }
    //}
  };

  /*
   * Make tx request on ICON chain.
   * @param method - method of the contract to sign in the tx.
   * @param params - params of the tx.
   * @param from - public address of origin.
   * @param to - address of receiver (contract).
   * @param pk - private key of origin.
   * @param value - amount of native coin to send.
   * @param stepLimit - max fee to pay in tx.
   * @param nid - nid of network.
   */
  private makeTxRequest = async (
    from: string,
    to: string,
    pk: string,
    method: string,
    params: any = null,
    value: number = 0,
    stepLimit: string | null = null,
    nid: string = this.params.iconProvider.nid
  ) => {
    try {
      const useStepLimit = stepLimit == null ? "8000000" : stepLimit;
      const txObj = new CallTransactionBuilder()
        .from(from)
        .to(to)
        .stepLimit(IconConverter.toBigNumber(useStepLimit))
        .nid(IconConverter.toBigNumber(nid))
        .nonce(IconConverter.toBigNumber(this.sdkUtils.getRandNonce()))
        .version(IconConverter.toBigNumber("3"))
        .timestamp(new Date().getTime() * 1000)
        .method(method);

      // if any params are specified
      if (params != null) {
        txObj.params(params);
      }

      // if an amount of ICX is specified to transfer
      if (value !== 0) {
        txObj.value(IconAmount.of(value, IconAmount.Unit.ICX).toLoop());
      }
      const txObj2 = txObj.build();
      const wallet = IconWallet.loadPrivateKey(pk);
      const signedTx = new SignedTransaction(txObj2, wallet);
      const txHash = await this.iconService.sendTransaction(signedTx).execute();

      return txHash;
    } catch (err) {
      console.log("error running makeTxRequest");
      console.log(err);
    }
  };
}

export = IconBridgeSDKNodeIcon;
