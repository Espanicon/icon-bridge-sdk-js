"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbService = void 0;
const joi_1 = __importDefault(require("joi"));
const networks_1 = require("./networks");
const contracts_1 = require("./contracts");
const networkArray = Object.keys(networks_1.networks);
const bscValidLabels = [
    ...contracts_1.tokenLabels.filter((el) => el !== contracts_1.labels.bnb),
    contracts_1.labels.BMCManagement,
    contracts_1.labels.BMCPeriphery,
    contracts_1.labels.BTSCore,
    contracts_1.labels.BTSPeriphery
];
const EXACT_NO_LABELS_IN_BSC = bscValidLabels.length + 1;
const iconValidLabels = [
    ...contracts_1.tokenLabels.filter((el) => el !== contracts_1.labels.icx),
    contracts_1.labels.bmc,
    contracts_1.labels.bts
];
const _schema = joi_1.default.object({
    bsc: joi_1.default.object()
        .pattern(joi_1.default.any().valid(...networkArray), joi_1.default.object({
        genericToken: joi_1.default.any()
    })
        .pattern(joi_1.default.any().valid(...bscValidLabels), joi_1.default.object({
        abi: joi_1.default.any(),
        address: joi_1.default.string()
            .pattern(/0x([a-fA-F0-9]{40})/)
            .required(),
        implementation: joi_1.default.object({
            address: joi_1.default.string().allow(null),
            abi: joi_1.default.any()
        })
    }))
        .length(EXACT_NO_LABELS_IN_BSC))
        .length(networkArray.length)
        .required(),
    icon: joi_1.default.object()
        .pattern(joi_1.default.any().valid(...networkArray), joi_1.default.object()
        .pattern(joi_1.default.any().valid(...iconValidLabels), joi_1.default.object({
        address: joi_1.default.string()
            .pattern(/cx([a-fA-F0-9]{40})/)
            .required()
    }))
        .length(iconValidLabels.length))
        .length(networkArray.length)
        .required()
});
function _validateAbiData(data) {
    const { error } = _schema.validate(data);
    if (error) {
        throw new Error(`Invalid external abi data. Error: ${JSON.stringify(error.message, null, 1)}`);
    }
}
function _dbService() {
    let abiData = require("../../data/abiData.js");
    return {
        read() {
            return abiData;
        },
        write(data) {
            _validateAbiData(data);
            abiData = data;
        }
    };
}
exports.dbService = _dbService();
//# sourceMappingURL=db-service.js.map