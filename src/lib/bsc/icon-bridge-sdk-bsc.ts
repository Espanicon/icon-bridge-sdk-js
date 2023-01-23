// icon-bridge-sdk-bsc.ts
//
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
class IconBridgeSDKBSC {
  #params: any;
  #bscWeb3: any;
  #callbackLib: any;
  queryMethod: any;
  #sdkUtils: any;

  /**
   * Constructor
   */
  constructor(
    params: InputParams,
    bscWeb3: any,
    callbackLib: any,
    sdkUtils: any,
    queryMethod: any
  ) {
    this.#params = params;
    this.#bscWeb3 = bscWeb3;
    this.#callbackLib = callbackLib;
    this.queryMethod = queryMethod;
    this.#sdkUtils = sdkUtils;
  }

  // ######################################################################
  /**
   * Internal class object with methods for interacting with BSC endpoint of
   * the ICON Bridge.
   */
  superMethods = {
    /**
     * Get the token balance of a wallet.
     * @param _owner - wallet address.
     * @param _coinName - token name.
     * @return token balance of a wallet.
     */

    balanceOf: async (
      _owner: string,
      _coinName: string,
      useNativeQueryMethod: boolean = true
    ): Promise<any> => {
      try {
        const isMainnet: boolean | null =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const methodName = "balanceOf";

        // this params determine if we use the native query method, which
        // would be http/https when running on nodejs or fetch if running
        // on the browser or if we directly use the query method included
        // in the web3js library. the default is not to use the method
        // included in the web3js library.
        const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
        const response = await this.#callbackLib.BTSReadonlyQuery(
          methodName,
          "bsc",
          this.#bscWeb3,
          queryMethod,
          _owner,
          _coinName
        );

        const BTSLogicContractABI = this.#callbackLib.getAbiOf(
          "BTSCore",
          "bsc",
          isMainnet,
          true
        );

        const methodAbi = this.#sdkUtils.getAbiFromMethodLabel(
          methodName,
          BTSLogicContractABI
        );
        const parsedResponse = this.#bscWeb3.eth.abi.decodeParameters(
          methodAbi.outputs,
          response
        );

        return parsedResponse;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running balanceOf(). Params:\n_owner: ${_owner}\n_coinName: ${_coinName}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Returns a list of balance of an account. The order of request's
     * coinNames must be the same with the order of return balance.
     * @param _owner - Address.
     * @param _coinNames - array of coin names.
     * @return
     */
    balanceOfBatch: async (
      _owner: string,
      _coinNames: string[],
      useNativeQueryMethod: boolean = true
    ): Promise<any> => {
      try {
        const isMainnet: boolean | null =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const methodName = "balanceOfBatch";

        // this params determine if we use the native query method, which
        // would be http/https when running on nodejs or fetch if running
        // on the browser or if we directly use the query method included
        // in the web3js library. the default is not to use the method
        // included in the web3js library.
        const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
        const response = await this.#callbackLib.BTSReadonlyQuery(
          methodName,
          "bsc",
          this.#bscWeb3,
          queryMethod,
          _owner,
          _coinNames
        );

        const BTSLogicContractABI = this.#callbackLib.getAbiOf(
          "BTSCore",
          "bsc",
          isMainnet,
          true
        );

        const methodAbi = this.#sdkUtils.getAbiFromMethodLabel(
          methodName,
          BTSLogicContractABI
        );
        const parsedResponse = this.#bscWeb3.eth.abi.decodeParameters(
          methodAbi.outputs,
          response
        );

        return parsedResponse;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running balanceOfBatch(). Params:\n_owner: ${_owner}\n_coinNames: ${_coinNames}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Returns an id number of coin whose name is the same with given _coinName
     * @param _coinName - name of coin.
     * @return
     */
    coinId: async (
      _coinName: string,
      useNativeQueryMethod: boolean = true
    ): Promise<any> => {
      try {
        const isMainnet: boolean | null =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const methodName = "coinId";
        // this params determine if we use the native query method, which
        // would be http/https when running on nodejs or fetch if running
        // on the browser or if we directly use the query method included
        // in the web3js library. the default is not to use the method
        // included in the web3js library.
        const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
        const response = await this.#callbackLib.BTSReadonlyQuery(
          methodName,
          "bsc",
          this.#bscWeb3,
          queryMethod,
          _coinName
        );

        const BTSLogicContractABI = this.#callbackLib.getAbiOf(
          "BTSCore",
          "bsc",
          isMainnet,
          true
        );

        const methodAbi = this.#sdkUtils.getAbiFromMethodLabel(
          methodName,
          BTSLogicContractABI
        );
        const parsedResponse = this.#bscWeb3.eth.abi.decodeParameters(
          methodAbi.outputs,
          response
        );

        return parsedResponse;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running coinId(). Params:\n_coinName: ${_coinName}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Get name of tokens.
     * @return name of tokens.
     */
    coinNames: async (useNativeQueryMethod: boolean = true): Promise<any> => {
      try {
        const isMainnet: boolean | null =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const methodName = "coinNames";
        // this params determine if we use the native query method, which
        // would be http/https when running on nodejs or fetch if running
        // on the browser or if we directly use the query method included
        // in the web3js library. the default is not to use the method
        // included in the web3js library.
        const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
        const response = await this.#callbackLib.BTSReadonlyQuery(
          methodName,
          "bsc",
          this.#bscWeb3,
          queryMethod
        );

        const BTSLogicContractABI = this.#callbackLib.getAbiOf(
          "BTSCore",
          "bsc",
          isMainnet,
          true
        );

        const methodAbi = this.#sdkUtils.getAbiFromMethodLabel(
          methodName,
          BTSLogicContractABI
        );
        const parsedResponse = this.#bscWeb3.eth.abi.decodeParameters(
          methodAbi.outputs,
          response
        );

        return parsedResponse;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running coinNames(). Params:\n ** NO PARAMS**\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Get fee numerator and fixed fee.
     * @param _coinName - name of coin.
     * @return
     */
    feeRatio: async (
      _coinName: string,
      useNativeQueryMethod: boolean = true
    ): Promise<any> => {
      try {
        const isMainnet: boolean | null =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const methodName = "feeRatio";
        // this params determine if we use the native query method, which
        // would be http/https when running on nodejs or fetch if running
        // on the browser or if we directly use the query method included
        // in the web3js library. the default is not to use the method
        // included in the web3js library.
        const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
        const response = await this.#callbackLib.BTSReadonlyQuery(
          methodName,
          "bsc",
          this.#bscWeb3,
          queryMethod,
          _coinName
        );

        const BTSLogicContractABI = this.#callbackLib.getAbiOf(
          "BTSCore",
          "bsc",
          isMainnet,
          true
        );

        const methodAbi = this.#sdkUtils.getAbiFromMethodLabel(
          methodName,
          BTSLogicContractABI
        );
        const parsedResponse = this.#bscWeb3.eth.abi.decodeParameters(
          methodAbi.outputs,
          response
        );

        return parsedResponse;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running feeRatio(). Params:\n_coinName: ${_coinName}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Returns a list of accumulated fees. Only return the asset that has
     * asset's value greater than 0.
     * @return Array of assets.
     */
    getAccumulatedFees: async (
      useNativeQueryMethod: boolean = true
    ): Promise<any> => {
      try {
        const isMainnet: boolean | null =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const methodName = "getAccumulatedFees";
        // this params determine if we use the native query method, which
        // would be http/https when running on nodejs or fetch if running
        // on the browser or if we directly use the query method included
        // in the web3js library. the default is not to use the method
        // included in the web3js library.
        const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
        const response = await this.#callbackLib.BTSReadonlyQuery(
          methodName,
          "bsc",
          this.#bscWeb3,
          queryMethod
        );

        const BTSLogicContractABI = this.#callbackLib.getAbiOf(
          "BTSCore",
          "bsc",
          isMainnet,
          true
        );

        const methodAbi = this.#sdkUtils.getAbiFromMethodLabel(
          methodName,
          BTSLogicContractABI
        );
        const parsedResponse = this.#bscWeb3.eth.abi.decodeParameters(
          methodAbi.outputs,
          response
        );

        return parsedResponse;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running getAccumulatedFees(). Params:\n ** NO PARAMS **\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Returns name of native coin.
     * @return string name of native coin.
     */
    getNativeCoinName: async (
      useNativeQueryMethod: boolean = true
    ): Promise<any> => {
      try {
        const isMainnet: boolean | null =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;
        const methodName = "getNativeCoinName";

        // this params determine if we use the native query method, which
        // would be http/https when running on nodejs or fetch if running
        // on the browser or if we directly use the query method included
        // in the web3js library. the default is not to use the method
        // included in the web3js library.
        const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
        const response = await this.#callbackLib.BTSReadonlyQuery(
          methodName,
          "bsc",
          this.#bscWeb3,
          queryMethod
        );

        const BTSLogicContractABI = this.#callbackLib.getAbiOf(
          "BTSCore",
          "bsc",
          isMainnet,
          true
        );

        const methodAbi = this.#sdkUtils.getAbiFromMethodLabel(
          methodName,
          BTSLogicContractABI
        );
        const parsedResponse = this.#bscWeb3.eth.abi.decodeParameters(
          methodAbi.outputs,
          response
        );

        return parsedResponse;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running getNativeCoinName(). Params:\n ** NO PARAMS**\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Returns list of current owners.
     * @return Array of address of current owners.
     */
    // getOwners: async (useNativeQueryMethod: boolean = true): Promise<any> => {
    //   try {
    //     const isMainnet: boolean | null =
    //       this.#params.useMainnet == null ? true : this.#params.useMainnet;

    //     const methodName = "getOwners";
    //     // this params determine if we use the native query method, which
    //     // would be http/https when running on nodejs or fetch if running
    //     // on the browser or if we directly use the query method included
    //     // in the web3js library. the default is not to use the method
    //     // included in the web3js library.
    //     const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
    //     const response = await this.#callbackLib.BTSReadonlyQuery(
    //       methodName,
    //       "bsc",
    //       this.#bscWeb3,
    //       queryMethod
    //     );

    //     console.log('response');
    //     console.log(response);

    //     const BTSLogicContractABI = this.#callbackLib.getAbiOf(
    //       "BTSCore",
    //       "bsc",
    //       isMainnet,
    //       true
    //     );

    //     const methodAbi = this.#sdkUtils.getAbiFromMethodLabel(
    //       methodName,
    //       BTSLogicContractABI
    //     );
    //     const parsedResponse = this.#bscWeb3.eth.abi.decodeParameters(
    //       methodAbi.outputs,
    //       response
    //     );

    //     return parsedResponse;
    //   } catch (err) {
    //     const errorResult = new Exception(
    //       err,
    //       `Error running getOwners(). Params:\n ** NO PARAMS**\n`
    //     );
    //     return { error: errorResult.toString() };
    //   }
    // },

    /**
     * Checks is a especified address has owner role.
     * @param _owner - address to check.
     */
    // isOwner: async (
    //   _owner: string,
    //   useNativeQueryMethod: boolean = true
    // ): Promise<any> => {
    //   try {
    //     const isMainnet: boolean | null =
    //       this.#params.useMainnet == null ? true : this.#params.useMainnet;

    //     const methodName = "isOwner";
    //     // this params determine if we use the native query method, which
    //     // would be http/https when running on nodejs or fetch if running
    //     // on the browser or if we directly use the query method included
    //     // in the web3js library. the default is not to use the method
    //     // included in the web3js library.
    //     const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
    //     const response = await this.#callbackLib.BTSReadonlyQuery(
    //       methodName,
    //       "bsc",
    //       this.#bscWeb3,
    //       queryMethod,
    //       _owner
    //     );

    //     const BTSLogicContractABI = this.#callbackLib.getAbiOf(
    //       "BTSCore",
    //       "bsc",
    //       isMainnet,
    //       true
    //     );

    //     const methodAbi = this.#sdkUtils.getAbiFromMethodLabel(
    //       methodName,
    //       BTSLogicContractABI
    //     );
    //     const parsedResponse = this.#bscWeb3.eth.abi.decodeParameters(
    //       methodAbi.outputs,
    //       response
    //     );

    //     return parsedResponse;
    //   } catch (err) {
    //     const errorResult = new Exception(
    //       err,
    //       `Error running isOwner(). Params:\n_owner: ${_owner}\n`
    //     );
    //     return { error: errorResult.toString() };
    //   }
    // },

    /**
     * Checks validity of a coin name.
     * @param _coinName - coin name to check.
     */
    isValidCoin: async (
      _coinName: string,
      useNativeQueryMethod: boolean = true
    ): Promise<any> => {
      try {
        const isMainnet: boolean | null =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const methodName = "isValidCoin";
        // this params determine if we use the native query method, which
        // would be http/https when running on nodejs or fetch if running
        // on the browser or if we directly use the query method included
        // in the web3js library. the default is not to use the method
        // included in the web3js library.
        const queryMethod = useNativeQueryMethod ? this.queryMethod : null;
        const response = await this.#callbackLib.BTSReadonlyQuery(
          methodName,
          "bsc",
          this.#bscWeb3,
          queryMethod,
          _coinName
        );

        const BTSLogicContractABI = this.#callbackLib.getAbiOf(
          "BTSCore",
          "bsc",
          isMainnet,
          true
        );

        const methodAbi = this.#sdkUtils.getAbiFromMethodLabel(
          methodName,
          BTSLogicContractABI
        );
        const parsedResponse = this.#bscWeb3.eth.abi.decodeParameters(
          methodAbi.outputs,
          response
        );

        return parsedResponse;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running isValidCoin(). Params:\n_coinName: ${_coinName}\n`
        );
        return { error: errorResult.toString() };
      }
    }
  };
}

export = IconBridgeSDKBSC;
