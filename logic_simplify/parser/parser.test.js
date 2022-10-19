"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../functions/utils");
var and_1 = require("../logic/and");
var literal_1 = require("../logic/literal");
var or_1 = require("../logic/or");
var not_1 = require("../logic/not");
describe('test basic functions', function () {
    test('basic or function', function () {
        // console.log('basic or');
        var testVar = ' A or B ';
        var expectResult = new or_1.Or(new literal_1.Literal('A'), new literal_1.Literal('B'));
        expect((0, utils_1.parseString)(testVar)).toEqual(expectResult);
    });
    test('basic and function', function () {
        // console.log('basic and');
        var testVar = 'A and B';
        var expectResult = new and_1.And(new literal_1.Literal('A'), new literal_1.Literal('B'));
        expect((0, utils_1.parseString)(testVar)).toEqual(expectResult);
    });
    test('basic not function', function () {
        // console.log('basic not');
        var testVar = 'not A ';
        var expectResult = new not_1.Not(new literal_1.Literal('A'));
        expect((0, utils_1.parseString)(testVar)).toEqual(expectResult);
    });
    test('single literal', function () {
        // console.log('single literal');
        var testVar = ' A';
        var expectResult = new literal_1.Literal('A');
        expect((0, utils_1.parseString)(testVar)).toEqual(expectResult);
    });
});
describe('test functions with bracket', function () {
    test('basic or function with bracket', function () {
        // console.log('basic or with bracket');
        var testVar = 'A or B';
        var expectResult = new or_1.Or(new literal_1.Literal('A'), new literal_1.Literal('B'));
        expect((0, utils_1.parseString)(testVar)).toEqual(expectResult);
    });
    test('basic and function with bracket', function () {
        // console.log('basic and with bracket');
        var testVar = '( A and B )';
        var expectResult = new and_1.And(new literal_1.Literal('A'), new literal_1.Literal('B'));
        expect((0, utils_1.parseString)(testVar)).toEqual(expectResult);
    });
    test('single literal with bracket', function () {
        // console.log('single literal with bracket');
        var testVar = 'A';
        var expectResult = new literal_1.Literal('A');
        expect((0, utils_1.parseString)(testVar)).toEqual(expectResult);
    });
});
describe('test functions with brancket', function () {
    test('basic or function with bracket', function () {
        // console.log('basic or with bracket');
        var testVar = '(A or B)';
        var expectResult = new or_1.Or(new literal_1.Literal('A'), new literal_1.Literal('B'));
        expect((0, utils_1.parseString)(testVar)).toEqual(expectResult);
    });
    test('basic and function with bracket', function () {
        // console.log('basic and with bracket');
        var testVar = '    (     A     and      B     )    '.trim();
        var expectResult = new and_1.And(new literal_1.Literal('A'), new literal_1.Literal('B'));
        expect((0, utils_1.parseString)(testVar)).toEqual(expectResult);
    });
    test('basic not function with bracket', function () {
        // console.log('basic not with bracket');
        var testVar = 'not A or not B';
        var expectResult = new not_1.Not(new literal_1.Literal('A'));
        expect((0, utils_1.parseString)(testVar)).toEqual(expectResult);
    });
    test('single literal with bracket', function () {
        var testVar = '(A)';
        var expectResult = new literal_1.Literal('A');
        expect((0, utils_1.parseString)(testVar)).toEqual(expectResult);
    });
});
describe('complex functions test', function () {
    test('single literal with bracket', function () {
        var testVar = '   filter0 and   ( filter1   or (    not   filter2 and    filter3   )  ) '.trim();
        var expectResult = new and_1.And(new literal_1.Literal('filter0'), new or_1.Or(new literal_1.Literal('filter1'), new and_1.And(new not_1.Not(new literal_1.Literal('filter2')), new literal_1.Literal('filter3'))));
        expect((0, utils_1.parseString)(testVar)).toEqual(expectResult);
    });
});
//# sourceMappingURL=parser.test.js.map