import path from 'path';
import diff from '../src/';

const res = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  + verbose: true\n}';

test('difference between JSON files', () => {
  const firstFile = path.join(__dirname, 'testFiles/first.json');
  const secondFile = path.join(__dirname, 'testFiles/second.json');
  expect(diff(firstFile, secondFile)).toEqual(res);
});

test('difference between YAML files', () => {
  const firstFile = path.join(__dirname, 'testFiles/first.yml');
  const secondFile = path.join(__dirname, 'testFiles/second.yml');
  expect(diff(firstFile, secondFile)).toEqual(res);
});

test('difference between INI files', () => {
  const firstFile = path.join(__dirname, 'testFiles/first.ini');
  const secondFile = path.join(__dirname, 'testFiles/second.ini');
  expect(diff(firstFile, secondFile)).toEqual(res);
});
