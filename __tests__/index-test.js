import path from 'path';
import diff from '../src/difference';

test('difference between files', () => {
  const firstFile = path.join(__dirname, 'testFiles/first.json');
  const secondFile = path.join(__dirname, 'testFiles/second.json');
  const res = {
    host: 'hexlet.io',
    '+ timeout': 20,
    '- timeout': 50,
    '- proxy': '123.234.53.22',
    '+ verbose': true,
  };
  expect(JSON.stringify(diff(firstFile, secondFile))).toBe(JSON.stringify(res));
});
