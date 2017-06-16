import _ from 'lodash';

const render = (ast, parent) => {
  const res = ast.map((el) => {
    const [key, type, value] = _.flattenDepth(el, 1);

    if (type === 'added') {
      return typeof value[0] === 'object' ? [`Property '${parent}${key}' was added with complex value`] :
        [`Property '${parent}${key}' was added with ${typeof value[0] === 'string' ? `'${value[0]}'` : `value ${value[0]}`}`];
    }
    if (type === 'removed') {
      return [`Property '${parent}${key}' was removed`];
    }

    if (type === 'updated') {
      return [`Property '${parent}${key}' was updated. From '${value[0]}' to '${value[1]}'`];
    }

    if (type === 'unchanged' && typeof value[0] === 'object') {
      return render(value[0], `${parent}${key}.`);
    }
    return '';
  });
  return res.filter(el => el !== '').join('\n');
};

export default ast => render(ast, '');
