import path from 'path';
import diff from '../src/';

const res = `Property "timeout" was updated From "50" to "20"
Property "proxy" was removed
Property "verbose" was added with value true`;

test('difference between JSON files', () => {
  const firstFile = path.join(__dirname, '__fixtures__/first.json');
  const secondFile = path.join(__dirname, '__fixtures__/second.json');
  expect(diff(firstFile, secondFile, 'plain')).toEqual(res);
});

test('difference between YAML files', () => {
  const firstFile = path.join(__dirname, '__fixtures__/first.yml');
  const secondFile = path.join(__dirname, '__fixtures__/second.yml');
  expect(diff(firstFile, secondFile, 'plain')).toEqual(res);
});

test('difference between INI files', () => {
  const firstFile = path.join(__dirname, '__fixtures__/first.ini');
  const secondFile = path.join(__dirname, '__fixtures__/second.ini');
  expect(diff(firstFile, secondFile, 'plain')).toEqual(res);
});

const recRes = `Property "common.setting2" was removed
Property "common.setting6" was removed
Property "common.setting4" was added with "blah blah"
Property "common.setting5" was added with complex value
Property "group1.baz" was updated From "bas" to "bars"
Property "group2" was removed
Property "group3" was added with complex value`;

test('difference between JSON recursive files', () => {
  const firstFile = path.join(__dirname, '__fixtures__/recursFirst.json');
  const secondFile = path.join(__dirname, '__fixtures__/recursSecond.json');
  expect(diff(firstFile, secondFile, 'plain')).toEqual(recRes);
});

test('difference between YAML recursive files', () => {
  const firstFile = path.join(__dirname, '__fixtures__/recursFirst.yml');
  const secondFile = path.join(__dirname, '__fixtures__/recursSecond.yml');
  expect(diff(firstFile, secondFile, 'plain')).toEqual(recRes);
});

test('difference between INI recursive files', () => {
  const firstFile = path.join(__dirname, '__fixtures__/recursFirst.json');
  const secondFile = path.join(__dirname, '__fixtures__/recursSecond.json');
  expect(diff(firstFile, secondFile, 'plain')).toEqual(recRes);
});
