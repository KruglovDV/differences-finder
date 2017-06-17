const render = (ast, parent) => {
  const res = ast.map((el) => {
    const { key, type, value } = el;

    if (type === 'added') {
      return typeof value === 'object' ? [`Property '${parent}${key}' was added with complex value`] :
        [`Property '${parent}${key}' was added with ${typeof value === 'string' ? `'${value}'` : `value ${value}`}`];
    }
    if (type === 'removed') {
      return [`Property '${parent}${key}' was removed`];
    }

    if (type === 'updated') {
      return [`Property '${parent}${key}' was updated. From '${value.before}' to '${value.after}'`];
    }

    if (type === 'unchanged' && typeof value === 'object') {
      return render(value, `${parent}${key}.`);
    }
    return '';
  });
  return res.filter(el => el !== '').join('\n');
};

export default ast => render(ast, '');
