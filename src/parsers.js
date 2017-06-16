import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
  '.json': JSON.parse,
};

export default (extension) => {
  const parser = parsers[extension];
  if (!parser) {
    throw Error('unhendable extension!');
  }
  return parser;
};

