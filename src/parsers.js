import Yaml from 'js-yaml';
import Ini from 'ini';

const ini = file => Ini.parse(file);

const yaml = file => Yaml.safeLoad(file);

const json = file => JSON.parse(file);

export default (extension) => {
  if (extension === '.json') {
    return json;
  }

  if (extension === '.yml') {
    return yaml;
  }

  if (extension === '.ini') {
    return ini;
  }
  return false;
};
