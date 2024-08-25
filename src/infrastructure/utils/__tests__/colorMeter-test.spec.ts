import { getColorForVote } from '@/src/infrastructure/utils/colotMeter';

describe('getColorForVote', () => {
  test.each([
    [0, '#CC000000'],
    [1, '#CC0000'],
    [1.5, '#CC3700'],
    [2, '#CC3700'],
    [2.5, '#CC513A'],
    [3, '#CC513A'],
    [3.5, '#CC7300'],
    [4, '#CC7300'],
    [4.5, '#CC8400'],
    [5, '#CC8400'],
    [5.5, '#CCAC00'],
    [6, '#CCAC00'],
    [6.5, '#89CC0D'],
    [7, '#89CC0D'],
    [7.5, '#65A800'],
    [8, '#65A800'],
    [8.5, '#289B1A'],
    [9, '#289B1A'],
    [9.5, '#004B00'],
    [10, '#004B00'],
  ])('returns correct color for measure %p', (measure, expectedColor) => {
    expect(getColorForVote(measure)).toBe(expectedColor);
  });
});
