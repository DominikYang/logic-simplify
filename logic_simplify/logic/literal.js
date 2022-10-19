"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLiteralNode = exports.Literal = void 0;
var Literal = /** @class */ (function () {
    function Literal(parameter) {
        this.parameter = parameter;
    }
    Object.defineProperty(Literal.prototype, "param", {
        get: function () {
            return this.parameter;
        },
        enumerable: false,
        configurable: true
    });
    return Literal;
}());
exports.Literal = Literal;
function buildLiteralNode(parameter) {
    return new Literal(parameter);
}
exports.buildLiteralNode = buildLiteralNode;
//# sourceMappingURL=literal.js.map