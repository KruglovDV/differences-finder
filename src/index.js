import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import renderJson from './renderJson';
import renderPlain from './renderPlain';
import renderDefault from './renderDefault';
import getDfferences from './getDifferences';

const renders = {
  default: renderDefault,
  plain: renderPlain,
  json: renderJson,
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
  if (!render) {
    console.log('unexpected format!');
    process.exit(1);
  }
  return render(diferencesObj);
};
