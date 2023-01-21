// icon-bridge-sdk-icon.ts
//
const Exception = require("../../utils/exception");
import localWebLib from './webLib';
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
  methods: any;
  web: any;

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
      queryTypeMethod: this.#iconWeb3.queryTypeMethod,
      decimalToHex: this.#iconWeb3.decimalToHex,
      getIcxBalance: this.#iconWeb3.getIcxBalance
    }
    this.methods = {
      ...this.superMethods
    };
    this.web = {
      ...this.#web
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
    },
  };

  #web = {
    /*
     */
    transferNativeCoin: async (
      targetAddress: string,
      targetChain: string,
      from: string,
      amount: number,
      stepLimit: string | null
    ): Promise<any> => {
      //
      try {
        const isMainnet: boolean =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const btpAddress = this.#sdkUtils.getBTPAddress(
          targetAddress,
          targetChain,
          isMainnet
        );

        const btsContract = this.#sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await localWebLib.makeTxRequest(
          this.#sdkUtils,
          this.#iconWeb3,
          from,
          btsContract,
          "transferNativeCoin",
          { _to: btpAddress },
          amount,
          stepLimit,
          this.#params.iconProvider.nid
        );

        const txObj = this.parseTxParams(txRequest);
        return txObj;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running transferNativeCoin(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\namount: ${amount}\nstepLimit: ${stepLimit}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     */
    transferToBTSContract: async (
      _value: string,
      tokenContract: string | null = null,
      from: string,
      stepLimit: string | null = "5000000"
    ): Promise<any> => {
      //
      try {
        const txRequest = await localWebLib.transferToBTSContract(
          this.#sdkUtils,
          this.#iconWeb3,
          this.#params,
          _value,
          tokenContract,
          from,
          stepLimit
        );
        const txObj = this.parseTxParams(txRequest);
        return txObj;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running transferToBTSContract(). Params:\n_value: ${_value}\ntokenContract: ${tokenContract}\nfrom: ${from}\nstepLimit: ${stepLimit}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     */
    transfer: async (
      _coinName: string,
      _value: string,
      from: string,
      targetChain: string,
      targetAddress: string,
      stepLimit: string | null = "5000000"
    ): Promise<any> => {
      //
      try {
        const isMainnet: boolean =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const btpAddress = this.#sdkUtils.getBTPAddress(
          targetAddress,
          targetChain,
          isMainnet
        );

        const txRequest = await localWebLib.transfer(
          this.#sdkUtils,
          this.#iconWeb3,
          this.#params,
          _coinName,
          _value,
          btpAddress,
          from,
          stepLimit
        );

        const txObj = this.parseTxParams(txRequest);
        return txObj;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running transfer(). Params:\n_coinName: ${_coinName}\n_value: ${_value}\nfrom: ${from}\ntargetChain: ${targetChain}\ntargetAddress: ${targetAddress}\nstepLimit: ${stepLimit}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     */
    transferBatch: async (
      _coinNames: string[],
      _values: string[],
      targetChain: string,
      targetAddress: string,
      from: string,
      stepLimit: string | null = "5000000"
    ): Promise<any> => {
      //
      try {
        const isMainnet: boolean =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const btpAddress = this.#sdkUtils.getBTPAddress(
          targetAddress,
          targetChain,
          isMainnet
        );

        const btsContract = this.#sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const parsedValues = _values.map(value => {
          return this.#iconWeb3.decimalToHex(
            Number(value)*(10**18)
          )
        });

        const txRequest = await localWebLib.makeTxRequest(
          this.#sdkUtils,
          this.#iconWeb3,
          from,
          btsContract,
          "transferBatch",
          { _coinNames: _coinNames, _values: parsedValues, _to: btpAddress },
          0,
          stepLimit,
          this.#params.iconProvider.nid
        );

        const txObj = this.parseTxParams(txRequest);
        return txObj;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running transferBatch(). Params:\n_coinNames: ${_coinNames}\n_values: ${_values}\nfrom: ${from}\ntargetChain: ${targetChain}\ntargetAddress: ${targetAddress}\nstepLimit: ${stepLimit}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     */
    approveBTSContract: async (
      amount: string,
      tokenContract: string,
      from: string,
      stepLimit: string | null = "5000000"
    ): Promise<any> => {
      //
      try {
        const txRequest = await localWebLib.approveBTSContract(
          this.#sdkUtils,
          this.#iconWeb3,
          this.#params,
          amount,
          tokenContract,
          from,
          stepLimit
        );
        const txObj = this.parseTxParams(txRequest);
        return txObj;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running approveBTSContract(). Params:\namount: ${amount}\ntokenContract: ${tokenContract}\nfrom: ${from}\nstepLimit: ${stepLimit}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     */
    reclaim: async (
      _coinName: string,
      _value: string,
      from: string,
      stepLimit: string
    ): Promise<any> => {
      try {
        const isMainnet: boolean =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const btsContract = this.#sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await localWebLib.makeTxRequest(
          this.#sdkUtils,
          this.#iconWeb3,
          from,
          btsContract,
          "reclaim",
          { _coinName: _coinName, _value: _value },
          0,
          stepLimit,
          this.#params.iconProvider.nid
        );

        const txObj = this.parseTxParams(txRequest);
        return txObj;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running reclaim(). Params:\n_coinName: ${_coinName}\n_value: ${_value}\nfrom: ${from}\nstepLimit: ${stepLimit}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     */
    addOwner: async (
      _addr: string,
      from: string,
      stepLimit: string
    ): Promise<any> => {
      try {
        const isMainnet: boolean =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const btsContract = this.#sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await localWebLib.makeTxRequest(
          this.#sdkUtils,
          this.#iconWeb3,
          from,
          btsContract,
          "adOwner",
          { _addr: _addr },
          0,
          stepLimit,
          this.#params.iconProvider.nid
        );

        const txObj = this.parseTxParams(txRequest);
        return txObj;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running addOwner(). Params:\n_addr: ${_addr}\nfrom: ${from}\nstepLimit: ${stepLimit}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     */
    removeOwner: async (
      _addr: string,
      from: string,
      stepLimit: string
    ): Promise<any> => {
      try {
        const isMainnet: boolean =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const btsContract = this.#sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await localWebLib.makeTxRequest(
          this.#sdkUtils,
          this.#iconWeb3,
          from,
          btsContract,
          "removeOwner",
          { _addr: _addr },
          0,
          stepLimit,
          this.#params.iconProvider.nid
        );

        const txObj = this.parseTxParams(txRequest);
        return txObj;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running removeOwner(). Params:\n_addr: ${_addr}\nfrom: ${from}\nstepLimit: ${stepLimit}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     */
    register: async (
      _name: string,
      _symbol: string,
      _decimals: string,
      _feeNumerator: string,
      _fixedFee: string,
      from: string,
      _addr: string | null = null,
      stepLimit: string
    ): Promise<any> => {
      try {
        const isMainnet: boolean =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const btsContract = this.#sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const queryParams: {
          _name: string,
          _symbol: string,
          _decimals: string,
          _feeNumerator: string,
          _fixedFee: string,
          _addr?: string
        } = {
          _name: _name,
          _symbol: _symbol,
          _decimals: _decimals,
          _feeNumerator: _feeNumerator,
          _fixedFee: _fixedFee
        }

        if (_addr != null) {
          queryParams["_addr"] = _addr;
        }

        const txRequest = await localWebLib.makeTxRequest(
          this.#sdkUtils,
          this.#iconWeb3,
          from,
          btsContract,
          "register",
          { ...queryParams },
          0,
          stepLimit,
          this.#params.iconProvider.nid
        );

        const txObj = this.parseTxParams(txRequest);
        return txObj;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running register(). Params:\n_name: ${_name}\n_symbol: ${_symbol}\n_decimals: ${_decimals}\n_feeNumerator: ${_feeNumerator}\n_fixedFee: ${_fixedFee}\n_addr: ${_addr}\nfrom: ${from}\nstepLimit: ${stepLimit}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     */
    setFeeRatio: async (
      _name: string,
      _feeNumerator: string,
      _fixedFee: string,
      from: string,
      stepLimit: string
    ): Promise<any> => {
      try {
        const isMainnet: boolean =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const btsContract = this.#sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await localWebLib.makeTxRequest(
          this.#sdkUtils,
          this.#iconWeb3,
          from,
          btsContract,
          "setFeeRatio",
          { _name: _name, _feeNumerator: _feeNumerator, _fixedFee: _fixedFee },
          0,
          stepLimit,
          this.#params.iconProvider.nid
        );

        const txObj = this.parseTxParams(txRequest);
        return txObj;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running setFeeRatio(). Params:\n_name: ${_name}\n_feeNumerator: ${_feeNumerator}\n_fixedFee: ${_fixedFee}\nfrom: ${from}\nstepLimit: ${stepLimit}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     */
    removeBlacklistAddress: async (
      _net: string,
      _addresses: string[],
      from: string,
      stepLimit: string
    ): Promise<any> => {
      try {
        const isMainnet: boolean =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const btsContract = this.#sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await localWebLib.makeTxRequest(
          this.#sdkUtils,
          this.#iconWeb3,
          from,
          btsContract,
          "removeBlacklistAddress",
          { _net: _net, _addresses: _addresses },
          0,
          stepLimit,
          this.#params.iconProvider.nid
        );

        const txObj = this.parseTxParams(txRequest);
        return txObj;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running removeBlacklistAddress(). Params:\n_net: ${_net}\n_addresses: ${_addresses}\nfrom: ${from}\nstepLimit: ${stepLimit}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     */
    setTokenLimit: async (
      _coinNames: string[],
      _tokenLimits: string[],
      from: string,
      stepLimit: string
    ): Promise<any> => {
      try {
        const isMainnet: boolean =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const btsContract = this.#sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await localWebLib.makeTxRequest(
          this.#sdkUtils,
          this.#iconWeb3,
          from,
          btsContract,
          "setTokenLimit",
          { _coinNames: _coinNames, _tokenLimits: _tokenLimits },
          0,
          stepLimit,
          this.#params.iconProvider.nid
        );

        const txObj = this.parseTxParams(txRequest);
        return txObj;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running setTokenLimit(). Params:\n_coinNames: ${_coinNames}\n_tokenLimits: ${_tokenLimits}\nfrom: ${from}\nstepLimit: ${stepLimit}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     */
    addBlacklistAddress: async (
      _net: string,
      _addresses: string[],
      from: string,
      stepLimit: string
    ): Promise<any> => {
      try {
        const isMainnet: boolean =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const btsContract = this.#sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await localWebLib.makeTxRequest(
          this.#sdkUtils,
          this.#iconWeb3,
          from,
          btsContract,
          "addBlacklistAddress",
          { _net: _net, _addresses: _addresses },
          0,
          stepLimit,
          this.#params.iconProvider.nid
        );

        const txObj = this.parseTxParams(txRequest);
        return txObj;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running addBlacklistAddress(). Params:\n_net: ${_net}\n_addresses: ${_addresses}\nfrom: ${from}\nstepLimit: ${stepLimit}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     */
    addRestriction: async (
      from: string,
      stepLimit: string
    ): Promise<any> => {
      try {
        const isMainnet: boolean =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const btsContract = this.#sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await localWebLib.makeTxRequest(
          this.#sdkUtils,
          this.#iconWeb3,
          from,
          btsContract,
          "addRestriction",
          null,
          0,
          stepLimit,
          this.#params.iconProvider.nid
        );

        const txObj = this.parseTxParams(txRequest);
        return txObj;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running addRestriction(). Params:\nfrom: ${from}\nstepLimit: ${stepLimit}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     */
    disableRestrictions: async (
      from: string,
      stepLimit: string
    ): Promise<any> => {
      try {
        const isMainnet: boolean =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const btsContract = this.#sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await localWebLib.makeTxRequest(
          this.#sdkUtils,
          this.#iconWeb3,
          from,
          btsContract,
          "disableRestrictions",
          null,
          0,
          stepLimit,
          this.#params.iconProvider.nid
        );

        const txObj = this.parseTxParams(txRequest);
        return txObj;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running disableRestrictions(). Params:\nfrom: ${from}\nstepLimit: ${stepLimit}\n`
        );
        return { error: errorResult.toString() };
      }
    },
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
    const request = await this.#sdkUtils.makeJsonRpcCall(
      this.#params.iconProvider.hostname,
      JSONRPCObject,
      this.queryMethod
    );

    return request;
  };

  private parseTxParams = (
    txParams: any,
  ) => {
    const txObj = this.#iconWeb3.makeJSONRPCRequestObj("icx_sendTransaction");
    txObj["params"] = { ...txParams };
    return txObj;
  };
}

export = IconBridgeSDKIcon;
