"use strict";
class Exception {
    constructor(errObj, prevErrorMessage) {
        this.message = prevErrorMessage;
        this.newError = errObj;
    }
    toString() {
        return `${this.message}.\n${this.newError.message}`;
    }
}
module.exports = Exception;
//# sourceMappingURL=exception.js.map