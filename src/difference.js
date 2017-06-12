import fs from 'fs';

const readFile = path => JSON.parse(fs.readFileSync(path));

const showDfferences = (firstObj, secObj) => {
  const keys = Object.keys(firstObj)
    .concat(Object.keys(secObj))
    .reduce((acc, el) => {
      if (!acc.find(e => e === el)) {
        return [...acc, el];
      }
      return acc;
    }, []);

  const res = keys.reduce((acc, el) => {
    if (firstObj[el] === secObj[el]) {
      return { ...acc, [el]: firstObj[el] };
    }

    if (firstObj[el] && secObj[el]) {
      return { ...acc, [`+ ${el}`]: secObj[el], [`- ${el}`]: firstObj[el] };
    }

    if (firstObj[el] && secObj[el] === undefined) {
      return { ...acc, [`- ${el}`]: firstObj[el] };
    }

    if (secObj[el] && firstObj[el] === undefined) {
      return { ...acc, [`+ ${el}`]: secObj[el] };
    }
    return acc;
  }, {});

  return res;
}

export default (path1, path2) => {
  const file1 = readFile(path1);
  const file2 = readFile(path2);

  const res = showDfferences(file1, file2);

  console.log(res);
  return res;
};
