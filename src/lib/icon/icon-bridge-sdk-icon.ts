// icon-bridge-sdk-icon.ts
//
const Exception = require("../../utils/exception");
// const EspaniconSDK = require("@espanicon/espanicon-sdk");

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
  #params: any;
  #sdkUtils: any;
  #iconWeb3: any;
  queryMethod: any;
  espaniconLib: any;

  /**
   * Constructor
   */
  constructor(params: InputParams, sdkUtils: any, CustomSDK: any) {
    this.#params = params;
    this.#sdkUtils = sdkUtils;
    this.#iconWeb3 = new CustomSDK(
      this.#params.iconProvider.hostname,
      this.#params.iconProvider.nid
    );
    this.queryMethod = this.#iconWeb3.queryMethod;
    this.espaniconLib = {
      makeJSONRPCRequestObj: this.#iconWeb3.makeJSONRPCRequestObj,
      queryTypeMethod: this.#iconWeb3.queryTypeMethod
    }
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
        // make readonly query
        const response = await this.makeReadonlyQuery("balanceOf", {
          _owner: _owner,
          _coinName: _coinName
        });
        return response;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running balanceOf(). Params:\n_owner: ${_owner}\n_coinName: ${_coinName}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Get contract name.
     */
    name: async (): Promise<any> => {
      try {
        // make readonly query
        const response = await this.makeReadonlyQuery("name");
        return response;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running name(). Params:\n** NO PARAMS **\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Get the fee ratio.
     * @param _name - coin name.
     */
    feeRatio: async (_name: string): Promise<any> => {
      try {
        // make readonly query
        const response = await this.makeReadonlyQuery("feeRatio", {
          _name: _name
        });
        return response;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running feeRatio(). Params:\n_name: ${_name}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Get the token limit.
     * @param _name - coin name.
     */
    getTokenLimit: async (_name: string): Promise<any> => {
      try {
        // make readonly query
        const response = await this.makeReadonlyQuery("getTokenLimit", {
          _name: _name
        });
        return response;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running getTokenLimit(). Params:\n_name: ${_name}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Get token limit transaction.
     * @param _sn -.
     */
    getTokenLimitTxn: async (_sn: string): Promise<any> => {
      try {
        // make readonly query
        const response = await this.makeReadonlyQuery("getTokenLimitTxn", {
          _sn: _sn
        });
        return response;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running getTokenLimitTxn(). Params:\n_sn: ${_sn}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Get Sn
     */
    getSn: async (): Promise<any> => {
      try {
        // make readonly query
        const response = await this.makeReadonlyQuery("getSn");
        return response;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running getSn(). Params:\n** NO PARAMS **\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Checks is address is blacklisted.
     * @param _net -.
     * @param _address - address to check.
     */
    isUserBlackListed: async (_net: string, _address: string): Promise<any> => {
      try {
        // make readonly query
        const response = await this.makeReadonlyQuery("isUserBlackListed", {
          _net: _net,
          _address: _address
        });
        return response;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running isUserBlackListed(). Params:\n_net: ${_net}\n_address: ${_address}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Get list of blacklisted users.
     * @param _net -.
     * @param _start - start index.
     * @param _end - end index.
     */
    getBlackListedUsers: async (
      _net: string,
      _start: number,
      _end: number
    ): Promise<any> => {
      try {
        // make readonly query
        const response = await this.makeReadonlyQuery("getBlackListedUsers", {
          _net: _net,
          _start: _start,
          _end: _end
        });
        return response;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running getBlackListedUsers(). Params:\n_net: ${_net}\n_start: ${_start}\n_end: ${_end}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Get registered tokens count.
     */
    getRegisteredTokensCount: async (): Promise<any> => {
      try {
        // make readonly query
        const response = await this.makeReadonlyQuery(
          "getRegisteredTokensCount"
        );
        return response;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running getRegisteredTokensCount(). Params:\n** NO PARAMS **\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Get token limit status.
     * @param _net -
     * @param _coinName - token name.
     */
    tokenLimitStatus: async (_net: string, _coinName: string): Promise<any> => {
      try {
        // make readonly query
        const response = await this.makeReadonlyQuery("tokenLimitStatus", {
          _net: _net,
          _coinName: _coinName
        });
        return response;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running tokenLimitStatus(). Params:\n_net: ${_net}\n_coinName: ${_coinName}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Get token names.
     */
    coinNames: async (): Promise<any> => {
      try {
        // make readonly query
        const response = await this.makeReadonlyQuery("coinNames");
        return response;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running coinNames(). Params:\n** NO PARAMS **\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Get coin id.
     * @param _coinName - name of token.
     */
    coinId: async (_coinName: string): Promise<any> => {
      try {
        // make readonly query
        const response = await this.makeReadonlyQuery("coinId", {
          _coinName: _coinName
        });
        return response;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running coinId(). Params:\n_coinName: ${_coinName}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Get balance of a batch of token.
     * @param _owner - address.
     * @param _coinNames - batch of coin names.
     */
    balanceOfBatch: async (
      _owner: string,
      _coinNames: string[]
    ): Promise<any> => {
      try {
        // make readonly query
        const response = await this.makeReadonlyQuery("balanceOfBatch", {
          _owner: _owner,
          _coinNames: _coinNames
        });
        return response;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running balanceOfBatch(). Params:\n_owner: ${_owner}\n_coinNames: ${_coinNames}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Get accumulated fees.
     */
    getAccumulatedFees: async (): Promise<any> => {
      try {
        // make readonly query
        const response = await this.makeReadonlyQuery("getAccumulatedFees");
        return response;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running getAccumulatedFees(). Params:\n** NO PARAMS **\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Get blacklisted users count on specified chain.
     * @param _net
     */
    blackListedUsersCount: async (_net: string): Promise<any> => {
      try {
        // make readonly query
        const response = await this.makeReadonlyQuery("blackListedUsersCount", {
          _net: _net
        });
        return response;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running blackListedUsersCount(). Params:\n_net: ${_net}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Get transaction.
     * @param _sn -
     */
    getTransaction: async (_sn: string): Promise<any> => {
      try {
        // make readonly query
        const response = await this.makeReadonlyQuery("getTransaction", {
          _sn: _sn
        });
        return response;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running getTransaction(). Params:\n_sn: ${_sn}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Get owners.
     */
    getOwners: async (): Promise<any> => {
      try {
        // make readonly query
        const response = await this.makeReadonlyQuery("getOwners");
        return response;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running getOwners(). Params:\n** NO PARAMS **\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Check if address is owner.
     * @param _addr - address to check.
     */
    isOwner: async (_addr: string): Promise<any> => {
      try {
        // make readonly query
        const response = await this.makeReadonlyQuery("isOwner", {
          _addr: _addr
        });
        return response;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running isOwner(). Params:\n_addr: ${_addr}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /**
     * Check if restriction is enabled.
     */
    isRestrictionEnabled: async (): Promise<any> => {
      try {
        // make readonly query
        const response = await this.makeReadonlyQuery("isRestrictionEnabled");
        return response;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running isRestrictionEnabled(). Params:\n** NO PARAMS **\n`
        );
        return { error: errorResult.toString() };
      }
    }
  };

  private makeReadonlyQuery = async (
    methodName: string,
    methodParams: object | null = null
  ) => {
    // get BTS Contract
    const isMainnet: boolean | null =
      this.#params.useMainnet == null ? true : this.#params.useMainnet;

    const btsContract = this.#sdkUtils.getContractOf("bts", "icon", isMainnet);

    // make RPC JSON object
    const JSONRPCObject = this.#iconWeb3.makeICXCallRequestObj(
      methodName,
      methodParams,
      null,
      btsContract
    );

    // make query
    const request = this.#sdkUtils.makeJsonRpcCall(
      this.#params.iconProvider.hostname,
      JSONRPCObject,
      this.queryMethod
    );

    return request;
  };
}

export = IconBridgeSDKIcon;
