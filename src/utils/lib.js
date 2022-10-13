"use strict";
function getBTPAddress(network, account) {
    let result = null;
    if (typeof network === "string" && typeof account === "string") {
        result = `btp://${network}/${account}`;
    }
    return result;
}
module.exports = {
    getBTPAddress
};
//# sourceMappingURL=lib.js.map