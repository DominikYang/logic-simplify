import { parseString } from "../functions/utils";
import { And } from "../logic/and";
import { Literal } from "../logic/literal";
import { Or } from "../logic/or";
import { Not } from "../logic/not";

describe('test basic functions', () => {
  test('basic or function', () => {
    // console.log('basic or');
    let testVar = 'A:foo or B:baz';
    let expectResult = new Or(new Literal('A : foo'), new Literal('B : baz'));
    expect(parseString(testVar)).toEqual(expectResult);
  })

  test('basic and function', () => {
    // console.log('basic and');
    let testVar = 'A:foo and B:baz';
    let expectResult = new And(new Literal('A : foo'), new Literal('B : baz'));
    expect(parseString(testVar)).toEqual(expectResult);
  })

  test('basic not function', () => {
    // console.log('basic not');
    let testVar = 'not A:foo';
    let expectResult = new Not(new Literal('A : foo'));
    expect(parseString(testVar)).toEqual(expectResult);
  })

  test('single literal', () => {
    // console.log('single literal');
    let testVar = 'A:foo';
    let expectResult = new Literal('A : foo');
    expect(parseString(testVar)).toEqual(expectResult);
  })

  
})

describe('test functions with brancket', () => {

  test('basic or function with bracket', () => {
    // console.log('basic or with bracket');
    let testVar = 'A:foo or B:baz';
    let expectResult = new Or(new Literal('A : foo'), new Literal('B : baz'));
    expect(parseString(testVar)).toEqual(expectResult);
  })

  test('basic and function with bracket', () => {
    // console.log('basic and with bracket');
    let testVar = '(A:foo and B:baz)';
    let expectResult = new And(new Literal('A : foo'), new Literal('B : baz'));
    expect(parseString(testVar)).toEqual(expectResult);
  })

  test('basic not function with bracket', () => {
    // console.log('basic not with bracket');
    let testVar = 'not (A:foo)';
    let expectResult = new Not(new Literal('A : foo'));
    expect(parseString(testVar)).toEqual(expectResult);
  })

  test('single literal with bracket', () => {
    // console.log('single literal with bracket');
    let testVar = '(A:foo)';
    let expectResult = new Literal('A : foo');
    expect(parseString(testVar)).toEqual(expectResult);
  })
})

describe('test functions with brancket', () => {

  test('basic or function with bracket', () => {
    // console.log('basic or with bracket');
    let testVar = 'A:foo or B:baz';
    let expectResult = new Or(new Literal('A : foo'), new Literal('B : baz'));
    expect(parseString(testVar)).toEqual(expectResult);
  })

  test('basic and function with bracket', () => {
    // console.log('basic and with bracket');
    let testVar = '(A:foo and B:baz)';
    let expectResult = new And(new Literal('A : foo'), new Literal('B : baz'));
    expect(parseString(testVar)).toEqual(expectResult);
  })

  test('basic not function with bracket', () => {
    // console.log('basic not with bracket');
    let testVar = 'not (A:foo)';
    let expectResult = new Not(new Literal('A : foo'));
    expect(parseString(testVar)).toEqual(expectResult);
  })

  test('single literal with bracket', () => {
    let testVar = '(A:foo)';
    let expectResult = new Literal('A : foo');
    expect(parseString(testVar)).toEqual(expectResult);
  })
})


describe('complex functions test', () => {

  test('A:foo and (not B:baz or not C:ker)', () => {
    let testVar = 'A:foo and ( not B:baz or not C:ker)'
    let expectResult = new And(new Literal('A:foo'), new Or(new Not(new Literal('B:baz')), new Not(new Literal('C:ker'))));
  })

  test('not (A:(foo or baz) and (not B:baz or (not C:ker and D:mes)))   ', () => {
    let testVar = 'not (A:(foo or baz) and (not B:baz or (not C:ker and D:mes)))'
    let expectResult = new Not(new And(new Literal('A : foo'),new Or(new Not(new Literal('B : baz')),new And(new Literal('C : ker'),new Literal('D : mes')))));
  })
})



