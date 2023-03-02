import Joi from "joi";
import { networks } from "./networks";
import { tokenLabels, labels } from "./contracts";

const networkArray = Object.keys(networks);
const bscValidLabels = [
  ...tokenLabels.filter((el) => el !== labels.bnb),
  labels.BMCManagement,
  labels.BMCPeriphery,
  labels.BTSCore,
  labels.BTSPeriphery
];
// add of genericToken
const EXACT_NO_LABELS_IN_BSC = bscValidLabels.length + 1;
const iconValidLabels = [
  ...tokenLabels.filter((el) => el !== labels.icx),
  labels.bmc,
  labels.bts
];

const _schema = Joi.object({
  bsc: Joi.object()
    .pattern(
      Joi.any().valid(...networkArray),
      Joi.object({
        genericToken: Joi.any()
      })
        .pattern(
          Joi.any().valid(...bscValidLabels),
          Joi.object({
            abi: Joi.any(),
            address: Joi.string()
              .pattern(/0x([a-fA-F0-9]{40})/)
              .required(),
            implementation: Joi.object({
              address: Joi.string().allow(null),
              abi: Joi.any()
            })
          })
        )
        .length(EXACT_NO_LABELS_IN_BSC)
    )
    .length(networkArray.length)
    .required(),
  icon: Joi.object()
    .pattern(
      Joi.any().valid(...networkArray),
      Joi.object()
        .pattern(
          Joi.any().valid(...iconValidLabels),
          Joi.object({
            address: Joi.string()
              .pattern(/cx([a-fA-F0-9]{40})/)
              .required()
          })
        )
        .length(iconValidLabels.length)
    )
    .length(networkArray.length)
    .required()
});

function _validateAbiData(data: unknown) {
  const { error } = _schema.validate(data);
  if (error) {
    throw new Error(
      `Invalid external abi data. Error: ${JSON.stringify(
        error.message,
        null,
        1
      )}`
    );
  }
}

function _dbService() {
  let abiData = require("../../data/abiData.js");
  return {
    read() {
      return abiData;
    },
    write(data: unknown) {
      _validateAbiData(data);
      abiData = data;
    }
  };
}

export const dbService = _dbService();
