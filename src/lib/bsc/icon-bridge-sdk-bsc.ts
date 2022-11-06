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
   * Private methods
   */
  ///**
  // * Get the contract that holds the implementation code of a proxy
  // * contract (address) on chain.
  // * @param address - proxy contract address.
  // * @param memSlot - memory slot that holds the logic contract address.
  // * @return logic contract address.
  // */
  //#getLogicContractAddressOnChain = async (
  //  address: string,
  //  memSlot: string = this.sdkUtils.labels.memSlot
  //) => {
  //  //TODO: maybe delete? not used
  //  try {
  //    return await this.callbackLib.getLogicContractAddressOnChain(
  //      address,
  //      memSlot,
  //      this.bscWeb3
  //    );
  //  } catch (err) {
  //    throw new Error(
  //      `Error running 'getLogicContractAddressOnChain' method.\n${err}`
  //    );
  //  }
  //};

  ///**
  // * Get contract web3 object
  // * @param abi - contract ABI.
  // * @param contractAddress - Contract address.
  // * @return Contract web3 object.
  // */
  //#getContractObject = (abi: any, contractAddress: string) => {
  //  //TODO: maybe delete? not used
  //  return this.callbackLib.getContractObject(
  //    abi,
  //    contractAddress,
  //    this.bscWeb3
  //  );
  //};

  ///**
  // * Get ABI of a contract
  // * @param contractLabel - string label of the contract.
  // * @param getLogicContract - if true gets logic contract object else gets proxy contract object.
  // * @return ABI of the contract.
  // */
  //#getAbiOf = (contractLabel: string, getLogicContract: boolean = false) => {
  //  const isMainnet: boolean | null =
  //    this.params.useMainnet == null ? true : this.params.useMainnet;
  //  return this.callbackLib.getAbiOf(
  //    contractLabel,
  //    "bsc",
  //    isMainnet,
  //    getLogicContract
  //  );
  //};

  ///**
  // * Get ABI of BTS contract
  // * @return ABI of the contract.
  // */
  //#getBTSAbi = () => {
  //  //TODO: maybe delete? not used
  //  const isMainnet: boolean | null =
  //    this.params.useMainnet == null ? true : this.params.useMainnet;
  //  return this.callbackLib.getBTSAbi("bsc", isMainnet);
  //};

  ///**
  // * Get address of BTSCore implementation contract.
  // * @return Address of implementation contract.
  // */
  //#getBTSCoreLogicContractAddress = () => {
  //  //TODO: maybe delete? not used
  //  const isMainnet: boolean | null =
  //    this.params.useMainnet == null ? true : this.params.useMainnet;
  //  return this.callbackLib.getBTSCoreLogicContractAddress("bsc", isMainnet);
  //};

  ///**
  // * Get web3 object for BTSCore proxy contract.
  // * @return web3 object of contract.
  // */
  //#getBTSCoreProxyContractObject = () => {
  //  //TODO: maybe delete? not used
  //  return this.callbackLib.getBTSCoreProxyContractObject(
  //    "bsc",
  //    this.bscWeb3
  //  );
  //};

  ///**
  // * Get ABI of BTSCore logic contract.
  // * @return ABI of BTSCore implementation contract.
  // */
  //#getBTSCoreLogicContractAbi = () => {
  //  //TODO: maybe delete? not used
  //  return this.#getAbiOf("BTSCore", true);
  //  // return this.callbackLib.getAbiOf("BTSCore", "bsc", isMainnet, true);
  //};

  ///**
  // * Get object of BTSCore implementation contract.
  // * @return object of BTSCore implementation contract.
  // */
  //#getBTSCoreLogicContractObject = () => {
  //  return this.callbackLib.getBTSCoreLogicContractObject(
  //    "bsc",
  //    this.bscWeb3
  //  );
  //};

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

    balanceOf: async (_owner: string, _coinName: string): Promise<any> => {
      try {
        const isMainnet: boolean | null =
          this.params.useMainnet == null ? true : this.params.useMainnet;

        const response = await this.callbackLib.BTSReadonlyQuery(
          "balanceOf",
          "bsc",
          this.bscWeb3,
          _owner,
          _coinName
        );

        const BTSLogicContractABI = this.callbackLib.getAbiOf(
          "BTSCore",
          "bsc",
          isMainnet,
          true
        );

        const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(
          BTSLogicContractABI[4].outputs,
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
      _coinNames: string[]
    ): Promise<any> => {
      try {
        const isMainnet: boolean | null =
          this.params.useMainnet == null ? true : this.params.useMainnet;

        const response = await this.callbackLib.BTSReadonlyQuery(
          "balanceOfBatch",
          "bsc",
          this.bscWeb3,
          _owner,
          _coinNames
        );

        const BTSLogicContractABI = this.callbackLib.getAbiOf(
          "BTSCore",
          "bsc",
          isMainnet,
          true
        );

        const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(
          BTSLogicContractABI[5].outputs,
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
    coinId: async (_coinName: string): Promise<any> => {
      try {
        const isMainnet: boolean | null =
          this.params.useMainnet == null ? true : this.params.useMainnet;

        const response = await this.callbackLib.BTSReadonlyQuery(
          "coinId",
          "bsc",
          this.bscWeb3,
          _coinName
        );

        const BTSLogicContractABI = this.callbackLib.getAbiOf(
          "BTSCore",
          "bsc",
          isMainnet,
          true
        );

        const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(
          BTSLogicContractABI[6].outputs,
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
    coinNames: async (): Promise<any> => {
      try {
        const isMainnet: boolean | null =
          this.params.useMainnet == null ? true : this.params.useMainnet;

        const response = await this.callbackLib.BTSReadonlyQuery(
          "coinNames",
          "bsc",
          this.bscWeb3
        );

        const BTSLogicContractABI = this.callbackLib.getAbiOf(
          "BTSCore",
          "bsc",
          isMainnet,
          true
        );

        const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(
          BTSLogicContractABI[7].outputs,
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
    feeRatio: async (_coinName: string): Promise<any> => {
      try {
        const isMainnet: boolean | null =
          this.params.useMainnet == null ? true : this.params.useMainnet;

        const response = await this.callbackLib.BTSReadonlyQuery(
          "feeRatio",
          "bsc",
          this.bscWeb3,
          _coinName
        );

        const BTSLogicContractABI = this.callbackLib.getAbiOf(
          "BTSCore",
          "bsc",
          isMainnet,
          true
        );

        const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(
          BTSLogicContractABI[8].outputs,
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
    getAccumulatedFees: async (): Promise<any> => {
      try {
        const isMainnet: boolean | null =
          this.params.useMainnet == null ? true : this.params.useMainnet;

        const response = await this.callbackLib.BTSReadonlyQuery(
          "getAccumulatedFees",
          "bsc",
          this.bscWeb3
        );

        const BTSLogicContractABI = this.callbackLib.getAbiOf(
          "BTSCore",
          "bsc",
          isMainnet,
          true
        );

        const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(
          BTSLogicContractABI[9].outputs,
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
    getNativeCoinName: async (): Promise<any> => {
      try {
        const isMainnet: boolean | null =
          this.params.useMainnet == null ? true : this.params.useMainnet;

        const response = await this.callbackLib.BTSReadonlyQuery(
          "getNativeCoinName",
          "bsc",
          this.bscWeb3
        );

        const BTSLogicContractABI = this.callbackLib.getAbiOf(
          "BTSCore",
          "bsc",
          isMainnet,
          true
        );

        const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(
          BTSLogicContractABI[10].outputs,
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
    getOwners: async (): Promise<any> => {
      try {
        const isMainnet: boolean | null =
          this.params.useMainnet == null ? true : this.params.useMainnet;

        const response = await this.callbackLib.BTSReadonlyQuery(
          "getOwners",
          "bsc",
          this.bscWeb3
        );

        const BTSLogicContractABI = this.callbackLib.getAbiOf(
          "BTSCore",
          "bsc",
          isMainnet,
          true
        );

        const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(
          BTSLogicContractABI[11].outputs,
          response
        );

        return parsedResponse;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running getOwners(). Params:\n ** NO PARAMS**\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Checks is a especified address has owner role.
     * @param _owner - address to check.
     */
    isOwner: async (_owner: string): Promise<any> => {
      try {
        const isMainnet: boolean | null =
          this.params.useMainnet == null ? true : this.params.useMainnet;

        const response = await this.callbackLib.BTSReadonlyQuery(
          "isOwner",
          "bsc",
          this.bscWeb3,
          _owner
        );

        const BTSLogicContractABI = this.callbackLib.getAbiOf(
          "BTSCore",
          "bsc",
          isMainnet,
          true
        );

        const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(
          BTSLogicContractABI[14].outputs,
          response
        );

        return parsedResponse;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running isOwner(). Params:\n_owner: ${_owner}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Checks validity of a coin name.
     * @param _coinName - coin name to check.
     */
    isValidCoin: async (_coinName: string): Promise<any> => {
      try {
        const isMainnet: boolean | null =
          this.params.useMainnet == null ? true : this.params.useMainnet;

        const response = await this.callbackLib.BTSReadonlyQuery(
          "isValidCoin",
          "bsc",
          this.bscWeb3,
          _coinName
        );

        const BTSLogicContractABI = this.callbackLib.getAbiOf(
          "BTSCore",
          "bsc",
          isMainnet,
          true
        );

        const parsedResponse = this.bscWeb3.eth.abi.decodeParameters(
          BTSLogicContractABI[15].outputs,
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
