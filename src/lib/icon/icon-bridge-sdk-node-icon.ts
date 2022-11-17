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
     *
     * @param _coinName -
     * @param _value -
     * @param from - public address of origin.
     * @param pk - private key of origin.
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
          `Error running reclaim(). Params:\nnull: ${null}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     *
     * @param _coinName -
     * @param _value -
     * @param _to -
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
          `Error running transfer(). Params:\nnull: ${null}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     *
     * @param _coinNames -
     * @param _values -
     * @param _to -
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
          `Error running transferBatch(). Params:\nnull: ${null}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    //
    // The following methods can only be called by the contract owner
    //

    /*
     *
     * @param _addr -
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
        const foo = [_addr, from, pk, stepLimit];
        console.log(foo);
        return null;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running addOwner(). Params:\nnull: ${null}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     *
     * @param _addr -
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
        const foo = [_addr, from, pk, stepLimit];
        console.log(foo);
        return null;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running removeOwner(). Params:\nnull: ${null}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     *
     * @param _name -
     * @param _symbol -
     * @param _decimals -
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
        const foo = [
          _name,
          _symbol,
          _decimals,
          _feeNumerator,
          _fixedFee,
          _addr,
          from,
          pk,
          stepLimit
        ];
        console.log(foo);
        return null;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running register(). Params:\nnull: ${null}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     *
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
        const foo = [_name, _feeNumerator, _fixedFee, from, pk, stepLimit];
        console.log(foo);
        return null;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running setFeeRatio(). Params:\nnull: ${null}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * @param _net -
     * @param _addresses -
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
        const foo = [_net, _addresses, from, pk, stepLimit];
        console.log(foo);
        return null;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running removeBlacklistAdress(). Params:\nnull: ${null}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * @param _coinNames -
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
        const foo = [_coinNames, _tokenLimits, from, pk, stepLimit];
        console.log(foo);
        return null;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running setTokenLimit(). Params:\nnull: ${null}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * @param _net -
     * @param _addresses -
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
        const foo = [_net, _addresses, from, pk, stepLimit];
        console.log(foo);
        return null;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running addBlacklistAddress(). Params:\nnull: ${null}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     *
     */
    addRestriction: async (): Promise<any> => {
      //
      try {
        return null;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running addRestrictions(). Params:\nnull: ${null}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     *
     */
    disableRestrictions: async (): Promise<any> => {
      //
      try {
        return null;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running disableRestrictions(). Params:\nnull: ${null}\n`
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
