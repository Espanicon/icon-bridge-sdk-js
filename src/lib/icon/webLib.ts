// lib.ts
//
const Exception = require("../../utils/exception");

// types declaration
type TxObj = {
  from: string;
  to: string;
  method: any;
  stepLimit: string;
  nid: string;
  nonce: string;
  version: string;
  timestamp: string;
  value?: string;
  params?: string;
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
const makeTxRequest = async (
  sdkUtils: any,
  espaniconLib: any,
  from: string,
  to: string,
  method: string,
  params: any = null,
  value: number = 0,
  stepLimit: string | null = null,
  nid: string
) => {
  try {
    const useStepLimit = stepLimit == null ? "8000000" : stepLimit;
    const txObjWeb: TxObj = {
      from: from,
      to: to,
      method: method,
      stepLimit: espaniconLib.decimalToHex(useStepLimit),
      nid: espaniconLib.decimalToHex(nid),
      nonce: espaniconLib.decimalToHex(sdkUtils.getRandNonce()),
      version: espaniconLib.decimalToHex(Number("3")),
      timestamp: espaniconLib.decimalToHex(new Date().getTime() * 1000)
    };

    // if an amount of ICX is specified to transfer
    if (!Number.isNaN(Number(value)) && Number(value) !== 0) {
      txObjWeb.value = espaniconLib.decimalToHex(Number(value) * 10 ** 18);
    } else {
      txObjWeb.value = "0x0";
    }

    // if any params are specified
    if (params != null) {
      txObjWeb.params = params;
    }

    return txObjWeb;
  } catch (err) {
    console.log("error running #makeTxRequest");
    console.log(err);
    return null;
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
  _value: string,
  tokenContract: string | null = null,
  from: string,
  stepLimit: string | null = "5000000"
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
      from,
      tokenContract,
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
      `Error running transferToBTSContract(). Params:\n_value: ${_value}\ntokenContract: ${tokenContract}\n\nfrom: ${from}\n`
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
  _coinName: string,
  _value: string,
  _to: string,
  from: string,
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
      from,
      btsContract,
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
      `Error running transfer(). Params:\n_coinName: ${_coinName}\n_value: ${_value}\n_to: ${_to}\nfrom: ${from}\n`
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
  spender: string,
  amount: string,
  tokenContract: string,
  from: string,
  stepLimit: string | null = "5000000"
): Promise<any> => {
  //
  try {
    // parse value into loop units and then into hexadecimal
    const parsedValue = espaniconLib.decimalToHex(Number(amount) * 10 ** 18);

    // make cross chain transaction
    const txRequest = await makeTxRequest(
      sdkUtils,
      espaniconLib,
      from,
      tokenContract,
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
      `Error running approve(). Params:\nspender: ${spender}\namount: ${amount}\ntokenContract: ${tokenContract}\nfrom: ${from}\n`
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
  amount: string,
  tokenContract: string,
  from: string,
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
    const txRequest = await approve(
      sdkUtils,
      espaniconLib,
      privParams,
      btsContract,
      amount,
      tokenContract,
      from,
      stepLimit
    );

    return txRequest;
  } catch (err) {
    const errorResult = new Exception(
      err,
      `Error running approveBTSContract(). Params:\namount: ${amount}\ntokenContract: ${tokenContract}\nfrom: ${from}\n`
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
