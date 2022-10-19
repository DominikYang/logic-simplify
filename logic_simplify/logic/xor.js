"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildXorNode = exports.Xor = void 0;
var Xor = /** @class */ (function () {
    function Xor(A, B) {
        this.A = A;
        this.B = B;
    }
    Object.defineProperty(Xor.prototype, "paramA", {
        get: function () {
            return this.A;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Xor.prototype, "paramB", {
        get: function () {
            return this.B;
        },
        enumerable: false,
        configurable: true
    });
    return Xor;
}());
exports.Xor = Xor;
function buildXorNode(A, B) {
    return new Xor(A, B);
}
exports.buildXorNode = buildXorNode;
//# sourceMappingURL=xor.js.map