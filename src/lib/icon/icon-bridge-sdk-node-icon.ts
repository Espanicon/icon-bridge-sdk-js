// icon-bridge-sdk-icon.ts
//
const Exception = require("../../utils/exception");
const baseICONSDK = require("./icon-bridge-sdk-icon");

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

  /**
   * Constructor
   */
  constructor(params: InputParams, sdkUtils: any) {
    super(params, sdkUtils);
    this.params = params;
    this.sdkUtils = sdkUtils;
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
    transferNativeCoin: async (_to: string, amount: number): Promise<any> => {
      //
      try {
        const foo = [_to, amount];
        console.log(foo);
        return null;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running transferNativeCoin(). Params:\n_to: ${_to}\namount: ${amount}\n`
        );
        return { error: errorResult.toString() };
      }
    }
  };
}

export = IconBridgeSDKNodeIcon;
