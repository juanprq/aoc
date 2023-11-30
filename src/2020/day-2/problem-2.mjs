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
  const charA = string.charAt(min - 1);
  const charB = string.charAt(max - 1);

  if (charA === charB) return false
  if (charA === char || charB === char) return true;

  return false;
}

export default function(input) {
  const result = input
    .map(parseInput)
    .map(isValid)
    .filter(a => a);

  return result.length;
}

export const expectedValue = 1;
