import { toCNF, toDNF } from ".";

test('six predicates run 100 times', () => {
  console.time();
  expect(toCNF('not (A:foo and B:baz and not (C:qer or D:friend and E:par or not (F:ker)))')).toEqual(expect.any(String));
  console.timeEnd();
});

test('two plus two is four', () => {
  console.time();
  expect(toCNF('not (A:sum and not (B:foo and not (C:qer or not (D:friend and E:par))))')).toEqual(expect.any(String));
  console.timeEnd();
});

test('two plus two is four', () => {
  console.time();
  expect(toCNF('not (A:sum and not (B:foo and not (C:qer or not (D:friend))))')).toEqual(expect.any(String));
  console.timeEnd();
});

describe('toCNF test', () => {
  test('one single predicate to simplyfy', () => {
    expect(toCNF('A:foo')).toEqual('A : foo');
  })

  test('simplified expression which is the simplist', () => {
    expect(toCNF('A:foo and B:foo')).toEqual('A : foo and B : foo');
  })
})
