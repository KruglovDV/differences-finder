import path from 'path';
import getParser from './parsers';
import getFile from './getFile';
import getDfferences from './getDifferences';
import parseForDisp from './parseforDisplay';

export default (path1, path2) => {
  const extension = path.extname(path1);
  const getObject = getParser(extension);
  const file1 = getFile(path1);
  const file2 = getFile(path2);
  const obj1 = getObject(file1);
  const obj2 = getObject(file2);

  const diferencesObj = getDfferences(obj1, obj2);
  return parseForDisp(diferencesObj);
};
