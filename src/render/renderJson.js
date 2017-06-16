const render = (ast) => {
  const res = Object.keys(ast).reduce((acc, key) => {
    if (ast[key].type === 'unchanged') {
      if (typeof ast[key].value === 'object') {
        return { ...acc, [key]: render(ast[key].value) };
      }
      return { ...acc, [key]: ast[key].value };
    }

    if (ast[key].type === 'changed') {
      return { ...acc, [`+${key}`]: ast[key].after, [`-${key}`]: ast[key].before };
    }
    if (ast[key].type === 'removed') {
      if (typeof ast[key].value === 'object') {
        return { ...acc, [`-${key}`]: render(ast[key].value) };
      }
      return { ...acc, [`-${key}`]: ast[key].value };
    }
    if (ast[key].type === 'added') {
      if (typeof ast[key].value === 'object') {
        return { ...acc, [`+${key}`]: render(ast[key].value) };
      }
      return { ...acc, [`+${key}`]: ast[key].value };
    }
    return acc;
  }, {});

  return res;
};

export default ast => JSON.stringify(render(ast));
