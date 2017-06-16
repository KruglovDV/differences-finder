import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import getRenderer from './render';
import getDfferences from './getDifferences';

const getFileContent = pathToFile => fs.readFileSync(pathToFile, 'utf-8');

export default (path1, path2, format) => {
  const extension = path.extname(path1);
  const getObject = getParser(extension);

  const fileContent1 = getFileContent(path1);
  const fileContent2 = getFileContent(path2);

  const obj1 = getObject(fileContent1);
  const obj2 = getObject(fileContent2);

  const diferencesObj = getDfferences(obj1, obj2);

  const render = getRenderer(format);
  return render(diferencesObj);
};
