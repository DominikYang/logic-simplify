"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAndNode = exports.And = void 0;
var And = /** @class */ (function () {
    function And(A, B) {
        this.A = A;
        this.B = B;
    }
    Object.defineProperty(And.prototype, "paramA", {
        get: function () {
            return this.A;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(And.prototype, "paramB", {
        get: function () {
            return this.B;
        },
        enumerable: false,
        configurable: true
    });
    return And;
}());
exports.And = And;
function buildAndNode(A, B) {
    return new And(A, B);
}
exports.buildAndNode = buildAndNode;
//# sourceMappingURL=and.js.map