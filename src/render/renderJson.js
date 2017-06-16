import _ from 'lodash';

const render = (ast) => {
  const res = ast.reduce((acc, el) => {
    const [key, type, value] = _.flattenDepth(el, 1);

    if (typeof value[0] === 'object') {
      return { ...acc, [key]: { type, value: render(value[0]) } };
    }

    if (type === 'updated') {
      return { ...acc, [key]: { type, before: value[0], after: value[1] } };
    }
    return { ...acc, [key]: { type, value: value[0] } };
  }, {});
  return res;
};

export default ast => render(ast);
