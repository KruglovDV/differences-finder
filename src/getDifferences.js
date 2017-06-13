import _ from 'lodash';
import Path from 'path';
import getParser from './parsers';
import getFile from './getFile';

const getParsedObj = (file, extension) => {
  if (extension === '.json') {
    return getParser.json(file);
  }

  if (extension === '.yml') {
    return getParser.yaml(file);
  }

  if (extension === '.ini') {
    return getParser.ini(file);
  }
  return false;
};

const getDfferences = (firstObj, secObj) => {
  if (!firstObj || !secObj) {
    throw Error('can`t parse from this format!');
  }
  const keys = _.union(Object.keys(firstObj), (Object.keys(secObj)));

  const res = keys.reduce((acc, el) => {
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
  }, ['{\n']);

  res.push('}');
  return res.join('');
};

export default (path1, path2) => {
  const extension1 = Path.extname(path1);
  const extension2 = Path.extname(path2);
  const obj1 = getParsedObj(getFile(path1), extension1);
  const obj2 = getParsedObj(getFile(path2), extension2);

  return getDfferences(obj1, obj2);
};
