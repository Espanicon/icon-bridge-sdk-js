// utils/lib.js
//
function getBTPAddress(network: string, account: string): string | null {
  let result = null;

  if (typeof network === "string" && typeof account === "string") {
    result = `btp://${network}/${account}`;
  }

  return result;
}

module.exports = {
  getBTPAddress
};
