"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simplyfiedPairs = exports.POSform = exports.SOPform = exports.simplyfyLogic = void 0;
var utils_1 = require("./utils");
var _ = require("lodash");
var parse_error_1 = require("../error/parse_error");
function simplyfyLogic(expression, form, limit) {
    var expr;
    try {
        expr = (0, utils_1.parseString)(expression);
        // console.log(expr);
    }
    catch (error) {
        throw new parse_error_1.ParseError(error, expression);
    }
    var predicatesSet = (0, utils_1.findPredicates)(expr);
    var predicates = Array.from(predicatesSet);
    // if (predicates.length >= limit) {
    //   throw new Error('predicates size is euqal or larger than limit value');
    // }
    //get truthtable with minterms
    var minterms = (0, utils_1.getTruthTable)(predicates, expr);
    if (form == 'dnf') {
        return SOPform(predicates, minterms);
    }
    return POSform(predicates, minterms);
}
exports.simplyfyLogic = simplyfyLogic;
function SOPform(variables, minterms) {
    var oldTerm = [];
    var newTerm = _.cloneDeep(minterms);
    while (JSON.stringify(newTerm) != JSON.stringify(oldTerm)) {
        oldTerm = _.cloneDeep(newTerm);
        newTerm = _.cloneDeep(simplyfiedPairs(oldTerm));
    }
    //get final simplyfied table
    var essential = remRedundancy(newTerm, minterms);
    // console.log(essential);
    var andList = [];
    for (var i = 0; i < essential.length; i++) {
        var temp = convertToVarsSOP(essential[i], variables);
        andList.push(temp.substring(1, temp.length - 1));
    }
    //return string like '(A and B) or (C and D)'
    var result = (0, utils_1.toOrList)(andList);
    result = result.substring(1, result.length - 1);
    return result;
}
exports.SOPform = SOPform;
function POSform(variables, minterms) {
    var fullList = (0, utils_1.fullPerm)(variables.length);
    // maxterms = fullTerms - minterms
    var maxterms = [];
    for (var i = 0; i < fullList.length; i++) {
        if (!(0, utils_1.contains)(minterms, fullList[i])) {
            maxterms.push(_.cloneDeep(fullList[i]));
        }
    }
    var oldTerm = [];
    var newTerm = _.cloneDeep(maxterms);
    while (!_.isEqual(oldTerm, newTerm)) {
        oldTerm = _.cloneDeep(newTerm);
        newTerm = _.cloneDeep(simplyfiedPairs(oldTerm));
    }
    //get final simplyfied table
    var essential = remRedundancy(newTerm, maxterms);
    var orList = [];
    for (var i = 0; i < essential.length; i++) {
        var temp = convertToVarsPOS(essential[i], variables);
        orList.push(temp.substring(1, temp.length - 1));
    }
    //return string like '(A or B) and (C or D)'
    var result = (0, utils_1.toAndList)(orList);
    result = result.substring(1, result.length - 1);
    return result;
}
exports.POSform = POSform;
/**
 * simplify expression
 * @param terms table needs to simplify
 */
function simplyfiedPairs(terms) {
    var simplifiedTerms = new Array();
    var todo = _.range(0, terms.length, 1);
    for (var i = 0; i < terms.length - 1; i++) {
        for (var j_i = i + 1; j_i < terms.length; j_i++) {
            var index = checkPair(terms[i], terms[j_i]);
            if (index != -1) {
                todo[i] = todo[j_i] = undefined;
                var newterm = _.cloneDeep(terms[i]);
                newterm[index] = 3;
                //add unsimplified terms to result
                if (!(0, utils_1.contains)(simplifiedTerms, newterm)) {
                    simplifiedTerms.push(_.cloneDeep(newterm));
                }
            }
        }
    }
    for (var i = 0; i < todo.length; i++) {
        var element = todo[i];
        if (element != undefined) {
            simplifiedTerms.push(_.cloneDeep(terms[i]));
        }
    }
    return simplifiedTerms;
}
exports.simplyfiedPairs = simplyfiedPairs;
/**
 * check every index whether only one different value between two array
 * these two array must have same length
 * @param minterm1 array one
 * @param minterm2 array two
 */
function checkPair(minterm1, minterm2) {
    var index = -1;
    for (var x = 0; x < minterm1.length; x++) {
        if (minterm1[x] != minterm2[x]) {
            if (index == -1) {
                index = x;
            }
            else {
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
function remRedundancy(l1, terms) {
    if (terms.length != 0) {
        var dommatrix = [];
        for (var i = 0; i < terms.length; i++) {
            var temp_1 = [];
            for (var j = 0; j < l1.length; j++) {
                temp_1.push(0);
            }
            dommatrix.push(_.cloneDeep(temp_1));
        }
        for (var primei = 0; primei < l1.length; primei++) {
            for (var termi = 0; termi < terms.length; termi++) {
                if (compareTerm(terms[termi], l1[primei])) {
                    dommatrix[termi][primei] = 1;
                }
            }
        }
        var ndPrimeImplicants = _.range(0, l1.length, 1);
        var ndTerms = _.range(0, terms.length, 1);
        var oldNdTerms = [];
        var oldNdPrimeImplicants = [];
        // (JSON.stringify(ndTerms) != JSON.stringify(oldNdTerms)
        // (JSON.stringify(ndPrimeImplicants) != JSON.stringify(oldNdPrimeImplicants)
        while ((!_.isEqual(ndTerms, oldNdTerms))
            || !_.isEqual(ndPrimeImplicants, oldNdPrimeImplicants)) {
            oldNdTerms = _.cloneDeep(ndTerms);
            oldNdPrimeImplicants = _.cloneDeep(ndPrimeImplicants);
            for (var rowi = 0; rowi < dommatrix.length; rowi++) {
                if (ndTerms[rowi] != undefined) {
                    var temp_2 = [];
                    for (var _1 = 0; _1 < ndPrimeImplicants.length; _1++) {
                        if (ndPrimeImplicants[_1] != undefined) {
                            temp_2.push(dommatrix[rowi][ndPrimeImplicants[_1]]);
                        }
                    }
                    dommatrix[rowi] = _.cloneDeep(temp_2);
                    for (var row2i = 0; row2i < dommatrix.length; row2i++) {
                        if (rowi != row2i && ndTerms[row2i] != undefined) {
                            var temp_3 = [];
                            for (var _2 = 0; _2 < ndPrimeImplicants.length; _2++) {
                                if (ndPrimeImplicants[_2] != undefined) {
                                    temp_3.push(dommatrix[row2i][ndPrimeImplicants[_2]]);
                                }
                            }
                            dommatrix[row2i] = _.cloneDeep(temp_3);
                            var tBool = true;
                            for (var i = 0; i < dommatrix[rowi].length; i++) {
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
            var colLen = _.range(0, l1.length, 1);
            for (var coli = 0; coli < colLen.length; coli++) {
                if (ndPrimeImplicants[coli] != undefined) {
                    var col = [];
                    var colRange = _.range(terms.length);
                    for (var a = 0; a < colRange.length; a++) {
                        col.push(dommatrix[colRange[a]][coli]);
                    }
                    var temp_4 = [];
                    for (var _3 = 0; _3 < oldNdTerms.length; _3++) {
                        if (oldNdTerms[_3] != undefined) {
                            temp_4.push(col[oldNdTerms[_3]]);
                        }
                    }
                    col = _.cloneDeep(temp_4);
                    var l1Range = _.range(0, l1.length, 1);
                    for (var col2i = 0; col2i < l1Range.length; col2i++) {
                        if (coli != col2i && ndPrimeImplicants[col2i] != undefined) {
                            var col2 = [];
                            var termRange = _.range(0, terms.length, 1);
                            for (var a = 0; a < termRange.length; a++) {
                                col2.push(dommatrix[termRange[a]][col2i]);
                            }
                            var temp_5 = [];
                            for (var _4 = 0; _4 < oldNdTerms.length; _4++) {
                                if (oldNdTerms[_4] != undefined) {
                                    temp_5.push(col2[oldNdTerms[_4]]);
                                }
                            }
                            col2 = _.cloneDeep(temp_5);
                            var tBool = true;
                            for (var i = 0; i < col.length; i++) {
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
        var temp = [];
        for (var _5 = 0; _5 < ndPrimeImplicants.length; _5++) {
            if (ndPrimeImplicants[_5] != undefined) {
                temp.push(l1[ndPrimeImplicants[_5]]);
            }
        }
        l1 = _.cloneDeep(temp);
        return l1;
    }
    else {
        return [];
    }
}
function compareTerm(minterm, term) {
    for (var i = 0; i < term.length; i++) {
        if (term[i] != 3 && term[i] != minterm[i]) {
            return false;
        }
    }
    return true;
}
function convertToVarsSOP(minterm, variables) {
    var temp = [];
    for (var i = 0; i < minterm.length; i++) {
        if (minterm[i] == 0) {
            temp.push('not ' + variables[i]);
        }
        else if (minterm[i] == 1) {
            temp.push(variables[i]);
        }
        // ignore 3
    }
    return (0, utils_1.toAndList)(temp);
}
function convertToVarsPOS(maxterm, variables) {
    var temp = [];
    for (var i = 0; i < maxterm.length; i++) {
        if (maxterm[i] == 1) {
            temp.push('not ' + variables[i]);
        }
        else if (maxterm[i] == 0) {
            temp.push(variables[i]);
        }
    }
    //ignore 3
    return (0, utils_1.toOrList)(temp);
}
//# sourceMappingURL=quine_mccluskey_algorithm.js.map