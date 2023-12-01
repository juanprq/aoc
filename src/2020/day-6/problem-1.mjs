function parseInput(groupString) {
  return groupString.map(person => person.split(''));
};

function countGroup(persons) {
  const set = persons
    .reduce((accum, value) => {
      return [...accum, ...value];
    }, [])
    .reduce((accum, value) => {
      accum.add(value);
      return accum
    }, new Set());

  return set.size;
};

export default function(input) {
  const result = input
    .reduce((accum, value) => {
      if (value === '') {
        accum.push([]);
      } else {
        accum[accum.length - 1].push(value)
      }

      return accum;
    }, [[]])
    .map(parseInput)
    .map(countGroup)
    .reduce((accum, value) => accum + value);

  return result;
}

export const expectedValue = 11;
