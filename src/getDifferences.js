import _ from 'lodash';

const isObject = value => typeof value === 'object';

const getDfferences = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), (Object.keys(obj2)));
  const res = keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (value1 === value2) {
      return { key, type: 'unchanged', value: value1 };
    }
    if (value1 && value2) {
      if (isObject(value1) && isObject(value2)) {
        return { key, type: 'unchanged', value: getDfferences(value1, value2) };
      }
      return { key, type: 'updated', value: { before: value1, after: value2 } };
    }
    if (value1 && value2 === undefined) {
      if (isObject(value1)) {
        return { key, type: 'removed', value: getDfferences(value1, {}) };
      }
      return { key, type: 'removed', value: value1 };
    }
    if (value1 === undefined && value2) {
      if (isObject(value2)) {
        return { key, type: 'added', value: getDfferences({}, value2) };
      }
      return { key, type: 'added', value: value2 };
    }
    return {};
  });
  return res;
};

export default (obj1, obj2) => getDfferences(obj1, obj2);
