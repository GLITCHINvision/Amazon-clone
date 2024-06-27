import {formatCurrency} from "../../scripts/utils/money.js";

describe('test suite: formatCurrency', () => {
  it('convert cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  describe('rounding', () => {
    it('rounds up to the nearest cent', () => {
      expect(formatCurrency(2000.5)).toEqual('20.01');
    });  
    it('rounds down to the nearest number', () => {
      expect(formatCurrency(2000.4)).toEqual('20.00');
    });
    it('handles negative numbers correctly', () => {
      expect(formatCurrency(-2000.6)).toEqual('-20.01');
    });  
  });
});

