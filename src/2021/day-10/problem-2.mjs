const opening = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

const points = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

export default function(input) {
  const incompleteLines = [];
  input.forEach(line => {
    const stack = [];
    let corrupted = false;

    for (let i = 0; i < line.length; i++) {
      const currentChar = line[i];

      if (opening[currentChar]) {
        stack.push(currentChar);
      } else {
        const openingChar = stack.pop();

        if (opening[openingChar] !== currentChar) {
          corrupted = true;
          break;
        }
      }
    }

    if (!corrupted) {
      let toComplete = '';

      while(stack.length) {
        toComplete += opening[stack.pop()];
      }

      incompleteLines.push(toComplete);
    }
  });

  const result = incompleteLines
    .map((value) => {
      let score = 0;
      for (let i = 0; i < value.length; i++) {
        score *= 5;
        score += points[value[i]];
      }

      return score;
    })
    .sort((a, b) => a -b);

  return result[Math.floor(result.length / 2)];
}

export const expectedValue = 288957;
