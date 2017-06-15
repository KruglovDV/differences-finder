import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import renderDefault from './renderDefault';
import renderPlain from './renderPlain';
import getDfferences from './getDifferences';

const renders = {
  default: renderDefault,
  plain: renderPlain,
};

const getFileContent = pathToFile => fs.readFileSync(pathToFile, 'utf-8');

export default (path1, path2, format) => {
  const extension = path.extname(path1);
  const getObject = getParser(extension);
  const fileContent1 = getFileContent(path1);
  const fileContent2 = getFileContent(path2);
  const obj1 = getObject(fileContent1);
  const obj2 = getObject(fileContent2);
  const diferencesObj = getDfferences(obj1, obj2);
  const render = renders[format];
  return render(diferencesObj);
};
