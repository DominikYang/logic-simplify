import { parseString } from "../functions/utils";
import { And } from "../logic/and";
import { Literal } from "../logic/literal";
import { Or } from "../logic/or";
import { Not } from "../logic/not";

describe('test basic functions', () => {
  test('basic or function', () => {
    // console.log('basic or');
    let testVar = ' A or B ';
    let expectResult = new Or(new Literal('A'), new Literal('B'));
    expect(parseString(testVar)).toEqual(expectResult);
  })

  test('basic and function', () => {
    // console.log('basic and');
    let testVar = 'A and B';
    let expectResult = new And(new Literal('A'), new Literal('B'));
    expect(parseString(testVar)).toEqual(expectResult);
  })

  test('basic not function', () => {
    // console.log('basic not');
    let testVar = 'not A ';
    let expectResult = new Not(new Literal('A'));
    expect(parseString(testVar)).toEqual(expectResult);
  })

  test('single literal', () => {
    // console.log('single literal');
    let testVar = ' A';
    let expectResult = new Literal('A');
    expect(parseString(testVar)).toEqual(expectResult);
  })

})

describe('test functions with bracket', () => {

  test('basic or function with bracket', () => {
    // console.log('basic or with bracket');
    let testVar = 'A or B';
    let expectResult = new Or(new Literal('A'), new Literal('B'));
    expect(parseString(testVar)).toEqual(expectResult);
  })

  test('basic and function with bracket', () => {
    // console.log('basic and with bracket');
    let testVar = '( A and B )';
    let expectResult = new And(new Literal('A'), new Literal('B'));
    expect(parseString(testVar)).toEqual(expectResult);
  })
  test('single literal with bracket', () => {
    // console.log('single literal with bracket');
    let testVar = 'A';
    let expectResult = new Literal('A');
    expect(parseString(testVar)).toEqual(expectResult);
  })
})

describe('test functions with brancket', () => {

  test('basic or function with bracket', () => {
    // console.log('basic or with bracket');
    let testVar = '(A or B)';
    let expectResult = new Or(new Literal('A'), new Literal('B'));
    expect(parseString(testVar)).toEqual(expectResult);
  })

  test('basic and function with bracket', () => {
    // console.log('basic and with bracket');
    let testVar = '    (     A     and      B     )    '.trim();
    let expectResult = new And(new Literal('A'), new Literal('B'));
    expect(parseString(testVar)).toEqual(expectResult);
  })

  test('basic not function with bracket', () => {
    // console.log('basic not with bracket');
    let testVar = 'not A or not B';
    let expectResult = new Not(new Literal('A'));
    expect(parseString(testVar)).toEqual(expectResult);
  })

  test('single literal with bracket', () => {
    let testVar = '(A)';
    let expectResult = new Literal('A');
    expect(parseString(testVar)).toEqual(expectResult);
  })
})


describe('complex functions test', () => {
  test('single literal with bracket', () => {
    let testVar = '   filter0 and   ( filter1   or (    not   filter2 and    filter3   )  ) '.trim();
    
    let expectResult = new And(new Literal('filter0'), new Or(new Literal('filter1'), new And(new Not(new Literal('filter2')), new Literal('filter3'))));
    expect(parseString(testVar)).toEqual(expectResult);
  })
})



