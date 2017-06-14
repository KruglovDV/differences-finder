import _ from 'lodash';
import path from 'path';
import getParser from './parsers';
import getFile from './getFile';

const getDfferences = (firstObj, secObj) => {
  if (!firstObj || !secObj) {
    throw Error('can`t parse from this format!');
  }
  const keys = _.union(Object.keys(firstObj), (Object.keys(secObj)));

  const res = [...keys.reduce((acc, el) => {
    if (firstObj[el] === secObj[el]) {
      return [...acc, `    ${el}: ${firstObj[el]}\n`];
    }

    if (firstObj[el] && secObj[el]) {
      return [...acc, `  + ${el}: ${secObj[el]}\n  - ${el}: ${firstObj[el]}\n`];
    }

    if (firstObj[el] && secObj[el] === undefined) {
      return [...acc, `  - ${el}: ${firstObj[el]}\n`];
    }

    if (secObj[el] && firstObj[el] === undefined) {
      return [...acc, `  + ${el}: ${secObj[el]}\n`];
    }
    return acc;
  }, ['{\n']), '}'];

  return res.join('');
};

export default (path1, path2) => {
  const extension = path.extname(path1);
  const parser = getParser(extension);
  const file1 = getFile(path1);
  const file2 = getFile(path2);
  const obj1 = parser(file1);
  const obj2 = parser(file2);

  return getDfferences(obj1, obj2);
};
