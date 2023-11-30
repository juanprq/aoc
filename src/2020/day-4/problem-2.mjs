const eyeColors = [
  'amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth',
];

const neededKeys = {
  byr: (value) => {
    const parsedValue = parseInt(value, 10);
    return parsedValue >= 1920 && parsedValue <= 2002;
  },
  iyr: (value) => {
    const parsedValue = parseInt(value, 10);
    return parsedValue >= 2010 && parsedValue <= 2020;
  },
  eyr: (value) => {
    const parsedValue = parseInt(value, 10);
    return parsedValue >= 2020 && parsedValue <= 2030;
  },
  hgt: (value) => {
    const number = parseInt(value.slice(0, value.length - 2), 10);
    const unit = value.slice(value.length - 2);

    if (unit === 'in') {
      return number >= 59 && number <= 76;
    } else if (unit === 'cm') {
      return number >= 150 && number <= 193;
    } else {
      return false;
    }
  },
  hcl: (value) => {
    return value.match(/^#[0-9a-f]{6}$/);
  },
  ecl: (value) => {
    return eyeColors.includes(value);
  },
  pid: (value) => {
    return value.match(/^\d{9}$/);
  },
};

function validateData([key, value]) {
  if (!neededKeys[key]) return true;
  return neededKeys[key](value);
}

function validatePassport(passport) {
  const entries = Object.entries(passport);
  const keys = Object.keys(passport);

  return Object.keys(neededKeys)
    .every(key => keys.includes(key))
    &&
    entries
    .every(validateData);
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
    .map(validatePassport)
    .filter(a => a);

  return data.length;
}

export const expectedValue = 2;
