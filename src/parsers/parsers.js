import Yaml from 'js-yaml';
import Ini from 'ini';

const ini = file => Ini.parse(file);

const yaml = file => Yaml.safeLoad(file);

const json = file => JSON.parse(file);

export {
  ini,
  yaml,
  json,
};
