import _ from 'lodash';

const signs = {
  added: '+ ',
  removed: '- ',
  unchanged: '  ',
};

const render = (ast, tab, sign) => {
  const res = ast.map((el) => {
    const [key, type, value] = _.flattenDepth(el, 1);

    if (typeof value[0] === 'object') {
      const sig = type === 'unchanged';
      return [`${tab}${signs[type]}${key}: {${render(value[0], `${tab}    `, sig)}${tab}  }`];
    }

    return type === 'updated' ? [`${tab}${signs.added}${key}: ${value[1]}`, `${tab}${signs.removed}${key}: ${value[0]}`].join('\n') :
      [`${tab}${sign ? signs[type] : '  '}${key}: ${value}`];
  });
  return `\n${res.join('\n')}\n`;
};

export default ast => `{${render(ast, '  ', true)}}`;
