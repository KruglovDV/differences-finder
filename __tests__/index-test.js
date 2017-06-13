import path from 'path';
import diff from '../src/getDifferences';

test('difference between JSON files', () => {
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

test('difference between YAML files', () => {
  const firstFile = path.join(__dirname, 'testFiles/first.yml');
  const secondFile = path.join(__dirname, 'testFiles/second.yml');
  const res = {
    host: 'hexlet.io',
    '+ timeout': 20,
    '- timeout': 50,
    '- proxy': '123.234.53.22',
    '+ verbose': true,
  };
  expect(JSON.stringify(diff(firstFile, secondFile))).toBe(JSON.stringify(res));
});
