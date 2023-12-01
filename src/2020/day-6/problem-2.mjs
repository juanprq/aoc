function parseInput(group) {
  return group.map(person => person.split(''));
};

function countGroup(persons) {
  const inter = persons.reduce((a, b) => a.filter(c => b.includes(c)));
  return inter.length;
};

export default function(input) {
  const result = input
    .reduce((accum, value) => {
      if (value === '') {
        accum.push([]);
      } else {
        accum[accum.length - 1].push(value);
      }

      return accum;
    }, [[]])
    .map(parseInput)
    .map(countGroup)
    .reduce((accum, value) => accum + value);

  return result;
}

export const expectedValue = 6;
