import fs from 'fs';
import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

const getParsedObj = (path) => {
  const extension = path.slice(path.lastIndexOf('.') + 1);

  if (extension === 'json') {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
  }

  if (extension === 'yml') {
    return yaml.safeLoad(fs.readFileSync(path, 'utf-8'));
  }

  if (extension === 'ini') {
    return ini.parse(fs.readFileSync(path, 'utf-8'));
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

export default (path1, path2) => {
  const file1 = getParsedObj(path1);
  const file2 = getParsedObj(path2);

  return getDfferences(file1, file2);
};
