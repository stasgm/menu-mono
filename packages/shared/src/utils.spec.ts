import { isNonEmptyArray } from './utils';

describe('isNonEmptyArray', () => {
  it('should return false for []', () => {
    expect(isNonEmptyArray([])).toBeFalsy;
  });

  it('should return true for [2, 3]', () => {
    expect(isNonEmptyArray([2, 3])).toBeTruthy;
  });
});
