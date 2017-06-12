import diff from '../src/difference';

test('difference between files', () => {
  const firstFile = '/Users/Kruglov/Documents/test/first.json';
  const secondFile = '/Users/Kruglov/Documents/test/second.json';
  const res = {
    host: 'hexlet.io',
    '+ timeout': 20,
    '- timeout': 50,
    '- proxy': '123.234.53.22',
    '+ verbose': true,
  };
  expect(JSON.stringify(diff(firstFile, secondFile))).toBe(JSON.stringify(res));
});
