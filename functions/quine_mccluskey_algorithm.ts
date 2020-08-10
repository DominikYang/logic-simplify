import { parseString, findPredicates, getTruthTable, contains, toAndList, toOrList, fullPerm } from "./utils";
import * as _ from 'lodash';
export function simplyfyLogic(expression: string, form: string) {
  let expr = parseString(expression);
  //筛选出literal类型的元素，添加到set里面
  let predicatesSet = findPredicates(expr);
  let predicates = Array.from(predicatesSet);
  //构造真值表（最小项添加进真值表中）
  console.log(Array.from(predicatesSet));
  let minterms = getTruthTable(predicates, expr);
  //返回SOP或POS
  if (form == 'dnf') {
    return SOPform(predicates, minterms);
  }
  return POSform(predicates, minterms);
}

export function SOPform(variables: string[], minterms: any[]) {
  let oldTerm = [];
  let newTerm = new Array(...minterms);
  while (JSON.stringify(newTerm) != JSON.stringify(oldTerm)) {
    oldTerm = new Array(...newTerm);
    newTerm = new Array(...simplyfiedPairs(oldTerm));
  }

  let essential = new Array(...remRedundancy(newTerm, minterms));
  let andList = [];
  for (let i = 0; i < essential.length; i++) {
    andList.push(convertToVarsSOP(essential[i],variables));
  }
  let result = toOrList(andList);
  result = result.substring(1, result.length - 1);
  return result;
}

export function POSform(variables: string[], minterms: any[]) {
  let fullList = fullPerm(variables.length);
  let maxterms = [];
  for (let i = 0; i < fullList.length; i++) {
    if (!contains(minterms, fullList[i])) {
      maxterms.push(new Array(...fullList[i]));
    }
  }

  let oldTerm = [];
  let newTerm = new Array(...maxterms);
  while (JSON.stringify(newTerm) != JSON.stringify(oldTerm)) {
    oldTerm = new Array(...newTerm);
    newTerm = new Array(...simplyfiedPairs(oldTerm));
  }
  
  let essential = new Array(...remRedundancy(newTerm, maxterms));
  let orList = [];
  for (let i = 0; i < essential.length; i++) {
    orList.push(convertToVarsPOS(essential[i],variables));
  }
  let result = toAndList(orList);
  result = result.substring(1, result.length - 1);
  return result;
}

/**
 * 化简表达式
 * @param terms 需要化简的真值表
 */
export function simplyfiedPairs(terms: Array<Array<number>>) {
  let simplifiedTerms = new Array<Array<number>>();
  let todo = _.range(0, terms.length, 1)
  // console.log(todo);

  for (let i = 0; i < terms.length - 1; i++) {
    for (let j_i = i + 1; j_i < terms.length; j_i++) {
      let index = checkPair(terms[i], terms[j_i]);
      if (index != -1) {
        todo[i] = todo[j_i] = undefined;
        let newterm = new Array<number>(...terms[i]);
        newterm[index] = 3;

        if (!contains(simplifiedTerms, newterm)) {
          simplifiedTerms.push(new Array(...newterm));
        }
      }
    }
  }

  for (let i = 0; i < todo.length; i++) {
    const element = todo[i];

    if (element != undefined) {
      simplifiedTerms.push(new Array(...terms[i]));
    }
  }

  return simplifiedTerms;
}

/**
 * 检查两个数组是否只有一个位置的元素不同
 * @param minterm1 第一个数组
 * @param minterm2 第二个数组
 */
function checkPair(minterm1: Array<number>, minterm2: Array<number>) {
  let index = -1;
  for (let x = 0; x < minterm1.length; x++) {
    if (minterm1[x] != minterm2[x]) {
      if (index == -1) {
        index = x;
      } else {
        return -1;
      }
    }
  }
  return index;
}


/**
 * 求本质蕴涵项目
 * @param l1 素蕴含项
 * @param terms 最小项或最大项表
 */
function remRedundancy(l1: Array<Array<number>>, terms: Array<Array<number>>) {
  if (terms.length != 0) {
    let dommatrix: number[][] = [];
    for (let i = 0; i < terms.length; i++) {
      let temp = [];

      for (let j = 0; j < l1.length; j++) {
        temp.push(0);
      }
      dommatrix.push(new Array(...temp));
    }

    for (let primei = 0; primei < l1.length; primei++) {

      for (let termi = 0; termi < terms.length; termi++) {
        if (compareTerm(terms[termi], l1[primei])) {
          dommatrix[termi][primei] = 1;
        }
      }
    }

    let ndPrimeImplicants = _.range(0, l1.length, 1);
    let ndTerms = _.range(0, terms.length, 1);

    let oldNdTerms = [];
    let oldNdPrimeImplicants = [];

    while ((JSON.stringify(ndTerms) != JSON.stringify(oldNdTerms))
      || (JSON.stringify(ndPrimeImplicants) != JSON.stringify(oldNdPrimeImplicants))) {
      oldNdTerms = new Array(...ndTerms);
      oldNdPrimeImplicants = new Array(...ndPrimeImplicants);

      for (let rowi = 0; rowi < dommatrix.length; rowi++) {
        if (ndTerms[rowi] != undefined) {
          let temp = []
          for (let _ = 0; _ < ndPrimeImplicants.length; _++) {
            if (ndPrimeImplicants[_] != undefined) {
              temp.push(dommatrix[rowi][ndPrimeImplicants[_]]);
            }
          }
          dommatrix[rowi] = new Array(...temp);
          for (let row2i = 0; row2i < dommatrix.length; row2i++) {
            if (rowi != row2i && ndTerms[row2i] != undefined) {
              let temp = [];
              for (let _ = 0; _ < ndPrimeImplicants.length; _++) {
                if (ndPrimeImplicants[_] != undefined) {
                  temp.push(dommatrix[row2i][ndPrimeImplicants[_]]);
                }
              }
              dommatrix[row2i] = new Array(...temp);

              let tBool = true;
              for (let i = 0; i < dommatrix[rowi].length; i++) {
                if (dommatrix[row2i][i] < dommatrix[rowi][i]) {
                  tBool = false;
                  break;
                }
              }
              if (tBool) {
                ndTerms[row2i] = undefined;
              }
            }
          }
        }
      }
      let colLen = _.range(0, l1.length, 1);
      for (let coli = 0; coli < colLen.length; coli++) {
        if (ndPrimeImplicants[coli] != undefined) {
          let col = [];
          let colRange = _.range(terms.length);
          for (let a = 0; a < colRange.length; a++) {
            col.push(dommatrix[colRange[a]][coli]);
          }
          let temp = [];
          for (let _ = 0; _ < oldNdTerms.length; _++) {
            if (oldNdTerms[_] != undefined) {
              temp.push(col[oldNdTerms[_]]);
            }
          }
          col = new Array(...temp);
          let l1Range = _.range(0, l1.length, 1);
          for (let col2i = 0; col2i < l1Range.length; col2i++) {
            if (coli != col2i && ndPrimeImplicants[col2i] != undefined) {
              let col2 = [];
              let termRange = _.range(0, terms.length, 1);
              for (let a = 0; a < termRange.length; a++) {
                col2.push(dommatrix[termRange[a]][col2i]);
              }
              let temp = [];
              for (let _ = 0; _ < oldNdTerms.length; _++) {
                if (oldNdTerms[_] != undefined) {
                  temp.push(col2[oldNdTerms[_]]);
                }
              }
              col2 = new Array(...temp);

              let tBool = true;
              for (let i = 0; i < col.length; i++) {
                if (col[i] < col2[i]) {
                  tBool = false;
                }
              }
              if (tBool) {
                ndPrimeImplicants[col2i] = undefined;
              }
            }
          }
        }
      }
    }

    let temp = [];
    for (let _ = 0; _ < ndPrimeImplicants.length; _++) {
      if (ndPrimeImplicants[_] != undefined) {
        temp.push(l1[ndPrimeImplicants[_]]);
      }
    }
    l1 = new Array(...temp);
    return l1;
  } else {
    return [];
  }
}

/**
 * 识别素蕴含项
 * @param minterm 最小项
 * @param term 素蕴涵项
 */
function compareTerm(minterm, term): boolean {
  for (let i = 0; i < term.length; i++) {
    if (term[i] != 3 && term[i] != minterm[i]) {
      return false;
    }
  }
  return true;
}

function convertToVarsSOP(minterm: number[], variables: string[]) {
  let temp = [];
  for (let i = 0; i < minterm.length; i++) {
    if (minterm[i] == 0) {
      temp.push('not ' + variables[i]);
    } else if (minterm[i] == 1) {
      temp.push(variables[i]);
    }
  }
  return toAndList(temp);
}

function convertToVarsPOS(maxterm: number[], variables: string[]) {
  let temp = [];
  for (let i = 0; i < maxterm.length; i++) {
    if (maxterm[i] == 0) {
      temp.push('not ' + variables[i]);
    } else if (maxterm[i] == 1) {
      temp.push(variables[i]);
    }
  }
  return toOrList(temp);
}