"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Exception = require("../../utils/exception");
const IconService = require("icon-sdk-js");
const { IconBuilder, IconAmount, IconConverter, IconWallet, SignedTransaction } = IconService.default;
const { CallTransactionBuilder } = IconBuilder;
const makeTxRequest = (sdkUtils, espaniconLib, privParams, queryMethod, useWeb = false, from, to, pk, method, params = null, value = 0, stepLimit = null, nid) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (params != null) {
            txObj.params(params);
        }
        if (!Number.isNaN(Number(value)) && Number(value) !== 0) {
            txObj.value(IconAmount.of(value, IconAmount.Unit.ICX).toLoop());
        }
        const txObj2 = txObj.build();
        if (useWeb === true) {
            const txObjWeb = Object.assign(Object.assign({}, txObj2), { stepLimit: espaniconLib.decimalToHex(useStepLimit), nid: espaniconLib.decimalToHex(nid), nonce: espaniconLib.decimalToHex(sdkUtils.getRandNonce()), version: espaniconLib.decimalToHex(Number("3")), timestamp: espaniconLib.decimalToHex(new Date().getTime() * 1000) });
            if (!Number.isNaN(Number(value)) && Number(value) !== 0) {
                txObjWeb.value = espaniconLib.decimalToHex(IconAmount.of(Number(value), IconAmount.Unit.ICX).toLoop());
            }
            else {
                txObjWeb.value = "0x0";
            }
            return txObjWeb;
        }
        const wallet = IconWallet.loadPrivateKey(pk);
        const signedTx = new SignedTransaction(txObj2, wallet);
        const jsonRPCObj = espaniconLib.makeJSONRPCRequestObj("icx_sendTransaction");
        jsonRPCObj["params"] = signedTx.getProperties();
        const stringJsonObj = JSON.stringify(jsonRPCObj);
        const query = yield sdkUtils.makeJsonRpcCall(privParams.iconProvider.hostname, stringJsonObj, queryMethod);
        return query;
    }
    catch (err) {
        console.log("error running #makeTxRequest");
        console.log(err);
    }
});
const transferToBTSContract = (sdkUtils, espaniconLib, privParams, queryMethod, _value, tokenContract = null, from, pk, stepLimit = "5000000", useWeb = false) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (tokenContract == null || !sdkUtils.isValidContractAddress) {
            throw new Error(`Contract address is not valid. Address: ${tokenContract}`);
        }
        const isMainnet = privParams.useMainnet == null ? true : privParams.useMainnet;
        const btsContract = sdkUtils.getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
        const parsedValue = espaniconLib.decimalToHex(Number(_value) * 10 ** 18);
        const txRequest = yield makeTxRequest(sdkUtils, espaniconLib, privParams, queryMethod, useWeb, from, tokenContract, pk, "transfer", { _to: btsContract, _value: parsedValue }, 0, stepLimit, privParams.iconProvider.nid);
        return txRequest;
    }
    catch (err) {
        const errorResult = new Exception(err, `Error running transferToBTSContract(). Params:\n_value: ${_value}\ntokenContract: ${tokenContract}\n\nfrom: ${from}\npk: ${pk}\n`);
        return { error: errorResult.toString() };
    }
});
const transfer = (sdkUtils, espaniconLib, privParams, queryMethod, useWeb = false, _coinName, _value, _to, from, pk, stepLimit = "5000000") => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isMainnet = privParams.useMainnet == null ? true : privParams.useMainnet;
        const btsContract = sdkUtils.getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
        const parsedValue = espaniconLib.decimalToHex(Number(_value) * 10 ** 18);
        const txRequest = yield makeTxRequest(sdkUtils, espaniconLib, privParams, queryMethod, useWeb, from, btsContract, pk, "transfer", { _coinName: _coinName, _value: parsedValue, _to: _to }, 0, stepLimit, privParams.iconProvider.nid);
        return txRequest;
    }
    catch (err) {
        const errorResult = new Exception(err, `Error running transfer(). Params:\n_coinName: ${_coinName}\n_value: ${_value}\n_to: ${_to}\nfrom: ${from}\npk: ${pk}\n`);
        return { error: errorResult.toString() };
    }
});
const approve = (sdkUtils, espaniconLib, privParams, queryMethod, spender, amount, tokenContract, from, pk, stepLimit = "5000000", useWeb = false) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedValue = espaniconLib.decimalToHex(Number(amount) * 10 ** 18);
        const txRequest = yield makeTxRequest(sdkUtils, espaniconLib, privParams, queryMethod, useWeb, from, tokenContract, pk, "approve", { spender: spender, amount: parsedValue }, 0, stepLimit, privParams.iconProvider.nid);
        return txRequest;
    }
    catch (err) {
        const errorResult = new Exception(err, `Error running approve(). Params:\nspender: ${spender}\namount: ${amount}\ntokenContract: ${tokenContract}\nfrom: ${from}\npk: ${pk}\n`);
        return { error: errorResult.toString() };
    }
});
const approveBTSContract = (sdkUtils, espaniconLib, privParams, queryMethod, amount, tokenContract, from, pk, stepLimit = "5000000", useWeb = false) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isMainnet = privParams.useMainnet == null ? true : privParams.useMainnet;
        const btsContract = sdkUtils.getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
        const txRequest = yield approve(sdkUtils, espaniconLib, privParams, queryMethod, btsContract, amount, tokenContract, from, pk, stepLimit, useWeb);
        return txRequest;
    }
    catch (err) {
        const errorResult = new Exception(err, `Error running approveBTSContract(). Params:\namount: ${amount}\ntokenContract: ${tokenContract}\nfrom: ${from}\npk: ${pk}\n`);
        return { error: errorResult.toString() };
    }
});
module.exports = {
    makeTxRequest,
    transferToBTSContract,
    transfer,
    approve,
    approveBTSContract
};
//# sourceMappingURL=lib.js.map