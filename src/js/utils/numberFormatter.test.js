import numberFormatter from './numberFormatter';

describe('numberFormatter', () => {
  it('formats number correctly', () => {
    expect(numberFormatter(1200, 1)).toEqual('1.2k');
  });

  it('returns empty string for invalid number', () => {
    expect(numberFormatter(null, 1)).toEqual('');
  });
});
