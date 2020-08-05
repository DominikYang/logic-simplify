import { parseString, findPredicates } from "./utils";

export function simplyfyLogic(expression: string, form: string) {
  let expr = parseString(expression);
  //筛选出literal类型的元素，添加到set里面
  let predicatesSet = findPredicates(expr);
  //构造真值表（最小项添加进真值表中）
  let truthTable = [];
  //返回SOP或POS
  
}

export function SOPform(variables: string[], minterms: any[]) {
  //算法具体实现
}

export function POSform(variables: string[], minterms: any[]) {
  //算法具体实现
}