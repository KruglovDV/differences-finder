import _ from 'lodash';

const getDfferences = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), (Object.keys(obj2)));

  const res = keys.reduce((acc, key) => {
    if (obj1[key] === obj2[key]) {
      return { ...acc, [`  ${key}`]: obj1[key] };
    }

    if (obj1[key] && obj2[key]) {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        return { ...acc, [`  ${key}`]: getDfferences(obj1[key], obj2[key]) };
      }
      return { ...acc, [`+ ${key}`]: obj2[key], [`- ${key}`]: obj1[key] };
    }

    if (obj1[key] && obj2[key] === undefined) {
      if (typeof obj1[key] === 'object') {
        return { ...acc, [`- ${key}`]: getDfferences(obj1[key], false) };
      }
      if (!obj2) {
        return { ...acc, [`  ${key}`]: obj1[key] };
      }
      return { ...acc, [`- ${key}`]: obj1[key] };
    }

    if (obj2[key] && obj1[key] === undefined) {
      if (typeof obj2[key] === 'object') {
        return { ...acc, [`+ ${key}`]: getDfferences(false, obj2[key]) };
      }
      if (!obj1) {
        return { ...acc, [`  ${key}`]: obj2[key] };
      }
      return { ...acc, [`+ ${key}`]: obj2[key] };
    }
    return acc;
  }, {});

  return res;
};

export default getDfferences;
