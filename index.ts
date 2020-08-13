import { findPredicates, parseString } from "./functions/utils";
import { simplyfyLogic } from "./functions/quine_mccluskey_algorithm";
import { ParseError } from "./error/parse_error";
import { timeLog } from "console";


/**
 * 
 * @param expression the raw query string
 * @param limit size of predicates. when predicates is larger than 8 ,it may lead to very long simplification times
 */
export function toCNF(expression: string, limit: number = 8) {
  return simplyfyLogic(expression.trim(), 'cnf', limit);
}

/**
 * 
 * @param expression the raw query string
 * @param limit size of predicates. when predicates is larger than 8 ,it may lead to very long simplification times
 */
export function toDNF(expression: string, limit: number = 8) {
  return simplyfyLogic(expression.trim(), 'dnf', limit);
}

console.log(toCNF('A:foo'));
