"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDNF = exports.toCNF = void 0;
var quine_mccluskey_algorithm_1 = require("./functions/quine_mccluskey_algorithm");
/**
 *
 * @param expression the raw query string
 * @param limit size of predicates. when predicates is larger than 8 ,it may lead to very long simplification times
 */
function toCNF(expression, limit) {
    if (limit === void 0) { limit = 8; }
    return (0, quine_mccluskey_algorithm_1.simplyfyLogic)(expression.trim(), 'cnf', limit);
}
exports.toCNF = toCNF;
/**
 *
 * @param expression the raw query string
 * @param limit size of predicates. when predicates is larger than 8 ,it may lead to very long simplification times
 */
function toDNF(expression, limit) {
    if (limit === void 0) { limit = 8; }
    return (0, quine_mccluskey_algorithm_1.simplyfyLogic)(expression.trim(), 'dnf', limit);
}
exports.toDNF = toDNF;
//# sourceMappingURL=index.js.map