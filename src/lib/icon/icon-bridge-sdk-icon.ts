// icon-bridge-sdk-icon.ts
//
const Exception = require("../../utils/exception");
const EspaniconSDK = require("@espanicon/espanicon-sdk");

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
  sdkUtils: any;
  iconWeb3: any;

  /**
   * Constructor
   */
  constructor(params: InputParams, sdkUtils: any) {
    this.params = params;
    this.sdkUtils = sdkUtils;
    this.iconWeb3 = new EspaniconSDK(
      this.params.iconProvider.hostname,
      this.params.iconProvider.nid
    );
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
    balanceOf: async (_owner: string, _coinName: string): Promise<any> => {
      try {
        // get BTS Contract
        const isMainnet: boolean | null =
          this.params.useMainnet == null ? true : this.params.useMainnet;

        const btsContract = this.sdkUtils.getContractOf(
          "bts",
          "icon",
          isMainnet
        );

        // make RPC JSON object
        const JSONRPCObject = this.iconWeb3.makeICXCallRequestObj(
          "balanceOf",
          { _owner: _owner, _coinName: _coinName },
          null,
          btsContract
        );

        // make query
        const request = await this.iconWeb3.queryMethod(
          this.iconWeb3.scores.apiRoutes.v3,
          JSONRPCObject,
          this.iconWeb3.apiNode
        );

        return request;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running balanceOf(). Params:\n_owner: ${_owner}\n_coinName: ${_coinName}\n`
        );
        return { error: errorResult.toString() };
      }
    }
  };
}

export = IconBridgeSDKIcon;
