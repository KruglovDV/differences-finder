import path from 'path';
import diff from '../src/';

const res = {
  host: { type: 'unchanged', value: 'hexlet.io' },
  timeout: { type: 'updated', after: 20, before: 50 },
  proxy: { type: 'removed', value: '123.234.53.22' },
  verbose: { type: 'added', value: true },
};

test('difference between JSON files', () => {
  const firstFile = path.join(__dirname, '__fixtures__/first.json');
  const secondFile = path.join(__dirname, '__fixtures__/second.json');
  expect(diff(firstFile, secondFile, 'json')).toEqual(res);
});

test('difference between YAML files', () => {
  const firstFile = path.join(__dirname, '__fixtures__/first.yml');
  const secondFile = path.join(__dirname, '__fixtures__/second.yml');
  expect(diff(firstFile, secondFile, 'json')).toEqual(res);
});

test('difference between INI files', () => {
  const resIni = {
    host: { type: 'unchanged', value: 'hexlet.io' },
    timeout: { type: 'updated', after: '20', before: '50' },
    proxy: { type: 'removed', value: '123.234.53.22' },
    verbose: { type: 'added', value: true },
  };
  const firstFile = path.join(__dirname, '__fixtures__/first.ini');
  const secondFile = path.join(__dirname, '__fixtures__/second.ini');
  expect(diff(firstFile, secondFile, 'json')).toEqual(resIni);
});

const recRes = {
  common: {
    type: 'unchanged',
    value: {
      setting1: { type: 'unchanged', value: 'Value 1' },
      setting2: { type: 'removed', value: 200 },
      setting3: { type: 'unchanged', value: true },
      setting6: {
        type: 'removed',
        value: {
          key: { type: 'removed', value: 'value' },
        },
      },
      setting4: { type: 'added', value: 'blah blah' },
      setting5: {
        type: 'added',
        value: {
          key5: { type: 'added', value: 'value5' },
        },
      },
    },
  },
  group1: {
    type: 'unchanged',
    value: {
      baz: { type: 'updated', before: 'bas', after: 'bars' },
      foo: { type: 'unchanged', value: 'bar' },
    },
  },
  group2: {
    type: 'removed',
    value: {
      abc: { type: 'removed', value: 12345 },
    },
  },
  group3: {
    type: 'added',
    value: {
      fee: { type: 'added', value: 100500 },
    },
  },
};

test('difference between JSON recursive files', () => {
  const firstFile = path.join(__dirname, '__fixtures__/recursFirst.json');
  const secondFile = path.join(__dirname, '__fixtures__/recursSecond.json');
  expect(diff(firstFile, secondFile, 'json')).toEqual(recRes);
});

test('difference between YAML recursive files', () => {
  const firstFile = path.join(__dirname, '__fixtures__/recursFirst.yml');
  const secondFile = path.join(__dirname, '__fixtures__/recursSecond.yml');
  expect(diff(firstFile, secondFile, 'json')).toEqual(recRes);
});

test('difference between INI recursive files', () => {
  const firstFile = path.join(__dirname, '__fixtures__/recursFirst.json');
  const secondFile = path.join(__dirname, '__fixtures__/recursSecond.json');
  expect(diff(firstFile, secondFile, 'json')).toEqual(recRes);
});
