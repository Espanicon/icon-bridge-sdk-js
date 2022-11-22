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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _IconBridgeSDKIcon_params, _IconBridgeSDKIcon_sdkUtils, _IconBridgeSDKIcon_iconWeb3;
const Exception = require("../../utils/exception");
const EspaniconSDK = require("@espanicon/espanicon-sdk");
class IconBridgeSDKIcon {
    constructor(params, sdkUtils) {
        _IconBridgeSDKIcon_params.set(this, void 0);
        _IconBridgeSDKIcon_sdkUtils.set(this, void 0);
        _IconBridgeSDKIcon_iconWeb3.set(this, void 0);
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
            blackListedUsersCount: (_net) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield this.makeReadonlyQuery("blackListedUsersCount", {
                        _net: _net
                    });
                    return response;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running blackListedUsersCount(). Params:\n_net: ${_net}\n`);
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
            const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet;
            const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f").getContractOf("bts", "icon", isMainnet);
            const JSONRPCObject = __classPrivateFieldGet(this, _IconBridgeSDKIcon_iconWeb3, "f").makeICXCallRequestObj(methodName, methodParams, null, btsContract);
            const request = __classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f").makeJsonRpcCall(__classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").iconProvider.hostname, JSONRPCObject, this.queryMethod);
            return request;
        });
        __classPrivateFieldSet(this, _IconBridgeSDKIcon_params, params, "f");
        __classPrivateFieldSet(this, _IconBridgeSDKIcon_sdkUtils, sdkUtils, "f");
        __classPrivateFieldSet(this, _IconBridgeSDKIcon_iconWeb3, new EspaniconSDK(__classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").iconProvider.hostname, __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").iconProvider.nid), "f");
        this.queryMethod = __classPrivateFieldGet(this, _IconBridgeSDKIcon_iconWeb3, "f").queryMethod;
        this.espaniconLib = {
            makeJSONRPCRequestObj: __classPrivateFieldGet(this, _IconBridgeSDKIcon_iconWeb3, "f").makeJSONRPCRequestObj
        };
    }
}
_IconBridgeSDKIcon_params = new WeakMap(), _IconBridgeSDKIcon_sdkUtils = new WeakMap(), _IconBridgeSDKIcon_iconWeb3 = new WeakMap();
module.exports = IconBridgeSDKIcon;
//# sourceMappingURL=icon-bridge-sdk-icon.js.map