function parseInput(string) {
  const data = string.split(/[\s:-]/);

  return {
    min: parseInt(data[0], 10),
    max: parseInt(data[1], 10),
    char: data[2],
    string: data[4],
  };
}

function isValid({ min, max, char, string }) {
  const count = string
    .split('')
    .reduce((accum, currentChar) => {
      if (currentChar === char) return accum + 1;
      return accum;
    }, 0)

  return count >= min && count <= max;
};

export default function(input) {
  const result = input
    .map(parseInput)
    .map(isValid)
    .filter(a => a);

  return result.length;
}

export const expectedValue = 2;
