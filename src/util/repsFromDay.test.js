import repsFromDay from './repsFromDay';

test('calculates correctly', () => {
  expect(repsFromDay(2)).toBe('5 5 4');
});

test('calculates correctly with overflow', () => {
  expect(repsFromDay(4)).toBe('6 5 5');
});
