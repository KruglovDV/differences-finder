const render = (ast, tab, sign) => {
  const res = Object.keys(ast).map((key) => {
    if (ast[key].type === 'unchanged') {
      if (typeof ast[key].value === 'object') {
        return `${tab}  ${key}: {\n${render(ast[key].value, `    ${tab}`, true)}${tab}  }\n`;
      }
      return `${tab}  ${key}: ${ast[key].value}\n`;
    }
    if (ast[key].type === 'changed') {
      return `${tab}+ ${key}: ${ast[key].after}\n` +
             `${tab}- ${key}: ${ast[key].before}\n`;
    }
    if (ast[key].type === 'removed') {
      if (typeof ast[key].value === 'object') {
        return `${tab}- ${key}: {\n${render(ast[key].value, `    ${tab}`, false)}${tab}  }\n`;
      }
      if (!sign) {
        return `${tab}  ${key}: ${ast[key].value}\n`;
      }
      return `${tab}- ${key}: ${ast[key].value}\n`;
    }
    if (ast[key].type === 'added') {
      if (typeof ast[key].value === 'object') {
        return `${tab}+ ${key}: {\n${render(ast[key].value, `    ${tab}`, false)}${tab}  }\n`;
      }
      if (!sign) {
        return `${tab}  ${key}: ${ast[key].value}\n`;
      }
      return `${tab}+ ${key}: ${ast[key].value}\n`;
    }
    return '';
  })
    .join('');

  return res;
};

export default ast => `{\n${render(ast, '  ', true)}}`;
