const opening = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

const points = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

export default function(input) {
  const corruptedFound = [];
  input.forEach(line => {
    const stack = [];

    for (let i = 0; i < line.length; i++) {
      const currentChar = line[i];

      if (opening[currentChar]) {
        stack.push(currentChar);
      } else {
        const openingChar = stack.pop();

        if (opening[openingChar] !== currentChar) {
          corruptedFound.push(currentChar);
          break;
        }
      }
    }
  });

  return corruptedFound
    .map(key => points[key])
    .reduce((a, b) => a + b);
}

export const expectedValue = 26397;
