// icon-bridge-sdk.ts
//
import utils from "./utils/utils";
import Web3 from "web3";
import IconBridgeSDKBSC from "./bsc/icon-bridge-sdk-bsc";

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
  bsc: any;

  /**
   * Configuration object for the initialization of the library
   * @param inputParams - initialization object.
   * @param inputParams.useMainnet - Use mainnet or testnet.
   * @param inputParams.<PROVIDER>.hostname - chain node provider url.
   * @param inputParams.<PROVIDER>.nid - chain node provider nid.
   */
  constructor(inputParams: InputParams = defaultParams) {
    this.params = this.sdkUtils.getSDKParams(inputParams);
    this.bscWeb3 = new Web3(this.params.bscProvider.hostname);
    this.bsc = new IconBridgeSDKBSC(
      this.params,
      this.bscWeb3,
      this.sdkUtils,
      this.lib
    );
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
     * @param rest - Array of params to pass to method call.
     */
    BTSReadonlyQuery: async (
      methodName: string,
      chain: string,
      web3Wrapper: any,
      ...rest: any[]
    ): Promise<string | null> => {
      // check if class object was created for mainnet or testnet
      const isMainnet: boolean | null =
        this.params.useMainnet == null ? true : this.params.useMainnet;

      try {
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
        const contractMethodCallResponse = await web3Wrapper.eth.call({
          to: BTSProxyContractAddress,
          data: encodedData
        });

        return contractMethodCallResponse;
      } catch (err) {
        console.log(err);
        throw new Error(
          `Error running ${methodName}(). Params:\n ** NO PARAMS**\n`
        );
      }
    },

    /**
     * Make transaction method to the BTS smart contract.
     * @param methodName - name of the smart contract method to call.
     * @param chain - chain to use.
     * @param web3Wrapper - object containing the web3 library to use.
     * @param rest - Array of params to pass to method call.
     */
    BTSSendTx: async (
      methodName: string,
      chain: string,
      web3Wrapper: any,
      ...rest: any[]
    ): Promise<string | null> => {
      // check if class object was created for mainnet or testnet
      const isMainnet: boolean | null =
        this.params.useMainnet == null ? true : this.params.useMainnet;

      try {
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
        const contractMethodCallResponse = await web3Wrapper.eth.call({
          to: BTSProxyContractAddress,
          data: encodedData
        });

        return contractMethodCallResponse;
      } catch (err) {
        console.log(err);
        throw new Error(
          `Error running ${methodName}(). Params:\n ** NO PARAMS**\n`
        );
      }
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
          `Error running #getContractObjectByLabel(). Params:\nlabel: ${label}\nchain: ${chain}\nweb3Wrapper: ${web3Wrapper}\ngetLogicContract: ${getLogicContract}.\n${err}`
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
          `Error running #getLogicContractAddressOnChain(). Params:\naddress: ${address}\nmemSlot: ${memSlot}\n.\n${err}`
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
          `Error running #getContractObject(). Params:\nabi: ${abi}\ncontractAddress: ${contractAddress}\nweb3Wrapper: ${web3Wrapper}.\n${err}`
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
}

export = IconBridgeSDK;
