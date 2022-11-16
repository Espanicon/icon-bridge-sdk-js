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
          "transferNativeCoin",
          { _to: btpAddress },
          from,
          btsContract,
          pk,
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
    }
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
    method: string,
    params: any,
    from: string,
    to: string,
    pk: string,
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
        .method(method)
        .params(params);

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
