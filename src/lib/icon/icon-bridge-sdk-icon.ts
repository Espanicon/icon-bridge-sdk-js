// icon-bridge-sdk-icon.ts
//
// const Exception = require("../../utils/exception");

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
class IconBridgeSDKIcon {
  params: any;
  iconWeb3: any;
  sdkUtils: any;
  callbackLib: any;

  /**
   * Constructor
   */
  constructor(
    params: InputParams,
    iconWeb3: any,
    sdkUtils: any,
    callbackLib: any
  ) {
    this.params = params;
    this.iconWeb3 = iconWeb3;
    this.sdkUtils = sdkUtils;
    this.callbackLib = callbackLib;
  }

  // ######################################################################
  /**
   * Internal class object with methods for interacting with ICON endpoint of
   * the ICON Bridge.
   */
  superMethods = {
    /**
     * Get the token balance of a wallet.
     * @param _owner - wallet address.
     * @param _coinName - token name.
     * @return token balance of a wallet.
     */
    // balanceOf: async (_owner: string, _coinName: string): Promise<any> => {
    //   try {
    //     const isMainnet: boolean | null =
    //       this.params.useMainnet == null ? true : this.params.useMainnet;
    //     const response = await this.callbackLib.BTSReadonlyQuery(
    //       "balanceOf",
    //       "bsc",
    //       this.bscWeb3,
    //       _owner,
    //       _coinName
    //     );
    //     const BTSLogicContractABI = this.callbackLib.getAbiOf(
    //       "BTSCore",
    //       "bsc",
    //       isMainnet,
    //       true
    //     );
    //     const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(
    //       BTSLogicContractABI[4].outputs,
    //       response
    //     );
    //     return parsedResponse;
    //   } catch (err) {
    //     const errorResult = new Exception(
    //       err,
    //       `Error running balanceOf(). Params:\n_owner: ${_owner}\n_coinName: ${_coinName}\n`
    //     );
    //     return { error: errorResult.toString() };
    //   }
    // }
  };
}

export = IconBridgeSDKIcon;
