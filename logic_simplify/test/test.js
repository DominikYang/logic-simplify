"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
describe('function runtime test', function () {
    // test('eight predicates run 100 times', () => {
    //   console.time('CNF eight predicates run 100 times');
    //   for (let i = 0; i < 100; i++) {
    //     expect(toCNF('(A:foo and B:baz and C:qer and not D:ker and E:frind and F:par and G:gar) or H:hum',9)).toEqual(expect.any(String));
    //   }
    //   console.timeEnd('CNF eight predicates run 100 times');
    //   console.time('DNF eight predicates run 100 times');
    //   for (let i = 0; i < 100; i++) {
    //     expect(toDNF('(A:foo or B:baz or C:qer or not D:ker or E:frind or F:par or G:gar) and H:hum',9)).toEqual(expect.any(String));
    //   }
    //   console.timeEnd('DNF eight predicates run 100 times');
    // });
    test('seven predicates run 100 times', function () {
        console.time('CNF seven predicates run 100 times');
        for (var i = 0; i < 100; i++) {
            expect((0, __1.toCNF)('(A and B and C and D and E and F) or G')).toEqual(expect.any(String));
        }
        console.timeEnd('CNF seven predicates run 100 times');
        console.time('DNF seven predicates run 100 times');
        for (var i = 0; i < 100; i++) {
            expect((0, __1.toDNF)('(A or B or C or D or E or F) and G')).toEqual(expect.any(String));
        }
        console.timeEnd('DNF seven predicates run 100 times');
    });
    test('six predicates run 100 times', function () {
        console.time('CNF six predicates run 100 times');
        for (var i = 0; i < 100; i++) {
            expect((0, __1.toCNF)('(A and B and C and D and E) or F')).toEqual(expect.any(String));
        }
        console.timeEnd('CNF six predicates run 100 times');
        console.time('DNF six predicates run 100 times');
        for (var i = 0; i < 100; i++) {
            expect((0, __1.toDNF)('(A or B or C or D or E) and F')).toEqual(expect.any(String));
        }
        console.timeEnd('DNF six predicates run 100 times');
    });
    test('five predicates run 100 times', function () {
        console.time('CNF five predicates run 100 times');
        for (var i = 0; i < 100; i++) {
            expect((0, __1.toCNF)('(A:foo and B:baz and C:qer and D:ker) or  E:frind')).toEqual(expect.any(String));
        }
        console.timeEnd('CNF five predicates run 100 times');
        console.time('DNF five predicates run 100 times');
        for (var i = 0; i < 100; i++) {
            expect((0, __1.toDNF)('(A:foo or B:baz or C:qer or D:ker) and  E:frind')).toEqual(expect.any(String));
        }
        console.timeEnd('DNF five predicates run 100 times');
    });
    test('four predicates run 100 times', function () {
        console.time('CNF four predicates run 100 times');
        for (var i = 0; i < 100; i++) {
            expect((0, __1.toCNF)('(A:foo and B:baz and C:qer) or  D:ker')).toEqual(expect.any(String));
        }
        console.timeEnd('CNF four predicates run 100 times');
        console.time('DNF four predicates run 100 times');
        for (var i = 0; i < 100; i++) {
            expect((0, __1.toDNF)('(A:foo or B:baz or C:qer) and  D:ker')).toEqual(expect.any(String));
        }
        console.timeEnd('DNF four predicates run 100 times');
    });
});
describe('toCNF test', function () {
    test('one single predicate to simplyfy', function () {
        expect((0, __1.toCNF)('A:foo')).toEqual('A : foo');
    });
    test('simplified expression which is the simplist', function () {
        expect((0, __1.toCNF)('A:foo and B:foo')).toEqual('A : foo and B : foo');
    });
});
describe('toDNF test', function () {
    test('one single predicate to simplyfy', function () {
        expect((0, __1.toDNF)('A:foo')).toEqual('A : foo');
    });
    test('complex expression test', function () {
        var testVar = 'not (A : arm or not (B:baz* and C:car or D:\"dog\" and not (E : (edge* or ears))))';
        expect((0, __1.toDNF)(testVar)).toEqual(expect.any(String));
    });
    test('simplified expression which is the simplist', function () {
        expect((0, __1.toDNF)('A:foo and B:foo')).toEqual('A : foo and B : foo');
        expect((0, __1.toCNF)('A:foo and B:foo')).toEqual('A : foo and B : foo');
    });
});
//# sourceMappingURL=test.js.map