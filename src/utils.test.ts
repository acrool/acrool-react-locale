import {isEmpty} from './utils';

describe('isEmpty', () => {
    it('應正確判斷空值', () => {
        expect(isEmpty(undefined)).toBe(true);
        expect(isEmpty(null)).toBe(true);
        expect(isEmpty('')).toBe(true);
        expect(isEmpty('   ')).toBe(true);
        expect(isEmpty(0)).toBe(true);
        expect(isEmpty(false)).toBe(true);
        expect(isEmpty({})).toBe(true);
        expect(isEmpty([])).toBe(true);
    });
    it('應正確判斷非空值', () => {
        expect(isEmpty('abc')).toBe(false);
        expect(isEmpty(1)).toBe(false);
        expect(isEmpty(true)).toBe(false);
        expect(isEmpty([1])).toBe(false);
        expect(isEmpty({a: 1})).toBe(false);
        expect(isEmpty(new Date())).toBe(false);
    });
    it('可自訂 isZero/isFalse 行為', () => {
        expect(isEmpty(0, {isZero: false})).toBe(false);
        expect(isEmpty(false, {isFalse: false})).toBe(false);
    });
});

