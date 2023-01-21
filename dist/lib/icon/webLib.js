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
const makeTxRequest = (sdkUtils, espaniconLib, from, to, method, params = null, value = 0, stepLimit = null, nid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const useStepLimit = stepLimit == null ? "8000000" : stepLimit;
        const txObjWeb = {
            from: from,
            to: to,
            dataType: "call",
            data: {
                method: method
            },
            stepLimit: espaniconLib.decimalToHex(useStepLimit),
            nid: espaniconLib.decimalToHex(nid),
            nonce: espaniconLib.decimalToHex(sdkUtils.getRandNonce()),
            version: espaniconLib.decimalToHex(Number("3")),
            timestamp: espaniconLib.decimalToHex(new Date().getTime() * 1000)
        };
        if (!Number.isNaN(Number(value)) && Number(value) !== 0) {
            txObjWeb.value = espaniconLib.decimalToHex(Number(value) * 10 ** 18);
        }
        else {
            txObjWeb.value = "0x0";
        }
        if (params != null) {
            txObjWeb.data.params = params;
        }
        return txObjWeb;
    }
    catch (err) {
        console.log("error running #makeTxRequest");
        console.log(err);
        return null;
    }
});
const transferToBTSContract = (sdkUtils, espaniconLib, privParams, _value, tokenContract = null, from, stepLimit = "5000000") => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (tokenContract == null || !sdkUtils.isValidContractAddress) {
            throw new Error(`Contract address is not valid. Address: ${tokenContract}`);
        }
        const isMainnet = privParams.useMainnet == null ? true : privParams.useMainnet;
        const btsContract = sdkUtils.getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
        const parsedValue = espaniconLib.decimalToHex(Number(_value) * 10 ** 18);
        const txRequest = yield makeTxRequest(sdkUtils, espaniconLib, from, tokenContract, "transfer", { _to: btsContract, _value: parsedValue }, 0, stepLimit, privParams.iconProvider.nid);
        return txRequest;
    }
    catch (err) {
        const errorResult = new Exception(err, `Error running transferToBTSContract(). Params:\n_value: ${_value}\ntokenContract: ${tokenContract}\n\nfrom: ${from}\n`);
        return { error: errorResult.toString() };
    }
});
const transfer = (sdkUtils, espaniconLib, privParams, _coinName, _value, _to, from, stepLimit = "5000000") => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isMainnet = privParams.useMainnet == null ? true : privParams.useMainnet;
        const btsContract = sdkUtils.getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
        const parsedValue = espaniconLib.decimalToHex(Number(_value) * 10 ** 18);
        const txRequest = yield makeTxRequest(sdkUtils, espaniconLib, from, btsContract, "transfer", { _coinName: _coinName, _value: parsedValue, _to: _to }, 0, stepLimit, privParams.iconProvider.nid);
        return txRequest;
    }
    catch (err) {
        const errorResult = new Exception(err, `Error running transfer(). Params:\n_coinName: ${_coinName}\n_value: ${_value}\n_to: ${_to}\nfrom: ${from}\n`);
        return { error: errorResult.toString() };
    }
});
const approve = (sdkUtils, espaniconLib, privParams, spender, amount, tokenContract, from, stepLimit = "5000000") => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedValue = espaniconLib.decimalToHex(Number(amount) * 10 ** 18);
        const txRequest = yield makeTxRequest(sdkUtils, espaniconLib, from, tokenContract, "approve", { spender: spender, amount: parsedValue }, 0, stepLimit, privParams.iconProvider.nid);
        return txRequest;
    }
    catch (err) {
        const errorResult = new Exception(err, `Error running approve(). Params:\nspender: ${spender}\namount: ${amount}\ntokenContract: ${tokenContract}\nfrom: ${from}\n`);
        return { error: errorResult.toString() };
    }
});
const approveBTSContract = (sdkUtils, espaniconLib, privParams, amount, tokenContract, from, stepLimit = "5000000") => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isMainnet = privParams.useMainnet == null ? true : privParams.useMainnet;
        const btsContract = sdkUtils.getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
        const txRequest = yield approve(sdkUtils, espaniconLib, privParams, btsContract, amount, tokenContract, from, stepLimit);
        return txRequest;
    }
    catch (err) {
        const errorResult = new Exception(err, `Error running approveBTSContract(). Params:\namount: ${amount}\ntokenContract: ${tokenContract}\nfrom: ${from}\n`);
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
//# sourceMappingURL=webLib.js.map