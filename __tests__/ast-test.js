import fs from 'fs';
import path from 'path';
import getParsedObj from '../src/parsers';
import getAst from '../src/getDifferences';

const res = [
  {
    key: 'common',
    type: 'unchanged',
    value: [
    { key: 'setting1', type: 'unchanged', value: 'Value 1' },
    { key: 'setting2', type: 'removed', value: 200 },
    { key: 'setting3', type: 'unchanged', value: true },
    { key: 'setting6', type: 'removed', value: [{ key: 'key', type: 'removed', value: 'value' }] },
    { key: 'setting4', type: 'added', value: 'blah blah' },
    { key: 'setting5', type: 'added', value: [{ key: 'key5', type: 'added', value: 'value5' }] },
    ] },
  { key: 'group1',
    type: 'unchanged',
    value: [
    { key: 'baz', type: 'updated', value: { before: 'bas', after: 'bars' } },
    { key: 'foo', type: 'unchanged', value: 'bar' },
    ] },
  { key: 'group2', type: 'removed', value: [{ key: 'abc', type: 'removed', value: 12345 }] },
  { key: 'group3', type: 'added', value: [{ key: 'fee', type: 'added', value: 100500 }] },
];

test('get ast with differences between files', () => {
  const firstFile = path.join(__dirname, '__fixtures__/recursFirst.json');
  const secondFile = path.join(__dirname, '__fixtures__/recursSecond.json');

  const fileContent1 = fs.readFileSync(firstFile, 'utf-8');
  const fileContent2 = fs.readFileSync(secondFile, 'utf-8');

  const firstObj = getParsedObj('.json')(fileContent1);
  const secondObj = getParsedObj('.json')(fileContent2);
  expect(getAst(firstObj, secondObj)).toEqual(res);
});
