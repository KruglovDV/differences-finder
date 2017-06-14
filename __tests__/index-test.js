import path from 'path';
import diff from '../src/';

const res = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

test('difference between JSON files', () => {
  const firstFile = path.join(__dirname, '__fixtures__/first.json');
  const secondFile = path.join(__dirname, '__fixtures__/second.json');
  expect(diff(firstFile, secondFile)).toEqual(res);
});

test('difference between YAML files', () => {
  const firstFile = path.join(__dirname, '__fixtures__/first.yml');
  const secondFile = path.join(__dirname, '__fixtures__/second.yml');
  expect(diff(firstFile, secondFile)).toEqual(res);
});

test('difference between INI files', () => {
  const firstFile = path.join(__dirname, '__fixtures__/first.ini');
  const secondFile = path.join(__dirname, '__fixtures__/second.ini');
  expect(diff(firstFile, secondFile)).toEqual(res);
});
