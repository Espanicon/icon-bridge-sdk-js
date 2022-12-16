// icon-bridge-sdk-icon.ts
//
const Exception = require("../../utils/exception");
const baseICONSDK = require("./icon-bridge-sdk-icon");
const localLib = require('./lib');

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
  #params: any;
  #sdkUtils: any;

  /**
   * Constructor
   */
  constructor(params: InputParams, sdkUtils: any, CustomSDK: any) {
    super(params, sdkUtils, CustomSDK);
    this.#params = params;
    this.#sdkUtils = sdkUtils;
    this.methods = {
      ...this.superMethods,
      ...this.#localMethods
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
  #localMethods = {
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
      pk: string | null,
      amount: number,
      stepLimit: string | null = null,
      useWeb: boolean = false
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

        const txRequest = await this.#makeTxRequest(
          useWeb,
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
     * Allow users to transfer native ICON tokens cross chain. 
     * this method first makes a 'transfer' query to the token contract to
     * transfer the tokens to the BTS contract and then calls the 'transfer'
     * method on the BTS contract to make the cross chain transfer.
     * @param tokenName - name of native ICON token to transfer.
     * @param value - amount to transfers.
     * @param targetAddress - receiver address.
     * @param targetChain - receiving chain.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    transferNativeToken: async (
      tokenName: string,
      amount: string,
      targetAddress: string,
      targetChain: string,
      tokenContract: string,
      from: string,
      pk: string,
      stepLimit: string | null = "10000000",
      useWeb: boolean = false
    ): Promise<any> => {
      //
      try {

        // verify if the submitted targetChain is valid and supported by
        // the sdk currently
        const chainLabels = Object.keys(this.#sdkUtils.chains);
        if (!chainLabels.includes(targetChain) || targetChain === "icon") {
          throw new Error(`Invalid target chain. targetChain: ${targetChain}`)
        }

        const isMainnet: boolean =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const btpAddress = this.#sdkUtils.getBTPAddress(
          targetAddress,
          targetChain,
          isMainnet
        );

        // transfer token to the BTS contract to be able to then
        // make the cross chain transaction
        const preTxRequest = await this.#transferToBTSContract(
          amount,
          tokenContract,
          from,
          pk,
          stepLimit
        )

        // if the preTxRequest was successfull the reply object will
        // have a 'result' param. In that case we wait for 3 seconds
        // to allow the chain to generate a new block to ensure that 
        // the following cross chain transaction will be successfull
        if (preTxRequest.result != null) {
          await this.#sdkUtils.sleep(3000)
        } else {
          throw new Error(
            `pre approve tx returned error. result: ${preTxRequest}`
          )
        }

        // make cross chain transaction
        const txRequest = await this.#transfer(
          useWeb,
          tokenName,
          amount,
          btpAddress,
          from,
          pk,
          stepLimit
        );

        return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running transferNativeToken(). Params:\ntokenName: ${tokenName}\namount: ${amount}\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\ntokenContract: ${tokenContract}\nfrom: ${from}\npk: ${pk}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Allow users to transfer wrapped ICON tokens cross chain. 
     * this method first makes an 'approve' query to the token contract to
     * allow the BTS contract to make cross chain transfer on behalf of
     * the originator wallet.
     * @param tokenName - name of native ICON token to transfer.
     * @param value - amount to transfers.
     * @param targetAddress - receiver address.
     * @param targetChain - receiving chain.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    transferWrappedToken: async (
      tokenName: string,
      amount: string,
      targetAddress: string,
      targetChain: string,
      tokenContract: string,
      from: string,
      pk: string,
      stepLimit: string | null = "10000000",
      useWeb: boolean = false
    ): Promise<any> => {
      //
      try {

        // verify if the submitted targetChain is valid and supported by
        // the sdk currently
        const chainLabels = Object.keys(this.#sdkUtils.chains);
        if (!chainLabels.includes(targetChain) || targetChain === "icon") {
          throw new Error(`Invalid target chain. targetChain: ${targetChain}`)
        }

        const isMainnet: boolean =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const btpAddress = this.#sdkUtils.getBTPAddress(
          targetAddress,
          targetChain,
          isMainnet
        );

        // approve the BTS contract to transfer wrapped tokens on
        // behalf of the originator wallet to be able to then
        // make the cross chain transaction
        const preTxRequest = await this.#approveBTSContract(
          amount,
          tokenContract,
          from,
          pk,
          stepLimit
        )

        // if the preTxRequest was successfull the reply object will
        // have a 'result' param. In that case we wait for 3 seconds
        // to allow the chain to generate a new block to ensure that 
        // the following cross chain transaction will be successfull
        if (preTxRequest.result != null) {
          await this.#sdkUtils.sleep(3000)
        } else {
          throw new Error(
            `pre approve tx returned error. result: ${preTxRequest}`
          )
        }

        // make cross chain transaction
        const txRequest = await this.#transfer(
          useWeb,
          tokenName,
          amount,
          btpAddress,
          from,
          pk,
          stepLimit
        );

        return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running transferWrappedToken(). Params:\ntokenName: ${tokenName}\namount: ${amount}\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\ntokenContract: ${tokenContract}\nfrom: ${from}\npk: ${pk}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Allow users to transfer token to the BTS contract. This step is
     * necessary to do before using the transfer method of the BTS contract.
     * @param _value - amount to transfers.
     * @param tokenContract - token contract.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    transferToBTSContract: async (
      _value: string,
      tokenContract: string | null = null,
      from: string,
      pk: string | null,
      stepLimit: string | null = "5000000",
      useWeb: boolean = false
    ): Promise<any> => {
      //
      try {
        // transfer token to the BTS address to be able to then
        // make the cross chain transaction
        const txRequest = await this.#transferToBTSContract(
          _value,
          tokenContract,
          from,
          pk,
          stepLimit,
          useWeb
        )

        return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running transferToBTSContract(). Params:\n_value: ${_value}\ntokenContract: ${tokenContract}\n\nfrom: ${from}\npk: ${pk}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Allow users to transfer token between chains.
     * @param _coinName - name of coin.
     * @param _value - amount to transfers.
     * @param _to - receiver address BTP formatted.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    transfer: async (
      _coinName: string,
      _value: string,
      _to: string,
      from: string,
      pk: string | null,
      stepLimit: string | null = "10000000",
      useWeb: boolean = false
    ): Promise<any> => {
      //
      try {

        // make cross chain transaction
        const txRequest = await this.#transfer(
          useWeb,
          _coinName,
          _value,
          _to,
          from,
          pk,
          stepLimit
        );

        return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running transfer(). Params:\n_coinName: ${_coinName}\n_value: ${_value}\n_to: ${_to}\nfrom: ${from}\npk: ${pk}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Allow user to transfer a batch of tokens.
     * @param _coinNames - names of tokens to transfer.
     * @param _values - amounts to transfer.
     * @param _to - receiver address BTP formatted.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    transferBatch: async (
      _coinNames: string[],
      _values: string[],
      _to: string,
      from: string,
      pk: string | null,
      stepLimit: string | null = null,
      useWeb: boolean = false
    ): Promise<any> => {
      //
      try {

      const isMainnet: boolean =
        this.#params.useMainnet == null ? true : this.#params.useMainnet;

      const btsContract = this.#sdkUtils.getContractOfLabelFromLocalData(
        "bts",
        "icon",
        isMainnet,
        false
      );

      // parse values into loop units and then into hexadecimal
      const parsedValues = _values.map(_value => {
        return this.espaniconLib.decimalToHex(
        Number(_value)*(10**18)
      )
      })

      // make cross chain transaction
      const txRequest = await this.#makeTxRequest(
        useWeb,
        from,
        btsContract,
        pk,
        "transferBatch",
        { _coinNames: _coinNames, _values: parsedValues, _to: _to},
        0,
        stepLimit
      );

      return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running transferBatch(). Params:\n_coinNames: ${_coinNames}\n_values: ${_values}\n_to: ${_to}\nfrom: ${from}\npk: ${pk}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Approves the BTS contract address to send tokens on behalf
     * of the originator wallet. This 'approve' method is used by the
     * contracts of wrapped tokens to allow the BTS contract to move
     * an amount of token cross chain.
     * @param amount - amount being approved to spent.
     * @param tokenContract - contract address for the wrapped token.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    approveBTSContract: async (
      amount: string,
      tokenContract: string,
      from: string,
      pk: string | null,
      stepLimit: string | null = "5000000",
      useWeb: boolean = false
    ): Promise<any> => {
      //
      try {
      const txRequest = await this.#approveBTSContract(
        amount,
        tokenContract,
        from,
        pk,
        stepLimit,
        useWeb
      );

        return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running approveBTSContract(). Params:\namount: ${amount}\ntokenContract: ${tokenContract}\nfrom: ${from}\npk: ${pk}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Reclaim the tokens refundable balance by an owner. Caller must be
     * owner of coin.
     * @param _coinName - coin name.
     * @param _value - amount of re-claiming tokens.
     * @param from - address of sender.
     * @param pk - private key of sender.
     * @param stepLimit - max gas to pay.
     */
    reclaim: async (
      _coinName: string,
      _value: string,
      from: string,
      pk: string | null,
      stepLimit: string | null = null,
      useWeb: boolean = false
    ): Promise<any> => {
      //
      try {
        const isMainnet: boolean =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const btsContract = this.#sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

      // parse value into loop units and then into hexadecimal
      const parsedValue = this.espaniconLib.decimalToHex(
        Number(_value)*(10**18)
      )
        const txRequest = await this.#makeTxRequest(
          useWeb,
          from,
          btsContract,
          pk,
          "reclaim",
          { _coinName: _coinName, _value: parsedValue },
          0,
          stepLimit
        );

        return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running reclaim(). Params:\n_coinName: ${_coinName}\n_value: ${_value}\nfrom: ${from}\npk: ${pk}`
        );
        return { error: errorResult.toString() };
      }
    },

    //
    // The following methods can only be called by the contract owner
    //
    /*
     * Add another Owner. Caller must be an Owner of BTP network.
     * @param _addr - address of new owner.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    addOwner: async (
      _addr: string,
      from: string,
      pk: string | null,
      stepLimit: string | null = null,
      useWeb: boolean = false
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

        const txRequest = await this.#makeTxRequest(
          useWeb,
          from,
          btsContract,
          pk,
          "addOwner",
          { _addr: _addr },
          0,
          stepLimit
        );

        return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running addOwner(). Params:\n_addr: ${_addr}\nfrom: ${from}\npk: ${pk}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Remove an existing owner. Caller must be an owner of BTP network.
     * @param _addr - address of owner to remove.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    removeOwner: async (
      _addr: string,
      from: string,
      pk: string | null,
      stepLimit: string | null = null,
      useWeb: boolean = false
    ): Promise<any> => {
      //
      try {
        const isMainnet: boolean =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const btsContract = this.#sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await this.#makeTxRequest(
          useWeb,
          from,
          btsContract,
          pk,
          "removeOwner",
          { _addr: _addr },
          0,
          stepLimit
        );

        return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running removeOwner(). Params:\n_addr: ${_addr}\nfrom: ${from}\npk: ${pk}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Registers a wrapped coin and id number of a supporting coin. Caller
     * must be an owner of this contract.
     * @param _name - must be different with the native coin name.
     * @param _symbol - symbol name of wrapped coin.
     * @param _decimals - decimal number.
     * @param _feeNumerator -
     * @param _fixedFee -
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param _addr -
     * @param stepLimit - max gas to pay.
     */
    register: async (
      _name: string,
      _symbol: string,
      _decimals: string,
      _feeNumerator: string,
      _fixedFee: string,
      from: string,
      pk: string | null,
      _addr: string | null = null,
      stepLimit: string | null = null,
      useWeb: boolean = false
    ): Promise<any> => {
      //
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
            _fixedFee: _fixedFee,
          };

          if (_addr != null) {
            queryParams["_addr"] = _addr;
          }

        const txRequest = await this.#makeTxRequest(
          useWeb,
          from,
          btsContract,
          pk,
          "register",
          queryParams,
          0,
          stepLimit
        );

        return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running register(). Params:\n_name: ${_name}\n_symbol: ${_symbol}\n_decimals: ${_decimals}\n_feeNumerator: ${_feeNumerator}\n_fixedFee: ${_fixedFee}\n_addr: ${_addr}\nfrom: ${from}\npk: ${pk}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Set fee ratio. Caller must be owner of this contract.
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
      pk: string | null,
      stepLimit: string | null = null,
      useWeb: boolean = false
    ): Promise<any> => {
      //
      try {
        const isMainnet: boolean =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const btsContract = this.#sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await this.#makeTxRequest(
          useWeb,
          from,
          btsContract,
          pk,
          "setFeeRatio",
          { _name: _name, _feeNumerator: _feeNumerator, _fixedFee: _fixedFee },
          0,
          stepLimit
        );

        return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running setFeeRatio(). Params:\n_name: ${_name}\n_feeNumerator: ${_feeNumerator}\n_fixedFee: ${_fixedFee}\nfrom: ${from}\npk: ${pk}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Removes blacklisted addresses.
     * @param _net - network
     * @param _addresses - addresses to remove from blacklist.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    removeBlacklistAddress: async (
      _net: string,
      _addresses: string[],
      from: string,
      pk: string | null,
      stepLimit: string | null = null,
      useWeb: boolean = false
    ): Promise<any> => {
      //
      try {
        const isMainnet: boolean =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const btsContract = this.#sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await this.#makeTxRequest(
          useWeb,
          from,
          btsContract,
          pk,
          "removeBlacklistAddress",
          { _net: _net, _addresses: _addresses },
          0,
          stepLimit
        );

        return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running removeBlacklistAddress(). Params:\n_net: ${_net}\n_addresses: ${_addresses}\nfrom: ${from}\npk: ${pk}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Set token limit. Caller must be owner of this contract.
     * @param _coinNames - names of coins.
     * @param _tokenLimits -
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    setTokenLimit: async (
      _coinNames: string[],
      _tokenLimits: string[],
      from: string,
      pk: string | null,
      stepLimit: string | null = null,
      useWeb: boolean = false
    ): Promise<any> => {
      //
      try {
        const isMainnet: boolean =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const btsContract = this.#sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await this.#makeTxRequest(
          useWeb,
          from,
          btsContract,
          pk,
          "setTokenLimit",
          { _coinNames: _coinNames, _tokenLimits: _tokenLimits },
          0,
          stepLimit
        );

        return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running setTokenLimit(). Params:\n_coinNames: ${_coinNames}\n_tokenLimits: ${_tokenLimits}\nfrom: ${from}\npk: ${pk}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Adds addresses to blacklist. Caller must be owner of this contract.
     * @param _net -
     * @param _addresses - list of addresses to blacklist.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    addBlacklistAddress: async (
      _net: string,
      _addresses: string[],
      from: string,
      pk: string | null,
      stepLimit: string | null = null,
      useWeb: boolean = false
    ): Promise<any> => {
      //
      try {
        const isMainnet: boolean =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const btsContract = this.#sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await this.#makeTxRequest(
          useWeb,
          from,
          btsContract,
          pk,
          "addBlacklistAddress",
          { _net: _net, _addresses: _addresses },
          0,
          stepLimit
        );

        return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running addBlacklistAddress(). Params:\n_net: ${_net}\n_addresses: ${_addresses}\nfrom: ${from}\npk: ${pk}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Add restriction. Caller must be owner of this contract.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    addRestriction: async (
      from: string,
      pk: string | null,
      stepLimit: string | null = null,
      useWeb: boolean = false
    ): Promise<any> => {
      //
      try {
        const isMainnet: boolean =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const btsContract = this.#sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await this.#makeTxRequest(
          useWeb,
          from,
          btsContract,
          pk,
          "addRestriction",
          null,
          0,
          stepLimit
        );

        return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running addRestrictions(). Params:\nfrom: ${from}\npk: ${pk}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Disable restrictions. Caller must be owner of this contract.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    disableRestrictions: async (
      from: string,
      pk: string | null,
      stepLimit: string | null = null,
      useWeb: boolean = false
    ): Promise<any> => {
      //
      try {
        const isMainnet: boolean =
          this.#params.useMainnet == null ? true : this.#params.useMainnet;

        const btsContract = this.#sdkUtils.getContractOfLabelFromLocalData(
          "bts",
          "icon",
          isMainnet,
          false
        );

        const txRequest = await this.#makeTxRequest(
          useWeb,
          from,
          btsContract,
          pk,
          "disableRestrictions",
          null,
          0,
          stepLimit
        );

        return txRequest;
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running disableRestrictions(). Params:\nfrom: ${from}\npk: ${pk}\n`
        );
        return { error: errorResult.toString() };
      }
    }
  };

  #web = {
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
      // pk: string,
      amount: number,
      stepLimit: string | null = null
    ): Promise<any> => {
      //
      try {
        return await this.#localMethods.transferNativeCoin(
          targetAddress,
          targetChain,
          from,
          null,
          amount,
          stepLimit,
          true
        )
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running transferNativeCoin(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\namount: ${amount}\nstepLimit: ${stepLimit}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Allow users to transfer token to the BTS contract. This step is
     * necessary to do before using the transfer method of the BTS contract.
     * @param _value - amount to transfers.
     * @param tokenContract - token contract.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    transferToBTSContract: async (
      _value: string,
      tokenContract: string | null = null,
      from: string,
      // pk: string,
      stepLimit: string | null = "5000000"
    ): Promise<any> => {
      //
      try {
        return await this.#localMethods.transferToBTSContract(
          _value,
          tokenContract,
          from,
          null,
          stepLimit,
          true
        )
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running transferToBTSContract(). Params:\n_value: ${_value}\ntokenContract: ${tokenContract}\n\nfrom: ${from}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Allow users to transfer token between chains.
     * @param _coinName - name of coin.
     * @param _value - amount to transfers.
     * @param _to - receiver address BTP formatted.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    transfer: async (
      _coinName: string,
      _value: string,
      _to: string,
      from: string,
      // pk: string,
      stepLimit: string | null = "10000000"
    ): Promise<any> => {
      //
      try {
        return await this.#localMethods.transfer(
          _coinName,
          _value,
          _to,
          from,
          null,
          stepLimit,
          true
        )
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running transfer(). Params:\n_coinName: ${_coinName}\n_value: ${_value}\n_to: ${_to}\nfrom: ${from}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Allow user to transfer a batch of tokens.
     * @param _coinNames - names of tokens to transfer.
     * @param _values - amounts to transfer.
     * @param _to - receiver address BTP formatted.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    transferBatch: async (
      _coinNames: string[],
      _values: string[],
      _to: string,
      from: string,
      // pk: string | null,
      stepLimit: string | null = null
    ): Promise<any> => {
      //
      try {
        return await this.#localMethods.transferBatch(
          _coinNames,
          _values,
          _to,
          from,
          null,
          stepLimit,
          true
        )
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running transferBatch(). Params:\n_coinNames: ${_coinNames}\n_values: ${_values}\n_to: ${_to}\nfrom: ${from}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Approves the BTS contract address to send tokens on behalf
     * of the originator wallet. This 'approve' method is used by the
     * contracts of wrapped tokens to allow the BTS contract to move
     * an amount of token cross chain.
     * @param amount - amount being approved to spent.
     * @param tokenContract - contract address for the wrapped token.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    approveBTSContract: async (
      amount: string,
      tokenContract: string,
      from: string,
      // pk: string,
      stepLimit: string | null = "5000000"
    ): Promise<any> => {
      //
      try {
        return await this.#localMethods.approveBTSContract(
          amount,
          tokenContract,
          from,
          null,
          stepLimit,
          true
        )
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running approveBTSContract(). Params:\namount: ${amount}\ntokenContract: ${tokenContract}\nfrom: ${from}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Reclaim the tokens refundable balance by an owner. Caller must be
     * owner of coin.
     * @param _coinName - coin name.
     * @param _value - amount of re-claiming tokens.
     * @param from - address of sender.
     * @param pk - private key of sender.
     * @param stepLimit - max gas to pay.
     */
    reclaim: async (
      _coinName: string,
      _value: string,
      from: string,
      // pk: string,
      stepLimit: string | null = null
    ): Promise<any> => {
      //
      try {
        return await this.#localMethods.reclaim(
          _coinName,
          _value,
          from,
          null,
          stepLimit,
          true
        )
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running reclaim(). Params:\n_coinName: ${_coinName}\n_value: ${_value}\nfrom: ${from}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    //
    // The following methods can only be called by the contract owner
    //
    /*
     * Add another Owner. Caller must be an Owner of BTP network.
     * @param _addr - address of new owner.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    addOwner: async (
      _addr: string,
      from: string,
      // pk: string | null,
      stepLimit: string | null = null
    ): Promise<any> => {
      try {
        return await this.#localMethods.addOwner(
          _addr,
          from,
          null,
          stepLimit,
          true
        )
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running addOwner(). Params:\n_addr: ${_addr}\nfrom: ${from}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Remove an existing owner. Caller must be an owner of BTP network.
     * @param _addr - address of owner to remove.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    removeOwner: async (
      _addr: string,
      from: string,
      // pk: string,
      stepLimit: string | null = null
    ): Promise<any> => {
      //
      try {
        return await this.#localMethods.removeOwner(
          _addr,
          from,
          null,
          stepLimit,
          true
        )
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running removeOwner(). Params:\n_addr: ${_addr}\nfrom: ${from}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Registers a wrapped coin and id number of a supporting coin. Caller
     * must be an owner of this contract.
     * @param _name - must be different with the native coin name.
     * @param _symbol - symbol name of wrapped coin.
     * @param _decimals - decimal number.
     * @param _feeNumerator -
     * @param _fixedFee -
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param _addr -
     * @param stepLimit - max gas to pay.
     */
    register: async (
      _name: string,
      _symbol: string,
      _decimals: string,
      _feeNumerator: string,
      _fixedFee: string,
      from: string,
      // pk: string,
      _addr: string | null = null,
      stepLimit: string | null = null
    ): Promise<any> => {
      //
      try {
        return await this.#localMethods.register(
          _name,
          _symbol,
          _decimals,
          _feeNumerator,
          _fixedFee,
          from,
          null,
          _addr,
          stepLimit,
          true
        )
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running register(). Params:\n_name: ${_name}\n_symbol: ${_symbol}\n_decimals: ${_decimals}\n_feeNumerator: ${_feeNumerator}\n_fixedFee: ${_fixedFee}\n_addr: ${_addr}\nfrom: ${from}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Set fee ratio. Caller must be owner of this contract.
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
      // pk: string,
      stepLimit: string | null = null
    ): Promise<any> => {
      //
      try {
        return await this.#localMethods.setFeeRatio(
          _name,
          _feeNumerator,
          _fixedFee,
          from,
          null,
          stepLimit,
          true
        )
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running setFeeRatio(). Params:\n_name: ${_name}\n_feeNumerator: ${_feeNumerator}\n_fixedFee: ${_fixedFee}\nfrom: ${from}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Removes blacklisted addresses.
     * @param _net - network
     * @param _addresses - addresses to remove from blacklist.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    removeBlacklistAddress: async (
      _net: string,
      _addresses: string[],
      from: string,
      // pk: string | null,
      stepLimit: string | null = null
    ): Promise<any> => {
      //
      try {
        return await this.#localMethods.removeBlacklistAddress(
          _net,
          _addresses,
          from,
          null,
          stepLimit,
          true
        )
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running removeBlacklistAddress(). Params:\n_net: ${_net}\n_addresses: ${_addresses}\nfrom: ${from}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Set token limit. Caller must be owner of this contract.
     * @param _coinNames - names of coins.
     * @param _tokenLimits -
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    setTokenLimit: async (
      _coinNames: string[],
      _tokenLimits: string[],
      from: string,
      // pk: string | null,
      stepLimit: string | null = null
    ): Promise<any> => {
      //
      try {
        return await this.#localMethods.setTokenLimit(
          _coinNames,
          _tokenLimits,
          from,
          null,
          stepLimit,
          true
        )
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running setTokenLimit(). Params:\n_coinNames: ${_coinNames}\n_tokenLimits: ${_tokenLimits}\nfrom: ${from}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Adds addresses to blacklist. Caller must be owner of this contract.
     * @param _net -
     * @param _addresses - list of addresses to blacklist.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    addBlacklistAddress: async (
      _net: string,
      _addresses: string[],
      from: string,
      // pk: string,
      stepLimit: string | null = null
    ): Promise<any> => {
      //
      try {
        return await this.#localMethods.addBlacklistAddress(
          _net,
          _addresses,
          from,
          null,
          stepLimit,
          true
        )
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running addBlacklistAddress(). Params:\n_net: ${_net}\n_addresses: ${_addresses}\nfrom: ${from}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Add restriction. Caller must be owner of this contract.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    addRestriction: async (
      from: string,
      // pk: string,
      stepLimit: string | null = null
    ): Promise<any> => {
      //
      try {
        return await this.#localMethods.addRestriction(
          from,
          null,
          stepLimit,
          true
        )
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running addRestrictions(). Params:\nfrom: ${from}\n`
        );
        return { error: errorResult.toString() };
      }
    },

    /*
     * Disable restrictions. Caller must be owner of this contract.
     * @param from - public address of origin.
     * @param pk - private key of origin.
     * @param stepLimit - max gas to pay.
     */
    disableRestrictions: async (
      from: string,
      // pk: string,
      stepLimit: string | null = null
    ): Promise<any> => {
      //
      try {
        return await this.#localMethods.disableRestrictions(
          from,
          null,
          stepLimit,
          true
        )
      } catch (err) {
        const errorResult = new Exception(
          err,
          `Error running disableRestrictions(). Params:\nfrom: ${from}\n`
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
  #makeTxRequest = async (
    useWeb: boolean = false,
    from: string,
    to: string,
    pk: string | null,
    method: string,
    params: any = null,
    value: number = 0,
    stepLimit: string | null = null,
    nid: string = this.#params.iconProvider.nid
  ) => {
    try {
      return await localLib.makeTxRequest(
        this.#sdkUtils,
        this.espaniconLib,
        this.#params,
        this.queryMethod,
        useWeb,
        from, 
        to, 
        pk, 
        method, 
        params, 
        value, 
        stepLimit, 
        nid
      )
      // const useStepLimit = stepLimit == null ? "8000000" : stepLimit;
      // const txObj = new CallTransactionBuilder()
      //   .from(from)
      //   .to(to)
      //   .stepLimit(IconConverter.toBigNumber(useStepLimit))
      //   .nid(IconConverter.toBigNumber(nid))
      //   .nonce(IconConverter.toBigNumber(this.#sdkUtils.getRandNonce()))
      //   .version(IconConverter.toBigNumber("3"))
      //   .timestamp(new Date().getTime() * 1000)
      //   .method(method);

      // // if any params are specified
      // if (params != null) {
      //   txObj.params(params);
      // }

      // // if an amount of ICX is specified to transfer
      // if (value !== 0) {
      //   txObj.value(IconAmount.of(value, IconAmount.Unit.ICX).toLoop());
      // }

      // // build json rpc query
      // const txObj2 = txObj.build();

      // // if useWeb is true return the unsigned tx object
      // if (useWeb === true) {
      //   return txObj2;
      // }

      // const wallet = IconWallet.loadPrivateKey(pk);
      // const signedTx = new SignedTransaction(txObj2, wallet);
      // const jsonRPCObj = this.espaniconLib.makeJSONRPCRequestObj(
      //   "icx_sendTransaction"
      // );
      // jsonRPCObj["params"] = signedTx.getProperties();
      // const stringJsonObj = JSON.stringify(jsonRPCObj);
      // const query = await this.#sdkUtils.makeJsonRpcCall(
      //   this.#params.iconProvider.hostname,
      //   stringJsonObj,
      //   this.queryMethod
      // )

      // return query;
    } catch (err) {
      console.log("error running #makeTxRequest");
      console.log(err);
    }
  };

  /*
   * Allow users to transfer token to the BTS contract. This step is
   * necessary to do before using the transfer method of the BTS contract.
   * @param _value - amount to transfers.
   * @param tokenContract - token contract.
   * @param from - public address of origin.
   * @param pk - private key of origin.
   * @param stepLimit - max gas to pay.
   */
  #transferToBTSContract = async (
    _value: string,
    tokenContract: string | null = null,
    from: string,
    pk: string | null,
    stepLimit: string | null = "5000000",
    useWeb: boolean = false
  ): Promise<any> => {
    //
    try {
      return await localLib.transferToBTSContract(
        this.#sdkUtils,
        this.espaniconLib,
        this.#params,
        this.queryMethod,
        _value,
        tokenContract,
        from,
        pk,
        stepLimit,
        useWeb
      )

    //   if (tokenContract == null || !this.#sdkUtils.isValidContractAddress) {
    //     throw new Error(
    //       `Contract address is not valid. Address: ${tokenContract}`
    //     )
    //   }

    //   const isMainnet: boolean =
    //     this.#params.useMainnet == null ? true : this.#params.useMainnet;

    //   const btsContract = this.#sdkUtils.getContractOfLabelFromLocalData(
    //     "bts",
    //     "icon",
    //     isMainnet,
    //     false
    //   );

    //   // parse value into loop units and then into hexadecimal
    //   const parsedValue = this.espaniconLib.decimalToHex(
    //     Number(_value)*(10**18)
    //   )

    //   // transfer token to the BTS address to be able to then
    //   // make the cross chain transaction
    //   const txRequest = await this.#makeTxRequest(
    //     useWeb,
    //     from,
    //     tokenContract,
    //     pk,
    //     "transfer",
    //     { _to: btsContract, _value: parsedValue },
    //     0,
    //     stepLimit
    //   )

    //   return txRequest;
    } catch (err) {
      const errorResult = new Exception(
        err,
        `Error running transferToBTSContract(). Params:\n_value: ${_value}\ntokenContract: ${tokenContract}\n\nfrom: ${from}\npk: ${pk}\n`
      );
      return { error: errorResult.toString() };
    }
  };

  /*
   * Allow users to transfer token between chains.
   * @param _coinName - name of coin.
   * @param _value - amount to transfers.
   * @param _to - receiver address BTP formatted.
   * @param from - public address of origin.
   * @param pk - private key of origin.
   * @param stepLimit - max gas to pay.
   */
  #transfer = async (
    useWeb: boolean = false,
    _coinName: string,
    _value: string,
    _to: string,
    from: string,
    pk: string | null,
    stepLimit: string | null = "5000000"
  ): Promise<any> => {
    //
    try {
      return await localLib.transfer(
        this.#sdkUtils,
        this.espaniconLib,
        this.#params,
        this.queryMethod,
        useWeb,
        _coinName,
        _value,
        _to,
        from,
        pk,
        stepLimit
      )
      // const isMainnet: boolean =
      //   this.#params.useMainnet == null ? true : this.#params.useMainnet;

      // const btsContract = this.#sdkUtils.getContractOfLabelFromLocalData(
      //   "bts",
      //   "icon",
      //   isMainnet,
      //   false
      // );

      // // parse value into loop units and then into hexadecimal
      // const parsedValue = this.espaniconLib.decimalToHex(
      //   Number(_value)*(10**18)
      // )

      // // make cross chain transaction
      // const txRequest = await this.#makeTxRequest(
      //   useWeb,
      //   from,
      //   btsContract,
      //   pk,
      //   "transfer",
      //   { _coinName: _coinName, _value: parsedValue, _to: _to},
      //   0,
      //   stepLimit
      // );

      // return txRequest;
    } catch (err) {
      const errorResult = new Exception(
        err,
        `Error running transfer(). Params:\n_coinName: ${_coinName}\n_value: ${_value}\n_to: ${_to}\nfrom: ${from}\npk: ${pk}\n`
      );
      return { error: errorResult.toString() };
    }
  };

  /*
   * Approves an address (usually a contract) to send tokens on behalf
   * of the originator wallet. This 'approve' method is used by the
   * contracts of wrapped tokens to allow the BTS contract to move
   * an amount of token cross chain.
   * @param spender - address that is being approved for spending.
   * @param amount - amount being approved to spent.
   * @param tokenContract - contract address for the wrapped token.
   * @param from - public address of origin.
   * @param pk - private key of origin.
   * @param stepLimit - max gas to pay.
   */
  //#approve = async (
  //  spender: string,
  //  amount: string,
  //  tokenContract: string,
  //  from: string,
  //  pk: string,
  //  stepLimit: string | null = "5000000",
  //  useWeb: boolean = false
  //): Promise<any> => {
  //  //
  //  try {

  //    return await localLib.approve(
  //      this.#sdkUtils,
  //      this.espaniconLib,
  //      this.#params,
  //      this.queryMethod,
  //      spender,
  //      amount,
  //      tokenContract,
  //      from,
  //      pk,
  //      stepLimit,
  //      useWeb
  //    )
    // // parse value into loop units and then into hexadecimal
    // const parsedValue = this.espaniconLib.decimalToHex(
    //   Number(amount)*(10**18)
    // )

    // // make cross chain transaction
    // const txRequest = await this.#makeTxRequest(
    //   useWeb,
    //   from,
    //   tokenContract,
    //   pk,
    //   "approve",
    //   { spender: spender, amount: parsedValue },
    //   0,
    //   stepLimit
    // );

    //   return txRequest;
    // } catch (err) {
    //   const errorResult = new Exception(
    //     err,
    //     `Error running approve(). Params:\nspender: ${spender}\namount: ${amount}\ntokenContract: ${tokenContract}\nfrom: ${from}\npk: ${pk}\n`
    //   );
    //   return { error: errorResult.toString() };
    // }
  // };

  /*
   * Approves the BTS contract address to send tokens on behalf
   * of the originator wallet. This 'approve' method is used by the
   * contracts of wrapped tokens to allow the BTS contract to move
   * an amount of token cross chain.
   * @param spender - address that is being approved for spending.
   * @param amount - amount being approved to spent.
   * @param tokenContract - contract address for the wrapped token.
   * @param from - public address of origin.
   * @param pk - private key of origin.
   * @param stepLimit - max gas to pay.
   */
  #approveBTSContract = async (
    amount: string,
    tokenContract: string,
    from: string,
    pk: string | null,
    stepLimit: string | null = "5000000",
    useWeb: boolean = false
  ): Promise<any> => {
    //
    try {

      return await localLib.approveBTSContract(
        this.#sdkUtils,
        this.espaniconLib,
        this.#params,
        this.queryMethod,
        amount,
        tokenContract,
        from,
        pk,
        stepLimit,
        useWeb
      )
    // const isMainnet: boolean =
    //   this.#params.useMainnet == null ? true : this.#params.useMainnet;

    // const btsContract = this.#sdkUtils.getContractOfLabelFromLocalData(
    //   "bts",
    //   "icon",
    //   isMainnet,
    //   false
    // );
    // const txRequest = await this.#approve(
    //   btsContract,
    //   amount,
    //   tokenContract,
    //   from,
    //   pk,
    //   stepLimit,
    //   useWeb
    // );

    //   return txRequest;
    } catch (err) {
      const errorResult = new Exception(
        err,
        `Error running approveBTSContract(). Params:\namount: ${amount}\ntokenContract: ${tokenContract}\nfrom: ${from}\npk: ${pk}\n`
      );
      return { error: errorResult.toString() };
    }
  };
}

export = IconBridgeSDKNodeIcon;
