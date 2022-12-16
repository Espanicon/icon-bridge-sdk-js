// lib.ts
//
const Exception = require("../../utils/exception");
// const baseICONSDK = require("./icon-bridge-sdk-icon");
const IconService = require("icon-sdk-js");

// icon web3 lib
const {
  IconBuilder,
  IconAmount,
  IconConverter,
  IconWallet,
  SignedTransaction
  // HttpProvider
} = IconService.default;

const { CallTransactionBuilder } = IconBuilder;

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
const makeTxRequest = async (
  sdkUtils: any,
  espaniconLib: any,
  privParams: any,
  queryMethod: any,
  useWeb: boolean = false,
  from: string,
  to: string,
  pk: string,
  method: string,
  params: any = null,
  value: number = 0,
  stepLimit: string | null = null,
  nid: string
) => {
  try {
    const useStepLimit = stepLimit == null ? "8000000" : stepLimit;
    const txObj = new CallTransactionBuilder()
      .from(from)
      .to(to)
      .stepLimit(IconConverter.toBigNumber(useStepLimit))
      .nid(IconConverter.toBigNumber(nid))
      .nonce(IconConverter.toBigNumber(sdkUtils.getRandNonce()))
      .version(IconConverter.toBigNumber("3"))
      .timestamp(new Date().getTime() * 1000)
      .method(method);

    // if any params are specified
    if (params != null) {
      txObj.params(params);
    }

    // if an amount of ICX is specified to transfer
    if (value !== 0) {
      txObj.value(IconAmount.of(value, IconAmount.Unit.ICX).toLoop());
    }

    // build json rpc query
    const txObj2 = txObj.build();

    // if useWeb is true return the unsigned tx object
    if (useWeb === true) {
      return txObj2;
    }

    const wallet = IconWallet.loadPrivateKey(pk);
    const signedTx = new SignedTransaction(txObj2, wallet);
    const jsonRPCObj = espaniconLib.makeJSONRPCRequestObj(
      "icx_sendTransaction"
    );
    jsonRPCObj["params"] = signedTx.getProperties();
    const stringJsonObj = JSON.stringify(jsonRPCObj);
    const query = await sdkUtils.makeJsonRpcCall(
      privParams.iconProvider.hostname,
      stringJsonObj,
      queryMethod
    );

    return query;
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
const transferToBTSContract = async (
  sdkUtils: any,
  espaniconLib: any,
  privParams: any,
  queryMethod: any,
  _value: string,
  tokenContract: string | null = null,
  from: string,
  pk: string,
  stepLimit: string | null = "5000000",
  useWeb: boolean = false
): Promise<any> => {
  //
  try {
    if (tokenContract == null || !sdkUtils.isValidContractAddress) {
      throw new Error(
        `Contract address is not valid. Address: ${tokenContract}`
      );
    }

    const isMainnet: boolean =
      privParams.useMainnet == null ? true : privParams.useMainnet;

    const btsContract = sdkUtils.getContractOfLabelFromLocalData(
      "bts",
      "icon",
      isMainnet,
      false
    );

    // parse value into loop units and then into hexadecimal
    const parsedValue = espaniconLib.decimalToHex(Number(_value) * 10 ** 18);

    // transfer token to the BTS address to be able to then
    // make the cross chain transaction
    const txRequest = await makeTxRequest(
      sdkUtils,
      espaniconLib,
      privParams,
      queryMethod,
      useWeb,
      from,
      tokenContract,
      pk,
      "transfer",
      { _to: btsContract, _value: parsedValue },
      0,
      stepLimit,
      privParams.iconProvider.nid
    );

    return txRequest;
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
const transfer = async (
  sdkUtils: any,
  espaniconLib: any,
  privParams: any,
  queryMethod: any,
  useWeb: boolean = false,
  _coinName: string,
  _value: string,
  _to: string,
  from: string,
  pk: string,
  stepLimit: string | null = "5000000"
): Promise<any> => {
  //
  try {
    const isMainnet: boolean =
      privParams.useMainnet == null ? true : privParams.useMainnet;

    const btsContract = sdkUtils.getContractOfLabelFromLocalData(
      "bts",
      "icon",
      isMainnet,
      false
    );

    // parse value into loop units and then into hexadecimal
    const parsedValue = espaniconLib.decimalToHex(Number(_value) * 10 ** 18);

    // make cross chain transaction
    const txRequest = await makeTxRequest(
      sdkUtils,
      espaniconLib,
      privParams,
      queryMethod,
      useWeb,
      from,
      btsContract,
      pk,
      "transfer",
      { _coinName: _coinName, _value: parsedValue, _to: _to },
      0,
      stepLimit,
      privParams.iconProvider.nid
    );

    return txRequest;
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
const approve = async (
  sdkUtils: any,
  espaniconLib: any,
  privParams: any,
  queryMethod: any,
  spender: string,
  amount: string,
  tokenContract: string,
  from: string,
  pk: string,
  stepLimit: string | null = "5000000",
  useWeb: boolean = false
): Promise<any> => {
  //
  try {
    // parse value into loop units and then into hexadecimal
    const parsedValue = espaniconLib.decimalToHex(Number(amount) * 10 ** 18);

    // make cross chain transaction
    const txRequest = await makeTxRequest(
      sdkUtils,
      espaniconLib,
      privParams,
      queryMethod,
      useWeb,
      from,
      tokenContract,
      pk,
      "approve",
      { spender: spender, amount: parsedValue },
      0,
      stepLimit,
      privParams.iconProvider.nid
    );

    return txRequest;
  } catch (err) {
    const errorResult = new Exception(
      err,
      `Error running approve(). Params:\nspender: ${spender}\namount: ${amount}\ntokenContract: ${tokenContract}\nfrom: ${from}\npk: ${pk}\n`
    );
    return { error: errorResult.toString() };
  }
};

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
const approveBTSContract = async (
  sdkUtils: any,
  espaniconLib: any,
  privParams: any,
  queryMethod: any,
  amount: string,
  tokenContract: string,
  from: string,
  pk: string,
  stepLimit: string | null = "5000000",
  useWeb: boolean = false
): Promise<any> => {
  //
  try {
    const isMainnet: boolean =
      privParams.useMainnet == null ? true : privParams.useMainnet;

    const btsContract = sdkUtils.getContractOfLabelFromLocalData(
      "bts",
      "icon",
      isMainnet,
      false
    );
    const txRequest = await approve(
      sdkUtils,
      espaniconLib,
      privParams,
      queryMethod,
      btsContract,
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
};

export = {
  makeTxRequest,
  transferToBTSContract,
  transfer,
  approve,
  approveBTSContract
};
