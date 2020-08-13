import { getTruthTable, contains, toAndList, toOrList, fullPerm, parseString, findPredicates } from "./utils";
import * as _ from 'lodash';
import { ParseError } from "../error/parse_error";


export function simplyfyLogic(expression: string, form: string, limit: number) {
  let expr: any;
  try {
    expr = parseString(expression);
    // console.log(expr);
  } catch (error) {
    throw new ParseError(error, expression);
  }
  let predicatesSet = findPredicates(expr);
  let predicates = Array.from(predicatesSet);
  if (predicates.length > limit) {
    throw new Error('predicates size is larger than limit value');
  }
  //get truthtable with minterms
  let minterms = getTruthTable(predicates, expr);
  if (form == 'dnf') {
    return SOPform(predicates, minterms);
  }
  return POSform(predicates, minterms);
}

export function SOPform(variables: string[], minterms: any[]) {
  let oldTerm = [];
  let newTerm = _.cloneDeep(minterms);
  while (JSON.stringify(newTerm) != JSON.stringify(oldTerm)) {
    oldTerm = _.cloneDeep(newTerm);
    newTerm = _.cloneDeep(simplyfiedPairs(oldTerm));
  }
  //get final simplyfied table
  let essential = remRedundancy(newTerm, minterms);
  console.log(essential);

  let andList = [];
  for (let i = 0; i < essential.length; i++) {
    andList.push(convertToVarsSOP(essential[i], variables));
  }
  //return string like '(A and B) or (C and D)'
  let result = toOrList(andList);
  result = result.substring(1, result.length - 1);
  return result;
}

export function POSform(variables: string[], minterms: any[]) {
  let fullList = fullPerm(variables.length);

  // maxterms = fullTerms - minterms
  let maxterms = [];
  for (let i = 0; i < fullList.length; i++) {
    if (!contains(minterms, fullList[i])) {
      maxterms.push(_.cloneDeep(fullList[i]));
    }
  }

  let oldTerm = [];
  let newTerm = _.cloneDeep(maxterms);
  while (JSON.stringify(newTerm) != JSON.stringify(oldTerm)) {
    oldTerm = _.cloneDeep(newTerm);
    newTerm = _.cloneDeep(simplyfiedPairs(oldTerm));
  }
  // console.log(oldTerm);

  //get final simplyfied table
  let essential = remRedundancy(newTerm, maxterms);
  console.log(essential);

  let orList = [];
  for (let i = 0; i < essential.length; i++) {
    orList.push(convertToVarsPOS(essential[i], variables));
  }
  //return string like '(A or B) and (C or D)'
  let result = toAndList(orList);
  result = result.substring(1, result.length - 1);
  return result;
}

/**
 * simplify expression
 * @param terms table needs to simplify 
 */
export function simplyfiedPairs(terms: Array<Array<number>>) {
  let simplifiedTerms = new Array<Array<number>>();
  let todo = _.range(0, terms.length, 1)
  for (let i = 0; i < terms.length - 1; i++) {
    for (let j_i = i + 1; j_i < terms.length; j_i++) {
      let index = checkPair(terms[i], terms[j_i]);
      if (index != -1) {
        todo[i] = todo[j_i] = undefined;
        let newterm = _.cloneDeep(terms[i]);
        newterm[index] = 3;
        //add unsimplified terms to result
        if (!contains(simplifiedTerms, newterm)) {
          simplifiedTerms.push(_.cloneDeep(newterm));
        }
      }
    }
  }

  for (let i = 0; i < todo.length; i++) {
    const element = todo[i];

    if (element != undefined) {
      simplifiedTerms.push(_.cloneDeep(terms[i]));
    }
  }

  return simplifiedTerms;
}

/**
 * check every index whether only one different value between two array
 * these two array must have same length
 * @param minterm1 array one
 * @param minterm2 array two
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
 * get the essential arguments
 * @param l1 prime implicant
 * @param terms minterms or maxterms
 */
function remRedundancy(l1: Array<Array<number>>, terms: Array<Array<number>>) {
  
  if (terms.length != 0) {
    let dommatrix: number[][] = [];
    for (let i = 0; i < terms.length; i++) {
      let temp = [];
      for (let j = 0; j < l1.length; j++) {
        temp.push(0);
      }
      dommatrix.push(_.cloneDeep(temp));
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

    // (JSON.stringify(ndTerms) != JSON.stringify(oldNdTerms)
    // (JSON.stringify(ndPrimeImplicants) != JSON.stringify(oldNdPrimeImplicants)
    while ((!_.isEqual(ndTerms, oldNdTerms))
      || !_.isEqual(ndPrimeImplicants, oldNdPrimeImplicants)) {
      oldNdTerms = _.cloneDeep(ndTerms);
      oldNdPrimeImplicants = _.cloneDeep(ndPrimeImplicants);

      for (let rowi = 0; rowi < dommatrix.length; rowi++) {
        if (ndTerms[rowi] != undefined) {
          let temp = []
          for (let _ = 0; _ < ndPrimeImplicants.length; _++) {
            if (ndPrimeImplicants[_] != undefined) {
              temp.push(dommatrix[rowi][ndPrimeImplicants[_]]);
            }
          }
          dommatrix[rowi] = _.cloneDeep(temp);
          for (let row2i = 0; row2i < dommatrix.length; row2i++) {
            if (rowi != row2i && ndTerms[row2i] != undefined) {
              let temp = [];
              for (let _ = 0; _ < ndPrimeImplicants.length; _++) {
                if (ndPrimeImplicants[_] != undefined) {
                  temp.push(dommatrix[row2i][ndPrimeImplicants[_]]);
                }
              }
              dommatrix[row2i] = _.cloneDeep(temp);

              let tBool = true;
              for (let i = 0; i < dommatrix[rowi].length; i++) {
                if (dommatrix[row2i][i] < dommatrix[rowi][i]) {
                  tBool = false;
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
          col = _.cloneDeep(temp);
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
              col2 = _.cloneDeep(temp);

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
    l1 = _.cloneDeep(temp);
    return l1;
  } else {
    return [];
  }
}

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
    // ignore 3
  }
  return toAndList(temp);
}

function convertToVarsPOS(maxterm: number[], variables: string[]) {
  let temp = [];
  for (let i = 0; i < maxterm.length; i++) {
    if (maxterm[i] == 1) {
      temp.push('not ' + variables[i]);
    } else if (maxterm[i] == 0) {
      temp.push(variables[i]);
    }
  }
  //ignore 3
  return toOrList(temp);
}