"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildNotNode = exports.Not = void 0;
var Not = /** @class */ (function () {
    function Not(parameter) {
        this.parameter = parameter;
    }
    Object.defineProperty(Not.prototype, "param", {
        get: function () {
            return this.parameter;
        },
        enumerable: false,
        configurable: true
    });
    return Not;
}());
exports.Not = Not;
function buildNotNode(parameter) {
    return new Not(parameter);
}
exports.buildNotNode = buildNotNode;
//# sourceMappingURL=not.js.map