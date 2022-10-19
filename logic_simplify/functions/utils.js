"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAndList = exports.toOrList = exports.contains = exports.fullPerm = exports.getTruthTable = exports.findPredicates = exports.parseString = void 0;
var parser_1 = require("../parser/parser");
var and_1 = require("../logic/and");
var or_1 = require("../logic/or");
var not_1 = require("../logic/not");
var literal_1 = require("../logic/literal");
var xor_1 = require("../logic/xor");
var _ = require("lodash");
//parse tht query string to typescript pojo
function parseString(expression) {
    return (0, parser_1.parse)(expression, { buildAndNode: and_1.buildAndNode, buildOrNode: or_1.buildOrNode, buildNotNode: not_1.buildNotNode, buildLiteralNode: literal_1.buildLiteralNode });
}
exports.parseString = parseString;
//get the literal predicats in the expression
function findPredicates(expression) {
    var findSet = new Set();
    findLiteral(expression, findSet);
    return findSet;
}
exports.findPredicates = findPredicates;
function findLiteral(expression, set) {
    if (expression instanceof literal_1.Literal) {
        set.add(expression.param);
        return;
    }
    if (expression instanceof and_1.And || expression instanceof or_1.Or || expression instanceof xor_1.Xor) {
        findLiteral(expression.paramA, set);
        findLiteral(expression.paramB, set);
    }
    else if (expression instanceof not_1.Not) {
        findLiteral(expression.param, set);
    }
}
function getTruthTable(variables, expression) {
    var truthTable = [];
    var fullList = fullPerm(variables.length);
    for (var i = 0; i < fullList.length; i++) {
        var map = new Map();
        for (var j = 0; j < fullList[i].length; j++) {
            var element = fullList[i][j];
            map.set(variables[j], element == 0 ? false : true);
        }
        if (getTruthValue(expression, map) == true) {
            truthTable.push(_.cloneDeep(fullList[i]));
        }
    }
    return truthTable;
}
exports.getTruthTable = getTruthTable;
function getTruthValue(expression, literalMap) {
    if (expression instanceof literal_1.Literal) {
        return literalMap.get(expression.param);
    }
    else if (expression instanceof and_1.And) {
        return getTruthValue(expression.paramA, literalMap) && getTruthValue(expression.paramB, literalMap);
    }
    else if (expression instanceof or_1.Or) {
        return getTruthValue(expression.paramA, literalMap) || getTruthValue(expression.paramB, literalMap);
    }
    else if (expression instanceof not_1.Not) {
        return !getTruthValue(expression.param, literalMap);
    }
    //todo Xor(unnecessary)
}
// generate full permutation with 0,1
function fullPerm(length) {
    var fullList = [];
    var list = [];
    sift(length, list, fullList);
    return fullList;
}
exports.fullPerm = fullPerm;
function sift(length, list, fullList) {
    if (list.length == length) {
        fullList.push(_.cloneDeep(list));
        return;
    }
    for (var i = 0; i < 2; i++) {
        list.push(i);
        sift(length, list, fullList);
        list.pop();
    }
}
function contains(arr, a) {
    for (var i = 0; i < arr.length; i++) {
        var element = arr[i];
        if (_.isEqual(element, a)) {
            return true;
        }
    }
    return false;
}
exports.contains = contains;
function toOrList(lists) {
    var temp = '';
    if (lists.length == 0) {
        throw Error('can\'t cast empty list');
    }
    temp += lists[0];
    if (lists.length == 1) {
        temp = '(' + temp + ')';
        return temp;
    }
    for (var i = 1; i < lists.length; i++) {
        temp += ' or ' + lists[i];
    }
    temp = '(' + temp + ')';
    return temp;
}
exports.toOrList = toOrList;
function toAndList(lists) {
    var temp = '';
    if (lists.length == 0) {
        throw Error('can\'t cast empty list');
    }
    temp += lists[0];
    if (lists.length == 1) {
        temp = '(' + temp + ')';
        return temp;
    }
    for (var i = 1; i < lists.length; i++) {
        temp += ' and ' + lists[i];
    }
    temp = '(' + temp + ')';
    return temp;
}
exports.toAndList = toAndList;
//# sourceMappingURL=utils.js.map