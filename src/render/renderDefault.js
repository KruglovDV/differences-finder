const signs = {
  added: '+ ',
  removed: '- ',
  unchanged: '  ',
};

const render = (ast, tab, sign) => {
  const res = ast.map((el) => {
    const { key, type, value } = el;

    if (typeof value === 'object' && type !== 'updated') {
      const sig = type === 'unchanged';
      return [`${tab}${signs[type]}${key}: {${render(value, `${tab}    `, sig)}${tab}  }`];
    }

    return type === 'updated' ?
      [`${tab}${signs.added}${key}: ${value.after}`, `${tab}${signs.removed}${key}: ${value.before}`].join('\n') :
      [`${tab}${sign ? signs[type] : '  '}${key}: ${value}`];
  });
  return `\n${res.join('\n')}\n`;
};

export default ast => `{${render(ast, '  ', true)}}`;
