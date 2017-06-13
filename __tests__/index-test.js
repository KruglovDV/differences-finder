import path from 'path';
import diff from '../src/';

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
  expect(diff(firstFile, secondFile)).toEqual(res);
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
  expect(diff(firstFile, secondFile)).toEqual(res);
});

test('difference between INI files', () => {
  const firstFile = path.join(__dirname, 'testFiles/first.ini');
  const secondFile = path.join(__dirname, 'testFiles/second.ini');
  const res = {
    host: 'hexlet.io',
    '+ timeout': '20',
    '- timeout': '50',
    '- proxy': '123.234.53.22',
    '+ verbose': true,
  };
  expect(diff(firstFile, secondFile)).toEqual(res);
});
