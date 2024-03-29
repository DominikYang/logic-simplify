import { parse } from "../parser/parser";
import { buildAndNode, And } from "../logic/and";
import { buildOrNode, Or } from "../logic/or";
import { buildNotNode, Not } from "../logic/not";
import { buildLiteralNode, Literal } from "../logic/literal";
import { Xor } from "../logic/xor";
import _ = require("lodash");


//parse tht query string to typescript pojo
export function parseString(expression: string) {
  return parse(expression, { buildAndNode, buildOrNode, buildNotNode, buildLiteralNode });
}

//get the literal predicats in the expression
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
  let fullList = fullPerm(variables.length);
  for (let i = 0; i < fullList.length; i++) {
    let map = new Map<string, boolean>();
    for (let j = 0; j < fullList[i].length; j++) {
      const element = fullList[i][j];
      map.set(variables[j], element == 0 ? false : true);
    }
    if (getTruthValue(expression, map) == true) {
      truthTable.push(_.cloneDeep(fullList[i]));
    }
  }
  return truthTable;
}

function getTruthValue(expression: And | Or | Not | Literal | Xor, literalMap: Map<string, boolean>) {
  if (expression instanceof Literal) {
    return literalMap.get(expression.param);
  } else if (expression instanceof And) {
    return getTruthValue(expression.paramA, literalMap) && getTruthValue(expression.paramB, literalMap);
  } else if (expression instanceof Or) {
    return getTruthValue(expression.paramA, literalMap) || getTruthValue(expression.paramB, literalMap);
  } else if (expression instanceof Not) {
    return !getTruthValue(expression.param, literalMap);
  }
  //todo Xor(unnecessary)
}

// generate full permutation with 0,1
export function fullPerm(length: number) {
  let fullList: Array<Array<number>> = [];
  let list: Array<number> = [];
  sift(length, list, fullList);
  return fullList;
}

function sift(length: number, list: Array<number>, fullList: Array<Array<number>>) {
  if (list.length == length) {
    fullList.push(_.cloneDeep(list));
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
    if (_.isEqual(element,a)) {
      return true;
    }
  }
  return false;
}

export function toOrList(lists: string[]) {
  let temp = '';
  if (lists.length == 0) {
    throw Error('can\'t cast empty list');
  }
  temp += lists[0];
  if (lists.length == 1) {
    temp = '(' + temp + ')';
    return temp;
  }
  for (let i = 1; i < lists.length; i++) {
    temp += ' or ' + lists[i];
  }

  temp = '(' + temp + ')';
  return temp;
}

export function toAndList(lists: string[]) {
  let temp = '';
  if (lists.length == 0) {
    throw Error('can\'t cast empty list');
  }
  temp += lists[0];
  if (lists.length == 1) {
    temp = '(' + temp + ')';
    return temp;
  }
  for (let i = 1; i < lists.length; i++) {
    temp += ' and ' + lists[i];
  }

  temp = '(' + temp + ')';
  return temp;
}