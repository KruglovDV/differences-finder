import _ from 'lodash';
import Path from 'path';
import getParser from './parsers';

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
  return undefined;
};

const getDfferences = (firstObj, secObj) => {
  const keys = _.union(Object.keys(firstObj).concat(Object.keys(secObj)));

  const res = keys.reduce((acc, el) => {
    if (firstObj[el] === secObj[el]) {
      return { ...acc, [el]: firstObj[el] };
    }

    if (firstObj[el] && secObj[el]) {
      return { ...acc, [`+ ${el}`]: secObj[el], [`- ${el}`]: firstObj[el] };
    }

    if (firstObj[el] && secObj[el] === undefined) {
      return { ...acc, [`- ${el}`]: firstObj[el] };
    }

    if (secObj[el] && firstObj[el] === undefined) {
      return { ...acc, [`+ ${el}`]: secObj[el] };
    }
    return acc;
  }, {});

  return res;
};

export default (path1, path2, readFile) => {
  const extension1 = Path.extname(path1);
  const extension2 = Path.extname(path2);
  const obj1 = getParsedObj(readFile(path1), extension1);
  const obj2 = getParsedObj(readFile(path2), extension2);

  return getDfferences(obj1, obj2);
};
