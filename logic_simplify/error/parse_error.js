"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseError = void 0;
var lodash_1 = require("lodash");
var ParseError = /** @class */ (function (_super) {
    __extends(ParseError, _super);
    function ParseError(error, expression) {
        var _this = this;
        var message = error.message;
        var fullMessage = [message, expression, (0, lodash_1.repeat)('-', error.location.start.offset) + '^'].join('\n');
        _this = _super.call(this, fullMessage) || this;
        Object.setPrototypeOf(_this, ParseError.prototype);
        _this.name = 'ParseError';
        _this.shortMessage = message;
        _this.returnMessage = "Line ".concat(error.location.start.line, " , column ").concat(error.location.start.column, " : ").concat(_this.shortMessage);
        return _this;
    }
    return ParseError;
}(Error));
exports.ParseError = ParseError;
//# sourceMappingURL=parse_error.js.map