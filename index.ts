import { findPredicates, parseString } from "./functions/utils";
import { simplyfyLogic } from "./functions/quine_mccluskey_algorithm";
import { ParseError } from "./error/parse_error";


/**
 * 
 * @param expression the raw query string
 * @param limit size of predicates. when predicates is larger than 8 ,it may lead to very long simplification times
 */
export function toCNF(expression: string, limit: number = 8) {
  let expr: any;
  try {
    expr = parseString(expression);
  } catch (error) {
    throw new ParseError(error, expression);
  }
  let predicates = Array.from(findPredicates(expr));
  if (predicates.length > limit) {
    throw new Error('predicates size is larger than limit value');
  }
  return simplyfyLogic(expr, 'cnf', predicates);
}

/**
 * 
 * @param expression the raw query string
 * @param limit size of predicates. when predicates is larger than 8 ,it may lead to very long simplification times
 */
export function toDNF(expression: string, limit: number = 8) {
  let expr = parseString(expression);
  try {
    expr = parseString(expression);
  } catch (error) {
    throw new ParseError(error, expression);
  }
  let predicates = Array.from(findPredicates(expr));
  if (predicates.length > limit) {
    throw new Error('predicates size is larger than limit value');
  }
  return simplyfyLogic(expr, 'dnf', predicates);
}