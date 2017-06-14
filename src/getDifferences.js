import _ from 'lodash';

const getDfferences = (obj1, obj2, tab) => {
  const keys = _.union(Object.keys(obj1), (Object.keys(obj2)));

  const res = keys.reduce((acc, key) => {
    if (obj1[key] === obj2[key]) {
      return acc.concat(`${tab}  ${key}: ${obj1[key]}\n`);
    }

    if (obj1[key] && obj2[key]) {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        return acc.concat(`${tab}  ${key}: {\n${getDfferences(obj1[key], obj2[key], `    ${tab}`)}${tab}  }\n`);
      }
      return acc.concat(`${tab}+ ${key}: ${obj2[key]}\n${tab}- ${key}: ${obj1[key]}\n`);
    }

    if (obj1[key] && obj2[key] === undefined) {
      if (typeof obj1[key] === 'object') {
        return acc.concat(`${tab}- ${key}: {\n${getDfferences(obj1[key], false, `    ${tab}`)}${tab}  }\n`);
      }
      if (!obj2) {
        return acc.concat(`${tab}  ${key}: ${obj1[key]}\n`);
      }
      return acc.concat(`${tab}- ${key}: ${obj1[key]}\n`);
    }

    if (obj2[key] && obj1[key] === undefined) {
      if (typeof obj2[key] === 'object') {
        return acc.concat(`${tab}+ ${key}: {\n${getDfferences(false, obj2[key], `    ${tab}`)}${tab}  }\n`);
      }
      if (!obj1) {
        return acc.concat(`${tab}  ${key}: ${obj2[key]}\n`);
      }
      return acc.concat(`${tab}+ ${key}: ${obj2[key]}\n`);
    }
    return acc;
  }, []);

  return res.join('');
};

export default getDfferences;
