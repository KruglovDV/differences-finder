const render = (ast) => {
  const res = ast.reduce((acc, el) => {
    const { key, type, value } = el;

    if (typeof value === 'object' && type !== 'updated') {
      return { ...acc, [key]: { type, value: render(value) } };
    }

    if (type === 'updated') {
      return { ...acc, [key]: { type, before: value.before, after: value.after } };
    }
    return { ...acc, [key]: { type, value } };
  }, {});
  return res;
};

export default render;
