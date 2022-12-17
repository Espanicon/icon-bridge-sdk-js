// icon-bridge-sdk.ts
//
import utils from "../utils/utils";
import Web3 from "web3";

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

type Tx = {
  from: string;
  to: string;
  gas: number;
  data: object;
  value?: number;
  nonce?: any;
};

// variables
const defaultParams: InputParams = {
  useMainnet: true
};

// main code

/**
 * Class that provides the API for interacting with the ICON Bridge
 */
class IconBridgeSDK {
  sdkUtils: any = utils;
  params = utils.defaultSDKParams;
  bscWeb3: any;
  #bscWeb3Private: any;

  /**
   * Configuration object for the initialization of the library
   * @param inputParams - initialization object.
   * @param inputParams.useMainnet - Use mainnet or testnet.
   * @param inputParams.<PROVIDER>.hostname - chain node provider url.
   * @param inputParams.<PROVIDER>.nid - chain node provider nid.
   */
  constructor(inputParams: InputParams = defaultParams) {
    this.params = this.sdkUtils.getSDKParams(inputParams);
    this.#bscWeb3Private = new Web3(this.params.bscProvider.hostname);
    this.bscWeb3 = {
      eth: {
        Contract: this.#bscWeb3Private.eth.Contract,
        accounts: this.#bscWeb3Private.eth.accounts,
        abi: this.#bscWeb3Private.eth.abi,
        getBalance: this.#bscWeb3Private.eth.getBalance,
        getTransaction: this.#bscWeb3Private.eth.getTransaction,
        sendSignedTransaction: this.#bscWeb3Private.eth.sendSignedTransaction,
        signTransaction: this.#bscWeb3Private.eth.signTransaction,
        sendTransaction: this.#bscWeb3Private.eth.sendTransaction,
        sign: this.#bscWeb3Private.eth.sign,
        call: this.#bscWeb3Private.eth.call,
        getTransactionCount: this.#bscWeb3Private.eth.getTransactionCount
      },
      utils: {
        fromWei: this.#bscWeb3Private.utils.fromWei,
        toWei: this.#bscWeb3Private.utils.toWei
      }
    };
  }

  // ######################################################################
  /**
   * General library object
   */

  lib = {
    /**
     * Make readonly query to the BTS smart contract.
     * @param methodName - name of the smart contract method to call.
     * @param chain - chain to use.
     * @param web3Wrapper - object containing the web3 library to use.
     * @param queryMethod - callback module that makes the http request.
     * @param rest - Array of params to pass to method call.
     */
    BTSReadonlyQuery: async (
      methodName: string,
      chain: string,
      web3Wrapper: any,
      queryMethod: any = null,
      ...rest: any[]
    ): Promise<string | null> => {
      // check if class object was created for mainnet or testnet
      const isMainnet: boolean | null =
        this.params.useMainnet == null ? true : this.params.useMainnet;

      // get contract address and contract object
      const BTSProxyContractAddress = this.lib.getBTSCoreProxyContractAddress(
        chain,
        isMainnet
      );

      const contractObject = this.lib.getBTSCoreLogicContractObject(
        chain,
        web3Wrapper
      );

      // decoding a call to readonly method
      let encodedData = null;
      const contractMethod = contractObject.methods[methodName];
      if (rest.length === 0) {
        encodedData = contractMethod().encodeABI();
      } else {
        encodedData = contractMethod(...rest).encodeABI();
      }

      // making readonly call
      let contractMethodCallResponse = null;
      if (queryMethod == null) {
        contractMethodCallResponse = await web3Wrapper.eth.call({
          to: BTSProxyContractAddress,
          data: encodedData
        });
      } else {
        const contractMethodCallResponseRaw = await this.sdkUtils.makeEthJsonRpcReadonlyQuery(
          this.params.bscProvider.hostname,
          BTSProxyContractAddress,
          encodedData,
          queryMethod
        );
        if (contractMethodCallResponseRaw.error != null) {
          throw new Error(JSON.stringify(contractMethodCallResponseRaw));
        }
        contractMethodCallResponse = contractMethodCallResponseRaw.result;
      }

      return contractMethodCallResponse;
    },

    /**
     * Make a signed transaction to a method in the  BTS smart contract.
     * @param from - public address of origination wallet.
     * @param pk - private key of origination wallet.
     * @param methodName - name of the smart contract method to call.
     * @param chain - chain to use.
     * @param web3Wrapper - object containing the web3 library to use.
     * @param rest - Array of params to pass to method call.
     */
    signBTSCoreTx: async (
      useWeb: boolean = false,
      from: string,
      pk: string | null,
      methodName: string,
      amount: null | number = null,
      chain: string,
      web3Wrapper: any,
      gas: number | null = null,
      queryMethod: any = null,
      nonce: any = null,
      ...rest: any[]
    ): Promise<string | null> => {
      // check if class object was created for mainnet or testnet
      const isMainnet: boolean | null =
        this.params.useMainnet == null ? true : this.params.useMainnet;

      // get contract address
      const BTSProxyContractAddress = this.lib.getBTSCoreProxyContractAddress(
        chain,
        isMainnet
      );

      // get BTSCore logic contract web3 object
      const contractObject = this.lib.getBTSCoreLogicContractObject(
        chain,
        web3Wrapper
      );

      if (rest.length === 0) {
        return await this.signTx(
          useWeb,
          from,
          pk,
          methodName,
          BTSProxyContractAddress,
          contractObject,
          web3Wrapper,
          amount,
          gas,
          queryMethod,
          nonce
        );
      } else {
        return await this.signTx(
          useWeb,
          from,
          pk,
          methodName,
          BTSProxyContractAddress,
          contractObject,
          web3Wrapper,
          amount,
          gas,
          queryMethod,
          nonce,
          ...rest
        );
      }
    },

    /**
     * Approves contract to be able to make transfer on behave of wallet.
     * @param from - public address of origination wallet.
     * @param pk - private key of origination wallet.
     * @param spender - BTSCore contract address for the specific chain.
     * @param rawAmount - amount to send.
     * @param tokenContractAddress - contract address of the token to transfer
     * @param tokenContractAbi - abi of the token to transfer
     * @param web3Wrapper - object containing the web3 library to use.
     * @param gas - gas for tx fee
     */
    approveTransfer: async (
      useWeb: boolean = false,
      from: string,
      pk: string,
      spender: string,
      rawAmount: string,
      tokenContractAddress: string,
      tokenContractAbi: any[],
      web3Wrapper: any,
      gas: number | null = null,
      queryMethod: any = null
    ) => {
      const valueInWei = web3Wrapper.utils.toWei(rawAmount, "ether");

      // get BTSCore logic contract web3 object
      const contractObject = this.lib.getContractObject(
        tokenContractAbi,
        tokenContractAddress,
        web3Wrapper
      );

      return await this.signTx(
        useWeb,
        from,
        pk,
        "approve",
        tokenContractAddress,
        contractObject,
        web3Wrapper,
        null,
        gas,
        queryMethod,
        null, //TODO: this is the nonce, maybe eliminate from outer logic?
        spender,
        valueInWei
      );
    },

    /**
     * Get ABI of a contract.
     * @param contractLabel - string label of the contract.
     * @param chain - chain to query.
     * @param isMainnet - use mainnet or testnet.
     * @param getLogicContract - get logic or proxy contract
     */
    getAbiOf: (
      contractLabel: string,
      chain: string,
      isMainnet: boolean,
      getLogicContract: boolean = true
    ): any => {
      return this.sdkUtils.getAbiOfLabelFromLocalData(
        contractLabel,
        chain,
        isMainnet,
        getLogicContract
      );
    },

    /**
     * Get ABI of the BTS contract
     * @param chain - chain to query.
     * @param isMainnet - use mainnet or testnet.
     * @param getLogicContract - get logic or proxy contract
     */
    getBTSAbi: (
      chain: string,
      isMainnet: boolean,
      getLogicContract = true
    ): any => {
      return this.lib.getAbiOf("BTSCore", chain, isMainnet, getLogicContract);
    },

    /**
     * Get web3 object of a contract given a contract label.
     * @param label -  string label of the contract.
     * @param chain - chain to query.
     * @param web3Wrapper - object containing the web3 library to use.
     * @param getLogicContract - get logic or proxy contract
     */
    getContractObjectByLabel: (
      label: string,
      chain: string,
      web3Wrapper: any,
      getLogicContract: boolean = false
    ): any => {
      try {
        const isMainnet: boolean | null =
          this.params.useMainnet == null ? true : this.params.useMainnet;

        const contractAddress = this.lib.getContractAddressLocally(
          label,
          chain,
          isMainnet,
          getLogicContract
        );

        const abi = this.lib.getAbiOf(
          label,
          chain,
          isMainnet,
          getLogicContract
        );

        return this.lib.getContractObject(abi, contractAddress, web3Wrapper);
      } catch (err) {
        throw new Error(
          `Error running getContractObjectByLabel(). Params:\nlabel: ${label}\nchain: ${chain}\nweb3Wrapper: ${web3Wrapper}\ngetLogicContract: ${getLogicContract}.\n${err}`
        );
      }
    },

    /**
     * Get contract address from local data.
     * @param label -  string label of the contract.
     * @param chain - chain to query.
     * @param isMainnet - use mainnet or testnet.
     * @param getLogicContract - get logic or proxy contract
     */
    getContractAddressLocally: (
      label: string,
      chain: string,
      isMainnet: boolean,
      getLogicContract: boolean = false
    ): any => {
      return this.sdkUtils.getContractOfLabelFromLocalData(
        label,
        chain,
        isMainnet,
        getLogicContract
      );
    },

    /**
     * Get contract address of the BTSCore implementation contract.
     * @param chain - chain to query.
     * @param isMainnet - use mainnet or testnet.
     */
    getBTSCoreLogicContractAddress: (
      chain: string,
      isMainnet: boolean
    ): any => {
      return this.lib.getContractAddressLocally(
        "BTSCore",
        chain,
        isMainnet,
        true
      );
    },

    /**
     * Get contract address of the BTSCore proxy contract.
     * @param chain - chain to query.
     * @param isMainnet - use mainnet or testnet.
     */
    getBTSCoreProxyContractAddress: (
      chain: string,
      isMainnet: boolean
    ): any => {
      return this.lib.getContractAddressLocally("BTSCore", chain, isMainnet);
    },

    /**
     * Get contract address of the BTSCore implementation contract on chain.
     * @param address - address of the proxy contract.
     * @param memSlot - memory slot where the contract is saved.
     * @param web3Wrapper - object containing the web3 library to use.
     */
    getLogicContractAddressOnChain: async (
      address: string,
      memSlot: string,
      web3Wrapper: any
    ): Promise<any> => {
      let result: any = null;

      try {
        const memData = await web3Wrapper.eth.getStorageAt(address, memSlot);
        result = this.sdkUtils.removeZerosFromAddress(memData);
        return result;
      } catch (err) {
        throw new Error(
          `Error running getLogicContractAddressOnChain(). Params:\naddress: ${address}\nmemSlot: ${memSlot}\n.\n${err}`
        );
      }
    },

    /**
     * Get contract web3 object.
     * @param abi - abi of the contract.
     * @param contractAddress - contract address.
     * @param web3Wrapper - object containing the web3 library to use.
     */
    getContractObject: (
      abi: any,
      contractAddress: string,
      web3Wrapper: any
    ): any => {
      try {
        const contract = new web3Wrapper.eth.Contract(abi, contractAddress);
        return contract;
      } catch (err) {
        throw new Error(
          `Error running getContractObject(). Params:\nabi: ${abi}\ncontractAddress: ${contractAddress}\nweb3Wrapper: ${web3Wrapper}.\n${err}`
        );
      }
    },

    /**
     * Get web3 object of the BTSCore proxy contract.
     * @param chain - chain to query.
     * @param web3Wrapper - object containing the web3 library to use.
     */
    getBTSCoreProxyContractObject: (chain: string, web3Wrapper: any): any => {
      return this.lib.getContractObjectByLabel(
        "BTSCore",
        chain,
        web3Wrapper,
        false
      );
    },

    /**
     * Get web3 object of the BTSCore implementation contract.
     * @param chain - chain to query.
     * @param web3Wrapper - object containing the web3 library to use.
     */
    getBTSCoreLogicContractObject: (chain: string, web3Wrapper: any): any => {
      return this.lib.getContractObjectByLabel(
        "BTSCore",
        chain,
        web3Wrapper,
        true
      );
    }
  };

  /**
   * Make a signed transaction to a method in the  BTS smart contract.
   * @param from - public address of origination wallet.
   * @param pk - private key of origination wallet.
   * @param methodName - name of the smart contract method to call.
   * @param contractAddress -
   * @param contractObject -
   * @param web3Wrapper - object containing the web3 library to use.
   * @param amount -
   * @param gas -
   * @param rest -
   */
  private signTx = async (
    useWeb: boolean = false,
    from: string,
    pk: string | null,
    methodName: string,
    contractAddress: string,
    contractObject: { methods: any },
    web3Wrapper: any,
    amount: null | number = null,
    gas: number | null = null,
    queryMethod: any = null,
    nonce: any = null,
    ...rest: any[]
  ): Promise<any> => {
    // decoding a call to readonly method
    let encodedData = null;
    const contractMethod = contractObject.methods[methodName];
    if (rest.length === 0) {
      encodedData = contractMethod().encodeABI();
    } else {
      encodedData = contractMethod(...rest).encodeABI();
    }

    // get tx object
    const tx: Tx = {
      from: from,
      to: contractAddress,
      gas: gas == null ? 2000000 : gas,
      data: encodedData
    };

    if (nonce > 1) {
      tx["nonce"] = nonce;
    }
    if (amount != null) {
      tx["value"] = web3Wrapper.utils.toWei(amount, "ether");
    }

    // if useWeb is true return the unsigned tx object
    if (useWeb === true) {
      return tx;
    }

    // sign transaction
    const signedTx = await web3Wrapper.eth.accounts.signTransaction(tx, pk);

    // making readonly call
    let contractMethodCallResponse = null;
    if (queryMethod == null) {
      contractMethodCallResponse = await web3Wrapper.eth
      .sendSignedTransaction(signedTx.rawTransaction);
    } else {
      const contractMethodCallResponseRaw = await this.sdkUtils
      .makeEthSendRawTransactionQuery(
        this.params.bscProvider.hostname,
        signedTx.rawTransaction,
        queryMethod
      );
      if (contractMethodCallResponseRaw.error != null) {
        throw new Error(JSON.stringify(contractMethodCallResponseRaw));
      }
      contractMethodCallResponse = contractMethodCallResponseRaw;
    }
    return contractMethodCallResponse;
  };
}

export = IconBridgeSDK;
