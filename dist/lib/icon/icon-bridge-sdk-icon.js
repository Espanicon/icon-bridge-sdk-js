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
const EspaniconSDK = require("@espanicon/espanicon-sdk");
class IconBridgeSDKIcon {
    constructor(params, sdkUtils) {
        this.superMethods = {
            balanceOf: (_owner, _coinName) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield this.makeReadonlyQuery("balanceOf", {
                        _owner: _owner,
                        _coinName: _coinName
                    });
                    return response;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running balanceOf(). Params:\n_owner: ${_owner}\n_coinName: ${_coinName}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            name: () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield this.makeReadonlyQuery("name");
                    return response;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running name(). Params:\n** NO PARAMS **\n`);
                    return { error: errorResult.toString() };
                }
            }),
            feeRatio: (_name) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield this.makeReadonlyQuery("feeRatio", {
                        _name: _name
                    });
                    return response;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running feeRatio(). Params:\n_name: ${_name}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            getTokenLimit: (_name) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield this.makeReadonlyQuery("getTokenLimit", {
                        _name: _name
                    });
                    return response;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running getTokenLimit(). Params:\n_name: ${_name}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            getTokenLimitTxn: (_sn) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield this.makeReadonlyQuery("getTokenLimitTxn", {
                        _sn: _sn
                    });
                    return response;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running getTokenLimitTxn(). Params:\n_sn: ${_sn}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            getSn: () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield this.makeReadonlyQuery("getSn");
                    return response;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running getSn(). Params:\n** NO PARAMS **\n`);
                    return { error: errorResult.toString() };
                }
            }),
            isUserBlackListed: (_net, _address) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield this.makeReadonlyQuery("isUserBlackListed", {
                        _net: _net,
                        _address: _address
                    });
                    return response;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running isUserBlackListed(). Params:\n_net: ${_net}\n_address: ${_address}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            getBlackListedUsers: (_net, _start, _end) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield this.makeReadonlyQuery("getBlackListedUsers", {
                        _net: _net,
                        _start: _start,
                        _end: _end
                    });
                    return response;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running getBlackListedUsers(). Params:\n_net: ${_net}\n_start: ${_start}\n_end: ${_end}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            getRegisteredTokensCount: () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield this.makeReadonlyQuery("getRegisteredTokensCount");
                    return response;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running getRegisteredTokensCount(). Params:\n** NO PARAMS **\n`);
                    return { error: errorResult.toString() };
                }
            }),
            tokenLimitStatus: (_net, _coinName) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield this.makeReadonlyQuery("tokenLimitStatus", {
                        _net: _net,
                        _coinName: _coinName
                    });
                    return response;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running tokenLimitStatus(). Params:\n_net: ${_net}\n_coinName: ${_coinName}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            coinNames: () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield this.makeReadonlyQuery("coinNames");
                    return response;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running coinNames(). Params:\n** NO PARAMS **\n`);
                    return { error: errorResult.toString() };
                }
            }),
            coinId: (_coinName) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield this.makeReadonlyQuery("coinId", {
                        _coinName: _coinName
                    });
                    return response;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running coinId(). Params:\n_coinName: ${_coinName}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            balanceOfBatch: (_owner, _coinNames) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield this.makeReadonlyQuery("balanceOfBatch", {
                        _owner: _owner,
                        _coinNames: _coinNames
                    });
                    return response;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running balanceOfBatch(). Params:\n_owner: ${_owner}\n_coinNames: ${_coinNames}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            getAccumulatedFees: () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield this.makeReadonlyQuery("getAccumulatedFees");
                    return response;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running getAccumulatedFees(). Params:\n** NO PARAMS **\n`);
                    return { error: errorResult.toString() };
                }
            }),
            getTransaction: (_sn) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield this.makeReadonlyQuery("getTransaction", {
                        _sn: _sn
                    });
                    return response;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running getTransaction(). Params:\n_sn: ${_sn}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            getOwners: () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield this.makeReadonlyQuery("getOwners");
                    return response;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running getOwners(). Params:\n** NO PARAMS **\n`);
                    return { error: errorResult.toString() };
                }
            }),
            isOwner: (_addr) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield this.makeReadonlyQuery("isOwner", {
                        _addr: _addr
                    });
                    return response;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running isOwner(). Params:\n_addr: ${_addr}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            isRestrictionEnabled: () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield this.makeReadonlyQuery("isRestrictionEnabled");
                    return response;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running isRestrictionEnabled(). Params:\n** NO PARAMS **\n`);
                    return { error: errorResult.toString() };
                }
            })
        };
        this.makeReadonlyQuery = (methodName, methodParams = null) => __awaiter(this, void 0, void 0, function* () {
            const isMainnet = this.params.useMainnet == null ? true : this.params.useMainnet;
            const btsContract = this.sdkUtils.getContractOf("bts", "icon", isMainnet);
            const JSONRPCObject = this.iconWeb3.makeICXCallRequestObj(methodName, methodParams, null, btsContract);
            const request = yield this.iconWeb3.queryMethod(this.iconWeb3.scores.apiRoutes.v3, JSONRPCObject, this.iconWeb3.apiNode);
            return request;
        });
        this.params = params;
        this.sdkUtils = sdkUtils;
        this.iconWeb3 = new EspaniconSDK(this.params.iconProvider.hostname, this.params.iconProvider.nid);
    }
}
module.exports = IconBridgeSDKIcon;
//# sourceMappingURL=icon-bridge-sdk-icon.js.map