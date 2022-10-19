"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOrNode = exports.Or = void 0;
var Or = /** @class */ (function () {
    function Or(A, B) {
        this.A = A;
        this.B = B;
    }
    Object.defineProperty(Or.prototype, "paramA", {
        get: function () {
            return this.A;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Or.prototype, "paramB", {
        get: function () {
            return this.B;
        },
        enumerable: false,
        configurable: true
    });
    return Or;
}());
exports.Or = Or;
function buildOrNode(A, B) {
    return new Or(A, B);
}
exports.buildOrNode = buildOrNode;
//# sourceMappingURL=or.js.map