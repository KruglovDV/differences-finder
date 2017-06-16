import _ from 'lodash';

const isObject = value => typeof value === 'object';

const getDfferences = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), (Object.keys(obj2)));
  const res = keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (value1 === value2) {
      return [key, ['unchanged', [value1]]];
    }
    if (value1 && value2) {
      if (isObject(value1) && isObject(value2)) {
        return [key, ['unchanged', [getDfferences(value1, value2)]]];
      }
      return [key, ['updated', [value1, value2]]];
    }
    if (value1 && value2 === undefined) {
      if (isObject(value1)) {
        return [key, ['removed', [getDfferences(value1, {})]]];
      }
      return [key, ['removed', [value1]]];
    }
    if (value1 === undefined && value2) {
      if (isObject(value2)) {
        return [key, ['added', [getDfferences({}, value2)]]];
      }
      return [key, ['added', [value2]]];
    }
    return [];
  });
  return res;
};

export default (obj1, obj2) => getDfferences(obj1, obj2);
