// icon-bridge-sdk-icon.ts
//

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
  bscWeb3: any;
  sdkUtils: any;
  callbackLib: any;

  /**
   * Constructor
   */
  constructor(
    params: InputParams,
    bscWeb3: any,
    sdkUtils: any,
    callbackLib: any
  ) {
    this.params = params;
    this.bscWeb3 = bscWeb3;
    this.sdkUtils = sdkUtils;
    this.callbackLib = callbackLib;
  }

  // ######################################################################
  /**
   * Internal class object with methods for interacting with icon endpoint of
   * the ICON Bridge.
   */
  methods = {};
}

export = IconBridgeSDKIcon;
