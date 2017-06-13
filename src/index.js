import getDiff from './getDifferences';
import getFile from './getFile';

export default (path1, path2) => getDiff(path1, path2, getFile);
