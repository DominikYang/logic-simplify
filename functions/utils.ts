import { parse } from "../parser/parser";
import { buildAndNode, And } from "../logic/and";
import { buildOrNode, Or } from "../logic/or";
import { buildNotNode, Not } from "../logic/not";
import { buildLiteralNode, Literal } from "../logic/literal";
import { Xor } from "../logic/xor";


//解析传入的字符串，解析成特定的构造模式
export function parseString(expression: string) {
  return parse(expression, { buildAndNode, buildOrNode, buildNotNode, buildLiteralNode });
}

//获取表达式中的符号量
export function findPredicates(expression: And | Or | Not | Literal | Xor) {
  let findSet = new Set<string>();
  findLiteral(expression, findSet);
  return findSet;
}

function findLiteral(expression: And | Or | Not | Literal | Xor, set: Set<string>) {
  if (expression instanceof Literal) {
    set.add(expression.param);
    return;
  }

  if (expression instanceof And || expression instanceof Or || expression instanceof Xor) {
    findLiteral(expression.paramA, set);
    findLiteral(expression.paramB, set);
  } else if (expression instanceof Not) {
    findLiteral(expression.param, set);
  }
}

export function getTruthTable(variables: string[], expression: And | Or | Not | Literal | Xor) {
  let truthTable:Array<Array<number>> = [];
  //0,1全排列，根据全排列去生成map，然后获取真值，建立最小项真值表
  let fullList = fullPerm(variables.length);
  for (let i = 0; i < fullList.length; i++) {
    let map = new Map<string, boolean>();
    for (let j = 0; j < fullList[i].length; j++) {
      const element = fullList[i][j];
      map.set(variables[j], element == 0 ? false : true);
    }
    if (getTruthValue(expression, map) == true) {
      truthTable.push(new Array<number>(...fullList[i]));
    }
  }
  return truthTable;
}


//根据输入的值返回表达式的真值
export function getTruthValue(expression: And | Or | Not | Literal | Xor, literalMap: Map<string, boolean>) {
  if (expression instanceof Literal) {
    return literalMap.get(expression.param);
  } else if (expression instanceof And) {
    return getTruthValue(expression.paramA, literalMap) && getTruthValue(expression.paramB, literalMap);
  } else if (expression instanceof Or) {
    return getTruthValue(expression.paramA, literalMap) || getTruthValue(expression.paramB, literalMap);
  } else if (expression instanceof Not) {
    return !getTruthValue(expression.param, literalMap);
  }
  //todo Xor
}

export function fullPerm(length: number) {
  let fullList: Array<Array<number>> = [];
  let list: Array<number> = [];
  sift(length, list, fullList);
  return fullList;
}

function sift(length: number, list: Array<number>, fullList: Array<Array<number>>) {
  if (list.length == length) {
    fullList.push(new Array(...list));
    return;
  }

  for (let i = 0; i < 2; i++) {
    list.push(i);
    sift(length, list, fullList);
    list.pop();
  }
}

export function contains(arr:Array<Array<number>>,a:Array<number>) {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (JSON.stringify(element) == JSON.stringify(a)) {
      return true;
    }
  }
  return false;
}