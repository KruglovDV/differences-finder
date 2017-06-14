const parseToObjectStyle = (obj, tab) => {
  const res = Object.keys(obj).map((key) => {
    if (typeof obj[key] === 'object') {
      return `${tab}${key}: {\n${parseToObjectStyle(obj[key], `    ${tab}`)}${tab}  }\n`;
    }
    return `${tab}${key}: ${obj[key]}\n`;
  }).join('');
  return res;
};

export default obj => `{\n${parseToObjectStyle(obj, '  ')}}`;
