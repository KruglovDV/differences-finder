const render = (ast, parent) => {
  const res = Object.keys(ast).map((key) => {
    if (ast[key].type === 'unchanged' && typeof ast[key].value === 'object') {
      return render(ast[key].value, `${parent}${key}.`);
    }
    if (ast[key].type === 'added') {
      if (typeof ast[key].value === 'object') {
        return `Property "${parent}${key}" was added with complex value\n`;
      }
      return `Property "${parent}${key}" was added with ${typeof ast[key].value === 'string' ?
        `"${ast[key].value}"\n` : `value ${ast[key].value}\n`}`;
    }
    if (ast[key].type === 'removed') {
      return `Property "${parent}${key}" was removed\n`;
    }
    if (ast[key].type === 'changed') {
      return `Property "${parent}${key}" was updated From "${ast[key].before}" to "${ast[key].after}"\n`;
    }
    return '';
  })
    .join('');
  return res;
};

export default ast => render(ast, '').slice(0, -1);
