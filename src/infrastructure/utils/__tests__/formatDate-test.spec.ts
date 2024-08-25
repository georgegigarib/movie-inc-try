import { formatDate } from '@/src/infrastructure/utils/formatDate';

describe('formatDate', () => {
  it('should correctly format a valid date string in yyyy-mm-dd format', () => {
    const inputDate = '2024-08-21';
    const expectedDate = 'Aug 21, 2024';
    
    expect(formatDate(inputDate)).toBe(expectedDate);
  });

  it('should correctly format a date string with single-digit month and day', () => {
    const inputDate = '2024-01-05';
    const expectedDate = 'Jan 5, 2024';
    
    expect(formatDate(inputDate)).toBe(expectedDate);
  });

  it('should handle leap year dates correctly', () => {
    const inputDate = '2020-02-29';
    const expectedDate = 'Feb 29, 2020';
    
    expect(formatDate(inputDate)).toBe(expectedDate);
  });
});
