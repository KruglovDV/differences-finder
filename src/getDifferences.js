import _ from 'lodash';

const getDfferences = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), (Object.keys(obj2)));

  const res = keys.reduce((acc, key) => {
    if (obj1[key] === obj2[key]) {
      return { ...acc, [key]: { type: 'unchanged', value: obj2[key] } };
    }

    if (obj1[key] && obj2[key]) {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        return { ...acc, [key]: { type: 'unchanged', value: getDfferences(obj1[key], obj2[key]) } };
      }
      return { ...acc, [key]: { type: 'changed', before: obj1[key], after: obj2[key] } };
    }

    if (obj1[key] && obj2[key] === undefined) {
      if (typeof obj1[key] === 'object') {
        return { ...acc, [key]: { type: 'removed', value: getDfferences(obj1[key], false) } };
      }
      return { ...acc, [key]: { type: 'removed', value: obj1[key] } };
    }

    if (obj1[key] === undefined && obj2[key]) {
      if (typeof obj2[key] === 'object') {
        return { ...acc, [key]: { type: 'added', value: getDfferences(false, obj2[key]) } };
      }
      return { ...acc, [key]: { type: 'added', value: obj2[key] } };
    }

    return acc;
  }, {});

  return res;
};

export default (obj1, obj2) => getDfferences(obj1, obj2);
