function parseInput(row) {
  const [instruction, sQty] = row.split(' ');

  return {
    instruction,
    quantity: parseInt(sQty, 10),
  };
};

export default function(input) {
  const instructions = input
    .map(parseInput);

  let accumulator = 0;
  let currentPosition = 0;
  const visited = [];

  while (visited[currentPosition] === undefined) {
    visited[currentPosition] = true;
    const { instruction, quantity } = instructions[currentPosition];

    if (instruction === 'nop') {
      currentPosition++;
    } else if (instruction === 'acc') {
      currentPosition++
      accumulator += quantity;
    } else {
      currentPosition += quantity;
    }
  }

  return accumulator;
}

export const expectedValue = 5;
