import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import getRender from './render';
import getDfferences from './getDifferences';

const getFileContent = pathToFile => fs.readFileSync(pathToFile, 'utf-8');

export default (path1, path2, format) => {
  const extension = path.extname(path1);
  const getObject = getParser(extension);
  if (!getObject) {
    console.log('unhendable extension!');
    process.exit(1);
  }

  const fileContent1 = getFileContent(path1);
  const fileContent2 = getFileContent(path2);

  const obj1 = getObject(fileContent1);
  const obj2 = getObject(fileContent2);

  const diferencesObj = getDfferences(obj1, obj2);

  const render = getRender(format);
  if (!render) {
    console.log('unexpected format!');
    process.exit(1);
  }
  return render(diferencesObj);
};
