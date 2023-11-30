const neededKeys = [
 'byr',
 'iyr',
 'eyr',
 'hgt',
 'hcl',
 'ecl',
 'pid',
];

function validateKeys(passport) {
  const keys = Object.keys(passport);
  return neededKeys.every(key => keys.includes(key));
};

function parsePasswport(passportArray) {
  return passportArray.reduce((accum, row) => {
    const [key, value] = row.split(':');

    return { ...accum, [key]: value };
  }, {});
};

export default function(input) {
  const data = input
    .reduce((accum, row) => {
      if (row === '') {
        accum.push([]);
      } else {
        accum[accum.length - 1].push(row);
      }

      return accum;
    }, [[]])
    .map(row => row.join(' ').split(/[\n\s]/))
    .map(parsePasswport)
    .map(validateKeys)
    .filter(a => a);

  return data.length;
}

export const expectedValue = 2;
