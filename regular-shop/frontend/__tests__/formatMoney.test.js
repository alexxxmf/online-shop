import formatMoney from '../lib/formatMoney';

describe('formatMoney function', () => {
    it('works with fractional dollars', () => {
        expect(formatMoney(5)).toEqual('$0.05');
        expect(formatMoney(50)).toEqual('$0.50');
    });
    it('removes cents for whole dollar', () => {
        expect(formatMoney(500)).toEqual('$5');
        expect(formatMoney(5000)).toEqual('$50');
    });
    it('works with whole and fractional dollars', () => {
        expect(formatMoney(540)).toEqual('$5.40');
        expect(formatMoney(329)).toEqual('$3.29');
    });
});