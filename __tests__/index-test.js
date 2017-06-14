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

const recRes = `{
    common: {
        setting1: Value 1
      - setting2: 200
        setting3: true
      - setting6: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;

test('difference between JSON recursive files', () => {
  const firstFile = path.join(__dirname, '__fixtures__/recursFirst.json');
  const secondFile = path.join(__dirname, '__fixtures__/recursSecond.json');
  expect(diff(firstFile, secondFile)).toEqual(recRes);
});

test('difference between YAML recursive files', () => {
  const firstFile = path.join(__dirname, '__fixtures__/recursFirst.yml');
  const secondFile = path.join(__dirname, '__fixtures__/recursSecond.yml');
  expect(diff(firstFile, secondFile)).toEqual(recRes);
});

test('difference between INI recursive files', () => {
  const firstFile = path.join(__dirname, '__fixtures__/recursFirst.json');
  const secondFile = path.join(__dirname, '__fixtures__/recursSecond.json');
  expect(diff(firstFile, secondFile)).toEqual(recRes);
});

test('difference between INI recursive files', () => {
  const firstFile = path.join(__dirname, '__fixtures__/recursFirst.ini');
  const secondFile = path.join(__dirname, '__fixtures__/recursSecond.ini');
  expect(diff(firstFile, secondFile)).toEqual(recRes);
});
