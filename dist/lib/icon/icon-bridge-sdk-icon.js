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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _IconBridgeSDKIcon_params, _IconBridgeSDKIcon_sdkUtils, _IconBridgeSDKIcon_iconWeb3, _IconBridgeSDKIcon_web;
const Exception = require("../../utils/exception");
const webLib_1 = __importDefault(require("./webLib"));
class IconBridgeSDKIcon {
    constructor(params, sdkUtils, CustomSDK) {
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
            }),
        };
        _IconBridgeSDKIcon_web.set(this, {
            transferNativeCoin: (targetAddress, targetChain, from, amount, stepLimit) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet;
                    const btpAddress = __classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f").getBTPAddress(targetAddress, targetChain, isMainnet);
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield webLib_1.default.makeTxRequest(__classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f"), __classPrivateFieldGet(this, _IconBridgeSDKIcon_iconWeb3, "f"), from, btsContract, "transferNativeCoin", { _to: btpAddress }, amount, stepLimit, __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").iconProvider.nid);
                    const txObj = this.parseTxParams(txRequest);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferNativeCoin(). Params:\ntargetAddress: ${targetAddress}\ntargetChain: ${targetChain}\nfrom: ${from}\namount: ${amount}\nstepLimit: ${stepLimit}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            transferToBTSContract: (_value, tokenContract = null, from, stepLimit = "5000000") => __awaiter(this, void 0, void 0, function* () {
                try {
                    const txRequest = yield webLib_1.default.transferToBTSContract(__classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f"), __classPrivateFieldGet(this, _IconBridgeSDKIcon_iconWeb3, "f"), __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f"), _value, tokenContract, from, stepLimit);
                    const txObj = this.parseTxParams(txRequest);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferToBTSContract(). Params:\n_value: ${_value}\ntokenContract: ${tokenContract}\nfrom: ${from}\nstepLimit: ${stepLimit}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            transfer: (_coinName, _value, from, targetChain, targetAddress, stepLimit = "5000000") => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet;
                    const btpAddress = __classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f").getBTPAddress(targetAddress, targetChain, isMainnet);
                    const txRequest = yield webLib_1.default.transfer(__classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f"), __classPrivateFieldGet(this, _IconBridgeSDKIcon_iconWeb3, "f"), __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f"), _coinName, _value, btpAddress, from, stepLimit);
                    const txObj = this.parseTxParams(txRequest);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transfer(). Params:\n_coinName: ${_coinName}\n_value: ${_value}\nfrom: ${from}\ntargetChain: ${targetChain}\ntargetAddress: ${targetAddress}\nstepLimit: ${stepLimit}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            transferBatch: (_coinNames, _values, targetChain, targetAddress, from, stepLimit = "5000000") => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet;
                    const btpAddress = __classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f").getBTPAddress(targetAddress, targetChain, isMainnet);
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const parsedValues = _values.map(value => {
                        return __classPrivateFieldGet(this, _IconBridgeSDKIcon_iconWeb3, "f").decimalToHex(Number(value) * (10 ** 18));
                    });
                    const txRequest = yield webLib_1.default.makeTxRequest(__classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f"), __classPrivateFieldGet(this, _IconBridgeSDKIcon_iconWeb3, "f"), from, btsContract, "transferBatch", { _coinNames: _coinNames, _values: parsedValues, _to: btpAddress }, 0, stepLimit, __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").iconProvider.nid);
                    const txObj = this.parseTxParams(txRequest);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running transferBatch(). Params:\n_coinNames: ${_coinNames}\n_values: ${_values}\nfrom: ${from}\ntargetChain: ${targetChain}\ntargetAddress: ${targetAddress}\nstepLimit: ${stepLimit}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            approveBTSContract: (amount, tokenContract, from, stepLimit = "5000000") => __awaiter(this, void 0, void 0, function* () {
                try {
                    const txRequest = yield webLib_1.default.approveBTSContract(__classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f"), __classPrivateFieldGet(this, _IconBridgeSDKIcon_iconWeb3, "f"), __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f"), amount, tokenContract, from, stepLimit);
                    const txObj = this.parseTxParams(txRequest);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running approveBTSContract(). Params:\namount: ${amount}\ntokenContract: ${tokenContract}\nfrom: ${from}\nstepLimit: ${stepLimit}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            reclaim: (_coinName, _value, from, stepLimit) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield webLib_1.default.makeTxRequest(__classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f"), __classPrivateFieldGet(this, _IconBridgeSDKIcon_iconWeb3, "f"), from, btsContract, "reclaim", { _coinName: _coinName, _value: _value }, 0, stepLimit, __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").iconProvider.nid);
                    const txObj = this.parseTxParams(txRequest);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running reclaim(). Params:\n_coinName: ${_coinName}\n_value: ${_value}\nfrom: ${from}\nstepLimit: ${stepLimit}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            addOwner: (_addr, from, stepLimit) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield webLib_1.default.makeTxRequest(__classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f"), __classPrivateFieldGet(this, _IconBridgeSDKIcon_iconWeb3, "f"), from, btsContract, "adOwner", { _addr: _addr }, 0, stepLimit, __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").iconProvider.nid);
                    const txObj = this.parseTxParams(txRequest);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running addOwner(). Params:\n_addr: ${_addr}\nfrom: ${from}\nstepLimit: ${stepLimit}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            removeOwner: (_addr, from, stepLimit) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield webLib_1.default.makeTxRequest(__classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f"), __classPrivateFieldGet(this, _IconBridgeSDKIcon_iconWeb3, "f"), from, btsContract, "removeOwner", { _addr: _addr }, 0, stepLimit, __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").iconProvider.nid);
                    const txObj = this.parseTxParams(txRequest);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running removeOwner(). Params:\n_addr: ${_addr}\nfrom: ${from}\nstepLimit: ${stepLimit}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            register: (_name, _symbol, _decimals, _feeNumerator, _fixedFee, from, _addr = null, stepLimit) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const queryParams = {
                        _name: _name,
                        _symbol: _symbol,
                        _decimals: _decimals,
                        _feeNumerator: _feeNumerator,
                        _fixedFee: _fixedFee
                    };
                    if (_addr != null) {
                        queryParams["_addr"] = _addr;
                    }
                    const txRequest = yield webLib_1.default.makeTxRequest(__classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f"), __classPrivateFieldGet(this, _IconBridgeSDKIcon_iconWeb3, "f"), from, btsContract, "register", Object.assign({}, queryParams), 0, stepLimit, __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").iconProvider.nid);
                    const txObj = this.parseTxParams(txRequest);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running register(). Params:\n_name: ${_name}\n_symbol: ${_symbol}\n_decimals: ${_decimals}\n_feeNumerator: ${_feeNumerator}\n_fixedFee: ${_fixedFee}\n_addr: ${_addr}\nfrom: ${from}\nstepLimit: ${stepLimit}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            setFeeRatio: (_name, _feeNumerator, _fixedFee, from, stepLimit) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield webLib_1.default.makeTxRequest(__classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f"), __classPrivateFieldGet(this, _IconBridgeSDKIcon_iconWeb3, "f"), from, btsContract, "setFeeRatio", { _name: _name, _feeNumerator: _feeNumerator, _fixedFee: _fixedFee }, 0, stepLimit, __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").iconProvider.nid);
                    const txObj = this.parseTxParams(txRequest);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running setFeeRatio(). Params:\n_name: ${_name}\n_feeNumerator: ${_feeNumerator}\n_fixedFee: ${_fixedFee}\nfrom: ${from}\nstepLimit: ${stepLimit}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            removeBlacklistAddress: (_net, _addresses, from, stepLimit) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield webLib_1.default.makeTxRequest(__classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f"), __classPrivateFieldGet(this, _IconBridgeSDKIcon_iconWeb3, "f"), from, btsContract, "removeBlacklistAddress", { _net: _net, _addresses: _addresses }, 0, stepLimit, __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").iconProvider.nid);
                    const txObj = this.parseTxParams(txRequest);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running removeBlacklistAddress(). Params:\n_net: ${_net}\n_addresses: ${_addresses}\nfrom: ${from}\nstepLimit: ${stepLimit}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            setTokenLimit: (_coinNames, _tokenLimits, from, stepLimit) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield webLib_1.default.makeTxRequest(__classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f"), __classPrivateFieldGet(this, _IconBridgeSDKIcon_iconWeb3, "f"), from, btsContract, "setTokenLimit", { _coinNames: _coinNames, _tokenLimits: _tokenLimits }, 0, stepLimit, __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").iconProvider.nid);
                    const txObj = this.parseTxParams(txRequest);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running setTokenLimit(). Params:\n_coinNames: ${_coinNames}\n_tokenLimits: ${_tokenLimits}\nfrom: ${from}\nstepLimit: ${stepLimit}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            addBlacklistAddress: (_net, _addresses, from, stepLimit) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield webLib_1.default.makeTxRequest(__classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f"), __classPrivateFieldGet(this, _IconBridgeSDKIcon_iconWeb3, "f"), from, btsContract, "addBlacklistAddress", { _net: _net, _addresses: _addresses }, 0, stepLimit, __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").iconProvider.nid);
                    const txObj = this.parseTxParams(txRequest);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running addBlacklistAddress(). Params:\n_net: ${_net}\n_addresses: ${_addresses}\nfrom: ${from}\nstepLimit: ${stepLimit}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            addRestriction: (from, stepLimit) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield webLib_1.default.makeTxRequest(__classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f"), __classPrivateFieldGet(this, _IconBridgeSDKIcon_iconWeb3, "f"), from, btsContract, "addRestriction", null, 0, stepLimit, __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").iconProvider.nid);
                    const txObj = this.parseTxParams(txRequest);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running addRestriction(). Params:\nfrom: ${from}\nstepLimit: ${stepLimit}\n`);
                    return { error: errorResult.toString() };
                }
            }),
            disableRestrictions: (from, stepLimit) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet;
                    const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f").getContractOfLabelFromLocalData("bts", "icon", isMainnet, false);
                    const txRequest = yield webLib_1.default.makeTxRequest(__classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f"), __classPrivateFieldGet(this, _IconBridgeSDKIcon_iconWeb3, "f"), from, btsContract, "disableRestrictions", null, 0, stepLimit, __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").iconProvider.nid);
                    const txObj = this.parseTxParams(txRequest);
                    return txObj;
                }
                catch (err) {
                    const errorResult = new Exception(err, `Error running disableRestrictions(). Params:\nfrom: ${from}\nstepLimit: ${stepLimit}\n`);
                    return { error: errorResult.toString() };
                }
            }),
        });
        this.makeReadonlyQuery = (methodName, methodParams = null) => __awaiter(this, void 0, void 0, function* () {
            const isMainnet = __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet == null ? true : __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").useMainnet;
            const btsContract = __classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f").getContractOf("bts", "icon", isMainnet);
            const JSONRPCObject = __classPrivateFieldGet(this, _IconBridgeSDKIcon_iconWeb3, "f").makeICXCallRequestObj(methodName, methodParams, null, btsContract);
            const request = yield __classPrivateFieldGet(this, _IconBridgeSDKIcon_sdkUtils, "f").makeJsonRpcCall(__classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").iconProvider.hostname, JSONRPCObject, this.queryMethod);
            return request;
        });
        this.parseTxParams = (txParams) => {
            const txObj = __classPrivateFieldGet(this, _IconBridgeSDKIcon_iconWeb3, "f").makeJSONRPCRequestObj("icx_sendTransaction");
            txObj["params"] = Object.assign({}, txParams);
            return txObj;
        };
        __classPrivateFieldSet(this, _IconBridgeSDKIcon_params, params, "f");
        __classPrivateFieldSet(this, _IconBridgeSDKIcon_sdkUtils, sdkUtils, "f");
        __classPrivateFieldSet(this, _IconBridgeSDKIcon_iconWeb3, new CustomSDK(__classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").iconProvider.hostname, __classPrivateFieldGet(this, _IconBridgeSDKIcon_params, "f").iconProvider.nid), "f");
        this.queryMethod = __classPrivateFieldGet(this, _IconBridgeSDKIcon_iconWeb3, "f").queryMethod;
        this.espaniconLib = {
            makeJSONRPCRequestObj: __classPrivateFieldGet(this, _IconBridgeSDKIcon_iconWeb3, "f").makeJSONRPCRequestObj,
            queryTypeMethod: __classPrivateFieldGet(this, _IconBridgeSDKIcon_iconWeb3, "f").queryTypeMethod,
            decimalToHex: __classPrivateFieldGet(this, _IconBridgeSDKIcon_iconWeb3, "f").decimalToHex,
            getIcxBalance: __classPrivateFieldGet(this, _IconBridgeSDKIcon_iconWeb3, "f").getIcxBalance
        };
        this.methods = Object.assign({}, this.superMethods);
        this.web = Object.assign({}, __classPrivateFieldGet(this, _IconBridgeSDKIcon_web, "f"));
    }
}
_IconBridgeSDKIcon_params = new WeakMap(), _IconBridgeSDKIcon_sdkUtils = new WeakMap(), _IconBridgeSDKIcon_iconWeb3 = new WeakMap(), _IconBridgeSDKIcon_web = new WeakMap();
module.exports = IconBridgeSDKIcon;
//# sourceMappingURL=icon-bridge-sdk-icon.js.map